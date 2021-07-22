import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {mapBoxAccessToken} from '../config'

mapboxgl.accessToken = mapBoxAccessToken;

export {mapboxgl}