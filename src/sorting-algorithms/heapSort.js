import { swap } from '../components/helpers/helpers'

export const heapSort = stateArray => {
  const animations = []
  let randomArray = [...stateArray]
  let length = randomArray.length
  let lastParentNode = Math.floor(length / 2 - 1)
  let lastChild = length - 1

  while (lastParentNode >= 0) {
    heapify(randomArray, length, lastParentNode, animations)
    lastParentNode--
  }

  while (lastChild > 0) {
    animations.push([0, lastChild])
    animations.push([0, lastChild])
    animations.push([0, randomArray[lastChild]])
    animations.push([lastChild, randomArray[0]])
    swap(randomArray, lastChild, 0)
    heapify(randomArray, lastChild, 0, animations)
    lastChild--
  }

  return animations
}

const heapify = (array, length, parentIndex, animations) => {
  let max = parentIndex
  let left = parentIndex * 2 + 1
  let right = left + 1

  if (left < length && array[left] > array[max]) {
    animations.push([left, max])
    animations.push([left, max])
    animations.push([0, array[0]])
    animations.push([0, array[0]])
    max = left
  }

  if (right < length && array[right] > array[max]) {
    animations.push([right, max])
    animations.push([right, max])
    animations.push([0, array[0]])
    animations.push([0, array[0]])
    max = right
  }

  if (max !== parentIndex) {
    animations.push([parentIndex, max])
    animations.push([parentIndex, max])
    animations.push([parentIndex, array[max]])
    animations.push([max, array[parentIndex]])
    swap(array, parentIndex, max)
    heapify(array, length, max, animations)
  }

  return array
}
