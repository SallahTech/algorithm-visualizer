import { swap } from '../components/helpers/helpers'

export const bubbleSortAlgorithm = stateArray => {
  const length = stateArray.length
  let arrayCopy = [...stateArray]
  const animations = []

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (arrayCopy[j] > arrayCopy[j + 1]) {
        animations.push([j, j + 1])
        animations.push([j, j + 1])
        // swap numbers
        animations.push([j, arrayCopy[j + 1]])
        animations.push([j + 1, arrayCopy[j]])
        arrayCopy = swap(arrayCopy, j, j + 1)
      }
    }
  }

  return animations
}
