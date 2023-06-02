import React, { useEffect, useState } from "react";
import TreeDisplay from "../treeDisplay/TreeDisplay";
import { sortASC, sortDESC } from "../features/Sort";
import { filterByCategory, filterParentNodes, filterRange } from "../features/Filter";
import "./UploadFile.css";
import "../treeDisplay/TreeDisplay.css";

// insignificant, minor, moderate, high, and severe
const legendData = [
    { color: "green", range: "0 - 0.2", category: "Insignificant", colorCode: "#009a66" },
    { color: "blue", range: "0.2 - 0.4", category: "Minor", colorCode: "#3566cd" },
    { color: "yellow", range: "0.4 - 0.6", category: "Moderate", colorCode: "#fde101" },
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

    // Sort state
    const [sortedData, setSortedData] = useState(null);
    const [sortType, setSortType] = useState(null);

    // Filter state
    const [filteredData, setFilteredData] = useState(null);
    const [filteredType, setFilteredType] = useState(null);

    // Filter range state
    const [filteredRangeData, setFilteredRangeData] = useState(null);
    const [isFilterRangeOpen, setIsFilterRangeOpen] = useState(false);
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");

    // Reset state
    const [reset, setReset] = useState(false);

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

    const handleSort = (sortType) => {
        let sorted;
        if (sortType === "asc") {
            sorted = sortASC(filteredData || fileData);
        } else if (sortType === "desc") {
            sorted = sortDESC(filteredData || fileData);
        }
        setSortedData(sorted);
        setSortType(sortType); // Store the selected sort type
    };
    // insignificant, minor, moderate, high, and severe
    const handleFilterByCategory = (filterType) => {
        let filtered;
        if (filterType === "insignificant") {
            filtered = filterByCategory(fileData, "Insignificant");
        } else if (filterType === "minor") {
            filtered = filterByCategory(fileData, "Minor");
        } else if (filterType === "moderate") {
            filtered = filterByCategory(fileData, "Moderate");
        } else if (filterType === "high") {
            filtered = filterByCategory(fileData, "High");
        } else if (filterType === "severe") {
            filtered = filterByCategory(fileData, "Severe");
        }

        if (filtered) {
            filtered = filterParentNodes(filtered);
        }

        setFilteredData(filtered);
        setFilteredType(filterType);
    };


    /*const handleFilterByRange = () => {
        const min = parseFloat(prompt("Enter the minimum value:"));
        const max = parseFloat(prompt("Enter the maximum value:"));
        const filtered = filterRange(fileData, min, max);
        setIsFilterRangeOpen(true);
        setFilteredRangeData(filtered);
    };*/

    const handleFilterByRange = () => {
        setIsFilterRangeOpen(true);
    };

    const handleApplyFilter = () => {
        const min = parseFloat(minValue);
        const max = parseFloat(maxValue);
        const filtered = filterRange(fileData, min, max);
        setFilteredRangeData(filtered);
        setIsFilterRangeOpen(false);
    };

    const closeModal = () => {
        setIsFilterRangeOpen(false);
    };

    const handleReset = () => {
        setSortedData(null);
        setFilteredData(null);
        setFilteredRangeData(null);
        setReset(true);
    };

    useEffect(() => {
        setSortedData(null);
        setFilteredData(null);
        setFilteredRangeData(null);
        setReset(false);
    }, [fileData]);

    return (
        <div className="unselectableText">
            <div>
                {/* Sort Dropdown */}
                <div className="dropdown">
                    <span className="dropbtn">Sort</span>
                    <div className="dropdown-content">
                        <button className={sortType === "asc" ? "selected" : ""} onClick={() => handleSort("asc")}>
                            Ascending
                        </button>
                        <button className={sortType === "desc" ? "selected" : ""} onClick={() => handleSort("desc")}>
                            Descending
                        </button>
                    </div>
                </div>


                {/* Filter Dropdown: insignificant, minor, moderate, high, and severe */}
                <div className="dropdown">
                    <span className="dropbtn">Filter (Category)</span>
                    <div className="dropdown-content">
                        <button className={filteredType === "insignificant" ? "selected" : ""} onClick={() => handleFilterByCategory("low")}>
                            Insignificant
                        </button>
                        <button className={filteredType === "minor" ? "selected" : ""} onClick={() => handleFilterByCategory("low")}>
                            Minor
                        </button>
                        <button className={filteredType === "moderate" ? "selected" : ""} onClick={() => handleFilterByCategory("low")}>
                            Moderate
                        </button>
                        <button className={filteredType === "high" ? "selected" : ""} onClick={() => handleFilterByCategory("low")}>
                            High
                        </button>
                        <button className={filteredType === "severe" ? "selected" : ""} onClick={() => handleFilterByCategory("low")}>
                            Severe
                        </button>
                    </div>
                </div>

                {/* Filter by Range: */}

                <div className="dropdown">
                    <span className="dropbtn" onClick={() => handleFilterByRange()}>
                        Filter (Range)
                    </span>
                </div>
                {/* Custom Modal */}
                {isFilterRangeOpen && (
                    <div className="custom-modal">
                        <div className="modal-content">
                            <h2>Filter By Range</h2>
                            <input
                                type="text"
                                placeholder="Minimum value"
                                value={minValue}
                                onChange={(e) => setMinValue(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Maximum value"
                                value={maxValue}
                                onChange={(e) => setMaxValue(e.target.value)}
                            />
                            <div className="modal-actions">
                                <button onClick={handleApplyFilter}>Apply</button>
                                <button onClick={closeModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reset Display */}
                <div className="dropdown">
                    <span className="dropbtn" onClick={() => handleReset()}>Reset Sorting & Filtering</span>
                </div>
            </div>

            {/* Legend Display */}
            <div className="legend-container">
                <div className="legend">
                    <h3 className="legend-title">Risk Level</h3>
                    {legendData.map((item) => (
                        <div className="legend-item" key={item.color}>
                            <label htmlFor={item.category} className={`legend-color legend-color-${item.color}`} />
                            <span className="legend-range">{item.range}</span>
                            <span className="legend-category">{item.category}</span>
                        </div>
                    ))}
                </div>
            </div>
            <TreeDisplay fileData={sortedData || filteredData || filteredRangeData || fileData} reset={reset} />
        </div>
    );
}
