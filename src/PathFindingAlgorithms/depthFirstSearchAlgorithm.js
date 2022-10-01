const depthFirstSearchAlgorithm = (grid, startNode, endNode) => {
  const stack = []
  let path = []
  const visited = []
  stack.push(startNode)

  while (stack.length !== 0) {
    let current = stack.pop()
    if (current.isWall) continue
    if (current === endNode) {
      let temp = current
      path.push(temp)
      while (temp.previous) {
        path.push(temp.previous)
        temp = temp.previous
      }
      return { path, visited }
    }
    visited.push(current)
    current.isVisited = true
    let unVisitedNodesNeighbours = getUnvisitedNodes(current, grid)
    for (let unVisited of unVisitedNodesNeighbours) {
      unVisited.previous = current
      stack.push(unVisited)
    }
  }
}

const getUnvisitedNodes = (current, grid) => {
  let allNeighbours = []
  let { x, y } = current
  if (y !== 0) allNeighbours.push(grid[x][y - 1])
  if (x !== 0) allNeighbours.push(grid[x - 1][y])
  if (y !== grid[0].length - 1) allNeighbours.push(grid[x][y + 1])
  if (x !== grid.length - 1) allNeighbours.push(grid[x + 1][y])
  return allNeighbours.filter(neighbour => !neighbour.isVisited)
}

export default depthFirstSearchAlgorithm
