export const animateAlgorithms = (
  handleIsVisualizing,
  visited,
  path,
  speed
) => {
  handleIsVisualizing(true)

  for (let i = 1; i < visited.length; i++) {
    if (i === visited.length - 1) {
      setTimeout(() => {
        animateShortestPath(path, speed)
      }, i * speed)
      handleIsVisualizing(false)
      return
    } else {
      setTimeout(() => {
        const node = visited[i]
        document.getElementById(`node-${node.x}-${node.y}`).className =
          'node visited-node'
      }, i * speed)
    }
  }
}

const animateShortestPath = (shortestPath, speed) => {
  for (let i = 1; i < shortestPath.length - 1; i++) {
    setTimeout(() => {
      const node = shortestPath[i]
      document.getElementById(`node-${node.x}-${node.y}`).className =
        'node shortest-path-nodes'
    }, i * (2 * speed))
  }
}
