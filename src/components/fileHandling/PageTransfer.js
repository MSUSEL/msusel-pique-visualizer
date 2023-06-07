import React, { useEffect, useState } from "react";
import TreeDisplay from "../treeDisplay/TreeDisplay";
import { sortASC, sortDESC } from "../features/Sort";
import { filterByCategory, filterByRange, checkOneCategoryStatus } from "../features/Filter";
import "./UploadFile.css";
import "../treeDisplay/TreeDisplay.css";
import cloneDeep from "lodash/cloneDeep";


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
    const [initialFileData, setInitialFileData] = useState(null);

    const [sortedData, setSortedData] = useState(null);
    const [sortType, setSortType] = useState(null);

    const [filteredRangeData, setFilteredRangeData] = useState(null);
    const [isFilterRangeOpen, setIsFilterRangeOpen] = useState(false);
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");

    const [reset, setReset] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredCategoryData, setfilteredCategoryData] = useState(null);
    const riskLevels = ['Insignificant', 'Minor', 'Moderate', 'High', 'Severe'];

    const [categoryButtonStatus, setCategoryButtonStatus] = useState(() => {
        const initialStatus = {
            Insignificant: true,
            Minor: true,
            Moderate: true,
            High: true,
            Severe: true
        };
        /*
        for (const level of riskLevels) {
            const { productFactorsCount, qualityAspectsCount } = checkOneCategoryStatus(fileData, level);
            if (productFactorsCount + qualityAspectsCount === 0) {
                initialStatus[level] = false;
            }
            console.log(initialStatus[level])
        }*/
        return initialStatus;
    });

    const handleSort = (sortType) => {
        let sorted;
        if (sortType === "asc") {
            sorted = sortASC(filteredCategoryData || fileData);
        } else if (sortType === "desc") {
            sorted = sortDESC(filteredCategoryData || fileData);
        }
        setSortedData(sorted);
        setSortType(sortType);
    };

    const handleFilterByCategory = async (filterType) => {
        setSelectedCategory(filterType);
        // Create a deep copy of fileData
        let fileDataCopy = cloneDeep(fileData);
        // Filter the data based on the selected category using the copy
        let filtered = filterByCategory(fileDataCopy, filterType);
        setfilteredCategoryData(filtered);
    };

    const handleFilterByRange = () => {
        setIsFilterRangeOpen(true);
    };

    const handleApplyFilter = () => {
        let min = parseFloat(minValue);
        let max = parseFloat(maxValue);
        //const filtered = filterRange(fileData, min, max);
        let fileDataCopy = cloneDeep(fileData);
        // Filter the data based on the selected category using the copy
        let filtered = filterByRange(sortedData || fileDataCopy, min, max);
        console.log("filter by range:")
        console.log("fileData", fileData)
        console.log("filter results", filtered)
        setFilteredRangeData(filtered);
        setIsFilterRangeOpen(false);
    };

    const closeModal = () => {
        setIsFilterRangeOpen(false);
    };

    const handleReset = () => {
        console.log("reset:")
        console.log("fileData", fileData);
        setSortedData(null);
        setSortType(null);
        setfilteredCategoryData(null);
        setFilteredRangeData(null);
        setMinValue("");
        setMaxValue("");
        setSelectedCategory("");
        setReset(true);
        setTimeout(() => {
            setReset(false);
            setfilteredCategoryData(null);
            setFilteredRangeData(null);
        }, 0);
    };

    useEffect(() => {
        if (fileData) {
            setInitialFileData(fileData);
        }
    }, [fileData]);


    useEffect(() => {
        if (reset) {
            setSortedData(null)
            setfilteredCategoryData(null);
            setFilteredRangeData(null);
        }
    }, [reset]);



    return (
        <div className="unselectableText">
            <div>
                {/* Reset Display */}
                <div className="dropdown">
                    <span className="dropbtn" onClick={() => handleReset()}>
                        Reset Sorting & Filtering
                    </span>
                </div>
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
                            className={`${selectedCategory === "Insignificant" ? "selected" : ""} ${!categoryButtonStatus.Insignificant ? "disabled" : ""}`}
                            onClick={() => handleFilterByCategory("Insignificant")}
                            disabled={!categoryButtonStatus.Insignificant}
                        >
                            Insignificant
                        </button>
                        <button
                            className={`${selectedCategory === "Minor" ? "selected" : ""} ${!categoryButtonStatus.Minor ? "disabled" : ""}`}
                            onClick={() => handleFilterByCategory("Minor")}
                            disabled={!categoryButtonStatus.Minor}
                        >
                            Minor
                        </button>
                        <button
                            className={`${selectedCategory === "Moderate" ? "selected" : ""} ${!categoryButtonStatus.Moderate ? "disabled" : ""}`}
                            onClick={() => handleFilterByCategory("Moderate")}
                            disabled={!categoryButtonStatus.Moderate}
                        >
                            Moderate
                        </button>
                        <button
                            className={`${selectedCategory === "High" ? "selected" : ""} ${!categoryButtonStatus.High ? "disabled" : ""}`}
                            onClick={() => handleFilterByCategory("High")}
                            disabled={!categoryButtonStatus.High}
                        >
                            High
                        </button>
                        <button
                            className={`${selectedCategory === "Severe" ? "selected" : ""} ${!categoryButtonStatus.Severe ? "disabled" : ""}`}
                            onClick={() => handleFilterByCategory("Severe")}
                            disabled={!categoryButtonStatus.Severe}
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
                fileData={sortedData || filteredCategoryData || filteredRangeData || fileData}
                reset={reset}
            />
        </div>
    );
}
