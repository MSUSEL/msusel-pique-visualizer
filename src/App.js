import React from "react";
import "./fileHandling/UploadFile";
import {TopHeader} from "./components/top_header/TopHeader";
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
