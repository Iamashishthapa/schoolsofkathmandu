import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  ZoomControl,
} from "react-leaflet";
import "leaflet.markercluster";

//css import section
import "./map.css";

//data import section
import district from "./kathmandu.json"; //this is the border geojsom data of Kathmandu

//component import section
import Cluster from "./cluster"; //each school is clustered and added to map from this component

class Map extends Component {
  render() {
    return (
      <div>
        <MapContainer
          center={[27.700769, 85.32614]}
          zoom={13}
          maxZoom={19}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <ZoomControl position="topright" />
          <LayersControl position="bottomright">
            <LayersControl.BaseLayer checked name="Light">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                maxZoom={19}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Dark">
              <TileLayer
                attribution='© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                maxZoom={19}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite">
              <TileLayer
                attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={19}
              />
            </LayersControl.BaseLayer>
            {/*displays border of kathmandu*/}
            <GeoJSON data={district.features} fillOpacity={0} />
            {/*Each school is clustered and added to map from this component*/}
            <Cluster></Cluster>
          </LayersControl>
        </MapContainer>
      </div>
    );
  }
}

export default Map;
