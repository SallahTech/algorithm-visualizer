import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import SortingVisualizer from "./pages/SortingPage/SortingVisualizer";
import PathFindingVisualizer from "./pages/PathfindingPage/PathFindingVisualizer";
import SideNav from "./components/sidenav/SideNav";
import "./App.css";

const App = () => {
  // const [showNav, setShowNav] = useState(false);

  return (
    <div className="App">
      <Router>
        <SideNav isOpen={false} />
        <Route path="/" exact component={SortingVisualizer} />

        <Route path="/searching" component={PathFindingVisualizer} />
      </Router>
    </div>
  );
};

export default App;
