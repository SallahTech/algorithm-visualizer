export const mergeSort = stateArray => {
  let arrayCopy = [...stateArray]
  const animations = []
  //   if (arrayCopy.length <= 1) return arrayCopy
  //   const auxArray = arrayCopy.slice()
  const auxArray = Array(arrayCopy.length)
  mergeSortHelper(arrayCopy, auxArray, 0, arrayCopy.length - 1, animations)
  return animations
}

const mergeSortHelper = (
  arrayCopy,
  auxArray,
  startIndex,
  endIndex,
  animations
) => {
  if (endIndex <= startIndex) return
  //   const middleIndex = Math.floor((startIndex + endIndex) / 2)
  const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2)
  mergeSortHelper(arrayCopy, auxArray, startIndex, middleIndex, animations)
  mergeSortHelper(arrayCopy, auxArray, middleIndex + 1, endIndex, animations)
  mergeArrays(
    arrayCopy,
    auxArray,
    startIndex,
    middleIndex,
    endIndex,
    animations
  )
}

const mergeArrays = (
  arrayCopy,
  auxArray,
  startIndex,
  middleIndex,
  endIndex,
  animations
) => {
  for (let start1 = startIndex; start1 <= endIndex; start1++) {
    auxArray[start1] = arrayCopy[start1]
  }

  //   console.log(auxArray)
  let start = startIndex
  let middle = middleIndex + 1

  for (let i = startIndex; i <= endIndex; i++) {
    if (start <= middleIndex && middle <= endIndex) {
      animations.push([start, middle])
      animations.push([start, middle])
      if (auxArray[start] <= arrayCopy[middle]) {
        animations.push([i, auxArray[start]])
        arrayCopy[i] = auxArray[start++]
      } else {
        animations.push([i, auxArray[middle]])
        arrayCopy[i] = auxArray[middle++]
      }
    } else if (start <= middleIndex) {
      animations.push([i, start])
      animations.push([i, start])
      animations.push([i, auxArray[start]])
      arrayCopy[i] = auxArray[start++]
    } else {
      animations.push([i, middle])
      animations.push([i, middle])
      animations.push([i, auxArray[middle]])
      arrayCopy[i] = auxArray[middle++]
    }
  }
}
