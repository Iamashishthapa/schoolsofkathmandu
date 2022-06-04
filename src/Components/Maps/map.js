import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  ZoomControl,
} from "react-leaflet";
import * as turf from "@turf/turf";
import "leaflet.markercluster";
import "./map.css";
import district from "./kathmandu.json";
import datatest from "./data.json"; //this is the main data which is in osm form
import Cluster from "./cluster";

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.firstOverlayRef = React.createRef();
    this.secondOverlayRef = React.createRef();
    this.groupRef = React.createRef();
  }

  state = {
    hovering: null,
    feature: null,
    building_count: "",
    student_count: "",
    school_name: "",
  };

  geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };

  render() {
    var osmtogeojson = require("osmtogeojson");

    const datatest1 = osmtogeojson(datatest);

    datatest1.features.forEach(function (feature) {
      if (feature.geometry.type === "Polygon") {
        feature.polygonGeometry = feature.geometry;
        var centroid = turf.centroid(feature);
        var lat = centroid.geometry.coordinates[0];
        var lon = centroid.geometry.coordinates[1];
        feature.geometry.coordinates = [lat, lon];
        feature.geometry.type = "Point";
      }
    });

    return (
      <div>
        <MapContainer
          ref={this.mapRef}
          center={[27.700769, 85.30014]}
          zoom={11}
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
            <GeoJSON data={district.features} attribution="ashish" />
            <Cluster></Cluster>
          </LayersControl>
        </MapContainer>
      </div>
    );
  }
}

export default Map;
