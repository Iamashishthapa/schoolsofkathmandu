import { React, useState } from "react";
import "./sideNavigator.css";

function SideNavigator(props) {
  const [isNavActive, setNavActive] = useState(false);
  const [isDarkMode, setDarkMode] = useState(true);

  const searchActive = () => {
    setNavActive(true);
  };
  const navClicked = () => {
    setNavActive(!isNavActive);
  };

  const darkModeToggle = () => {
    setDarkMode(!isDarkMode);
  };
  const onMouseEnterHandler = () => {
    props.map.dragging.disable();
  };
  const onMouseLeaveHandler = () => {
    props.map.dragging.enable();
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
                <i
                  className="bx bxs-school bx-md bx-tada-hover"
                  style={{ color: isDarkMode ? "white" : "black" }}
                ></i>
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
                    <i className="bx bx-buildings icon"></i>
                    <input
                      type="text"
                      id="building_count"
                      placeholder="Number of Buildings"
                      value={props.building_count}
                      onChange={props.handleChange}
                    />
                  </li>
                  <li className="search-box">
                    <input type="submit" value="Submit" className="custom" />
                  </li>
                </form>
              </div>

              <ul className="menu-links">
                <li className="nav-link">
                  <a href="#">
                    <i className="bx bx-wallet icon"></i>
                    <span className="text nav-text">Wallets</span>
                  </a>
                </li>
              </ul>
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
