import React, { useEffect } from "react";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    axios
      .get(
        "https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%28node%5B%22amenity%22%3D%22school%22%5D%2827%2E643693988353%2C85%2E23021697998%2C27%2E761633678858%2C85%2E404281616211%29%3Bway%5B%22amenity%22%3D%22school%22%5D%2827%2E643693988353%2C85%2E23021697998%2C27%2E761633678858%2C85%2E404281616211%29%3Brelation%5B%22amenity%22%3D%22school%22%5D%2827%2E643693988353%2C85%2E23021697998%2C27%2E761633678858%2C85%2E404281616211%29%3B%29%3Bout%3B%3E%3Bout%20skel%20qt%3B%0A"
      )
      .then((res) => {
        // console.log(res.data.elements);
        console.log("fetched");
      });
  }, []);

  return <div></div>;
};

export default Home;
