import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { IconButton } from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'
import Bar from '../../components/Sorting-components/Bars/Bar'
import '../../components/Sorting-components/Bars/Bar.css'
import { bubbleSortAlgorithm } from '../../sorting-algorithms/bubbleSort'
import { inSertionSort } from '../../sorting-algorithms/insertionSort'
import { mergeSort } from '../../sorting-algorithms/mergeSort'
import { quickSort } from '../../sorting-algorithms/quickSort'
import { heapSort } from '../../sorting-algorithms/heapSort'
import Header from '../../components/header/Header'

import './SortingVisualizer.css'

// const speed = 20
const SORTED_COLOUR = '#8a2be2'

const SortingVisualizer = () => {
  const [randomArray, setRandomArray] = useState([])
  const [isSorting, setIsSorting] = useState(false)
  const [isSorted, setIsSorted] = useState(false)
  const [numberOfElements, setNumberOfElements] = useState(20)
  const [currentAlgorithm, setCurrentAlgorithm] = useState('bubble sort')
  const [speed, setSpeed] = useState(10)
  const [selectedSpeed, setSelectedSpeed] = useState('Fast')
  const containerRef = useRef(null)

  // list of all the algorithms
  const algorithms = {
    'bubble sort': bubbleSortAlgorithm,
    'insertion sort': inSertionSort,
    'merge sort': mergeSort,
    'quick sort': quickSort,
    'heap sort': heapSort,
  }

  //! Any  time the number of elements change we want to re-render of component
  useEffect(() => {
    //! Generate a new array
    const generateArray = () => {
      if (isSorting) return
      if (isSorted) resetArrayColor()
      setIsSorted(false)
      let array = []

      for (let i = 0; i < numberOfElements; i++) {
        array.push(Math.floor(Math.random() * 390) + 10)
      }
      setRandomArray(array)
    }
    generateArray()
  }, [numberOfElements])

  //! if slider value changes we want to update our numberOfElements to the lastest value
  const sliderHasChange = useCallback(value => {
    setNumberOfElements(value)
  })

  const algorithmHasChange = value => {
    setCurrentAlgorithm(value)
    // console.log(currentAlgorithm)
  }

  //! This is object to configure the slider
  const sliderProps = useMemo(
    () => ({
      min: 5,
      max: 250,
      value: numberOfElements,
      step: 1,
      onChange: e => sliderHasChange(e),
      onClick: e => algorithmHasChange(e),
    }),
    [numberOfElements, currentAlgorithm]
  )

  //! Animate algorithms
  const animateBubbleSort = () => {
    const animations = algorithms[currentAlgorithm](randomArray)
    animateAlgorihms(animations)
  }

  //! This function uses the animations array reurned by an alogrithm to animate the changes happening
  const animateAlgorihms = animations => {
    if (isSorting) return
    setIsSorting(true)
    var colorChange = 0,
      color = 'orange',
      bars = null
    bars = containerRef.current.children
    for (let index = 0; index < animations.length; index++) {
      if (currentAlgorithm === 'bubble sort') {
        colorChange = index % 4 <= 1
        color = index % 4 === 0 ? 'orange' : ' #6299f1'
      } else if (currentAlgorithm === 'merge sort') {
        colorChange = index % 3 !== 2
        color = index % 3 === 0 ? 'orange' : ' #6299f1'
      } else if (currentAlgorithm === 'insertion sort') {
        colorChange = index % 4 <= 1
        color = index % 4 === 0 ? 'orange' : ' #6299f1'
      } else if (currentAlgorithm === 'quick sort') {
        colorChange = index % 4 <= 1
        color = index % 4 === 0 ? 'orange' : ' #6299f1'
      } else if (currentAlgorithm === 'heap sort') {
        colorChange = index % 4 <= 1
        color = index % 4 === 0 ? 'orange' : ' #6299f1'
      }

      if (colorChange) {
        const [index1, index2] = animations[index]
        let currentColor = color
        const barOneStyle = bars[index1].style
        const barTwoStyle = bars[index2].style

        setTimeout(() => {
          barOneStyle.backgroundColor = currentColor
          barTwoStyle.backgroundColor = currentColor
        }, speed * index)
      } else {
        setTimeout(() => {
          const [barOne, newHeight] = animations[index]
          const barOneStyle = bars[barOne].style
          barOneStyle.height = `${newHeight}px`
        }, speed * index)
        setRandomArray(prev => {
          const [k, newValue] = animations
          console.log(k, newValue)
          const newArr = [...prev]
          newArr[k] = newValue
          return newArr
        })
      }
    }

    setTimeout(() => {
      animateSortedArray()
    }, animations.length * speed)
  }

  //! once sorting is done, animate the whole array to a different color
  const animateSortedArray = () => {
    const arrayBars = containerRef.current.children

    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style
      setTimeout(
        () => (arrayBarStyle.backgroundColor = SORTED_COLOUR),
        i * speed
      )
    }
    setTimeout(() => {
      setIsSorted(true)
      setIsSorting(false)
    }, arrayBars.length * speed)
  }

  //! When numberOfElements change or our component rerenders, reset the colors of the array
  function resetArrayColor() {
    const arrayBars = containerRef.current.children
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style
      arrayBarStyle.backgroundColor = ''
    }
  }

  // console.log(heapSort(randomArray))
  const handleSpeedCHange = e => {
    if (e.target.value === 'Slow') {
      setSpeed(100)
      setSelectedSpeed('Slow')
    } else if (e.target.value === 'Medium') {
      setSpeed(50)
      setSelectedSpeed('Medium')
    } else {
      setSpeed(10)
      setSelectedSpeed('Fast')
    }
  }

  return (
    <>
      <Header {...sliderProps}>
        <div className='select-algorithm__control'>
          <select
            className='select'
            name='filter'
            value={selectedSpeed}
            onChange={e => handleSpeedCHange(e)}
          >
            <option value='Slow'>Slow</option>
            <option value='Medium'>Medium</option>
            <option value='Fast'>Fast</option>
          </select>
        </div>
      </Header>
      <section className='container bars card'>
        <div className='array-container' ref={containerRef}>
          {randomArray.map((elem, indx) => (
            <Bar height={elem} key={indx} width={numberOfElements} />
          ))}
        </div>
      </section>
      <section className='icons-container'>
        <IconButton
          onClick={!isSorting ? animateBubbleSort : undefined}
          className='btn'
          width={randomArray.length}
          disabled={isSorting || isSorted}
        >
          <PlayArrow />
        </IconButton>
      </section>
    </>
  )
}

export default SortingVisualizer
{
  /* <div
              className='Bar'
              key={indx}
              style={{
                height: `${elem}px`,
                width: `${width}px`,
              }}
            >
              <span>{numberOfElements <= 10 ? `${elem}` : ''}</span>
            </div> */
}
