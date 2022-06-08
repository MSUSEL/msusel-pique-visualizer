import "./NodeDescriptionPanel.css"
import {useEffect, useState} from "react";
import {determineNodeInfo} from "./NodeDescriptionPanelHelpers";

export default function NodeDescriptionPanel(props) {

    const [nodes,setNodes] = useState([]);

    // Rerender this component whenever the nodes prop from TreeDisplay changes.
    useEffect(() => {
        setNodes(props.nodes)
    },[props.nodes])

    function makeNodePanelRectangles() {
        return (nodes.map( (node,i = node.hashCode()) => (
                <div className={`${nodes.length !== 5 ? "node-panel" : node.name === nodes[4].name ? "node-bottom-panel" : "node-panel"}`} key={i}>
                    {determineNodeInfo(node)}
                </div>
                )
            )
        )
    }

    return (
        <div id = "node_description_panel">
            {makeNodePanelRectangles()}
        </div>
    )
}