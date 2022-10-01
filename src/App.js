import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SortingVisualizer from './pages/SortingPage/SortingVisualizer'
import PathFindingVisualizer from './pages/PathfindingPage/PathFindingVisualizer'
import SideNav from './components/sidenav/SideNav'
import './App.css'

const App = () => {
  const [showNav, setShowNav] = useState(false)

  const shouldNavShow = navOpen => {
    setShowNav(navOpen)
  }
  return (
    <div className='App'>
      <Router>
        <SideNav isOpen={showNav} />
        <Route path='/' exact component={SortingVisualizer} />

        <Route path='/searching' component={PathFindingVisualizer} />
      </Router>
    </div>
  )
}

export default App
