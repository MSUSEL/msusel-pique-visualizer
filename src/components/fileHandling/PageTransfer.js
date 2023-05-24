import React, {useEffect, useState} from "react";
import TreeDisplay from "../treeDisplay/TreeDisplay";
import {sortNestedJson} from "../features/Sort";
import "./UploadFile.css"

// Retrieve the fileJSON value from local storage


export default function PageTransfer(props) {

    //const fileData = JSON.parse(localStorage.getItem('fileData'));
    const { fileData } = props;
    //sor sort and filter
    const [sortedData, setSortedData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const handleSort = () => {
        // Sort the fileData and update the sortedData state
        const sorted = sortNestedJson(fileData);
        setSortedData(sorted);
        setFilteredData(null); // Reset filteredData when sorting is applied
      };

    const handleFilter = () => {
        // Filter out data with zero value and update the filteredData state
        const filtered = fileData.filter((node) => node.value !== 0);
        setFilteredData(filtered);
        setSortedData(null); // Reset sortedData when filtering is applied
      };

    return (
        <div className="unselectableText">
            <div>
                <button onClick={handleSort}>Sort</button>
                <button onClick={handleFilter}>Filter</button>
            </div>
            <TreeDisplay fileData={sortedData || filteredData || fileData} />
        </div>
    );
}