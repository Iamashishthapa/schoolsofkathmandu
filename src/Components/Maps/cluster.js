import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet.markercluster";
import L from "leaflet";
import datatest from "./data.json";
import * as turf from "@turf/turf";
import "../../dist/MarkerCluster.css";
import "../../dist/MarkerCluster.Default.css";
import { useState } from "react";
import district from "./kathmandu.json";
import SideNavigator from "../Navigator/sideNavigator";
import "./cluster.css";

function Cluster(props) {
  const [building_count, setbuilding_count] = useState("");
  const [student_count, setstudent_count] = useState("");
  const [operator, setOperator] = useState("");
  const [feature, setfeature] = useState("");
  const [hovering, sethovering] = useState(false);

  useEffect(() => {
    const geojsonLayer = L.geoJson(null, {
      filter: dataFilter,
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: Icon });
      },
      onEachFeature: onEachFeature,
    });
    const mcg = L.markerClusterGroup({
      maxClusterRadius: 50,
      disableClusteringAtZoom: 16,
      spiderfyOnMaxZoom: 16,
    }).addTo(map);
    geojsonLayer.addData(datatest1).addTo(mcg);
    map.addLayer(cluster);
    // eslint-disable-next-line
  }, []);
  var Icon = L.icon({
    iconUrl: require("../../Assets/backpack.png"),
  });

  const cluster = L.markerClusterGroup();

  const map = useMap();

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

  const dataFilter = (feature) => {
    const regex1 = /gove/i;
    const regex2 = /publ/i;
    const regex3 = /priv/i;
    if (operator === "government") {
      return (
        feature.properties.name !== undefined &&
        (feature.properties.building_count >= parseInt(building_count) ||
          building_count === "") &&
        (feature.properties.student_count >= parseInt(student_count) ||
          student_count === "") &&
        (regex1.test(feature.properties.operator) || operator === "")
      );
    } else if (operator === "public") {
      return (
        feature.properties.name !== undefined &&
        (feature.properties.building_count >= parseInt(building_count) ||
          building_count === "") &&
        (feature.properties.student_count >= parseInt(student_count) ||
          student_count === "") &&
        (regex2.test(feature.properties.operator) || operator === "")
      );
    } else if (operator === "private") {
      return (
        feature.properties.name !== undefined &&
        (feature.properties.building_count >= parseInt(building_count) ||
          building_count === "") &&
        (feature.properties.student_count >= parseInt(student_count) ||
          student_count === "") &&
        (regex3.test(feature.properties.operator) || operator === "")
      );
    } else {
      return (
        feature.properties.name !== undefined &&
        (feature.properties.building_count >= parseInt(building_count) ||
          building_count === "") &&
        (feature.properties.student_count >= parseInt(student_count) ||
          student_count === "")
      );
    }
  };

  const layeradd = () => {
    map.eachLayer(function (layer) {
      if (layer.options.attribution === null) {
        map.removeLayer(layer);
      }
    });
    const geojsonLayer = L.geoJson(null, {
      filter: dataFilter,
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: Icon });
      },
      onEachFeature: onEachFeature,
    });
    const geojsonLayer1 = L.geoJson(district);
    const mcg = L.markerClusterGroup({
      maxClusterRadius: 50,
      disableClusteringAtZoom: 16,
      spiderfyOnMaxZoom: 16,
    }).addTo(map);
    map.addLayer(geojsonLayer1);
    geojsonLayer.addData(datatest1).addTo(mcg);
    map.addLayer(cluster);
  };

  const handleSubmit = (event) => {
    layeradd();
    event.preventDefault();
  };

  const handleChange = (event) => {
    if (event.target.id === "building_count") {
      setbuilding_count(event.target.value);
    } else if (event.target.id === "student_count") {
      setstudent_count(event.target.value);
    } else if (event.target.id === "operator") {
      setOperator(event.target.value);
    }
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        sethovering(true);
        setfeature(feature);
      },
      mouseout: (e) => {
        sethovering(false);
        setfeature(feature);
      },
    });
  };

  return (
    <div>
      <SideNavigator
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        student_count={student_count}
        building_count={building_count}
        map={map}
      ></SideNavigator>
      <div className="result">
        {hovering ? (
          <div
            style={{
              color: "red",
              backgroundColor: "black",
            }}
          >
            <p>School Name:{feature.properties.name}</p>
            <p>
              Number of Building:
              {feature.properties.building_count === undefined
                ? " Not Available"
                : feature.properties.building_count}
            </p>
            <p>
              Number of Student:
              {feature.properties.student_count === undefined
                ? " Not Available"
                : feature.properties.student_count}
            </p>
            <p>
              Operator Type:
              {feature.properties.operator === undefined
                ? " Not Available"
                : feature.properties.operator}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Cluster;
