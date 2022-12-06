import {useState, useEffect} from "react";
import AlgorithmMenu from './AlgorithmMenu';
import { getMergeSortAnimations } from "./Algorithms";

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
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'white';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default function AlgorithmVisualizer(props) {

    const [mainArray, setMainArray] = useState([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState([ALGORITHM_OPTIONS[0]]);

    function generateArray() {
        let array = [];
        for(let i = 0; i < 200; i++) {
            array.push(Math.floor(Math.random() * 800) + 1);
        }
        setMainArray(array);
    };

    useEffect(() => {
        generateArray();
    }, []);

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
    }

    function bubbleSort() {
    }

    function selectionSort() {
        
    }

    function mergeSort() {
        console.log("merger sort ran");
        const animations = getMergeSortAnimations(mainArray);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('element-bar');
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

    function insertionSort() {
    }

    function heapSort() {
        
    }

    function quickSort() {

    }

    function radixSort() {
        
    }

    function countingSort() {

    }

    function bucketSort() {
        
    }

    function shellSort() {

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
                    <div className="element-bar" key={idx} style={{height: `${value}px`}}>
                    </div>
                ))}
            </div>
            <AlgorithmMenu algorithmOptions={ALGORITHM_OPTIONS} generateArray={generateArray} array={mainArray} selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm} sortFunction={handleSorting}/>
        </>
    );
}