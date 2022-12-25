import React from "react";
import { Link } from "react-router-dom";
import { FcMindMap } from "react-icons/fc";
import { GiNetworkBars } from "react-icons/gi";
import "./SideNav.css";

const SideNav = ({ isOpen }) => {
  return (
    <div className={isOpen ? "sidenav active" : "sidenav"}>
      <ul>
        <li>
          <Link to="/">
            <GiNetworkBars className="searching-icon" />
            Sorting Visualizer
          </Link>
        </li>{" "}
        <li>
          <Link to="/searching">
            <FcMindMap className="searching-icon" /> PathFinding Visualizer
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
