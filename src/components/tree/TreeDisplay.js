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

    const showCanvas = () => {

        let nodes = []


        var tqi_;
        for (tqi_ in props.fileData.factors.tqi) {
            nodes.push(props.fileData.factors.tqi[tqi_].name);
        }
        //nodes.push(props.fileData.tqi)
        var aspect;
        for (aspect in props.fileData.factors.quality_aspects) {
            nodes.push(props.fileData.factors.quality_aspects[aspect].name);
        }

        /*
        // Removes duplicate svg canvas (for some weird reason there is a duplicate svg without this line)
        d3.select(tree_canvas.current).selectAll("svg").remove();
         */

        const svg = d3.select(tree_canvas.current)
            .append("svg")
            .attr("viewBox",`0 0 ${width} ${height}`)
            .style("background-color","beige");

        svg.append("rect")
            .attr("width", 120)
            .attr("height", 80)
            .attr("rx", 2)
            .attr("x",centerx-60)
            .attr("y",15)
            .style("fill", "#ace3b5");

        console.log("for loop")
        const level2width = 120;
        const spacing = (width-(level2width*(nodes.length-1))) / nodes.length;
        for (var item = 1; item < nodes.length; item++) {
            svg.append("rect")
                .attr("width", level2width)
                .attr("height", 80)
                .attr("rx", 2)
                .attr("x", item * spacing + (item-1) * level2width)
                .attr("y",120)
                .style("fill", "#ace3b5");
            svg.append("text").text("Hello there")
                .attr("x",item * spacing + (item-1) * level2width)
                .attr("y",150)
                .attr("fill","black");
        }



        /*
        svg.append("rect")
            .attr("width", 120)
            .attr("height", 80)
            .attr("rx", 2)
            .attr("x",centerx-60)
            .attr("y",15)
            .style("fill", "#ace3b5");

         */




    }

    return (
        <div className={"tree_canvas"} id={"canvas"} ref={tree_canvas}></div>
    )

}

export default TreeDisplay;