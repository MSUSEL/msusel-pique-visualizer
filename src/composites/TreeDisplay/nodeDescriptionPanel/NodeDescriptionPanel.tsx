import "./NodeDescriptionPanel.css";
import { useEffect, useState, useMemo, useRef } from "react";
import { determineNodeInfo } from "./NodeDescriptionPanelHelpers";

export default function NodeDescriptionPanel(props: { nodes: any[]; impacts: any }) {
  const [orderBy, setOrderBy] = useState<string>("default");
  const [orderDirection, setOrderDirection] = useState<string>("asc");
  const lastNodeRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the last node whenever nodes change
  useEffect(() => {
    if (lastNodeRef.current) {
      lastNodeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.nodes]);

  const makeNodePanelRectangles = useMemo(() => {
    let orderedNodes = [...props.nodes];

    switch (orderBy) {
      case "default":
        break;
      case "alphabetical":
        orderedNodes.sort((a, b) => (orderDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
        break;
      case "nodeType":
        orderedNodes.sort((a, b) => (a.node_type > b.node_type ? 1 : -1));
        break;
      case "value":
        orderedNodes.sort((a, b) => (orderDirection === "asc" ? a.value - b.value : b.value - a.value));
        break;
      default:
        break;
    }

    return orderedNodes.map((node, i) => (
      <div
        ref={i === orderedNodes.length - 1 ? lastNodeRef : null}
        className={`${
          orderBy === "default" && i === orderedNodes.length - 1
            ? orderedNodes.length > 2
              ? "node-bottom-panel highlight"
              : "node-panel highlight"
            : "node-panel"
        }`}
        key={i}
      >
        {determineNodeInfo(node, props.impacts)}
      </div>
    ));
  }, [props.nodes, orderBy, orderDirection, props.impacts]);

  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value);
  };

  const handleOrderDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderDirection(e.target.value);
  };

  return (
    <div id="node_description_panel" className="scrollable-panel">
      <label htmlFor="orderBy">Order By: </label>
      <select id="orderBy" value={orderBy} onChange={handleOrderByChange}>
        <option value="default">Insertion Order</option>
        <option value="alphabetical">Alphabetical Order</option>
        <option value="value">Value Order</option>
      </select>

      {(orderBy === "alphabetical" || orderBy === "value") && (
        <>
          <label htmlFor="orderDirection"> Order Direction: </label>
          <select id="orderDirection" value={orderDirection} onChange={handleOrderDirectionChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </>
      )}

      {makeNodePanelRectangles}
    </div>
  );
}