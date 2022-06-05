import "./result.css";

function Result(props) {
  var resultClass = null;
  var resultDiv = null;
  var mode = null;
  if (props.hovering) {
    if (props.isDarkMode) {
      mode = "dark";
    } else {
      mode = "light";
    }
    if (props.mousePosition[0] < 777 && props.mousePosition[1] < 400) {
      resultClass = "topleft";
    } else if (props.mousePosition[0] < 777 && props.mousePosition[1] > 400) {
      resultClass = "bottomleft";
    } else if (props.mousePosition[0] >= 777 && props.mousePosition[1] < 400) {
      if (props.isNavActive) {
        resultClass = "toprightactive";
      } else {
        resultClass = "toprightdisactive";
      }
    } else {
      if (props.isNavActive) {
        resultClass = "bottomrightactive";
      } else {
        resultClass = "bottomrightdisactive";
      }
    }

    resultDiv = (
      <div className={`result ${mode} ${resultClass}`}>
        <p className="school">{props.feature.properties.name.toUpperCase()} </p>
        <p className="block">
          <img
            className="icon1"
            src={require("../../Assets/students.png")}
            alt="student"
          ></img>
          <p className="space">
            {props.feature.properties.student_count === undefined
              ? "NOT AVAILABLE"
              : props.feature.properties.student_count}
          </p>
        </p>
        <p className="block">
          <img
            className="icon1"
            src={require("../../Assets/schoolbuilding.png")}
            alt="student"
          ></img>

          <p className="space">
            {props.feature.properties.building_count === undefined
              ? "NOT AVAILABLE"
              : props.feature.properties.building_count}
          </p>
        </p>
        <p className="text1 block">
          OPERATOR TYPE:
          <p className="space">
            {props.feature.properties.operator === undefined
              ? "NOT AVAILABLE"
              : props.feature.properties.operator.toUpperCase()}
          </p>
        </p>
        <p className="text1 block">
          LEVEL:
          <p className="space">
            {props.feature.properties.level === undefined
              ? "NOT AVAILABLE"
              : props.feature.properties.level.toUpperCase()}
          </p>
        </p>
      </div>
    );
  }

  return <div> {resultDiv} </div>;
}
export default Result;
