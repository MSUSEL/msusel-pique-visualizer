import React, { useEffect, useState } from "react";
import TreeDisplay from "../treeDisplay/TreeDisplay";
import { sortASC, sortDESC } from "../features/Sort";
import { filterByCategory, filterRange } from "../features/Filter";
import "./UploadFile.css";
import "../treeDisplay/TreeDisplay.css";

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
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [sortedData, setSortedData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [filteredRangeData, setFilteredRangeData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null); // Updated to store selected category

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
        setFilteredData(null);
        setFilteredRangeData(null);
    };

    const handleFilterByCategory = (category) => {
        setSelectedCategory(category); // Store the selected category
        const filtered = filterByCategory(fileData, category);
        if (!filtered) {
            alert(`No nodes found in the ${category} category.`);
        }
        setFilteredData(filtered);
        setSortedData(null);
        setFilteredRangeData(null);
    };

    const handleApplyFilter = () => {
        const filtered = filterByCategory(fileData, selectedCategory);
        setFilteredData(filtered);
        setSortedData(null);
        setFilteredRangeData(null);
    };

    const handleFilterRange = () => {
        const min = parseFloat(prompt("Enter the minimum value:"));
        const max = parseFloat(prompt("Enter the maximum value:"));
        const filtered = filterRange(fileData, min, max);
        setFilteredRangeData(filtered);
        setFilteredData(null);
        setSortedData(null);
    };

    const handleReset = () => {
        setFilteredRangeData(null);
        setFilteredData(null);
        setSortedData(null);
        setSelectedCategory(null);
    };

    useEffect(() => {
        setSortedData(null);
        setFilteredData(null);
        setFilteredRangeData(null);
        setSelectedCategory(null);
    }, [fileData]);

    return (
        <div className="unselectableText">
            <div>
                <div className="sort-dropdown">
                    <button className="sort-btn" onClick={() => setShowSortOptions(!showSortOptions)}>
                        Sort
                    </button>
                    {showSortOptions && (
                        <div className="sort-options">
                            <button className="sort-option" onClick={() => handleSort("asc")}>
                                Ascending
                            </button>
                            <button className="sort-option" onClick={() => handleSort("desc")}>
                                Descending
                            </button>
                        </div>
                    )}
                </div>
                <div className="filter-dropdown">
                    <button className="filter-btn" onClick={handleApplyFilter}> {/* Updated to call handleApplyFilter */}
                        Filter (Category)
                    </button>
                    {selectedCategory && (
                        <div className="selected-category">
                            Selected Category: {selectedCategory}
                        </div>
                    )}
                    <div className="filter-options">
                        {legendData.map((item) => (
                            <button
                                key={item.category}
                                className={`filter-option ${selectedCategory === item.category ? "active" : ""}`}
                                onClick={() => handleFilterByCategory(item.category)}
                            >
                                {item.category}
                            </button>
                        ))}
                    </div>
                </div>

                <button className="filter-btn" onClick={handleFilterRange}>
                    Filter (Range)
                </button>
                <button onClick={handleReset}>Reset Sorting & Filtering</button>
            </div>
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
            <TreeDisplay fileData={sortedData || filteredData || filteredRangeData || fileData} />
        </div>
    );
}
