import "./NodeDescriptionPanel.css"
import {useEffect, useState} from "react";

export default function NodeDescriptionPanel(props) {

    const [nodes,setNodes] = useState([]);

    // Rerender this component whenever the nodes prop from TreeDisplay changes.
    useEffect(() => {
        setNodes(props.nodes)
    },[props.nodes])

    function makeNodePanelRectangles() {
        return (nodes.map( (node,i = node.hashCode()) => (
                <div className={`${nodes.length !== 5 ? "node-panel" : node.name === nodes[4].name ? "node-panel-bottom" : "node-panel"}`} key={i}>
                    <div className="node-name">{node.name}</div>
                    <div>{node.value}</div>
                    <div>{node.description}</div>
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