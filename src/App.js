import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SortingVisualizer from "./pages/SortingPage/SortingVisualizer";
import PathFindingVisualizer from "./pages/PathfindingPage/PathFindingVisualizer";
import SideNav from "./components/sidenav/SideNav";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <SideNav isOpen={false} />
        <Switch>

        <Route path="/" exact component={SortingVisualizer} />
        <Route path="/searching" component={PathFindingVisualizer} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
