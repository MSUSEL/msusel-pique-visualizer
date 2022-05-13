import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import TreeNode from "../treeNode/TreeNode";
import "./TreeDisplay.css"


function TreeDisplay(props) {

    let window_height = window.innerHeight;
    let window_width = window.innerWidth;

    const [childrenVisibility,setChildrenVisibility] = useState(true);
    const [width,setWidth] = useState(window_width);
    const [height,setHeight] = useState(window_height);
    const [x,setX] = useState(0);
    const [y,setY] = useState(0)
    // Used in measuring the zoom level
    const [zoomLevel,setZoomLevel] = useState(0);

    console.log("zoom level is ",zoomLevel);

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

        console.log("tqi x is ", treeNodes[0].x)

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

        const zoom = (e) => {
            if (e.deltaY < 0) zoomIn()
            else zoomOut()
        }
        const zoomIn = () => {
            setWidth(width => 9*width/10);
            setHeight(height => 9*height/10);
            setZoomLevel(zoomLevel => zoomLevel+1)
        }
        const zoomOut = () => {
            setWidth(width => 10 * width/9);
            setHeight(height => 10 * height/9);
            setZoomLevel(zoomLevel => zoomLevel-1)
        }

        const handleKeyPress = (e) => {
            if (e.key === "a") setX(x => x-40)
            else if (e.key === "d") setX(x => x+40)
            else if (e.key === "w") setY(y => y-40)
            else if (e.key === "s") setY(y => y+40)

        }
        // Put all keyboard events in here because the body element recognizes them, not the svg element
        d3.select("body").on("keydown",handleKeyPress)

        const svg = d3.select(tree_canvas.current)
            .attr("id","canvas")
            .append("svg")
            .attr("viewBox",`${x} ${y} ${width} ${height}`)
            .on("mousewheel",zoom)


        // Testing static (!dynamic) placement of nodes
        // Successful!! Implement in other nodes

        let test_width_height = 100
        let num_tests = 5;
        let test_space = 50;
        function calc_test_x(iter) {
            let center = width/2;
            let test_total_width = num_tests * test_width_height + (num_tests-1) * test_space;
            let start_x = center - test_total_width/2;
            return start_x + (iter*(test_width_height+test_space))
        }
        for (let i = 0; i < num_tests; i++) {
            svg.append("rect")
                .attr("width",test_width_height)
                .attr("height",test_width_height)
                .attr("x",calc_test_x(i))
                .attr("y",700)
                .attr("fill","blue")
        }

        // ------------------------X



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
                    .attr("startOffset",`${(treeNodes[0].node_center_x < treeNodes[item].node_center_x ? 50 : 30)}%`)
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

        // -----------------------------------------
        // Testing creating the product factor nodes
        // -----------------------------------------

        const p_factor_size_scale = 1;

        const p_factor_width = node_width * p_factor_size_scale;
        const p_factor_height = node_height * p_factor_size_scale;
        const p_factor_y = 550;

        const num_of_p_factors = Object.keys(props.fileData.factors.quality_aspects.Availability.weights).length

        //for centered spacing *adjusted to window size*

        const p_factor_spacing = (width-(p_factor_width*(num_of_p_factors))) / (num_of_p_factors + 1);
        const calc_p_factor_x = (iteration) => {
            return ((iteration+1) * p_factor_spacing + (iteration) * p_factor_width)
        }


        /*
        // for spacing that stays constant throughout zoom
        const p_factor_total_length = num_of_p_factors * p_factor_width + (num_of_p_factors-1) * p_factor_width
        const p_factor_starting_x = window.innerWidth - window.innerWidth/2 - (p_factor_total_length - window.innerWidth) / 2

        console.log(window.innerWidth)

        const p_factor_spacing = (p_factor_width * 0.5);
        const calc_p_factor_x = (iteration) => {
            return (p_factor_starting_x + iteration * p_factor_spacing + iteration * p_factor_width)
        }
         */


        let weights = []

        for (let i = 0; i < Object.values(treeNodes[1].edge_weights).length; i++) {
            //console.log(Object.keys(treeNodes[3].edge_weights)[i],Object.values(treeNodes[3].edge_weights)[i].toFixed(6));
            weights.push(Object.entries(treeNodes[1].edge_weights)[i]);
        }

        for (let i = 0; i < weights.length; i++) {
            // Add the node to the screen
            svg.append("rect")
                .attr("width", p_factor_width)
                .attr("height", p_factor_height)
                .attr("rx", 2)
                .attr("x", calc_p_factor_x(i))
                .attr("y", p_factor_y)
                .style("fill", "#ace3b5")
                .style("stroke-width", "2px")
                .style("stroke", "black")

            // ------------------------------
            // Adding the product factor text
            // ------------------------------
            // Add the product factor's name
            svg.append("text").text(weights[i][0])
                .attr("font-size","8px")
                .attr("font-weight","bold")
                .attr("x", calc_p_factor_x(i) + p_factor_width * 0.5)
                .attr("y", p_factor_y + p_factor_height * 0.4)
                .attr("fill", "black")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","middle");

            // Add the product factor's value
            svg.append("text").text(weights[i][1].toFixed(8))
                .attr("font-size","8px")
                .attr("x", calc_p_factor_x(i) + p_factor_width * 0.5)
                .attr("y", p_factor_y + p_factor_height * 0.6)
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