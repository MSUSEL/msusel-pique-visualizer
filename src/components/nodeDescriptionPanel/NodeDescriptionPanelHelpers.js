import "./NodeDescriptionPanel.css"

export function determineNodeInfo(node,impacts) {

    const node_type = determineNodeType();

    function determineNodeType() {
        if (node.name.includes("Measure")) return "Measure";
        else if (node.name.includes("Diagnostic")) return "Diagnostic";
        else if (node.name.includes("Category")) return "Product Factor"
        else if (node.name === "Binary Security Quality") return "TQI";
        else return "Quality Aspect";
    }

    function getThresholds() {
        const thresholds_array = node.thresholds;
        let thresholds = "";
        for (let i = 0; i < thresholds_array.length; i++) {
            thresholds += (thresholds_array[i] === 0 ? "0" : thresholds_array[i].toFixed(4)) + ",";
        }
        thresholds = thresholds.substring(0,thresholds.length-1);
        return thresholds;
    }

    function getCorrectNumberWithSuffix(num) {
        const last_digit = num % 10;
        switch (last_digit) {
            case 1:
                return "1st"
            case 2:
                return "2nd"
            case 3:
                return "3rd"
            default:
                return last_digit + "th"
        }
    }

    function getQualityImpactScore() {
        if (node_type === "Quality Aspect" || node_type === "Product Factor" || node_type === "Measure") {
            return <div><b>Quality Impact Score: </b>
                {impacts[node_type][node.name].value !== 0 ?
                    <>{impacts[node_type][node.name].value.toFixed(4)}
                        <i style={{"paddingLeft" : "0.5vw"}}>(Ranked {getCorrectNumberWithSuffix(impacts[node_type][node.name].rank)} highest of {Object.keys(impacts[node_type]).length} {node_type}s)</i></>
                    : 0
            }
            </div>
        }
    }

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
                {getQualityImpactScore()}
            </div>
        </>

    )
}