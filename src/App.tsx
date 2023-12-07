import { useState } from "react";
import { FileUploader } from "./composites/FileUploader";
import { useAtom, useAtomValue } from "jotai";
import { State } from "./state";
import * as R from "ramda";
import { Wrapper } from "./composites/TreeDisplay/Wrapper";
import { Box } from "@radix-ui/themes";
import { TreeDisplayProto } from "./composites/TreeDisplayProto/TreeDisplayProto";
import { ReactFlowProvider } from "reactflow";

function App() {
  const dataset = useAtomValue(State.dataset);
  return (
    <div
      style={{
        width: "100vw",
        height: "90vh",
      }}
    >
      {R.isNil(dataset) ? <FileUploader /> : <Wrapper />} 
      {/* <ReactFlowProvider> */}
        {/* <TreeDisplayProto />
      </ReactFlowProvider> */}
    </div>
  );
}

export default App;
