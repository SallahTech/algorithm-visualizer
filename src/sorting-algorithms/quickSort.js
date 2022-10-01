export const quickSort = stateArray => {
  const animations = []
  const copy = stateArray.slice()
  quickSortHelper(copy, 0, copy.length - 1, animations)
  return animations
  //   return copy
}

const quickSortHelper = (
  array,
  left = 0,
  right = array.length - 1,
  animations
) => {
  if (left >= right) {
    return
  }
  if (left < right) {
    let pivotIndex = pivot(array, left, right, animations)
    // LEFT SIDE OF THE ARRAY
    quickSortHelper(array, left, pivotIndex - 1, animations)
    // RIGHT SIDE OF THE ARRAY
    quickSortHelper(array, pivotIndex + 1, right, animations)
  }
}

const pivot = (array, start = 0, end = array.length + 1, animations) => {
  const swap = (array, i, j) => {
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  // we are assuming the pivot is always the first element
  // let pivotValue = array[start]
  let pivotIndex = start
  let swapIndex = start

  for (let i = start + 1; i <= end; i++) {
    if (array[pivotIndex] > array[i]) {
      swapIndex++
      animations.push([start, i])
      animations.push([start, i])
      animations.push([i, array[swapIndex]])
      animations.push([swapIndex, array[i]])
      swap(array, swapIndex, i)
    }
  }
  // swap the pivot from the start swapPoint
  animations.push([pivotIndex, swapIndex])
  animations.push([pivotIndex, swapIndex])
  animations.push([pivotIndex, array[swapIndex]])
  animations.push([swapIndex, array[pivotIndex]])
  swap(array, pivotIndex, swapIndex)
  return swapIndex
}
