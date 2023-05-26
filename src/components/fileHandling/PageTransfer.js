import React, { useEffect, useState } from "react";
import TreeDisplay from "../treeDisplay/TreeDisplay";
import { sortASC, sortDESC } from "../features/Sort";
import { filterZero, filterRange } from "../features/Filter";
import "./UploadFile.css"
import "../treeDisplay/TreeDisplay.css"

const legendData = [
    { color: "green", range: "0 - 0.2", category: "Low", colorCode: "#009a66" },
    { color: "blue", range: "0.2 - 0.4", category: "Guarded", colorCode: "#3566cd" },
    { color: "yellow", range: "0.4 - 0.6", category: "Elevated", colorCode: "#fde101" },
    { color: "orange", range: "0.6 - 0.8", category: "High", colorCode: "#ff6500" },
    { color: "red", range: "0.8 - 1", category: "Severe", colorCode: "#cb0032" }
];

function getColor(value) {
    if (value >= 0 && value <= 0.2) {
        return "green";
    } else if (value > 0.2 && value <= 0.4) {
        return "blue";
    } else if (value > 0.4 && value <= 0.6) {
        return "yellow";
    } else if (value > 0.6 && value <= 0.8) {
        return "orange";
    } else if (value > 0.8 && value <= 1) {
        return "red";
    } else {
        return "black"; // Default color if value is outside the defined ranges
    }
}


export default function PageTransfer(props) {

    const { fileData } = props;
    // sort and filter
    const [ascSortedData, setAscSortedData] = useState(null);
    const [descSortedData, setDescSortedData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [filteredRangeDate, setFilteredRangeData] = useState(null);

    const renderTreeNode = (node) => {
        const value = node.value || 0; // If value is not available, default to 0
        const color = getColor(value);
        return (
            <div className="tree-node" style={{ backgroundColor: color }}>
                <span className="node-name">{node.name}</span>
                {/* Render child nodes recursively */}
                {node.children && node.children.map((child) => renderTreeNode(child))}
            </div>
        );
    };

    function renderLegend() {
        return (
            <div className="legend">
                <h3>Legend</h3>
                {legendData.map((item) => (
                    <div key={item.color}>
                        <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                        <span className="legend-range">{item.range}</span>
                        <span className="legend-category">{item.category}</span>
                    </div>
                ))}
            </div>
        );
    }


    const handleASCSort = () => {
        // Sort the fileData and update the sortedData state
        const sorted = sortASC(filteredData || fileData);//sortNestedJson(fileData);
        setAscSortedData(sorted);
        setDescSortedData(null);
        setFilteredData(null); // Reset filteredData when sorting is applied
        setFilteredRangeData(null);
    };

    const handleDESCSort = () => {
        // Sort the fileData and update the sortedData state
        const sorted = sortDESC(filteredData || fileData);//sortNestedJson(fileData);
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
                <button className="sort-btn" onClick={handleASCSort}>Sort-ASC</button>
                <button className="sort-btn" onClick={handleDESCSort}>Sort-DESC</button>
                <button className="filter-btn" onClick={handleZeroFilter}>Quick Filter (Severe Only) </button>
                {/*}
                <button className="filter-btn" onClick={handleZeroFilter}>Quick Filter (Worst 10%)</button>
                */}
                <button className="filter-btn" onClick={handleFilterRange}>Range Filter (Min-Max)</button>
                <button onClick={handleReset}>Reset Sorting & Filtering</button>
            </div>
            <div className="legend-container">
                <div className="legend">
                    <h3 className="legend-title">Risk Level</h3>
                    {legendData.map((item) => (
                        <div className="legend-item" key={item.color}>
                            <span className={`legend-color legend-color-${item.color}`} />
                            <span className="legend-range">{item.range}</span>
                            <span className="legend-category">{item.category}</span>
                        </div>
                    ))}
                </div>
            </div>
            <TreeDisplay fileData={ascSortedData || descSortedData || filteredData || filteredRangeDate || fileData} />
        </div>
    );
}