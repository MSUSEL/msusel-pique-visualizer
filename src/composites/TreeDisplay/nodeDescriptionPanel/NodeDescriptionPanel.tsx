import "./NodeDescriptionPanel.css"
import {useEffect, useState} from "react";
import {determineNodeInfo} from "./NodeDescriptionPanelHelpers";

export default function NodeDescriptionPanel(props) {

    const [nodes,setNodes] = useState([]);

    // Rerender this component whenever the nodes prop from TreeDisplay changes.
    useEffect(() => {
        setNodes(props.nodes)
    },[props.nodes])

    function determinePanelHeight() {
        const height = 100/nodes.length;
        if (height > 34) return 33.33;
        return height;
    }

    function makeNodePanelRectangles() {
        return (nodes.map( (node,i = node.hashCode()) => (
                <div className={`${i === nodes.length-1 ? (nodes.length > 2 ? "node-bottom-panel" : "node-panel") : "node-panel"}`} style={{height : `${determinePanelHeight()}%`}} key={i}>
                    {determineNodeInfo(node,props.impacts)}
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