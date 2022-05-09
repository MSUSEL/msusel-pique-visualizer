import React, {useEffect,useRef} from "react";
//import * as rd3 from "react-d3-library";
import * as d3 from "d3";
import TreeNode from "../treeNode/TreeNode";
import "./TreeDisplay.css"


const height = window.innerHeight;
const width = window.innerWidth;

// Setting the dimensions of each node
const node_width = 120;
const node_height = 80;
// Setting the coordinates of the TQI node
const tqi_node_x = width/2 - node_width/2;
const tqi_node_y = 15;

function TreeDisplay(props) {
    const tree_canvas = useRef(null);

    useEffect(() => {
        showCanvas();
    })

    const showCanvas = () => {

        let treeNodes = []

        let tqi_;
        for (tqi_ in props.fileData.factors.tqi) {
            treeNodes.push(new TreeNode(props.fileData.factors.tqi[tqi_],node_width,node_height,tqi_node_x,tqi_node_y))
        }


        const num_of_quality_aspects = Object.keys(props.fileData.factors.quality_aspects).length

        const spacing = (width-(node_width*(num_of_quality_aspects))) / (num_of_quality_aspects + 1);

        const calc_node_x = (iteration) => {
            return (iteration * spacing + (iteration-1) * node_width)
        }

        let item = 1;
        for (let aspect in props.fileData.factors.quality_aspects) {
            treeNodes.push(new TreeNode(props.fileData.factors.quality_aspects[aspect],node_width,node_height,calc_node_x(item),160));
            item++;
        }

        /*
        Keep this in case you have to use it later!!!
        // Removes duplicate svg canvas (for some weird reason there is a duplicate svg without this line)
        d3.select(tree_canvas.current).selectAll("svg").remove();
         */

        const svg = d3.select(tree_canvas.current)
            .append("svg")
            .attr("viewBox",`0 0 ${width} ${height}`)
            .style("background-color","beige");


        // Draw the links first, so they are at the "bottom" of the drawing
        for (let item = 1; item < treeNodes.length; item++) {
            treeNodes[0].children.push(treeNodes[item].json_data.name);
            const link = d3.linkHorizontal()({
                source: [treeNodes[0].node_center_x,treeNodes[0].node_center_y],
                target: [treeNodes[item].node_center_x,treeNodes[item].y + 2]    // add a couple pixels so link is under node
            });

            // Append the link to the svg element
            svg.append('path')
                .attr("id",function () {return "edge" + item})
                .attr('d', link)
                .attr("stroke-width","2px")
                .attr('stroke', 'black')
                .attr('fill', 'none')
                .on("click",function() {
                })

            svg.append("text")
                .attr("text-orientation","upright")
                .attr("dy","-3")
                .append("textPath")
                    .attr("startOffset","50%")
                    .attr("font-size","8px")
                    .attr("xlink:href",function () {return "#edge" + item})
                    .text(Object.values(treeNodes[0].json_data.weights)[item-1].toFixed(6))
        }

        // how to rotate text - first argument is degrees rotated, second is x, third is y
    //.attr("transform",`rotate(180,${treeNodes[item].x + node_width * 0.5},${treeNodes[item].y + node_height * 0.4})`)

        // Creating the rectangles (nodes) and adding the text.
        for (let item = 0; item < treeNodes.length; item++) {

            // Add the node to the screen
            svg.append("rect")
                .attr("width", treeNodes[item].width)
                .attr("height", treeNodes[item].height)
                .attr("rx", 2)
                .attr("x", treeNodes[item].x)
                .attr("y", treeNodes[item].y)
                .style("fill", "#ace3b5")
                .style("stroke-width", "2px")
                .style("stroke", "black")
                .on("mouseenter",function() {
                    console.log(treeNodes[item].json_data.name)
                })

            // ------------------------
            // Adding the node text
            // ------------------------
            // Add the node's name
            svg.append("text").text(treeNodes[item].json_data.name)
                .attr("font-size","10px")
                .attr("font-weight","bold")
                .attr("x", treeNodes[item].x + node_width * 0.5)
                .attr("y", treeNodes[item].y + node_height * 0.4)
                .attr("fill", "black")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","middle");

            // Add the node's value
            svg.append("text").text(treeNodes[item].json_data.value.toFixed(8))
                .attr("font-size","12px")
                .attr("x", treeNodes[item].x + node_width * 0.5)
                .attr("y", treeNodes[item].y + node_height * 0.6)
                .attr("fill", "black")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","middle");
        }

    }

    return (
        <div className={"tree_canvas"} id={"canvas"} ref={tree_canvas}></div>
    )

}


export default TreeDisplay;