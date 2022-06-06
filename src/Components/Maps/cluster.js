import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

import "leaflet.markercluster"; //used for creating clusters
import L from "leaflet";
import * as turf from "@turf/turf"; //geospatial analysis(used to find center of polygon here)

//css import section
import "../../dist/MarkerCluster.css"; //css for cluster
import "../../dist/MarkerCluster.Default.css"; //css for cluster

//data import section
import datatest from "./data.json"; //school data in kathmandu
import district from "./kathmandu.json"; //this is the border geojsom data of Kathmandu

//component import section
import SideNavigator from "../Navigator/sideNavigator"; //sideNavigator Component

function Cluster(props) {
  const [building_count, setbuilding_count] = useState("");
  const [student_count, setstudent_count] = useState("");
  const [operator, setOperator] = useState(""); //type of operator(private,public,government)
  const [level, setLevel] = useState(""); //level of school(kindergarten,primary,lower_secondary and higher_secondary)
  const [feature, setfeature] = useState(""); //details of each school
  const [mousePosition, setMousePosition] = useState([""]);
  const [hovering, sethovering] = useState(false);

  useEffect(() => {
    //intial display of data in the map after component is mounted(runs on once)
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
    const geojsonLayer1 = L.geoJson(district);
    map.addLayer(geojsonLayer1);
    geojsonLayer.addData(datatest1).addTo(mcg);
    map.addLayer(cluster);

    // eslint-disable-next-line
  }, []);

  var Icon = L.icon({
    iconUrl: require("../../Assets/backpack.png"),
  }); //icon for position of school

  const cluster = L.markerClusterGroup();

  const map = useMap(); //get map properties

  var osmtogeojson = require("osmtogeojson"); // to convert osm data to geojson

  const datatest1 = osmtogeojson(datatest);

  //convert feature with geometry polygon to point
  //turf is used to calculate center of polygon
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

  //Used for filtering each data to be shown by geojson
  //can be used as sql
  const dataFilter = (feature) => {
    //using regular expression to perform filtering
    const opregex1 = /gove/i;
    const opregex2 = /publ/i;
    const opregex3 = /priv/i;
    const leregex1 = /kind/i;
    const leregex2 = /prim/i;
    const leregex3 = /lowe/i;
    const leregex4 = /seco|high/i;
    var opwhat = false;
    var lewhat = false;

    if (operator === "government") {
      opwhat = opregex1.test(feature.properties.operator);
    } else if (operator === "public") {
      opwhat = opregex2.test(feature.properties.operator);
    } else if (operator === "private") {
      opwhat = opregex3.test(feature.properties.operator);
    }

    if (level === "kindergarten") {
      lewhat = leregex1.test(feature.properties.level);
    } else if (level === "primary") {
      lewhat = leregex2.test(feature.properties.level);
    } else if (level === "lower_secondary") {
      lewhat = leregex3.test(feature.properties.level);
    } else if (level === "higher_secondary") {
      lewhat = leregex4.test(feature.properties.level);
    }

    return (
      feature.properties.name !== undefined &&
      (feature.properties.building_count >= parseInt(building_count) ||
        building_count === "") &&
      (feature.properties.student_count >= parseInt(student_count) ||
        student_count === "") &&
      (opwhat || operator === "") &&
      (lewhat || level === "")
    );
  };

  //when submit button is clicked this refreshes the data in map
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

  //runs when submit button is clicked
  const handleSubmit = (event) => {
    layeradd();
    event.preventDefault();
  };

  //updates states when anyfield in sidenavigator is changed
  const handleChange = (event) => {
    if (event.target.id === "building_count") {
      setbuilding_count(event.target.value);
    } else if (event.target.id === "student_count") {
      setstudent_count(event.target.value);
    } else if (event.target.id === "operator") {
      setOperator(event.target.value);
    } else if (event.target.id === "level") {
      setLevel(event.target.value);
    }
  };

  //to show data about a school when mouse is hovered
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        setMousePosition([e.containerPoint.x, e.containerPoint.y]);
        sethovering(true);
        setfeature(feature);
      },
      mouseout: (e) => {
        sethovering(false);
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
        mousePosition={mousePosition}
        feature={feature}
        hovering={hovering}
      ></SideNavigator>
    </div>
  );
}

export default Cluster;
