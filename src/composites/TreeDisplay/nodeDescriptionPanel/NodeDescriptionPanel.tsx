import React, { useState, useEffect } from "react";
import { determineNodeInfo } from "./NodeDescriptionPanelHelpers";
import "./NodeDescriptionPanel.css";

export default function NodeDescriptionPanel(props: { nodes: any[]; impacts: any }) {
  const [nodes, setNodes] = useState<any[]>([]);
  const [orderBy, setOrderBy] = useState<string>("default");

  // Rerender this component whenever the nodes prop from TreeDisplay changes.
  useEffect(() => {
    setNodes(props.nodes);
  }, [props.nodes]);

  function makeNodePanelRectangles() {
    let orderedNodes = [...nodes];

    switch (orderBy) {
      case "alphabetical":
        orderedNodes.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case "nodeType":
        orderedNodes.sort((a, b) => (a.node_type > b.node_type ? 1 : -1));
        break;
      case "value":
        orderedNodes.sort((a, b) => a.value - b.value);
        break;
      default:
        break;
    }

    return orderedNodes.map((node, i) => (
      <div
        className={`${
          i === nodes.length - 1 ? (nodes.length > 2 ? "node-bottom-panel" : "node-panel") : "node-panel"
        }`}
        key={i}
      >
        {determineNodeInfo(node, props.impacts)}
      </div>
    ));
  }

  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value);
  };

  return (
    <div id="node_description_panel" className="scrollable-panel">
      <select id="orderBy" value={orderBy} onChange={handleOrderByChange}>
        <option value="default">Default Order</option>
        <option value="alphabetical">Alphabetical Order</option>
        <option value="nodeType">Node Type Order</option>
        <option value="value">Value Order</option>
      </select>

      {makeNodePanelRectangles()}
    </div>
  );
}
