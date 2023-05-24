import React, {useEffect, useState} from "react";
import TreeDisplay from "../treeDisplay/TreeDisplay";
import sortNestedJson from "../features/Sort";
import "./UploadFile.css";
import PageTransfer from "./PageTransfer";

export function UploadFile() {
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState(null); // can find use later
    const [fileJSON, setFileJSON] = useState(null);
    const [fileWorks,setFileWorks] = useState(false);

    const handleChange = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        setFileName(e.target.files[0].name);
        const isJson = e.target.files[0].name.split(".")[1] === "json"
        // Set file and fileJSON according to file chosen.
        fileReader.onload = e => {
            setFile(e.target.result);
            if (isJson) setFileJSON(JSON.parse(e.target.result))
        };
    };

    useEffect(() => {
        if (fileJSON) setFileWorks(fileCanBeProcessed(fileJSON));
    },[fileJSON])

    // Store the fileJSON value in local storage
    localStorage.setItem('fileData', JSON.stringify(fileJSON));

    return (
        <div className="unselectableText">
            {file && fileWorks ? <h4 id={"filename"}>{fileJSON.name}</h4> : <h4 align={"center"} unselectable={"on"}>Upload PIQUE json file to visualize the results.</h4>}
            {file && fileWorks ? null : <input type="file" id={"fileChooser"} onChange={handleChange} />}
            {file && !fileWorks ? <div align={"center"} style={{"color" : "red"}}>Please upload PIQUE json file</div> : null}
            {file && fileWorks ? <PageTransfer fileData={fileJSON}/> : null}
        </div>
    );
}

/**
 * Checks if the submitted json file has the necessary properties, because then
 * it should be able to be processed correctly.
 */
function fileCanBeProcessed(jsonfile) {
    const property_checkers = ["name","additionalData","global_config","factors","measures","diagnostics"];
    const factor_checkers = ["product_factors","quality_aspects","tqi"];
    for (let property in property_checkers) {
        if (!jsonfile.hasOwnProperty(property_checkers[property])) {
            return false;
        }
    }
    for (let factor in factor_checkers) {
        if (!jsonfile.factors.hasOwnProperty(factor_checkers[factor])) {
            return false;
        }
    }
    return true;
}