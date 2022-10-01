const generateRandomWalls = (grid, startNode, endNode) => {
  let walls = []
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (Math.random() < 0.27) {
        if (!grid[row][col].isStart && !grid[row][col].isEnd)
          walls.push([row, col])
      }
    }
  }
  walls.sort(() => Math.random() - 0.5)
  return walls
}

export default generateRandomWalls
