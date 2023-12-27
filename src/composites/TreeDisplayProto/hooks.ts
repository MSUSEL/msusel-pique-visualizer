import { useMemo } from "react";
import Dagre from "@dagrejs/dagre";

export const useDagre = (options?: Dagre.GraphLabel) => {
  const graph = useMemo(() => {
    const graph = new Dagre.graphlib.Graph();
    if (options) {
      graph.setGraph(options);
    }
    return graph;
  }, []);

  return { graph };
};

export function* iterGraphData(graphData: Record<string, any>) {
  for (const [_, factorData] of Object.entries(graphData)) {
    for (const [_, nodeData] of Object.entries(factorData)) {
      const edges = Object.entries(nodeData.weights).map(([key, value]) => ({
        target: key,
        value,
      }));

      yield [nodeData, edges];
    }
  }
}

export function createGraphLayout(
  data: any,
  nodeHeight: number = 36,
  nodeWidth: number = 150
) {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB", nodesep: 2, ranksep: 200 });
  const nodes = [];
  const edges = [];
  for (const [nodeData, outgoingEdges] of iterGraphData(data)) {
    nodes.push(nodeData);
    g.setNode(nodeData.name, {
      label: nodeData.name,
      height: nodeHeight,
      width: nodeWidth,
    });
    for (const edge of outgoingEdges) {
      //   if (!g.hasNode(edge.target)) {
      //     g.setNode(edge.target, {
      //       label: edge.target,
      //       height: nodeHeight,
      //       width: nodeWidth,
      //     });
      //   }
      g.setEdge(nodeData.name, edge.target);

      edges.push({
        source: nodeData.name,
        target: edge.target,
        id: `${nodeData.name}-${edge.target}`,
      });
    }
  }

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.name);
      return {
        customData: node,
        id: node.name,
        data: { label: node.name },
        position: { x, y },
      };
    }),
    edges,
  };
}
