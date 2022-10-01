import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import SideNav from "../sidenav/SideNav";
import "./Header.css";

const Header = (props) => {
  const { onChange, value, min, max, step, onClick, selected, children } =
    props;
  const [rangeValue, setRangeValue] = useState(10);
  const [algorithm, setAlgorithm] = useState("bubble sort");
  const [mouseState, setMouseState] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setRangeValue(value);
    onClick(algorithm);
  }, [value, algorithm]);

  useEffect(() => {
    if (mouseState === "up") {
      onChange(rangeValue);
    }
  }, [mouseState, rangeValue]);

  const changeSlider = (e) => {
    setRangeValue(e.target.value);
  };

  const changeAlgorithm = (e) => {
    console.log(e.target.attributes.algorithm.value);
    setAlgorithm(e.target.attributes.algorithm.value);
  };

  const dropdownChangeHandler = (e) => {
    console.log(e.target.value);
    onChange(e.target.value);
  };

  const navigation =
    window.location.pathname === "/" ? (
      <nav className="nav">
        <GiHamburgerMenu
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        />
        <div className="logo">
          <a href="/" className="header-logo">
            PathSav
          </a>
        </div>
        {children}
        <div className="range">
          <div className="sliderValue">
            <span>{rangeValue}</span>
          </div>

          <div className="field">
            <div className="value left">0</div>
            <input
              type="range"
              min={min}
              max={max}
              value={rangeValue}
              steps={step}
              onChange={changeSlider}
              onMouseDown={() => setMouseState("down")}
              onMouseUp={() => setMouseState("up")}
            />
            <div className="value right">{max}</div>
          </div>
        </div>

        <div className="items-container">
          <div
            className="navbar-item"
            tabIndex="1"
            algorithm="bubble sort"
            onClick={changeAlgorithm}
          >
            Bubble Sort
          </div>
          <div
            className="navbar-item"
            tabIndex="2"
            algorithm="insertion sort"
            onClick={changeAlgorithm}
          >
            Insertion Sort
          </div>
          <div
            className="navbar-item"
            tabIndex="3"
            algorithm="merge sort"
            onClick={changeAlgorithm}
          >
            Merge Sort
          </div>
          <div
            className="navbar-item"
            tabIndex="4"
            algorithm="quick sort"
            onClick={changeAlgorithm}
          >
            Quick Sort
          </div>
          <div
            className="navbar-item"
            tabIndex="5"
            algorithm="heap sort"
            onClick={changeAlgorithm}
          >
            Heap Sort
          </div>
        </div>
      </nav>
    ) : (
      <nav className="nav pathfinding-nav">
        <GiHamburgerMenu
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        />
        <div className="logo">
          <a href="/searching" className="header-logo">
            PathSav
          </a>
        </div>
        {/* <div className='select-algorithm__control'>
          {/* <label htmlFor='filter'>Algorithms</label> }
          <select
            className='select'
            name='filter'
            value={selected}
            onChange={dropdownChangeHandler}
          >
            <option value='A*'>A*</option>
            <option value='Dijkstra'>Dijkstra</option>
            <option value='BFS'>BFS</option>
            <option value='DFS'>DFS</option>
          </select>
        </div> */}
        {children}
      </nav>
    );
  // console.log(window.location.pathname)
  return (
    <>
      <header>{navigation}</header>
      <SideNav isOpen={isOpen} />
    </>
  );
};

export default Header;
