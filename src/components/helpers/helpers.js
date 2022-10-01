export const swap = (array, firstIndex, secondIndex) => {
  let temp = array[firstIndex]
  array[firstIndex] = array[secondIndex]
  array[secondIndex] = temp
  return array
}
