import React, {useEffect, useState} from "react";
import TreeDisplay from "../treeDisplay/TreeDisplay";
import {sortASC, sortDESC} from "../features/Sort";
import {filterZero, filterRange} from "../features/Filter";
import "./UploadFile.css"


export default function PageTransfer(props) {

    const { fileData } = props;
    // sort and filter
    const [ascSortedData, setAscSortedData] = useState(null);
    const [descSortedData, setDescSortedData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [filteredRangeDate, setFilteredRangeData] = useState(null);

    const handleASCSort = () => {
        // Sort the fileData and update the sortedData state
        const sorted = sortASC(fileData);//sortNestedJson(fileData);
        setAscSortedData(sorted);
        setDescSortedData(null);
        setFilteredData(null); // Reset filteredData when sorting is applied
        setFilteredRangeData(null);
      };

    const handleDESCSort = () => {
        // Sort the fileData and update the sortedData state
        const sorted = sortDESC(fileData);//sortNestedJson(fileData);
        setAscSortedData(null);
        setDescSortedData(sorted);
        setFilteredData(null); // Reset filteredData when sorting is applied
        setFilteredRangeData(null);
      };


    const handleZeroFilter = () => {
        // Filter out data with zero value and update the filteredData state
        const filtered = filterZero(fileData)
        setFilteredData(filtered);
        setAscSortedData(null); 
        setDescSortedData(null);  // Reset sortedData when filtering is applied
        setFilteredRangeData(null);
      };

      const handleFilterRange = () => {
        // Get the range values from the user (you may use a prompt or a custom UI)
        const min = parseFloat(prompt("Enter the minimum value:"));
        const max = parseFloat(prompt("Enter the maximum value:"));
      
        // Filter out objects based on the range and update the filteredData state
        const filtered = filterRange(fileData, min, max);
        setFilteredRangeData(filtered);
        setFilteredData(null);
        setAscSortedData(null); 
        setDescSortedData(null)// Reset sortedData when filtering is applied
      };
      
      const handleReset = () => {
        setFilteredRangeData(null);
        setFilteredData(null);
        setAscSortedData(null); 
        setDescSortedData(null)
      };
    
      useEffect(() => {
        // The effect will be triggered whenever the fileData prop changes
        // Here, we can update the sortedData and filteredData states accordingly
        setAscSortedData(null);
        setDescSortedData(null);
        setFilteredData(null);
      }, [fileData]);

    return (
        <div className="unselectableText">
            <div>
                <button onClick={handleASCSort}>Sort-ASC</button>
                <button onClick={handleDESCSort}>Sort-DESC</button>
                <button onClick={handleZeroFilter}>Quick Filter</button>
                <button onClick={handleFilterRange}>Filter</button>
                <button onClick={handleReset}>Reset</button>

            </div>
            <TreeDisplay fileData={ascSortedData || descSortedData || filteredData || filteredRangeDate || fileData} />
        </div>
    );
}