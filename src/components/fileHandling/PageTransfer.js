import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import TreeDisplay from "../treeDisplay/TreeDisplay";
import { sortASC, sortDESC, sortASCforWeights, sortDESCforWeights, newSortASCforWeights } from "../features/Sort";
import { filterByCategory, filterByRange } from "../features/Filter";
import { RenderNestedData } from "../features/ListLayout";
import cloneDeep from "lodash/cloneDeep";
import "./UploadFile.css";
import "../treeDisplay/TreeDisplay.css";
import "../top_header/TopHeader.css"


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
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [filteredCategoryData, setfilteredCategoryData] = useState(null);
    const riskLevels = ['Insignificant', 'Minor', 'Moderate', 'High', 'Severe'];
    const [avgValue, setAvgValue] = useState('');
    const [showStatistics, setShowStatistics] = useState(false);

    const [isListLayoutModalOpen, setIsListLayoutModalOpen] = useState(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    //for list layout:
    const [sortOrder, setSortOrder] = useState('none'); // 'none', 'ascending', 'descending'
    const [showSortOptions, setShowSortOptions] = useState(false);

    const [categoryButtonStatus, setCategoryButtonStatus] = useState(() => {
        const initialStatus = {
            Insignificant: true,
            Minor: false,
            Moderate: false,
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
        } else if (sortType === "asc_weight") {
            sorted = newSortASCforWeights(filteredCategoryData || fileData);
        } else if (sortType === "desc_weight") {
            sorted = sortDESCforWeights(filteredCategoryData || fileData);
        }
        setSortedData(sorted);
        setSortType(sortType);
    };

    /*const handleFilterByCategory = async (filterType) => {
        setSelectedCategory(filterType);
        // Create a deep copy of fileData
        let fileDataCopy = cloneDeep(fileData);
        // Filter the data based on the selected category using the copy
        let filtered = filterByCategory(fileDataCopy, filterType);
        setfilteredCategoryData(filtered);
    };*/
    const handleFilterByOneCategory = async (filterType) => {
        setSelectedCategory(filterType);
        // Create a deep copy of fileData
        let fileDataCopy = cloneDeep(fileData);
        // Filter the data based on the selected category using the copy
        let filtered = filterByCategory(fileDataCopy, filterType);
        setfilteredCategoryData(filtered);
    }
    const handleFilterByMultipleCategories = async () => {
        // Create a deep copy of fileData
        let fileDataCopy = cloneDeep(fileData);

        // If there are selected categories, filter the data
        if (selectedCategories.length > 0) {
            let filtered = fileDataCopy;
            selectedCategories.forEach((filterType) => {
                filtered = filterByCategory(filtered, filterType);
            });
            setfilteredCategoryData(filtered);
        } else {
            // If no categories are selected, reset the filtered data
            setfilteredCategoryData(null);
        }
    };

    const handleFilterByCategory = (category) => {
        let newSelectedCategories = [...selectedCategories];
        if (newSelectedCategories.includes(category)) {
            newSelectedCategories = newSelectedCategories.filter((item) => item !== category);
        } else {
            newSelectedCategories.push(category);
        }
        setSelectedCategories(newSelectedCategories);

        // Call the new multiple category filter function
        handleFilterByMultipleCategories();
    };

    const handleCustomCheckbox = (category) => {
        const checkboxElement = document.getElementById(`custom-${category}`);
        if (checkboxElement.classList.contains("checked")) {
            checkboxElement.classList.remove("checked");
        } else {
            checkboxElement.classList.add("checked");
        }
        handleFilterByCategory(category);
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

    const handleLayoutModalOpen = () => {
        const layoutModal = document.querySelector(".layout-modal");
        layoutModal.style.display = "block";
    };

    // for list layout:
    const openListLayoutModal = () => {
        setIsListLayoutModalOpen(true);
    };

    const closeListLayoutModal = () => {
        setIsListLayoutModalOpen(false);
    };

    const sortData = (data) => {
        if (sortOrder === 'ascending') {
            return Object.entries(data).sort(([, a], [, b]) => a - b);
        } else if (sortOrder === 'descending') {
            return Object.entries(data).sort(([, a], [, b]) => b - a);
        } else {
            return Object.entries(data);
        }
    };

    const renderNestedData = (data, level = 0, parentKey = '') => {
        let nameValue = {};
        return (
            <ul className={"nested-list-level-" + level}>
                {Object.keys(data).sort((a, b) => {
                    const order = ['tqi', 'quality_aspects', 'product_factors', 'measures', 'diagnostics'];
                    return order.indexOf(a) - order.indexOf(b);
                }).map((key) => {
                    if (key === "name" || key === "value") {
                        nameValue[key] = data[key];
                        if (nameValue["name"] && nameValue["value"] !== undefined) {
                            return (
                                <li key={`${parentKey}-${nameValue["name"]}`} className="nested-list-item">
                                    <span className={"nested-list-key-value level-" + level}>
                                        {nameValue["name"]}: {nameValue["value"]}
                                    </span>
                                </li>
                            );
                        }
                        return null;
                    }

                    if (
                        key === "product_factors" ||
                        key === "quality_aspects" ||
                        key === "tqi" ||
                        key === "measures" ||
                        key === "diagnostics"
                    ) {
                        return (
                            <li key={`${parentKey}-${key}`} className="nested-list-item">
                                <span className={"nested-list-key level-" + level}>{key}:</span>
                                {typeof data[key] === "object" ? renderNestedData(data[key], level + 1, `${parentKey}-${key}`) : null}
                            </li>
                        );
                    }

                    if (typeof data[key] === "object") {
                        return renderNestedData(data[key], level + 1, `${parentKey}-${key}`);
                    }

                    return null;
                })}
            </ul>
        );
    };
    
    /*
        const renderNestedData = (data, level = 0, parentKey = '') => {
            let nameValue = {};
            return (
                <ul className={"nested-list-level-" + level}>
                    {Object.keys(data).sort((a, b) => {
                        const order = ['tqi', 'quality_aspects', 'product_factors', 'measures', 'diagnostics'];
                        return order.indexOf(a) - order.indexOf(b);
                    }).map((key, index) => {
                        if (key === "name" || key === "value") {
                            nameValue[key] = data[key];
                            if (nameValue["name"] && nameValue["value"] !== undefined) {
                                return (
                                    <li key={`${parentKey}-${key}`} className="nested-list-item">
                                        <span className={"nested-list-key-value level-" + level}>
                                            {nameValue["name"]}: {nameValue["value"]}
                                        </span>
                                    </li>
                                );
                            }
                            return null;
                        }
    
                        if (
                            key === "product_factors" ||
                            key === "quality_aspects" ||
                            key === "tqi" ||
                            key === "measures" ||
                            key === "diagnostics"
                        ) {
                            return (
                                <li key={`${parentKey}-${key}`} className="nested-list-item">
                                    <span className={"nested-list-key level-" + level}>{key}:</span>
                                    {typeof data[key] === "object" ? renderNestedData(data[key], level, key) : null}
                                </li>
                            );
                        }
    
                        if (typeof data[key] === "object") {
                            return renderNestedData(data[key], level + 1);
                        }
    
                        return null;
                    })}
                </ul>
            );
        };
    */
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
        setSelectedCategories([]);  // Add this line to uncheck all checkboxes
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
            {/* Descriptive Statistics Panel Button */}
            <button className="statistics-button" onClick={() => setShowStatistics(!showStatistics)}>Descriptive Statistics</button>

            {/* Descriptive Statistics Panel Content */}
            {showStatistics && (
                <div className="statistics-panel">
                    {/* <h3>Descriptive Statistics</h3> */}
                    {/* Quality Characteristics */}
                    <h4>Quality Characteristics</h4>
                    <p>Severe: {0}</p>
                    <p>High: {0}</p>
                    <p>Medium: {0}</p>
                    <p>Low: {0}</p>
                    <p>Insignificant: {6}</p>

                    {/* Quality Factors */}
                    <h4>Quality Factors</h4>
                    <p>Severe: {0}</p>
                    <p>High: {1}</p>
                    <p>Medium: {0}</p>
                    <p>Low: {0}</p>
                    <p>Insignificant: {34}</p>

                    {/* Quality Factors Measures */}
                    <h4>Measures for Quality Factors</h4>
                    <p>Severe: {0}</p>
                    <p>High: {0}</p>
                    <p>Medium: {1}</p>
                    <p>Low: {0}</p>
                    <p>Insignificant: {161}</p>
                </div>
            )}

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
                            Value - Ascending
                        </button>
                        <button className={sortType === "desc" ? "selected" : ""} onClick={() => handleSort("desc")}>
                            Value - Descending
                        </button>
                        <button className={sortType === "asc_weight" ? "selected" : ""} onClick={() => handleSort("asc_weight")}>
                            Weight - Ascending
                        </button>
                        <button className={sortType === "desc_weight" ? "selected" : ""} onClick={() => handleSort("desc_weight")}>
                            Weight - Descending
                        </button>
                    </div>
                </div>

                {/* Filter Dropdown */}
                <div className="dropdown">
                    <span className="dropbtn">Filter (Category)</span>
                    <div className="dropdown-content">
                        {Object.keys(categoryButtonStatus).map(category => (
                            <button
                                key={category}
                                className={`${selectedCategory === category ? "selected" : ""} ${!categoryButtonStatus[category] ? "disabled" : ""}`}
                                onClick={() => handleFilterByOneCategory(category)}
                                disabled={!categoryButtonStatus[category]}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filter Dropdown */}
                <div className="dropdown">
                    <span className="dropbtn">Filter (Category) multiple</span>
                    <div className="dropdown-content">
                        {Object.keys(categoryButtonStatus).map(category => (
                            <div key={category} className="checkbox-container" onClick={() => handleCustomCheckbox(category)}>
                                <span id={"custom-" + category} className={"custom-checkbox " + (selectedCategories.includes(category) ? "checked" : "")}></span>
                                <label htmlFor={category}>{category}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filter by Range */}
                <div className="dropdown">
                    <span className="dropbtn" onClick={() => handleFilterByRange()}>
                        Filter (Values Range)
                    </span>
                </div>

                {/* Filter by Range of weights */}
                <div className="dropdown">
                    <span className="dropbtn" onClick={() => handleFilterByRange()}>
                        Filter (Weights Range)
                    </span>
                </div>


                {/* Layout Options Dropdown */}
                <div className="dropdown">
                    <span className="dropbtn">Layout Options</span>
                    <div className="dropdown-content">
                        <button className="layout-btn-doing">Tree</button>
                        <button className="layout-btn-doing" onClick={openListLayoutModal}>List</button>
                    </div>
                </div>
                {/* List Layout Modal */}
                <Modal
                    isOpen={isListLayoutModalOpen}
                    onRequestClose={closeListLayoutModal}
                    contentLabel="List Layout Modal"
                >
                    <h2>List Layout</h2>

                    <button onClick={() => setShowSortOptions(!showSortOptions)}>Sort - Values</button>
                    {showSortOptions && (
                        <div className="dropdown">
                            <button onClick={() => setSortOrder('ascending')}>Ascending</button>
                            <button onClick={() => setSortOrder('descending')}>Descending</button>
                        </div>
                    )}

                    <button onClick={closeListLayoutModal}>Filter - Values</button>

                    <button onClick={closeListLayoutModal}>Close</button>
                    {/* {RenderNestedData(fileData)} */}
                    {renderNestedData(fileData)}
                </Modal>


                {/* Custom Modal */}
                {
                    isFilterRangeOpen && (
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
                    )
                }


            </div >

            {/* Legend Display */}
            < div className="legend-container" >
                <div className="legend">
                    <h3 className="legend-title">Risk Level</h3>
                    {legendData.map((item) => (
                        <div className="legend-item" key={item.color}>
                            <label htmlFor={item.category} className={`legend-color legend-color-${item.color}`} />

                            <span className="legend-category">{item.category}</span>
                            <span className="legend-range">(quality score: {item.range})</span>
                        </div>
                    ))}
                </div>
            </div >

            {/* Tree Display */}
            < TreeDisplay
                fileData={sortedData || filteredCategoryData || filteredRangeData || fileData
                }
                reset={reset}
            />
        </div >
    );
}
