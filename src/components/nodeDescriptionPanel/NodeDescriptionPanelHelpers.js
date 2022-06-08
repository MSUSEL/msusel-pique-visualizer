import "./NodeDescriptionPanel.css"

export function determineNodeInfo(node) {
    /*
    Insert conditional logic that shows certain information based on what type of node it is.
     */

    if (node.name.includes("Measure")) console.log("is measure")

    return (
        <>
        <div className="node-name">{node.name}</div>
        <div>Value: {node.value}</div>
        <div>{node.description}</div>
        </>
    )
}