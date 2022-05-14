import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import * as rd3 from "react-d3-library"
import TreeNode from "../treeNode/TreeNode";
import NodeRiskColor from "../treeNode/NodeColorHelper";
import "./TreeDisplay.css"
import {selectAll} from "d3";


function TreeDisplay(props) {

    let window_height = window.innerHeight;
    let window_width = window.innerWidth;

    const [qaChildrenOpacity,setQAChildrenOpacity] = useState({
        "Availability" : 0.05,
        "Authenticity" : 0.05,
        "Authorization" : 0.05,
        "Confidentiality" : 0.05,
        "Non-repudiation" : 0.05,
        "Integrity" : 0.05
    })

    const [width,setWidth] = useState(window_width);
    const [height,setHeight] = useState(window_height);
    const [x,setX] = useState(0);
    const [y,setY] = useState(0)

    // Setting the dimensions of each node
    const node_width = 120;
    const node_height = 80;

    const tree_canvas = useRef(null);

    useEffect(() => {
        showCanvas();
    })

    const showCanvas = () => {

        // Tree nodes array only contains TQI and quality aspects nodes... maybe change later for clarity?
        let treeNodes = []

        // --------------------------
        // Creating the TQI node in tree nodes
        // --------------------------

        let tqi_;
        const tqi_node_x = width/2 - node_width/2;
        const tqi_node_y = 15;

        for (tqi_ in props.fileData.factors.tqi) {
            treeNodes.push(new TreeNode(props.fileData.factors.tqi[tqi_],node_width,node_height,tqi_node_x,tqi_node_y))
        }

        // --------------------------
        // Creating the quality aspects nodes in tree nodes
        // --------------------------

        const num_of_quality_aspects = Object.keys(props.fileData.factors.quality_aspects).length;
        const quality_aspect_spacing = node_width * 1.5;

        function calc_quality_aspect_x(iter) {
            let center = width/2;
            let quality_aspect_total_width = num_of_quality_aspects * node_width + (num_of_quality_aspects-1) * quality_aspect_spacing;
            let start_x = center - quality_aspect_total_width/2;
            return start_x + (iter*(node_width+quality_aspect_spacing))
        }

        let item = 0;
        for (let aspect in props.fileData.factors.quality_aspects) {
            treeNodes.push(new TreeNode(props.fileData.factors.quality_aspects[aspect],node_width,node_height,calc_quality_aspect_x(item++),160));
        }

        // --------------------------
        // Creating the p_factors list of product factors
        // --------------------------

        const p_factor_size_scale = 1;

        const p_factor_width = node_width * p_factor_size_scale;
        const p_factor_height = node_height * p_factor_size_scale;
        const p_factor_y = 450;

        const num_of_p_factors = Object.keys(props.fileData.factors.quality_aspects.Availability.weights).length

        const p_factor_spacing = (p_factor_width * 0.5);

        const calc_p_factor_x = (iter) => {
            let center = width/2;
            let p_factor_total_width = num_of_p_factors * p_factor_width + (num_of_p_factors-1) * p_factor_spacing;
            let start_x = center - p_factor_total_width/2;
            return start_x + (iter*(p_factor_width+p_factor_spacing))
        }

        let p_factors = []

        let p_factor_num = 0;
        for (let p_factor in props.fileData.factors.product_factors) {
            p_factors.push(new TreeNode(props.fileData.factors.product_factors[p_factor],p_factor_width,p_factor_height,calc_p_factor_x(p_factor_num++),p_factor_y))
        }

        // ****** Important piece ********************
        // Removes duplicate svg canvas (for some weird reason there is a duplicate svg every rerender without this line)
        d3.select(tree_canvas.current).selectAll("svg").remove();

        // ----------------------------------------------
        // Creating the zoom features with the mousewheel
        // ----------------------------------------------

        const zoom = (e) => {
            if (e.deltaY < 0) zoomIn()
            else zoomOut()
        }
        const zoomIn = () => {
            setWidth(width => 9*width/10);
            setHeight(height => 9*height/10);
        }
        const zoomOut = () => {
            setWidth(width => 10 * width/9);
            setHeight(height => 10 * height/9);
        }


        const handleKeyPress = (e) => {
            if (e.key === "a") setX(x => x-40);
            else if (e.key === "d") setX(x => x+40);
            else if (e.key === "w") setY(y => y-40);
            else if (e.key === "s") setY(y => y+40);

        }

        const handleDrag =  (e) => {
            console.log(e)
        }

        // Put all keyboard events in here because the body element recognizes them, not the svg element
        d3.select("body").on("keydown",handleKeyPress);



        // ---------------------------
        // Start making the entire svg  *****************
        // ---------------------------

        const svg = d3.select(tree_canvas.current)
            .attr("id","canvas")
            .append("svg")
            .attr("viewBox",`${x} ${y} ${width} ${height}`)
            .on("mousewheel",zoom)
            .attr("draggable","false")
            .on("dragstart",handleDrag)
            .on("dragend",handleDrag);

        // Draw the links first, so they are at the "bottom" of the drawing

        // Drawing edges between TQI and quality aspects
        for (let item = 1; item < treeNodes.length; item++) {
            treeNodes[0].children.push(treeNodes[item].name);
            const link = d3.linkHorizontal()({
                // Changes source/target so that the edge weight text is on top of the path line.
                source: (treeNodes[0].node_center_x < treeNodes[item].node_center_x ? [treeNodes[0].node_center_x,treeNodes[0].node_center_y] : [treeNodes[item].node_center_x,treeNodes[item].y + 2]),
                target: (treeNodes[0].node_center_x < treeNodes[item].node_center_x ? [treeNodes[item].node_center_x,treeNodes[item].y + 2] : [treeNodes[0].node_center_x,treeNodes[0].node_center_y])    // add a couple pixels so link is under node
            });

            // Append the link to the svg element
            svg.append('path')
                .attr("id",function () {return "tqi_" + treeNodes[item].name +"_edge" + item})
                .attr('d', link)
                .attr("stroke-width","2px")
                .attr('stroke', 'black')
                .attr('fill', 'none');

            svg.append("text")
                .attr("text-orientation","upright")
                .attr("dy","-3")
                .attr("font-weight","bold")
                .append("textPath")
                    .attr("startOffset",`${(treeNodes[0].node_center_x < treeNodes[item].node_center_x ? 50 : 30)}%`)
                    .attr("font-size","8px")
                    .attr("xlink:href",function () {return "#tqi_" + treeNodes[item].name + "_edge" + item})
                    .text(Object.values(treeNodes[0].json_data.weights)[item-1].toFixed(6))
        }

        // Draw the links between quality aspects and product factors
        for (let aspect = 1; aspect < treeNodes.length; aspect++) {
            for (let factor = 0; factor < p_factors.length; factor++) {
                const link = d3.linkHorizontal()({
                    // Changes source/target so that the edge weight text is on top of the path line.
                    source: (treeNodes[aspect].node_center_x < p_factors[factor].node_center_x ? [treeNodes[aspect].node_center_x, treeNodes[aspect].node_center_y] : [p_factors[factor].node_center_x, p_factors[factor].y + 2]),
                    target: (treeNodes[aspect].node_center_x < p_factors[factor].node_center_x ? [p_factors[factor].node_center_x, p_factors[factor].y + 2] : [treeNodes[aspect].node_center_x, treeNodes[aspect].node_center_y])    // add a couple pixels so link is under node
                });

                // Append the link to the svg element
                svg.append('path')
                    .attr("id", function () {
                        return treeNodes[aspect].name +"_edge" + factor
                    })
                    .attr('d', link)
                    .attr("stroke-width", "2px")
                    .attr('stroke', 'black')
                    .attr("opacity",`${qaChildrenOpacity[treeNodes[aspect].name]}`)
                    .attr('fill', 'none');

                svg.append("text")
                    .attr("text-orientation","upright")
                    .attr("dy","-3")
                    .attr("font-weight","bold")
                    .attr("opacity",`${qaChildrenOpacity[treeNodes[aspect].name] - 0.05}`)
                    .append("textPath")
                    .attr("startOffset",`${(treeNodes[aspect].node_center_x < p_factors[factor].node_center_x ? 50 : 35)}%`)
                    .attr("font-size","8px")
                    .attr("xlink:href",function () {return "#" + treeNodes[aspect].name + "_edge" + factor})
                    .text(treeNodes[aspect].json_data.weights[p_factors[factor].name].toFixed(6))
            }
        }

        // how to rotate text - first argument is degrees rotated, second is x, third is y
        //.attr("transform",`rotate(180,${treeNodes[item].x + node_width * 0.5},${treeNodes[item].y + node_height * 0.4})`)


        // Handles when you click on a quality aspect node.
        const handleQAEdgesToggle = (e) => {
            const qa_name = e.path[0].id;

            let qaChildrenOpacityCopy = qaChildrenOpacity;

            if (qaChildrenOpacityCopy[qa_name] === 0.05) qaChildrenOpacityCopy[qa_name] = 0.8;
            else qaChildrenOpacityCopy[qa_name] = 0.05;
            // Copy the "updated" properties into the qa children opacity state.
            setQAChildrenOpacity({...qaChildrenOpacityCopy})


        }

        // Creating the quality factor nodes and adding the text.
        for (let item = 0; item < treeNodes.length; item++) {

            // Add the node to the screen
            svg.append("rect")
                .attr("id",treeNodes[item].name)
                .attr("width", treeNodes[item].width)
                .attr("height", treeNodes[item].height)
                .attr("rx", 2)
                .attr("x", treeNodes[item].x)
                .attr("y", treeNodes[item].y)
                .style("fill",NodeRiskColor(treeNodes[item].json_data.value))
                .style("stroke-width", "2px")
                .style("stroke", "black")
                .on("click",handleQAEdgesToggle)

            // ------------------------
            // Adding the quality factor text
            // ------------------------
            // Add the node's name
            svg.append("text").text(treeNodes[item].name)
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

        // -----------------------------------------
        // Creating the product factor nodes
        // -----------------------------------------

        for (let i = 0; i < p_factors.length; i++) {
            // Add the node to the screen
            svg.append("rect")
                .attr("id","p_factor" + p_factors[i].name)
                .attr("width", p_factors[i].width)
                .attr("height", p_factors[i].height)
                .attr("rx", 2)
                .attr("x", p_factors[i].x)
                .attr("y", p_factors[i].y)
                .style("fill", NodeRiskColor(p_factors[i].json_data.value))
                .style("stroke-width", "1px")
                .style("stroke", "black")

            // ------------------------------
            // Adding the product factor text
            // ------------------------------
            // Add the product factor's name
            svg.append("text").text(p_factors[i].name)
                .attr("font-size","9px")
                .attr("font-weight","bold")
                .attr("x", p_factors[i].x + p_factor_width * 0.5)
                .attr("y", p_factors[i].y + p_factor_height * 0.4)
                .attr("fill", "black")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","middle");

            // Add the product factor's value
            svg.append("text").text(p_factors[i].json_data.value.toFixed(8))
                .attr("font-size","11px")
                .attr("x", p_factors[i].x + p_factor_width * 0.5)
                .attr("y", p_factors[i].y + p_factor_height * 0.6)
                .attr("fill", "black")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","middle");
        }

        // Can style all text here
        d3.selectAll("text")
            .attr("class","unselectableText")


    }

    // Measures and diagnostics are essentially the same things in terms of the names
    console.log(Object.entries(props.fileData.measures).length)
    console.log(Object.entries(props.fileData.diagnostics).length)

    return (
        <div className={"tree_canvas"} id={"canvas"} ref={tree_canvas}></div>
    )

}


export default TreeDisplay;