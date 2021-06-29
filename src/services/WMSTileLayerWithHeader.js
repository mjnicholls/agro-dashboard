import React from 'react';
import { createTileLayerComponent, updateGridLayer, withPane } from '@react-leaflet/core';
import { TileLayer } from 'leaflet';
import { useSelector } from 'react-redux'

async function fetchImage(url, callback, headers, abort) {
  const controller = new AbortController();
  const signal = controller.signal;
  if (abort) {
    abort.subscribe(() => {
      controller.abort();
    });
  }
  const f = await fetch(url, {
    method: "GET",
    headers: headers,
    mode: "cors",
    signal: signal
  });
  const blob = await f.blob();
  callback(blob);
}

var LWMSTileLayerWithHeader = TileLayer.WMS.extend({
  initialize: function (url, options) {
    const { headers, abort, results, ...props } = options;
    TileLayer.WMS.prototype.initialize.call(this, url, props);
    this.headers = headers;
    this.abort = abort;
    this.results = results;
  },
  createTile(coords, done) {
    const url = this.getTileUrl(coords);
    const img = document.createElement("img");
    img.setAttribute("role", "presentation");

    fetchImage(
      url,
      resp => {
        const reader = new FileReader();
        reader.onload = () => {
          img.src = reader.result;
          if (this.results) {
            this.results.next(reader.result);
          };
        };
        reader.readAsDataURL(resp);
        done(null, img);
      },
      this.headers,
      this.abort
    );
    return img;
  }
});

const WMSTileLayerWithHeader = createTileLayerComponent(
  function createWMSTileLayer({ params = {}, url, ...options }, context) {
    return {
      instance: new LWMSTileLayerWithHeader(url, {
        ...params,
        ...withPane(options, context)
      }),
      context
    };
  }, function updateWMSTileLayer(layer, props, prevProps) {
    updateGridLayer(layer, props, prevProps);

    if (props.params != null && props.params !== prevProps.params) {
      layer.setParams(props.params);
    }
  });

const authTokenSelector = state => state.auth.token;

const WMSTileLayerWithHeaderComponent = ({ url, format }) => {
  const token = useSelector(authTokenSelector);
  const headers = token ?  {
    Authorization: 'Bearer ' + token
  } : {}
  console.log('token', token)
  return (
    <WMSTileLayerWithHeaderComponent
      url={url}
      format={format}
      headers={headers}
    />
  )
}

export default WMSTileLayerWithHeaderComponent;

