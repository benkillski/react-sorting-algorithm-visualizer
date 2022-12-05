import {useState, useEffect} from "react";
import "./AlgorithmVisualizer.css";

export default function AlgorithmVisualizer(props) {
    const [mainArray, setMainArray] = useState([]);

    useEffect(() => {
        generateArray();
    }, []);

    function generateArray() {
        const array = [];
        for(let i = 0; i < 300; i++) {
            array.push(Math.floor(Math.random() * 500) + 1);
        }
        setMainArray(array);
    }

    return (
        <div id="array-container">
            {mainArray.map((value, idx) => (
                <div className="element-bar" key={idx} style={{height: `${value}px`}}>
                </div>
            ))}
        </div>
    );
}