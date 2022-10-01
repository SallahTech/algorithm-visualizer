import React from "react";
import "./Bar.css";

const Bar = ({ height, width }) => {
  let widthStyle;
  if (width <= 20) {
    widthStyle = 35;
  } else if (width <= 30) {
    widthStyle = 20;
  } else if (width <= 60) {
    widthStyle = 7;
  } else {
    widthStyle = 4;
  }

  const styles = {
    height: height,
    width: widthStyle,
    color: "#fff",
  };

  return (
    <div className="Bar" style={styles}>
      <span>{width <= 20 ? `${height}` : ""}</span>
    </div>
  );
};

export default Bar;
