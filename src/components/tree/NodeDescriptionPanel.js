import "./NodeDescriptionPanel.css"
import {useState} from "react";

export default function NodeDescriptionPanel(props) {

    const [nodes] = useState(props.nodes);

    console.log("nodes is ", nodes)

    function makeNodePanelRectangles() {
        return (nodes.map( (node,i = node.hashCode()) => (
                <div className="node" key={i}>
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