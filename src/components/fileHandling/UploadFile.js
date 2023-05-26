import React, { useEffect, useState } from "react";
import TreeDisplay from "../treeDisplay/TreeDisplay";
import sortNestedJson from "../features/Sort";
import "./UploadFile.css";
import PageTransfer from "./PageTransfer";

export function UploadFile() {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState(null); // can find use later
  const [fileJSON, setFileJSON] = useState(null);
  const [fileWorks, setFileWorks] = useState(false);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    const isJson = selectedFile.type === "application/json";
    setFileName(selectedFile.name);
    if (isJson) {
      const fileReader = new FileReader();
      fileReader.readAsText(selectedFile, "UTF-8");
      fileReader.onload = (e) => {
        setFile(e.target.result);
        setFileJSON(JSON.parse(e.target.result));
      };
    } else {
      setFile("");
      setFileJSON(null);
    }
  };

  useEffect(() => {
    if (fileJSON) setFileWorks(fileCanBeProcessed(fileJSON));
  }, [fileJSON]);

  // Store the fileJSON value in local storage
  useEffect(() => {
    localStorage.setItem("fileData", JSON.stringify(fileJSON));
  }, [fileJSON]);

  return (
    <div className="unselectableText">
      {file && fileWorks ? (
        <h4 id="filename">{fileJSON.name}</h4>
      ) : (
        <h4 align="center" unselectable="on">
          Upload PIQUE json file to visualize the results.
        </h4>
      )}
      {file && fileWorks ? null : (
        <input type="file" id="fileChooser" onChange={handleChange} accept=".json" />
      )}
      {file && !fileWorks ? (
        <div align="center" style={{ color: "red" }}>
          Please upload a valid PIQUE JSON file.
        </div>
      ) : null}
      {file && fileWorks ? <PageTransfer fileData={fileJSON} /> : null}
    </div>
  );
}

/**
 * Checks if the submitted JSON file has the necessary properties, because then
 * it should be able to be processed correctly.
 */
function fileCanBeProcessed(jsonFile) {
  const propertyCheckers = ["name", "additionalData", "global_config", "factors", "measures", "diagnostics"];
  const factorCheckers = ["product_factors", "quality_aspects", "tqi"];
  for (let property of propertyCheckers) {
    if (!jsonFile.hasOwnProperty(property)) {
      return false;
    }
  }
  for (let factor of factorCheckers) {
    if (!jsonFile.factors.hasOwnProperty(factor)) {
      return false;
    }
  }
  return true;
}
