import React, {useEffect, useRef, useState} from "react";
//import * as rd3 from "react-d3-library";
import * as d3 from "d3";
import TreeNode from "../treeNode/TreeNode";
import "./TreeDisplay.css"


function TreeDisplay(props) {

    let window_height = window.innerHeight;
    let window_width = window.innerWidth;

    const [childrenVisibility,setChildrenVisibility] = useState(true);
    const [width,setWidth] = useState(window_width);
    const [height,setHeight] = useState(window_height);

    // Setting the dimensions of each node
    const node_width = 120;
    const node_height = 80;
    // Setting the coordinates of the TQI node
    const tqi_node_x = width/2 - node_width/2;
    const tqi_node_y = 15;


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

        const quality_aspect_spacing = (width-(node_width*(num_of_quality_aspects))) / (num_of_quality_aspects + 1);

        const calc_quality_aspect_x = (iteration) => {
            return (iteration * quality_aspect_spacing + (iteration-1) * node_width)
        }

        let item = 1;
        for (let aspect in props.fileData.factors.quality_aspects) {
            treeNodes.push(new TreeNode(props.fileData.factors.quality_aspects[aspect],node_width,node_height,calc_quality_aspect_x(item),160));
            item++;
        }


        // ****** Important piece ********************
        // Removes duplicate svg canvas (for some weird reason there is a duplicate svg every rerender without this line)
        d3.select(tree_canvas.current).selectAll("svg").remove();


        const svg = d3.select(tree_canvas.current)
            .attr("id","canvas")
            .append("svg")
            .attr("viewBox",`0 0 ${width} ${height}`)

        const zoomIn = () => {
            setWidth(width => 9*width/10);
            setHeight(height => 9*height/10);
        }

        const zoomOut = () => {
            setWidth(width => 10 * width/9);
            setHeight(height => 10 * height/9);
        }

        // Making the zoom buttons
        // ------------------------
        // Zoom in button
        svg.append("rect")
            .attr("width",width/30)
            .attr("height",width/30)
            .attr("x",28*width/30)
            .attr("y",0)
            .attr("fill","orange")
            .on("click",zoomIn);
        svg.append("text").text("In")
            .attr("class","unselectableText")
            .attr("x",28.5*width/30)
            .attr("y",width/30 / 2)
            .attr("dominant-baseline","middle")
            .attr("text-anchor","middle");

        // Zoom out button
        svg.append("rect")
            .attr("width",width/30)
            .attr("height",width/30)
            .attr("x",29*width/30)
            .attr("y",0)
            .attr("fill","green")
            .on("click",zoomOut);
        svg.append("text").text("Out")
            .attr("class","unselectableText")
            .attr("x",29.5*width/30)
            .attr("y",width/30 / 2)
            .attr("dominant-baseline","middle")
            .attr("text-anchor","middle");



        // Draw the links first, so they are at the "bottom" of the drawing
        for (let item = 1; item < treeNodes.length; item++) {
            treeNodes[0].children.push(treeNodes[item].json_data.name);
            const link = d3.linkHorizontal()({
                // Changes source/target so that the edge weight text is on top of the path line.
                source: (treeNodes[0].node_center_x < treeNodes[item].node_center_x ? [treeNodes[0].node_center_x,treeNodes[0].node_center_y] : [treeNodes[item].node_center_x,treeNodes[item].y + 2]),
                target: (treeNodes[0].node_center_x < treeNodes[item].node_center_x ? [treeNodes[item].node_center_x,treeNodes[item].y + 2] : [treeNodes[0].node_center_x,treeNodes[0].node_center_y])    // add a couple pixels so link is under node
            });

            // Append the link to the svg element
            svg.append('path')
                .attr("id",function () {return "edge" + item})
                .attr('d', link)
                .attr("stroke-width","2px")
                .attr('stroke', 'black')
                .attr('fill', 'none');

            svg.append("text")
                .attr("text-orientation","upright")
                .attr("dy","-3")
                .attr("font-weight","bold")
                .append("textPath")
                    .attr("startOffset",`${(treeNodes[0].node_center_x < treeNodes[item].node_center_x ? 50 : 34)}%`)
                    .attr("font-size","8px")
                    .attr("xlink:href",function () {return "#edge" + item})
                    .text(Object.values(treeNodes[0].json_data.weights)[item-1].toFixed(6))
        }

        // how to rotate text - first argument is degrees rotated, second is x, third is y
    //.attr("transform",`rotate(180,${treeNodes[item].x + node_width * 0.5},${treeNodes[item].y + node_height * 0.4})`)

        const handleChildrenToggle = () => {
            setChildrenVisibility(childrenVisibility => !childrenVisibility);
        }
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
                .on("click",handleChildrenToggle)

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

        // ---------------------------------
        // Testing creating the weight nodes
        // ---------------------------------

        const weight_width = node_width * 0.4;

        const weight_height = node_height * 0.4;

        const num_of_weights = Object.keys(props.fileData.factors.quality_aspects.Availability.weights).length

        console.log(props.fileData.factors.quality_aspects.Availability.weights)

        const weight_spacing = (width-(weight_width*(num_of_weights-1))) / (num_of_weights + 1);

        const calc_weight_x = (iteration) => {
            return (iteration * weight_spacing + (iteration-1) * weight_width)
        }

        let weights = []

        for (let i = 0; i < Object.values(treeNodes[1].edge_weights).length; i++) {
            //console.log(Object.keys(treeNodes[3].edge_weights)[i],Object.values(treeNodes[3].edge_weights)[i].toFixed(6));
            weights.push(Object.entries(treeNodes[1].edge_weights)[i]);
        }

        for (let i = 0; i < weights.length; i++) {
            // Add the node to the screen
            svg.append("rect")
                .attr("width", weight_width)
                .attr("height", weight_height)
                .attr("rx", 2)
                .attr("x", calc_weight_x(i))
                .attr("y", 300)
                .style("fill", "#ace3b5")
                .style("stroke-width", "2px")
                .style("stroke", "black")

            // ------------------------
            // Adding the weight text
            // ------------------------
            // Add the weight's name
            svg.append("text").text(weights[i][0])
                .attr("font-size","5px")
                .attr("font-weight","bold")
                .attr("x", calc_weight_x(i) + weight_width * 0.5)
                .attr("y", 300 + weight_height * 0.4)
                .attr("fill", "black")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","middle");

            // Add the weight's value
            svg.append("text").text(weights[i][1].toFixed(8))
                .attr("font-size","6px")
                .attr("x", calc_weight_x(i) + weight_width * 0.5)
                .attr("y", 300 + weight_height * 0.6)
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