import { Box } from "@radix-ui/themes";
import Dagre from "@dagrejs/dagre";
import React, { useCallback, useMemo, useTransition } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MiniMap,
  Controls,
} from "reactflow";
import sampleData from "../../../public/PIQUE_json_files/compact_output.json";
import "reactflow/dist/style.css";
import { createGraphLayout, iterGraphData, useDagre } from "./hooks";

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};
console.log(createGraphLayout(sampleData.factors));
export const TreeDisplayProto = () => {
  // const { fitView } = useReactFlow();

  const { edges: initialEdges, nodes: initialNodes } = useMemo(
    () => createGraphLayout(sampleData.factors),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // const onLayout = useCallback(
  //   (direction) => {
  //     console.log("ON LAYOUT");

  //     startTransition(() => {
  //       console.log("Setting layout");
  //       const layouted = getLayoutedElements(nodes, edges, { direction });
  //       console.log("Finished layout");
  //       setNodes([...layouted.nodes]);
  //       setEdges([...layouted.edges]);

  //       window.requestAnimationFrame(() => {
  //         fitView();
  //       });
  //     });
  //   },
  //   [nodes, edges]
  // );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Panel position="top-right">
        {/* <button onClick={() => onLayout("TB")}>vertical layout</button>
        <button onClick={() => onLayout("LR")}>horizontal layout</button> */}
      </Panel>
      <MiniMap zoomable pannable />
      <Controls />
    </ReactFlow>
  );
};
