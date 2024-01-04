import { useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Background,
  MiniMap,
  Controls,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { createGraphLayout } from "./hooks";

interface TreeDisplayProtoProps {
  data: any;
}

export const TreeDisplayProto = (props: TreeDisplayProtoProps) => {
  const { edges: initialEdges, nodes: initialNodes } = useMemo(
    () => createGraphLayout(props.data),
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
