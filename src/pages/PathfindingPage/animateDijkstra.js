export const animateDijkstra = (clearVisited, visited, path) => {
  console.log('iNSIDE ANIMATE DIJKSTRA')
  for (let i = 1; i < visited.length; i++) {
    if (i === visited.length - 1) {
      setTimeout(() => {
        animateShortestPath(path)
      }, 50 * i)
      return
    } else {
      setTimeout(() => {
        const node = visited[i]
        document.getElementById(`node-${node.x}-${node.y}`).className =
          'node visited-node'
      }, 50 * i)
    }
  }
}

const animateShortestPath = shortestPath => {
  for (let i = 1; i < shortestPath.length - 1; i++) {
    setTimeout(() => {
      const node = shortestPath[i]
      document.getElementById(`node-${node.x}-${node.y}`).className =
        'node shortest-path-nodes'
    }, 50 * i)
  }
}
