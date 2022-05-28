import React, {useState} from "react";
import TreeDisplay from "../components/tree/TreeDisplay";
import "./UploadFile.css"

export function UploadFile() {
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState(null);
    const [fileJSON, setFileJSON] = useState(null);

    const handleChange = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        setFileName(e.target.files[0].name);
        // Set file and fileJSON according to file chosen.
        fileReader.onload = e => {
            setFile(e.target.result);
            setFileJSON(JSON.parse(e.target.result))
        };

    };

    return (
        <div id="unselectableText">
            { file ? <h4 align={"center"} unselectable={"on"}>Visualization of {fileName}</h4> : <h4 align={"center"} unselectable={"on"}>Upload PIQUE json file to visualize the results.</h4>}

            {file ? null : <input type="file" id={"fileChooser"} onChange={handleChange} />}

            {file ? <TreeDisplay fileData={fileJSON}/> : null}

        </div>
    );
}