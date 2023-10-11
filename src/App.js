import React from "react";
import Modal from 'react-modal'
import "./components/fileHandling/UploadFile";
import {TopHeader} from "./components/top_header/TopHeader";
import {UploadFile} from "./components/fileHandling/UploadFile";

function App() {
  Modal.setAppElement('#root');
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
