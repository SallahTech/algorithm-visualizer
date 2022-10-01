import React, { useState, useEffect } from "react";
import astarAlgorithm from "../../PathFindingAlgorithms/astarAlgorithm";
import Node from "../../components/node/Node";
import { animateAlgorithms, visualizeAstar } from "./animateAstar";
import dijkstraAlgorithm from "../../PathFindingAlgorithms/dijkstraAlgorithm";
import breadFirstSearchAlgorithm from "../../PathFindingAlgorithms/breadFirstSearchAlgorithm";
import depthFirstSearchAlgorithm from "../../PathFindingAlgorithms/depthFirstSearchAlgorithm";
import generateRandomWalls from "../../mazeGenerator/generateMaze";
import { animateDijkstra } from "./animateDijkstra";
import Header from "../../components/header/Header";
import "./PathFindingVisualizer.css";

const cols = 55;
const rows = 25;
const SOURCE_COL = Math.floor(Math.random() * (cols - 1));
const SOURCE_ROW = Math.floor(Math.random() * (rows - 1));
const DESTINATION_COL = Math.floor(Math.random() * (cols - 1));
const DESTINATION_ROW = Math.floor(Math.random() * (rows - 1));

const PathFindingVisualizer = () => {
  const [Grid, setGrid] = useState([]);
  const [mousePressed, setMousePressed] = useState(false);
  const [clearVisitedNodes, setClearVisitedNodes] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState("Dijkstra");
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [title, setTitle] = useState("PathFinding Visualizer");
  const [speed, setSpeed] = useState(10);
  const [selectedSpeed, setSelectedSpeed] = useState("Fast");

  useEffect(() => {
    initializeGrid();
    if (clearVisitedNodes) {
      initializeGrid();
    }
    console.log("re-rendering");
  }, [clearVisitedNodes]);

  const initializeGrid = () => {
    const grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }
    createNode(grid);
    setGrid(grid);
    addNeighbours(grid);
  };

  const mousedownHandler = (row, col) => {
    const newGrid = generateGridWithWalls(Grid, row, col);
    setGrid(newGrid);
    setMousePressed(true);
  };

  const mouseEnterHandler = (row, col) => {
    if (!mousePressed) return;
    const newGrid = generateGridWithWalls(Grid, row, col);
    setGrid(newGrid);
  };

  const mouseupHandler = () => {
    setMousePressed(false);
  };

  const handleSpeedCHange = (e) => {
    if (e.target.value === "Slow") {
      setSpeed(60);
      setSelectedSpeed("Slow");
    } else if (e.target.value === "Medium") {
      setSpeed(30);
      setSelectedSpeed("Medium");
    } else {
      setSpeed(10);
      setSelectedSpeed("Fast");
    }
  };

  //! function to turn a node as a walls when the node is click
  const generateGridWithWalls = (Grid, row, col) => {
    const newGrid = [...Grid];

    const node = Grid[row][col];
    node.isWall = !node.isWall;
    const newNode = {
      ...node,
    };
    console.log(newNode);
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const generateGridWithMaze = (grid, walls) => {
    // clearWalls(grid)
    clearGrid();
    const newGrid = [...grid];
    for (let wall of walls) {
      let node = grid[wall[0]][wall[1]];
      node.isWall = true;
      let newNode = {
        ...node,
      };
      newGrid[wall[0]][wall[1]] = newNode;
    }
    return newGrid;
  };

  const clearWalls = (grid = Grid) => {
    let newGrid = [...grid];
    for (let row of newGrid) {
      for (let node of row) {
        const { x, y } = node;
        node.isWall = false;
        let newNode = {
          ...node,
        };
        newGrid[x][y] = newNode;
      }
    }
    setGrid(newGrid);
  };

  const clearGrid = () => {
    if (isVisualizing) {
      return;
    }

    let newGrid = [...Grid];
    for (let row = 0; row < newGrid.length; row++) {
      for (let col = 0; col < newGrid[0].length; col++) {
        newGrid[row][col].isVisited = false;
        if (
          !(
            (row === SOURCE_ROW && col === SOURCE_COL) ||
            (row === DESTINATION_ROW && col === DESTINATION_COL) ||
            newGrid[row][col].isWall
          )
        ) {
          const node = document.getElementById(`node-${row}-${col}`);
          if (node.classList.contains("visited-node")) {
            node.className = "node";
          }
          if (node.classList.contains("shortest-path-nodes")) {
            node.className = "node";
          }
        }
      }
    }

    setGrid(newGrid);
  };

  const handleIsVisualizing = (visualizing) => {
    setIsVisualizing(visualizing);
  };
  const createNode = (grid) => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid[row][col] = new Spot(row, col);
      }
    }
  };

  //add neighbours
  const addNeighbours = (grid) => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid[row][col].addNeighbours(grid);
      }
    }
  };

  function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === SOURCE_ROW && this.y === SOURCE_COL;
    this.isEnd = this.x === DESTINATION_ROW && this.y === DESTINATION_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.distance = Infinity;
    this.isVisited = false;
    this.neighbours = [];
    this.previous = undefined;
    this.isWall = false;

    this.addNeighbours = function (grid) {
      let i = this.x;
      let j = this.y;
      if (i > 0) this.neighbours.push(grid[i - 1][j]);
      if (i < rows - 1) this.neighbours.push(grid[i + 1][j]);
      if (j > 0) this.neighbours.push(grid[i][j - 1]);
      if (j < cols - 1) this.neighbours.push(grid[i][j + 1]);
      // for diagonal traversing
      if (i > 0 && j > 0) this.neighbours.push(grid[i - 1][j - 1]);
      if (i < rows - 1 && j > 0) this.neighbours.push(grid[i + 1][j - 1]);
      if (i > 0 && j < cols - 1) this.neighbours.push(grid[i - 1][j + 1]);
      if (i < rows - 1 && j < cols - 1)
        this.neighbours.push(grid[i + 1][j + 1]);
    };
  }

  const gridWithNode = (
    <div>
      {Grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row-wrapper">
          {row.map((col, colIndex) => {
            const { isStart, isEnd, isWall, isVisited } = col;
            return (
              <Node
                key={colIndex}
                isStart={isStart}
                isEnd={isEnd}
                row={rowIndex}
                col={colIndex}
                isWall={isWall}
                isVisited={isVisited}
                mousePressed={mousePressed}
                onMouseDown={(row, col) => mousedownHandler(row, col)}
                onMouseEnter={(row, col) => mouseEnterHandler(row, col)}
                onMouseUp={() => mouseupHandler()}
              />
            );
          })}
        </div>
      ))}
    </div>
  );

  // ! Visualize the A* algorithm
  const visualizeAstar = (handleIsVisualizing) => {
    if (isVisualizing) {
      return;
    }
    clearGrid();
    setCurrentAlgorithm("A*");
    setTitle(`You're currently visualizing `);
    const startNode = Grid[SOURCE_ROW][SOURCE_COL];
    const endNode = Grid[DESTINATION_ROW][DESTINATION_COL];
    let { path, visited } = astarAlgorithm(startNode, endNode);
    if (!path) {
      alert("No Path found");
      return;
    } else {
      animateAlgorithms(handleIsVisualizing, visited, path, speed);
    }
  };

  // ! Visualize the dijkstra algorithm
  const visualizeDijkstra = (handleIsVisualizing) => {
    if (isVisualizing) {
      return;
    }
    clearGrid();
    setCurrentAlgorithm("DIJKSTRA");
    setTitle(`You're currently visualizing `);
    const startNode = Grid[SOURCE_ROW][SOURCE_COL];
    const endNode = Grid[DESTINATION_ROW][DESTINATION_COL];
    let { path, visited } = dijkstraAlgorithm(Grid, startNode, endNode);
    if (!path) {
      alert("No Path found");
      return;
    } else {
      animateAlgorithms(handleIsVisualizing, visited, path, speed);
    }
  };

  // ! Visualize the BFS algorithm
  const visualizeBFS = (handleIsVisualizing) => {
    if (isVisualizing) {
      return;
    }
    clearGrid();
    setCurrentAlgorithm("BFS");
    setTitle(`You're currently visualizing `);
    const startNode = Grid[SOURCE_ROW][SOURCE_COL];
    const endNode = Grid[DESTINATION_ROW][DESTINATION_COL];
    let { path, visited } = breadFirstSearchAlgorithm(startNode, endNode);
    if (!path) {
      alert("No Path found");
      return;
    } else {
      animateAlgorithms(handleIsVisualizing, visited, path, speed);
      // alert('A Path Was found')
    }
  };

  // ! Visualize the DFS algorithm
  const visualizeDFS = (handleIsVisualizing) => {
    if (isVisualizing) {
      return;
    }
    clearGrid();
    setCurrentAlgorithm("DFS");
    setTitle(`You're currently visualizing `);
    const startNode = Grid[SOURCE_ROW][SOURCE_COL];
    const endNode = Grid[DESTINATION_ROW][DESTINATION_COL];
    let { path, visited } = depthFirstSearchAlgorithm(Grid, startNode, endNode);
    if (!path) {
      alert("No Path found");
      return;
    } else {
      animateAlgorithms(handleIsVisualizing, visited, path, speed);
    }
  };

  const animateWalls = (walls) => {
    for (let i = 0; i <= walls.length; i++) {
      if (i === walls.length) {
        setTimeout(() => {
          clearGrid();
          let newGrid = generateGridWithMaze(Grid, walls);
          setGrid(newGrid);
        }, i * speed);
        return;
      }

      let wall = walls[i];
      let node = Grid[wall[0]][wall[1]];
      setTimeout(() => {
        //Walls
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-wall";
      }, i * speed);
    }
  };

  const generateMaze = () => {
    if (isVisualizing) {
      return;
    }
    setTimeout(() => {
      const grid = [...Grid];
      const startNode = grid[SOURCE_ROW][SOURCE_COL];
      const endNode = grid[DESTINATION_ROW][DESTINATION_COL];
      const walls = generateRandomWalls(grid, startNode, endNode);
      animateWalls(walls);
    }, speed);
  };

  const algorithmChangeHandler = (selectedValue) => {
    setCurrentAlgorithm(selectedValue);
  };

  const headerProps = {
    onChange: (e) => algorithmChangeHandler(e),
    onClick: (e) => null,
    selected: currentAlgorithm,
  };

  return (
    <>
      <Header {...headerProps}>
        <div className="buttons">
          <div className="select-algorithm__control">
            <select
              className="select"
              name="filter"
              value={selectedSpeed}
              onChange={(e) => handleSpeedCHange(e)}
            >
              <option value="Slow">Slow</option>
              <option value="Medium">Medium</option>
              <option value="Fast">Fast</option>
            </select>
          </div>
          <button className="button" id="clear-grid" onClick={clearGrid}>
            Clear Grid
          </button>
          <button className="button" id="clear-grid" onClick={generateMaze}>
            Generate Walls
          </button>
          <button
            className="button"
            onClick={() => {
              visualizeAstar(handleIsVisualizing);
            }}
          >
            {/* Visualize <span></span> */}
            A* Algorithm
          </button>
          <button
            className="button"
            onClick={() => {
              visualizeDijkstra(handleIsVisualizing);
            }}
          >
            Dijkstra
          </button>
          <button
            className="button"
            onClick={() => {
              visualizeBFS(handleIsVisualizing);
            }}
          >
            BFS
          </button>
          <button
            className="button"
            onClick={() => {
              visualizeDFS(handleIsVisualizing);
            }}
          >
            DFS
          </button>
        </div>
      </Header>
      <div className="wrapper">
        {title === "PathFinding Visualizer" ? (
          <h1>{title} </h1>
        ) : (
          <h1>
            {title} {currentAlgorithm} Algorithm
          </h1>
        )}

        {gridWithNode}
      </div>
    </>
  );
};

export default PathFindingVisualizer;
