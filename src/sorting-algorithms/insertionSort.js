import { swap } from '../components/helpers/helpers'

export const inSertionSort = stateArray => {
  const arrayCopy = [...stateArray]
  const animations = []

  for (let i = 1; i < arrayCopy.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arrayCopy[j + 1] < arrayCopy[j]) {
        animations.push([j, j + 1])
        animations.push([j, j + 1])
        animations.push([j, arrayCopy[j + 1]])
        animations.push([j + 1, arrayCopy[j]])
        swap(arrayCopy, j, j + 1)
      } else break
    }
  }
  return animations
}
