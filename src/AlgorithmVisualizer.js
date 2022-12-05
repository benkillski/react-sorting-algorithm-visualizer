import {useState, useEffect} from "react";
import AlgorithmMenu from './AlgorithmMenu';

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

export default function AlgorithmVisualizer(props) {

    const [mainArray, setMainArray] = useState([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState([ALGORITHM_OPTIONS[0]]);

    useEffect(() => {
        generateArray();
    }, []);

    function generateArray() {
        const array = [];
        for(let i = 0; i < 200; i++) {
            array.push(Math.floor(Math.random() * 800) + 1);
        }
        setMainArray(array);
    }

    return (
        <>
            <div id="array-container">
                {mainArray.map((value, idx) => (
                    <div className="element-bar" key={idx} style={{height: `${value}px`}}>
                    </div>
                ))}
            </div>
            <AlgorithmMenu algorithmOptions={ALGORITHM_OPTIONS} generateArray={generateArray} array={mainArray} selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm}/>
        </>
    );
}