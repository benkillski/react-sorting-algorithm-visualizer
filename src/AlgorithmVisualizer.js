import AlgorithmMenu from './AlgorithmMenu';
import {
        getBubbleSortAnimations, 
        getSelectionSortAnimations, 
        getInsertionSortAnimations, 
        getMergeSortAnimations,
        getHeapSortAnimations,
        getQuickSortAnimations,
        getRadixSortAnimations,
        getCountingSortAnimations,
        getBucketSortAnimations,
        getShellSortAnimations
} from "./Algorithms";
import {useState, useEffect, useCallback} from "react";

const ALGORITHM_OPTIONS = [
  "Bubble",
  "Selection",
  "Insertion",
  "Merge",
  "Heap",
  "Quick",
  "Radix",
  "Counting",
  "Bucket",
  "Shell",
  "Comb",
  "Pigeonhole",
  "Cycle",
  "Tim",
  "Cocktail",
  "Bitonic",
  "Pancake",
  "Bogo",
  "Gnome",
  "Stooge",
  "Brick"
];

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'white';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const TERTIARY_COLOR = 'green';

export default function AlgorithmVisualizer() {

    const [mainArray, setMainArray] = useState([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(ALGORITHM_OPTIONS[0]);
    const [isSorting, setIsSorting] = useState(false);

    function generateArray() {
        let array = [];
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(Math.floor(Math.random() * 700) + 1);
        }
        setMainArray(array);
    };

    useEffect(() => {
        generateArray();
    }, []);

    const isSortingHandler = useCallback(() => {
      if(isSorting) 
        setIsSorting(false);

      else
        setIsSorting(true);
    
    }, [isSorting])

    const handleSorting = () => {
      switch (selectedAlgorithm) {
        case 'Bubble':
          bubbleSort();
          break;
        case 'Selection':
          selectionSort();
          break;
        case 'Insertion':
          insertionSort();
          break;
        case 'Merge':
          mergeSort();
          break;
        case 'Quick':
          quickSort();
          break;
        case 'Heap':
          heapSort();
          break;
        default:
          break;
      }
      //isSortingHandler;
    }

    function bubbleSort() {
      const animations = getBubbleSortAnimations(mainArray);

      for (let i = 0; i < animations.length; i++) {   // Loop through all animation steps
        const arrayBars = document.getElementsByClassName('element-bar');   // Get all element bar DOM elements
        //console.log(i);
        const isColorChange = i % 4 !== 2 && i % 4 !== 3;
        //console.log(isColorChange);
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = (i % 2 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }

    function selectionSort() {
      const animations = getSelectionSortAnimations(mainArray);

      var offsetColorChange = 0;
      for (let i = 0; i < animations.length; i++) {   // Loop through all animation steps
        const arrayBars = document.getElementsByClassName('element-bar');   // Get all element bar DOM elements
        if (animations[i] !== -1 && animations[i - 1] !== -1 && animations[i - 2] !== -1) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = (i % 2 === offsetColorChange) ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          if (animations[i] === -1)
          {
            i++;
            
            if (offsetColorChange === 0)
              offsetColorChange = 1;
            else 
              offsetColorChange = 0;
          }

          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }

    function insertionSort() {
      const animations = getInsertionSortAnimations(mainArray);

      for (let i = 0; i < animations.length; i++) {   // Loop through all animation steps
        const arrayBars = document.getElementsByClassName('element-bar');   // Get all element bar DOM elements
        if (animations[i][2] === "compare") {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = animations[i + 1][2] === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }

    function mergeSort() {
      const animations = getMergeSortAnimations(mainArray);

      for (let i = 0; i < animations.length; i++) {   // Loop through all animation steps
        const arrayBars = document.getElementsByClassName('element-bar');   // Get all element bar DOM elements
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }

    function heapSort() {
      const animations = getHeapSortAnimations(mainArray);
      console.log(animations);

      for (let i = 0; i < animations.length; i++) {   // Loop through all animation steps
        const arrayBars = document.getElementsByClassName('element-bar');   // Get all element bar DOM elements
        const isColorChange = animations[i][2] === "compare" || animations[i][2] === "uncompare";
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i].slice(0, 2);
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = animations[i][2] === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i].slice(0, 2);
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }

    function quickSort() {
      const animations = getQuickSortAnimations(mainArray);
      console.log(animations);

      for (let i = 0; i < animations.length; i++) {   // Loop through all animation steps
        const arrayBars = document.getElementsByClassName('element-bar');   // Get all element bar DOM elements
        const isColorChange = animations[i][2] === "compare" || animations[i][2] === "uncompare";
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i].slice(0, 2);
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = animations[i][2] === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i].slice(0, 2);
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }

    //TODO: NEED TO FINISH
    function radixSort() {
      const animations = getRadixSortAnimations(mainArray);
    }

    //TODO: NEED TO FINISH
    function countingSort() {
      const animations = getCountingSortAnimations(mainArray);
    }

    function bucketSort() {
      const animations = getBucketSortAnimations(mainArray);
    }

    function shellSort() {
      const animations = getShellSortAnimations(mainArray);
    }

    function combSort() {
        
    }

    function pigeonholeSort() {

    }

    function cycleSort() {
        
    }

    function timSort() {

    }

    function cocktailSort() {
        
    }

    function bitonicSort() {

    }

    function pancakeSort() {
        
    }

    function bogoSort() {

    }

    function gnomeSort() {
        
    }

    function stoogeSort() {

    }

    function brickSort() {
        
    }

    return (
    <>
      <div id="array-container">
          {mainArray.map((value, idx) => (
              <div className="element-bar" key={idx} style={{height: `${value}px`, width: `${5}px`}}>
              </div>
          ))}
      </div>
      <AlgorithmMenu 
        algorithmOptions={ALGORITHM_OPTIONS} 
        generateArray={generateArray} 
        array={mainArray} 
        selectedAlgorithm={selectedAlgorithm} 
        setSelectedAlgorithm={setSelectedAlgorithm} 
        sortFunction={handleSorting} 
        isSorting={isSorting}
        setIsSorting={setIsSorting}
      />
    </>
  );
}