const dijkstraAlgorithm = (grid, startNode, endNode) => {
  const visited = []
  visited[startNode] = true
  const path = []
  startNode.distance = 0

  const unVisited = []
  for (let row of grid) {
    for (let node of row) {
      unVisited.push(node)
    }
  }
  while (unVisited.length > 0) {
    sortNodesByDistance(unVisited)
    let nearestNeighbour = unVisited.shift()
    if (nearestNeighbour.isWall) continue
    if (nearestNeighbour.distance === Infinity) return visited
    nearestNeighbour.isVisited = true
    visited.push(nearestNeighbour)
    if (nearestNeighbour === endNode) {
      let temp = endNode
      while (temp !== undefined) {
        path.push(temp)
        temp = temp.previous
      }
      return { path, visited }
    }

    updateUnvisitedNeighbours(nearestNeighbour, grid)
  }
}

const sortNodesByDistance = unvisited => {
  unvisited.sort((a, b) => a.distance - b.distance)
}

const updateUnvisitedNeighbours = (nearestNeighbour, grid) => {
  let unvisited = getUnvisitedNeighbours(nearestNeighbour, grid)
  for (let unvisitedNeighbour of unvisited) {
    unvisitedNeighbour.distance = nearestNeighbour.distance + 1
    unvisitedNeighbour.previous = nearestNeighbour
  }
}

const getUnvisitedNeighbours = (node, grid) => {
  let neighbours = []
  let { x, y } = node
  console.log(x, y)
  if (x !== 0) neighbours.push(grid[x - 1][y])
  if (y !== grid[0].length - 1) neighbours.push(grid[x][y + 1])
  if (x !== grid.length - 1) neighbours.push(grid[x + 1][y])
  if (y !== 0) neighbours.push(grid[x][y - 1])

  return neighbours
    .filter(neighbour => !neighbour.isWall)
    .filter(neighbour => !neighbour.isVisited)
}
export default dijkstraAlgorithm
