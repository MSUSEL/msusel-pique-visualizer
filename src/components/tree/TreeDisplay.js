import React, {useEffect,useRef} from "react";
import * as d3 from "d3";
import "./TreeDisplay.css"


const height = window.innerHeight;
const width = window.innerWidth;

const centerx = width / 2;
const centery = height / 2;

function TreeDisplay(props) {
    const tree_canvas = useRef(null);

    useEffect(() => {
        showCanvas();
    })

    const xvals = [0,1,2,3,4,5,6,7,8,9]

    const showCanvas = () => {
        const svg = d3.select(tree_canvas.current)
            .append("svg")
            .attr("viewBox",`0 0 ${width} ${height}`)
            .style("background-color","beige");

        svg.append("rect")
            .attr("width", 100)
            .attr("height", 60)
            .attr("rx", 2)
            .attr("x",centerx-50)
            .attr("y",centery)
            .style("fill", "#ace3b5");


    }

    return (
        <>
        <div className={"tree_canvas"} ref={tree_canvas}></div>
        </>
    )

}

/*
const xscale = d3.scaleBand()
            .domain(xvals)
            .range([0,width])

        const xAxis = d3.axisBottom(xscale)

        svg.append("g")
            .call(xAxis)
 */

export default TreeDisplay;