import { React, useState } from "react";
import "./sideNavigator.css";
import L from "leaflet";

function SideNavigator(props) {
  const [isNavActive, setNavActive] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  const searchActive = () => {
    setNavActive(true);
  };
  const navClicked = () => {
    setNavActive(!isNavActive);
  };

  const darkModeToggle = () => {
    props.map.eachLayer(function (layer) {
      if (layer.options.attribution !== null) {
        props.map.removeLayer(layer);
      }
    });
    var mapa1 = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      }
    );
    if (!isDarkMode) {
      mapa1 = L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }
      );
    }
    setDarkMode(!isDarkMode);
    mapa1.addTo(props.map);
  };
  const onMouseEnterHandler = () => {
    props.map.dragging.disable();
    props.map.doubleClickZoom.disable();
  };
  const onMouseLeaveHandler = () => {
    props.map.dragging.enable();
    props.map.doubleClickZoom.enable();
  };

  return (
    <div className={`body  ${isDarkMode ? "dark" : ""}`}>
      <div className="form">
        <nav
          className={`sidebar ${isNavActive ? "" : "close"}`}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        >
          <header>
            <div className="image-text">
              <span className="image">
                <i style={{ color: isDarkMode ? "white" : "black" }}>
                  <img
                    src={require("../../Assets/school.png")}
                    alt="student"
                  ></img>
                </i>
              </span>

              <div className="text logo-text">
                <span className="name">Schools</span>
                <span className="profession">In Kathmandu</span>
              </div>
            </div>

            <i className="bx bx-chevron-right toggle" onClick={navClicked}></i>
          </header>

          <div className="menu-bar">
            <div className="menu">
              <div>
                <form onSubmit={props.handleSubmit} autoComplete="off">
                  <li className="nav-link">
                    <span className="text nav-text">Number of Students</span>
                  </li>
                  <li className="search-box">
                    <input
                      id="student_count"
                      type="range"
                      min="0"
                      max="6000"
                      value={
                        props.student_count === "" ? 0 : props.student_count
                      }
                      step="1"
                      onChange={props.handleChange}
                    />
                  </li>
                  <li className="search-box" onClick={searchActive}>
                    <i className="icon">
                      <img
                        src={require("../../Assets/students.png")}
                        alt="student"
                      ></img>
                    </i>
                    <input
                      type="text"
                      id="student_count"
                      placeholder="Number of Students"
                      value={props.student_count}
                      onChange={props.handleChange}
                    />
                  </li>
                  <li className="nav-link">
                    <span className="text nav-text">Number of Buildings</span>
                  </li>
                  <li className="search-box">
                    <input
                      id="building_count"
                      type="range"
                      min="0"
                      max="26"
                      value={
                        props.building_count === "" ? 0 : props.building_count
                      }
                      step="1"
                      onChange={props.handleChange}
                    />
                  </li>
                  <li className="search-box" onClick={searchActive}>
                    <i className="icon">
                      <img
                        src={require("../../Assets/schoolbuilding.png")}
                        alt="student"
                      ></img>
                    </i>
                    <input
                      type="text"
                      id="building_count"
                      placeholder="Number of Buildings"
                      value={props.building_count}
                      onChange={props.handleChange}
                    />
                  </li>
                  <ul className="menu-links">
                    <li className="nav-link">
                      <span className="text nav-text">Operator Type</span>
                    </li>
                    <li className="search-box">
                      <select
                        id="operator"
                        className="selectid"
                        onChange={props.handleChange}
                      >
                        <option value="" selected></option>
                        <option value="government">Government</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </li>
                  </ul>
                  <li className="search-box">
                    <input type="submit" value="Submit" className="custom" />
                  </li>
                </form>
              </div>
            </div>

            <div className="bottom-content">
              <li className="mode">
                <div className="sun-moon">
                  <i className="bx bx-sun icon sun"></i>
                  <i className="bx bx-moon icon moon"></i>
                </div>
                <span className="mode-text text">
                  {isDarkMode ? <div>Dark Mode</div> : <div>Light Mode</div>}
                </span>

                <div className="toggle-switch" onClick={darkModeToggle}>
                  <span className="switch"></span>
                </div>
              </li>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default SideNavigator;
