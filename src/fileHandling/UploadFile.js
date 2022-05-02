import React, { useState } from "react";

export function UploadFile({ children }) {
    const [file, setFile] = useState("");

    const handleChange = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            setFile(e.target.result);
        };
    };
    return (
        <>
            { file ? null : <h3 align={"center"}>Upload PIQUE json file to visualize the results.</h3>}

            <input type="file" onChange={handleChange} />
            <br />
            { file ? "uploaded file content -- " + file : null}
        </>
    );
}