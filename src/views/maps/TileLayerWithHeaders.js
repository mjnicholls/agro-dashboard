import L from 'leaflet';
import { createTileLayerComponent, updateGridLayer, withPane } from '@react-leaflet/core';
import {axiosInstance} from "../../services/base";

async function fetchImage(url, callback, headers, abort) {
  let _headers = {};
  if (headers) {
    headers.forEach(h => {
      _headers[h.header] = h.value;
    });
  }
  const controller = new AbortController();
  const signal = controller.signal;
  if (abort) {
    abort.subscribe(() => {
      controller.abort();
    });
  }
  try {
    const f = await fetch(url, {
      method: "GET",
      headers: _headers,
      mode: "cors",
      signal: signal
    });
    const blob = await f.blob();
    if (blob.type === "image/png") {
      callback(blob);
    }
  } catch (err) {
    console.log("fetch image err: ", err)
  }

}

L.TileLayerWithHeaders = L.TileLayer.extend({
  initialize: function (url, options, headers, abort) {
    L.TileLayer.prototype.initialize.call(this, url, options);
    this.headers = headers;
    this.abort = abort;
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
        };
        reader.readAsDataURL(resp);
        done(null, img);
      },
      this.headers,
      this.abort
    );
    return img;
  },
  // setUrl(url) {
  //   let layers = this._map._layers;
  //   // for (let layer in layers) {
  //   //   console.log(layer)
  //   //   this._map.removeLayer(layer)
  //   // }
  //   this._url = url;
  //   this.redraw();
		// return this;
  // }
});

L.tileLayer = function (url, options, headers, abort) {
  return new L.TileLayerWithHeaders(url, options, headers, abort);
};

const createTileLayerWithHeaders = (props, context) => {
  const instance = L.tileLayer(props.url, {...props}, props.headers)

  return { instance, context }

}

const updateTileLayerWithHeaders = (instance, props, prevProps) => {
  if (prevProps.url !== props.url) {
    if (instance.setUrl) {
      instance.setUrl(props.url, true)
    }
  }

}

const TileLayerWithHeaders = createTileLayerComponent(createTileLayerWithHeaders, updateTileLayerWithHeaders)
export default TileLayerWithHeaders