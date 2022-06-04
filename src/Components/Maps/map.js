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
          zoom={13}
          maxZoom={20}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <ZoomControl position="topright" />
          <LayersControl position="bottomright">
            <LayersControl.BaseLayer checked name="Map1">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Map2">
              <TileLayer
                attribution='Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
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
