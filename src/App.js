import React from "react";
import "./fileHandling/UploadFile";
import {TopHeader} from "./components/top_header/TopHeader";
import "./components/tree/TreeDisplay"
import TreeDisplay from "./components/tree/TreeDisplay";
import {UploadFile} from "./fileHandling/UploadFile";


function App() {
  return (
      <>
        <TopHeader />
          <UploadFile>
              <button>Upload File</button>
          </UploadFile>
      </>
  )
}

export default App;
