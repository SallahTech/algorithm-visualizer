import React from 'react'
import './Node.css'

const Node = props => {
  const {
    isStart,
    isEnd,
    row,
    col,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    isWall,
    isVisited,
  } = props
  const classes = isStart
    ? 'start-node'
    : isWall
    ? 'node-wall'
    : isEnd
    ? 'end-node'
    : isVisited
    ? 'node-visited'
    : ''
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${classes}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  )
}

export default Node
