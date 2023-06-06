import React, { useEffect, useState } from "react";
import TreeDisplay from "../treeDisplay/TreeDisplay";
import { sortASC, sortDESC } from "../features/Sort";
import { filterByCategory, filterParentNodes, filterRange, filterNodesByCategory, filterEdgesByNodes } from "../features/Filter";
import "./UploadFile.css";
import "../treeDisplay/TreeDisplay.css";

const legendData = [
    { color: "red", range: "0 - 0.2", category: "Severe", colorCode: "#cb0032" },
    { color: "orange", range: "0.2 - 0.4", category: "High", colorCode: "#ff6500" },
    { color: "yellow", range: "0.4 - 0.6", category: "Moderate", colorCode: "#fde101" },
    { color: "blue", range: "0.6 - 0.8", category: "Minor", colorCode: "#3566cd" },
    { color: "green", range: "0.8 - 1", category: "Insignificant", colorCode: "#009a66" }
];

function getColor(value) {
    if (value >= 0.8 && value <= 1) {
        return "green";
    } else if (value > 0.6 && value <= 0.8) {
        return "blue";
    } else if (value > 0.4 && value <= 0.6) {
        return "yellow";
    } else if (value > 0.2 && value <= 0.4) {
        return "orange";
    } else if (value > 0 && value <= 0.2) {
        return "red";
    } else {
        return "black"; // Default color if value is outside the defined ranges
    }
}

export default function PageTransfer(props) {
    const { fileData } = props;
    const [initialFileData, setInitialFileData] = useState(null); // New state variable

    const [sortedData, setSortedData] = useState(null);
    const [sortType, setSortType] = useState(null);

    const [filteredRangeData, setFilteredRangeData] = useState(null);
    const [isFilterRangeOpen, setIsFilterRangeOpen] = useState(false);
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");

    const [reset, setReset] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredData, setFilteredData] = useState(null);

    const [filteredTreeData, setFilteredTreeData] = useState(null);


    const handleSort = (sortType) => {
        let sorted;
        if (sortType === "asc") {
            sorted = sortASC(filteredData || fileData);
        } else if (sortType === "desc") {
            sorted = sortDESC(filteredData || fileData);
        }
        setSortedData(sorted);
        setSortType(sortType);
    };

    const handleFilterByCategory = (filterType) => {
        setSelectedCategory(filterType);

        const filtered = filterByCategory(fileData, filterType);
        console.log(filtered);

        if (filtered.factors.product_factors === 0 && filtered.factors.quality_aspects === 0) {
            setFilteredData(initialFileData || fileData); // Use initialFileData here
            alert("There are no nodes under this category");
        } else {
            setFilteredData(filtered);
        }
    };

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
        console.log(fileData);
        setSortedData(null);
        setSortType(null);
        setFilteredData(null);
        setFilteredRangeData(null);
        setMinValue("");
        setMaxValue("");
        setSelectedCategory("");
        setFilteredTreeData(null);
        setReset(true);
        // Set the reset state to false after resetting
        setTimeout(() => {
          setReset(false);
          setFilteredData(null);
          setFilteredRangeData(null);
          setFilteredTreeData(null);
        }, 0);
      };
      

    useEffect(() => {
        if (!initialFileData && fileData) {
            setInitialFileData(fileData); // Set initialFileData when fileData is initially loaded
        }
    }, [fileData, initialFileData]);

    useEffect(() => {
        if (filteredData) {
            setFilteredTreeData(filteredData);
        } else {
            setFilteredTreeData(null); // Reset the filteredTreeData when filteredData is null
        }
    }, [filteredData]);

    useEffect(() => {
        if (reset) {
            setFilteredData(null);
            setFilteredRangeData(null);
            setFilteredTreeData(null);
        }
    }, [reset]);

    useEffect(() => {
        if (filteredData) {
            setFilteredTreeData(filteredData);
        }
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

                {/* Filter Dropdown */}
                <div className="dropdown">
                    <span className="dropbtn">Filter (Category)</span>
                    <div className="dropdown-content">
                        <button
                            className={selectedCategory === "Insignificant" ? "selected" : ""}
                            onClick={() => handleFilterByCategory("Insignificant")}
                        >
                            Insignificant
                        </button>
                        <button
                            className={selectedCategory === "Minor" ? "selected" : ""}
                            onClick={() => handleFilterByCategory("Minor")}
                        >
                            Minor
                        </button>
                        <button
                            className={selectedCategory === "Moderate" ? "selected" : ""}
                            onClick={() => handleFilterByCategory("Moderate")}
                        >
                            Moderate
                        </button>
                        <button
                            className={selectedCategory === "High" ? "selected" : ""}
                            onClick={() => handleFilterByCategory("High")}
                        >
                            High
                        </button>
                        <button
                            className={selectedCategory === "Severe" ? "selected" : ""}
                            onClick={() => handleFilterByCategory("Severe")}
                        >
                            Severe
                        </button>
                    </div>
                </div>

                {/* Filter by Range */}
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
                    <span className="dropbtn" onClick={() => handleReset()}>
                        Reset Sorting & Filtering
                    </span>
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

            {/* Tree Display */}
            <TreeDisplay
                fileData={sortedData || filteredData || filteredTreeData || filteredRangeData || fileData}
                reset={reset}
            />
        </div>
    );
}
