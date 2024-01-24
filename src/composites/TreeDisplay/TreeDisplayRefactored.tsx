import { useAtomValue } from "jotai";
import { State } from "../../state";
import { useMemo } from "react";
import ReactFlow, { Background, Controls, MiniMap, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import Dagre from "@dagrejs/dagre";

const CustomNodeComponent = ({ data }) => {
  return (
    <div style={{ padding: '10px', borderRadius: '3px', background: '#FFF', border: '1px solid #222138' }}>
      <strong>{data.label}</strong><br />
      <span>{data.value}</span>
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNodeComponent, // 'customNode' is the type name
};



const createGraph = (dataset: { measures: Record<string, { value: number; description: string; eval_strategy: string; normalizer: string; positive: boolean; thresholds: [number, number]; utility_function: string; weights: Record<string, number>; }>; name: string; global_config: Record<string, any>; factors: Record<string, Record<string, { name: string; value: number; description: string; eval_strategy: string; normalizer: string; utility_function: string; weights: Record<string, number>; }>>; additionalData: Record<string, any>; diagnostics: Record<string, { name: string; value: number; description: string; eval_strategy: string; normalizer: string; utility_function: string; weights: Record<string, number>; toolName: string; }>; }) => {
  const g = new Dagre.graphlib.Graph();
  g.setGraph({
    rankdir: 'TB', 
    ranksep: 200,  
    nodesep: 100, 
    edgesep: 10, 
    marginx: 50,   
    marginy: 50 
  });
  g.setDefaultEdgeLabel(() => ({}));

  const addNodes = (nodes, level) => { 
    nodes.forEach(node => {
      if (node && node.name) {
        g.setNode(node.name, { label: node.name, value: node.value, width: 150, height: 50 });
      }
    });
  };
  

  const addEdges = (node: unknown, level: string) => {
    if (node && node.weights) {
      Object.entries(node.weights).forEach(([target, weight]) => {
        if (g.hasNode(node.name) && g.hasNode(target)) {
          g.setEdge(node.name, target);
        }
      });
    }
  };

  addNodes(Object.values(dataset.factors.tqi), 'tqi');
  addNodes(Object.values(dataset.factors.quality_aspects), 'quality_aspects');
  addNodes(Object.values(dataset.factors.product_factors), 'product_factors');
  addNodes(Object.values(dataset.measures), 'measures');
  //addNodes(Object.values(dataset.diagnostics), 'diagnostics');
   

  Object.values(dataset.factors.tqi).forEach(child => { addEdges(child, 'tqi'); });
  Object.values(dataset.factors.quality_aspects).forEach(node => addEdges(node, 'quality_aspects'));
  Object.values(dataset.factors.product_factors).forEach(node => addEdges(node, 'product_factors'));
  Object.values(dataset.measures).forEach(node => addEdges(node, 'measures'));


  Dagre.layout(g);

  return g;
};



export const TreeDisplayRefactored = () => {
  const dataset = useAtomValue(State.dataset);
  if (!dataset) {
    // Handle loading or undefined state
    return <div>Loading...</div>;
  }


  const graph = useMemo(() => createGraph(dataset), [dataset]);
  const nodes = graph.nodes().map(node => ({
    id: node,
    data: { label: graph.node(node).label, value: graph.node(node).value }, // Pass both label and value
    position: graph.node(node),
    style: {
      width: 200,  // Increase node width
      height: 50,  // Increase node height
      color: "#000000",
      border: "1px solid #222138",
      borderRadius: "3px"
    }
  }));


  const edges = graph.edges().map(edge => ({
    id: `${edge.v}-${edge.w}`,
    source: edge.v,
    target: edge.w,
    animated: false,
    style: { stroke: "solid" } 
  }));
  

  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(edges);



  return (
    <div style={{ height: '1000px', width: '90%' }}>
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{
          padding: 2, 
  
        }}
        nodeTypes={nodeTypes}
      >
        <MiniMap zoomable pannable />
        <Controls />
        <Background color="#ccc" />
      </ReactFlow>
    </div>
  );
};
