const breadFirstSearchAlgorithm = (startNode, endNode) => {
  let queue = []

  const path = []
  let visited = []
  visited[startNode] = true
  queue.push(startNode)

  while (queue.length > 0) {
    let current = queue.shift()
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
    let neighbours = current.neighbours
    for (let i = 0; i < neighbours.length - 1; i++) {
      console.log('FOOR LOOP RUNNING')
      let neighbour = neighbours[i]
      if (!neighbour.isVisited && !neighbour.isWall) {
        neighbour.isVisited = true
        queue.push(neighbour)
        neighbour.previous = current
      }
    }
  }
}

export default breadFirstSearchAlgorithm
