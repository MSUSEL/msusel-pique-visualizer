import "./NodeDescriptionPanel.css";
import { useEffect, useState } from "react";
import { determineNodeInfo } from "./NodeDescriptionPanelHelpers";

export default function NodeDescriptionPanel(props: { nodes: any[], impacts: any }) {
  const [nodes, setNodes] = useState<any[]>([]);
  
  // Rerender this component whenever the nodes prop from TreeDisplay changes.
  useEffect(() => {
    setNodes(props.nodes);
  }, [props.nodes]);
  
  function makeNodePanelRectangles() {
    return nodes.map((node, i) => (
      <div
        className={`${i === nodes.length - 1 ? (nodes.length > 2 ? "node-bottom-panel" : "node-panel") : "node-panel"}`}
        key={i}
      >
        {determineNodeInfo(node, props.impacts)}
      </div>
    ));
  }
  
  return (
    <div id="node_description_panel" className="scrollable-panel">
      {makeNodePanelRectangles()}
    </div>
  );
}

