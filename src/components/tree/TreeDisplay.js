import React, {useEffect,useRef} from "react";
import * as d3 from "react-d3-library";
import "./tree.css";

const TreeDisplay = (file_data) => {

    const d3Chart = useRef();

    return (
        <div id="d3demo">
            <svg ref={d3Chart}></svg>
        </div>
    )

}

export default TreeDisplay;