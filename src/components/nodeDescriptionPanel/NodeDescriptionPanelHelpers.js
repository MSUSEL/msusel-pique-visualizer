import "./NodeDescriptionPanel.css"

export function determineNodeInfo(node) {
    /*
    Insert conditional logic that shows certain information based on what type of node it is.
     */

    const node_type = determineNodeType(node);

    return (
        <>
            <div className="node-name">{node.name}</div>
            <div className="node-info">
                <div><b>Node Type: </b>{node_type}</div>
                <div><b>Value: </b>{node.value.toFixed(5)}</div>
                {node.description !== "" ? <div><b>Description: </b>{node.description}</div> : null}
                {node_type === "Measure" ? <div><b>Thresholds: </b>[{getThresholds(node)}]</div> : null}
                {node_type === "Diagnostic" ? <div><b>Tool: </b>{node.toolName}</div> : null}
                <div><b>Evaluation Strategy: </b>{node.eval_strategy}</div>
                <div><b>Normalizer: </b>{node.normalizer}</div>
                <div><b>Utility Function: </b>{node.utility_function}</div>
            </div>
        </>

    )
}

function determineNodeType(node) {
    if (node.name.includes("Measure")) return "Measure";
    else if (node.name.includes("Diagnostic")) return "Diagnostic";
    else if (node.name.includes("Category")) return "Product Factor"
    else if (node.name === "Binary Security Quality") return "TQI";
    else return "Quality Aspect";
}

function getThresholds(node) {
    const thresholds_array = node.thresholds;
    let thresholds = "";
    for (let i = 0; i < thresholds_array.length; i++) {
        thresholds += (thresholds_array[i] === 0 ? "0" : thresholds_array[i].toFixed(4)) + ",";
    }
    thresholds = thresholds.substring(0,thresholds.length-1);
    return thresholds;
}