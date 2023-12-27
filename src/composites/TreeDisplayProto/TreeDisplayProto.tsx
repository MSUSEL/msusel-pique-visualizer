import Dagre from "@dagrejs/dagre";
import { useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Background,
  MiniMap,
  Controls,
  BackgroundVariant,
} from "reactflow";
import sampleData from "../../../public/PIQUE_json_files/compact_output.json";
import "reactflow/dist/style.css";
import { createGraphLayout } from "./hooks";

export const TreeDisplayProto = () => {
  const { edges: initialEdges, nodes: initialNodes } = useMemo(
    () => createGraphLayout(sampleData.factors),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      {/* <Panel position="top-right"></Panel> */}
      <MiniMap zoomable pannable />
      <Controls />
      <Background color="#ccc" variant={BackgroundVariant.Dots} />
    </ReactFlow>
  );
};
