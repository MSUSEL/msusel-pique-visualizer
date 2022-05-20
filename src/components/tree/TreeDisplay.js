import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import TreeNode from "../treeNode/TreeNode";
import NodeRiskColor from "../treeNode/NodeColorHelper";
import "./TreeDisplay.css"


export default function TreeDisplay(props) {

    let window_height = window.innerHeight;
    let window_width = window.innerWidth;

    const [qaChildrenEdgeVisibility,setQAChildrenEdgeVisibility] = useState(() =>{
        let default_obj = {}
        for (let qa in props.fileData.factors.quality_aspects) {
        default_obj[qa] = false
        }
        return default_obj
    })

    const [pfChildrenVisibility,setPFChildrenVisibility] = useState(() => {
        let default_obj = {}
        for (let pf in props.fileData.factors.product_factors) {
            default_obj[pf] = false;
        }
        return default_obj
    })

    const [measureChildrenVisibility,setMeasureChildrenVisibility] = useState(() => {
        let default_obj = {}
        for (let measure in props.fileData.measures) {
            default_obj[measure] = false;
        }
        return default_obj;
    })

    const [width,setWidth] = useState(window_width);
    const [height,setHeight] = useState(window_height * 0.75);
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);

    const [dragStartCoordinates,setStartDragCoordinates] = useState({
        x : null,
        y : null
    })
    const [dragging,setDragging] = useState(false);

    const [wantToDrag,setWantToDrag] = useState(false);

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
            setWidth(width => 10*width/9);
            setHeight(height => 10*height/9);
        }

        // Put all keyboard events in here because the body element recognizes them, not the svg element
        //d3.select("body").on("keydown",handleKeyPress);


        // ---------------------------
        // Start making the entire svg  *****************
        // ---------------------------

        const svg = d3.select(tree_canvas.current)
            .attr("id","canvas")
            .append("svg")
            .attr("viewBox",`${x} ${y} ${width} ${height}`)
            .on("mousewheel",zoom)
            .on("dblclick",null)


        const dragMove = (e) => {
            const diff_x = e.screenX-dragStartCoordinates.x;
            const diff_y = e.screenY-dragStartCoordinates.y;

            let dragStartCorsCopy = dragStartCoordinates;
            dragStartCorsCopy.x = e.screenX;
            dragStartCorsCopy.y = e.screenY;

            setStartDragCoordinates({...dragStartCorsCopy})

            setX(x => x - diff_x)
            setY(y => y - diff_y)
        }

        if (dragging) {
            d3.select("svg")
                .on("mousemove",dragMove)
        }

        const handleSVGMouseDown = (e) => {

            e.preventDefault()

            let dragStartCorsCopy = dragStartCoordinates;

            dragStartCorsCopy.x = e.screenX;
            dragStartCorsCopy.y = e.screenY;

            setStartDragCoordinates({...dragStartCorsCopy})
            setDragging(true);
        }

        const handleSVGMouseUp = () => {
            setDragging(false);
        }

        if (wantToDrag) {
            d3.select("svg")
                .on("mousedown", handleSVGMouseDown)
        }

        d3.select("svg")
            .on("mouseup", handleSVGMouseUp)


        // Draw the links first, so they are at the "bottom" of the drawing

        /**
         * Drawing the edges between the TQI node and the quality factor nodes.
         */

        for (let item = 1; item < treeNodes.length; item++) {
            treeNodes[0].children.push(treeNodes[item].name);
            const link = d3.linkHorizontal()({
                // Changes source/target so that the edge weight text is on top of the path line.
                source: (treeNodes[0].node_center_x < treeNodes[item].node_center_x ? [treeNodes[0].node_center_x,treeNodes[0].node_center_y] : [treeNodes[item].node_center_x,treeNodes[item].y + 2]),
                target: (treeNodes[0].node_center_x < treeNodes[item].node_center_x ? [treeNodes[item].node_center_x,treeNodes[item].y + 2] : [treeNodes[0].node_center_x,treeNodes[0].node_center_y])    // add a couple pixels so link is under node
            });

            // Append the link to the svg element
            svg.append('path')
                .attr("id","tqi_" + treeNodes[item].name +"_edge" + item)
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
                    .attr("xlink:href","#tqi_" + treeNodes[item].name + "_edge" + item)
                    .text(Object.values(treeNodes[0].json_data.weights)[item-1].toFixed(6))
        }

        /**
         * Drawing the edges between the quality factor nodes and the product factor nodes.
         */

        for (let aspect = 1; aspect < treeNodes.length; aspect++) {
            for (let factor = 0; factor < p_factors.length; factor++) {
                const link = d3.linkHorizontal()({
                    // Changes source/target so that the edge weight text is on top of the path line.
                    source: (treeNodes[aspect].node_center_x < p_factors[factor].node_center_x ? [treeNodes[aspect].node_center_x, treeNodes[aspect].node_center_y] : [p_factors[factor].node_center_x, p_factors[factor].y + 2]),
                    target: (treeNodes[aspect].node_center_x < p_factors[factor].node_center_x ? [p_factors[factor].node_center_x, p_factors[factor].y + 2] : [treeNodes[aspect].node_center_x, treeNodes[aspect].node_center_y])    // add a couple pixels so link is under node
                });

                // Append the link to the svg element
                svg.append('path')
                    .attr("id", treeNodes[aspect].name +"_edge" + factor)
                    .attr('d', link)
                    .attr("stroke-width", "2px")
                    .attr('stroke', 'black')
                    .attr("opacity",`${qaChildrenEdgeVisibility[treeNodes[aspect].name] ? 1 : 0.05}`)
                    .attr('fill', 'none')


                /*
                How to do path transitions (work in progress)
                .attr("stroke-dasharray", `${document.getElementById(treeNodes[aspect].name +"_edge" + factor).getTotalLength()} ${document.getElementById(treeNodes[aspect].name +"_edge" + factor).getTotalLength()}`)
                    .attr("stroke-dashoffset", `${document.getElementById(treeNodes[aspect].name +"_edge" + factor).getTotalLength()}`)
                    .transition()
                        .duration(5000)
                        .attr("ease","ease-out")
                        .attr("stroke-dashoffset",0)
                 */


                //let len = document.getElementById(treeNodes[aspect].name +"_edge" + factor).getTotalLength()
                if (qaChildrenEdgeVisibility[treeNodes[aspect].name]) {
                    svg.append("text")
                        .attr("text-orientation", "upright")
                        .attr("dy", "-3")
                        .attr("font-weight", "bold")
                        //.attr("opacity", `${qaChildrenOpacity[treeNodes[aspect].name] - 0.05}`)
                        .append("textPath")
                        .attr("startOffset", `${(treeNodes[aspect].node_center_x < p_factors[factor].node_center_x ? 50 : 35)}%`)
                        .attr("font-size", "8px")
                        .attr("xlink:href", "#" + treeNodes[aspect].name + "_edge" + factor)
                        .text(treeNodes[aspect].json_data.weights[p_factors[factor].name].toFixed(6))
                }
            }
        }

        // how to rotate text - first argument is degrees rotated, second is x, third is y
        //.attr("transform",`rotate(180,${treeNodes[item].x + node_width * 0.5},${treeNodes[item].y + node_height * 0.4})`)


        // Handles when you click on a quality aspect node.
        const handleQAEdgesToggle = (e) => {

            const qa_name = e.path[0].id;

            let qaChildrenEdgeVisibilityCopy = qaChildrenEdgeVisibility;

            // Toggle off any visible edges from other quality aspects
            for (let prop in qaChildrenEdgeVisibilityCopy) {
                if (prop !== qa_name) qaChildrenEdgeVisibilityCopy[prop] = false;
            }

            qaChildrenEdgeVisibilityCopy[qa_name] = qaChildrenEdgeVisibilityCopy[qa_name] === false;
            // Copy the "updated" properties into the qa children opacity state.
            setQAChildrenEdgeVisibility({...qaChildrenEdgeVisibilityCopy})


        }

        /**
         * Creating the quality factor nodes in the tree display.
         */

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

        const findProductFactor = (name) => {
            for (let pf in p_factors) {
                if (p_factors[pf].name === name) return p_factors[pf];
            }
        }

        const handlePFEdgesToggle = (e) => {
            const pf_node = findProductFactor(e.path[0].id.split("^")[1]);

            let pfChildrenVisibilityCopy = pfChildrenVisibility;

            // Toggle off any visible edges from other product factors
            for (let prop in pfChildrenVisibilityCopy) {
                if (prop !== pf_node.name) pfChildrenVisibilityCopy[prop] = false;
            }

            pfChildrenVisibilityCopy[pf_node.name] = pfChildrenVisibilityCopy[pf_node.name] === false;
            setPFChildrenVisibility({...pfChildrenVisibilityCopy})

        }


        const handleMeasureEdgesToggle = (e) => {

            let measureChildrenVisibilityCopy = measureChildrenVisibility;
            measureChildrenVisibilityCopy[e.path[0].id] = true;
            setMeasureChildrenVisibility({...measureChildrenVisibilityCopy});
        }

        /**
         * Creating the measure nodes in the tree display.
         */

        for (let pf = 0; pf < p_factors.length; pf++) {


            // If we have clicked the product factor, draw its children. Otherwise, don't draw the children.
            // This boosts performance a little.
            if (pfChildrenVisibility[p_factors[pf].name]) {
                const num_of_measures = Object.entries(p_factors[pf].json_data.weights).length;
                const measure_spacing = node_width * 0.5;
                const total_measure_length = num_of_measures * node_width + (num_of_measures-1) * measure_spacing;

                const start_x = p_factors[pf].node_center_x - total_measure_length/2;

                let iter = 0;
                for (let measure_name in p_factors[pf].json_data.weights) {

                    let x_cor = start_x + (iter * (node_width + measure_spacing))
                    let mid_x = x_cor + node_width*0.5
                    let y_cor = p_factor_y + p_factor_height + 80

                    const link = d3.linkHorizontal()({
                        // Changes source/target so that the edge weight text is on top of the path line.
                        source: (p_factors[pf].node_center_x < mid_x ? [p_factors[pf].node_center_x, p_factors[pf].node_center_y] : [mid_x, y_cor + 2]),
                        target: (p_factors[pf].node_center_x < mid_x ? [mid_x, y_cor + 2] : [p_factors[pf].node_center_x, p_factors[pf].node_center_y])    // add a couple pixels so link is under node
                    });

                    // Drawing the link between product factor and measure
                    svg.append("path")
                        .attr("id", p_factors[pf].name +"_edge" + iter)
                        .attr('d', link)
                        .attr("stroke-width", "2px")
                        .attr('stroke', 'black')
                        .attr('fill', 'none');

                    svg.append("text")
                        .attr("text-orientation", "upright")
                        .attr("dy", "-3")
                        .attr("font-weight", "bold")
                        .append("textPath")
                        .attr("startOffset", `${(p_factors[pf].node_center_x < mid_x ? 50 : (p_factors[pf].node_center_x > mid_x) ? 35 : 25)}%`)
                        .attr("font-size", "8px")
                        .attr("xlink:href", "#" + p_factors[pf].name +"_edge" + iter)
                        .text(p_factors[pf].json_data.weights[measure_name].toFixed(6));

                    // ---------------------------------------------------

                    /**
                     * Draw the diagnostics for a measure.
                     */

                    if (measureChildrenVisibility[measure_name]) {

                        let measure_weights = [];

                        for (let diagnostic in props.fileData.measures[measure_name].weights) {
                            measure_weights.push(diagnostic)
                        }

                        const num_of_weights = Object.entries(props.fileData.measures[measure_name].weights).length;
                        const diag_spacing = node_width * 0.5;
                        const total_diag_length = num_of_weights * node_width + (num_of_weights-1) * diag_spacing;
                        const start_x = x_cor - total_diag_length/2 + node_width/2;
                        const diag_y = y_cor + node_height * 2;

                        const measure_center_x = x_cor + node_width/2;
                        const measure_center_y = y_cor + node_height/2;

                        const calc_diag_x = (iter) => {
                            return start_x + iter * (node_width + diag_spacing)
                        }

                        let i = 0;
                        for (let diagnostic in measure_weights) {

                            const diagnostic_name = measure_weights[diagnostic]

                            const link = d3.linkHorizontal()({
                                // Changes source/target so that the edge weight text is on top of the path line.
                                source: (measure_center_x < (calc_diag_x(i)+node_width/2) ? [measure_center_x, measure_center_y] : [(calc_diag_x(i)+node_width/2), diag_y + 2]),
                                target: (measure_center_x < (calc_diag_x(i)+node_width/2) ? [(calc_diag_x(i)+node_width/2), diag_y + 2] : [measure_center_x, measure_center_y])    // add a couple pixels so link is under node
                            });

                            // Drawing the link between measure and diagnostic
                            svg.append("path")
                                .attr("id", measure_name +"_edge" + iter)
                                .attr('d', link)
                                .attr("stroke-width", "2px")
                                .attr('stroke', 'black')
                                .attr('fill', 'none');

                            svg.append("text")
                                .attr("text-orientation", "upright")
                                .attr("dy", "-3")
                                .attr("font-weight", "bold")
                                .append("textPath")
                                .attr("startOffset", "25%")
                                .attr("font-size", "8px")
                                .attr("xlink:href", "#" + measure_name +"_edge" + iter)
                                .text(props.fileData.measures[measure_name].weights[diagnostic_name].toFixed(6));

                            const diag_x = calc_diag_x(i)
                            svg.append("rect")
                                .attr("width", node_width)
                                .attr("height", node_height)
                                .attr("rx", 2)
                                .attr("x", diag_x)
                                .attr("y", diag_y)
                                .style("fill", NodeRiskColor(props.fileData["diagnostics"][diagnostic_name].value,"diagnostic"))
                                .style("stroke-width", "1px")
                                .style("stroke", "black")

                            svg.append("text").text(props.fileData["diagnostics"][diagnostic_name].name)
                                .attr("font-size", "9px")
                                .attr("font-weight", "bold")
                                .attr("x", diag_x + node_width * 0.5)
                                .attr("y", diag_y + node_height * 0.4)
                                .attr("fill", "black")
                                .attr("dominant-baseline", "middle")
                                .attr("text-anchor", "middle");

                            // Add the node's value
                            svg.append("text").text(props.fileData["diagnostics"][diagnostic_name].value.toFixed(8))
                                .attr("font-size", "11px")
                                .attr("x", diag_x + node_width * 0.5)
                                .attr("y", diag_y + node_height * 0.6)
                                .attr("fill", "black")
                                .attr("dominant-baseline", "middle")
                                .attr("text-anchor", "middle");

                            i++;
                        }
                    }

                    /**
                     * Draw the measure nodes for the associated product factor.
                     */

                    svg.append("rect")
                        .attr("id",props.fileData.measures[measure_name].name)
                        .attr("width", node_width)
                        .attr("height", node_height)
                        .attr("rx", 2)
                        .attr("x", x_cor)
                        .attr("y", y_cor)
                        .style("fill", NodeRiskColor(props.fileData.measures[measure_name].value))
                        .style("stroke-width", "1px")
                        .style("stroke", "black")
                        .on("click",handleMeasureEdgesToggle)


                    svg.append("text").text(props.fileData.measures[measure_name].name)
                        .attr("font-size", "9px")
                        .attr("font-weight", "bold")
                        .attr("x", x_cor + node_width * 0.5)
                        .attr("y", y_cor + node_height * 0.4)
                        .attr("fill", "black")
                        .attr("dominant-baseline", "middle")
                        .attr("text-anchor", "middle");

                    // Add the node's value
                    svg.append("text").text(props.fileData.measures[measure_name].value.toFixed(8))
                        .attr("font-size", "11px")
                        .attr("x", x_cor + node_width * 0.5)
                        .attr("y", y_cor + node_height * 0.6)
                        .attr("fill", "black")
                        .attr("dominant-baseline", "middle")
                        .attr("text-anchor", "middle");

                    iter++;
                }
            }
        }


        /**
         * Creating the product factor nodes in the tree display.
         */

        for (let i = 0; i < p_factors.length; i++) {
            // Add the node to the screen
            svg.append("rect")
                .attr("id","p_factor^" + p_factors[i].name)
                .attr("width", p_factors[i].width)
                .attr("height", p_factors[i].height)
                .attr("rx", 2)
                .attr("x", p_factors[i].x)
                .attr("y", p_factors[i].y)
                .style("fill", NodeRiskColor(p_factors[i].json_data.value))
                .style("stroke-width", "1px")
                .style("stroke", "black")
                .on("click",handlePFEdgesToggle)

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


        // Attempt at helping drag feature. Needs some bug fixing though.
        const handleNodeMouseEnter = () => {
            setWantToDrag(false)
        }

        const handleNodeMouseLeave = () => {
            setWantToDrag(true)
        }

        d3.selectAll("rect")
            .on("mouseenter",handleNodeMouseEnter)
            .on("mouseleave",handleNodeMouseLeave)


    }

    const resetView = () => {
        setWidth(window_width);
        setHeight(window_height * 0.75);
        setX(0);
        setY(0);
    }

    return (
        <>
        <div className={"tree_canvas"} id={"canvas"} ref={tree_canvas}></div>
            <button id={"reset_buttons"} onClick={resetView}>Reset Tree View</button>
        </>
    )
}
