import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import TreeDisplay from "../treeDisplay/TreeDisplay";
import { sortASCforValues, sortDESCforValues, sortASCforWeights, sortDESCforWeights } from "../features/Sort";
import { filterByValueRange, filterRiskLevels, filterByWeightRange } from "../features/Filter";
import { RenderNestedData } from "../features/ListLayout";
import cloneDeep from "lodash/cloneDeep";
import "./UploadFile.css";
import "../treeDisplay/TreeDisplay.css";
import "../top_header/TopHeader.css";

const legendData = [
    { color: "red", range: "0 - 0.2", category: "Severe", colorCode: "#cb0032" },
    { color: "orange", range: "0.2 - 0.4", category: "High", colorCode: "#ff6500" },
    { color: "yellow", range: "0.4 - 0.6", category: "Moderate", colorCode: "#fde101" },
    { color: "blue", range: "0.6 - 0.8", category: "Minor", colorCode: "#3566cd" },
    { color: "green", range: "0.8 - 1", category: "Insignificant", colorCode: "#009a66" }
];

export default function PageTransfer(props) {
    const { fileData } = props;
    // initilize
    const [initialFileData, setInitialFileData] = useState(null);
    // sort, by values or by weights
    const [sortedData, setSortedData] = useState(null);
    const [sortType, setSortType] = useState(null);

    //reset
    const [reset, setReset] = useState(false);
    // filter
    //1. by risk level
    const [selectedRiskLevels, setSelectedRiskLevels] = useState([]);
    const [isDoneButtonClickable, setIsDoneButtonClickable] = useState(false);
    const [filteredCategoryData, setfilteredCategoryData] = useState(null);
    // 2. by range, value or weight, min - max
    const [filteredRangeData, setFilteredRangeData] = useState(null);
    const [isFilterRangeOpen, setIsFilterRangeOpen] = useState(false);
    const [isWeightFilterRangeOpen, setIsWeightFilterRangeOpen] = useState(false);
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");

    // descriptiove statistics
    const [showStatistics, setShowStatistics] = useState(false);

    //for list layout:
    const [isListPanelOpen, setIsListPanelOpen] = useState(false);
    const [isListLayoutModalOpen, setIsListLayoutModalOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('none'); // 'none', 'ascending', 'descending'
    const [listSortedData, setListSortedData] = useState(null);
    useEffect(() => {
        console.log("Current sort order:", sortOrder);
        if (fileData && sortOrder) {
            const listSorted = deepSort(fileData, sortOrder);
            setListSortedData(listSorted);
            console.log(listSortedData)
        }
    }, [fileData, sortOrder]);

    // sort
    const handleSort = (sortType) => {
        let sorted;
        let fileDataCopy = cloneDeep(fileData);
        if (sortType === "asc_value") {
            sorted = sortASCforValues(filteredCategoryData || fileDataCopy);
        } else if (sortType === "desc_value") {
            sorted = sortDESCforValues(filteredCategoryData || fileDataCopy);
        } else if (sortType === "asc_weight") {
            sorted = sortASCforWeights(filteredCategoryData || fileDataCopy);
        } else if (sortType === "desc_weight") {
            sorted = sortDESCforWeights(filteredCategoryData || fileDataCopy);
        }
        setSortedData(sorted);
        setSortType(sortType);
    };

    // filer - one or multiple risk level categories
    // Handle checkbox changes
    const handleCheckboxChange = (riskLevel) => {
        if (selectedRiskLevels.includes(riskLevel)) {
            // Remove the risk level from the array
            setSelectedRiskLevels(selectedRiskLevels.filter(item => item !== riskLevel));
        } else {
            // Add the risk level to the array
            setSelectedRiskLevels([...selectedRiskLevels, riskLevel]);
        }
    }
    React.useEffect(() => {
        setIsDoneButtonClickable(selectedRiskLevels.length > 0);
    }, [selectedRiskLevels]);
    // Perform filtering based on selected risk levels
    const handleDoneClick = () => {
        let fileDataCopy = cloneDeep(fileData);
        let filteredFileData = filterRiskLevels(sortedData || fileDataCopy, selectedRiskLevels);
        setfilteredCategoryData(filteredFileData);

        console.log("Performing filtering with selected risk levels:", selectedRiskLevels);
        console.log("Filtered file data:", filteredFileData);
    };

    // filter by range - node values
    const handlefilterByValueRange = () => {
        setIsFilterRangeOpen(true);
    };

    const handleApplyFilterByValueRange = () => {
        let min = parseFloat(minValue);
        let max = parseFloat(maxValue);
        //const filtered = filterRange(fileData, min, max);
        let fileDataCopy = cloneDeep(fileData);
        // Filter the data based on the selected category using the copy
        let filtered = filterByValueRange(sortedData || fileDataCopy, min, max);
        console.log("filter by range:")
        console.log("fileData", fileData)
        console.log("filter results", filtered)
        setFilteredRangeData(filtered);
        setIsFilterRangeOpen(false);
    };

    const closeModal = () => {
        setIsFilterRangeOpen(false);
    };

    // filter by range - edge weights
    const handleFilterByWeightRange = () => {
        setIsWeightFilterRangeOpen(true);
    };

    const handleApplyFilterbyWeightRange = () => {
        let min = parseFloat(minValue);
        let max = parseFloat(maxValue);
        //const filtered = filterRange(fileData, min, max);
        let fileDataCopy = cloneDeep(fileData);
        // Filter the data based on the selected category using the copy
        let filtered = filterByWeightRange(sortedData || fileDataCopy, min, max);//weightRangeData;

        setFilteredRangeData(filtered);
        setIsWeightFilterRangeOpen(false);
    };

    const closeWeightModal = () => {
        setIsWeightFilterRangeOpen(false);
    };


    // List layout:
    const openListLayoutModal = () => {
        setIsListLayoutModalOpen(true);
    };

    const closeListLayoutModal = () => {
        setIsListLayoutModalOpen(false);
    };

    const deepSort = (obj, order) => {
        if (Array.isArray(obj)) {
            return obj.sort((a, b) => {
                if (order === 'ascending') {
                    return a.value - b.value;
                } else {
                    return b.value - a.value;
                }
            }).map(item => deepSort(item, order));
        } else if (typeof obj === 'object') {
            const sortedObj = {};
            Object.keys(obj).sort().forEach(key => {
                if (['quality_aspects', 'product_factors', 'measures', 'diagnostics'].includes(key) && Array.isArray(obj[key])) {
                    obj[key].sort((a, b) => {
                        if (order === 'ascending') {
                            return a.value - b.value;
                        } else {
                            return b.value - a.value;
                        }
                    });
                }
                sortedObj[key] = deepSort(obj[key], order);
            });
            return sortedObj;
        } else {
            return obj;
        }
    };


    const renderNestedData = (data, level = 0, parentKey = '', sortOrder = 'ascending') => {
        // console.log("Data passed to renderNestedData:", data);  // <-- Add this line
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
                                <li key={index} className="nested-list-item">
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
                        let sortedData = data[key];
                        if (Array.isArray(sortedData)) {
                            sortedData.sort((a, b) => {
                                if (sortOrder === 'ascending') {
                                    return a.value - b.value;
                                } else {
                                    return b.value - a.value;
                                }
                            });
                        }
                        return (
                            <li key={index} className="nested-list-item">
                                <span className={"nested-list-key level-" + level}>{key}:</span>
                                {typeof sortedData === "object" ? renderNestedData(sortedData, level + 1, key, sortOrder) : null}
                            </li>
                        );
                    }

                    if (typeof data[key] === "object") {
                        return renderNestedData(data[key], level + 1, '', sortOrder);
                    }

                    return null;
                })}
            </ul>
        );
    };


    // new list layout
    const toggleListPanel = () => {
        setIsListPanelOpen(!isListPanelOpen);
    };

    // Define the function that returns the list panel JSX
    const renderListPanel = (fileData) => {
        try {
            return (
                <div className="list-panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* Sort Dropdown */}
                            <div className="dropdown">
                                <span className="dropbtn">Sort</span>
                                <div className="dropdown-content">
                                    {/* sorting options */}
                                    <button className={sortType === "asc_value" ? "selected" : ""} onClick={() => handleSort("asc_value")}>
                                        Value - Ascending
                                    </button>
                                    <button className={sortType === "desc_value" ? "selected" : ""} onClick={() => handleSort("desc_value")}>
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
                                <span className="dropbtn">Filter</span>
                                <div className="dropdown-content">
                                    {/* Sub-button for Filter by Risk Levels */}
                                    <div className="sub-dropdown">
                                        <span className="dropbtn">Filter (Risk Levels)</span>
                                        <div className="sub-dropdown-content">
                                            {['Insignificant', 'Minor', 'Moderate', 'High', 'Severe'].map(riskLevel => (
                                                <div key={riskLevel}>
                                                    <input
                                                        type="checkbox"
                                                        id={riskLevel}
                                                        name={riskLevel}
                                                        checked={selectedRiskLevels.includes(riskLevel)}
                                                        onChange={() => handleCheckboxChange(riskLevel)}
                                                    />
                                                    <label htmlFor={riskLevel}>{riskLevel}</label>
                                                </div>
                                            ))}
                                            <button
                                                onClick={handleDoneClick}
                                                disabled={!isDoneButtonClickable}
                                                style={{
                                                    backgroundColor: isDoneButtonClickable ? 'lightgreen' : 'lightgray'
                                                }}
                                            >
                                                Done
                                            </button>
                                        </div>
                                    </div>

                                    {/* Sub-button for Filter by Values Range */}
                                    <div className="sub-dropdown">
                                        <span className="dropbtn" onClick={() => handlefilterByValueRange()}>
                                            Filter (Values Range)
                                        </span>
                                    </div>

                                    {/* Sub-button for Filter by Weights Range */}
                                    <div className="sub-dropdown">
                                        <span className="dropbtn" onClick={() => handleFilterByWeightRange()}>
                                            Filter (Weights Range)
                                        </span>
                                    </div>

                                </div>
                            </div>
                            {/* Reset Display */}
                            <div className="dropdown">
                                <span className="dropbtn" onClick={() => handleReset()}>
                                    Reset Sorting & Filtering
                                </span>
                            </div>

                        </div>
                        <h2>List Layout</h2>
                        <button onClick={() => setIsListPanelOpen(false)}>
                            <svg height="24px" width="24px" viewBox="0 0 24 24">
                                <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                            </svg>
                        </button>
                    </div>
                    {/* Display fileData.name, fileData.additionalData, and fileData.global_config */}
                    <h3>Project Name: {fileData.name}</h3>
                    <div>Additional Data: {JSON.stringify(fileData.additionalData, null, 2)}</div>
                    <div>Global Config: {JSON.stringify(fileData.global_config, null, 2)}</div>

                    {/* Loop through the high-level keys and display them */}
                    {fileData && Object.keys(fileData).map((key, index) => {
                        try {
                            if (key === 'diagnostics' || key === 'name' || key === 'additionalData' || key === 'global_config') {
                                return null;  // Skip rendering fileData.diagnostics
                            }
                            return (
                                <div key={index}>
                                    <strong>{key}:</strong>
                                    {(key === 'factors' || key === 'measures') ? (
                                        <div style={{ marginLeft: '20px' }}>
                                            {/* Loop through the keys */}
                                            {Object.keys(fileData[key]).map((subKey) => (
                                                <div key={subKey}>
                                                    <strong>{subKey}:</strong>
                                                    {fileData[key][subKey] ? (  // Check if this object exists
                                                        <div style={{ marginLeft: '20px' }}>
                                                            {/* Display individual categories */}
                                                            {Object.keys(fileData[key][subKey]).map((categoryKey, catIndex) => {
                                                                const category = fileData[key][subKey][categoryKey];
                                                                return (
                                                                    <div key={catIndex}>
                                                                        <strong>Name:</strong> {category.name}<br />
                                                                        <strong>Value:</strong> {category.value}<br />
                                                                        <strong>Description:</strong> {category.description}<br />
                                                                        <strong>Eval Strategy:</strong> {category.eval_strategy}<br />
                                                                        <strong>Normalizer:</strong> {category.normalizer}<br />
                                                                        <strong>Utility Function:</strong> {category.utility_function}<br />
                                                                        <strong>Weights:</strong>
                                                                        <div style={{ marginLeft: '20px' }}>
                                                                            {Object.keys(category.weights).map((weightKey) => (
                                                                                <div key={weightKey}>
                                                                                    <strong>{weightKey}:</strong> {category.weights[weightKey]}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (<div>
                                                        <em>Information not available</em>
                                                    </div>)}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div>
                                            {/* For other keys, just stringify */}
                                            {JSON.stringify(fileData[key])}
                                        </div>
                                    )}
                                </div>
                            );
                        } catch (error) {
                            return <div>Error while displaying {key}: {error.message}</div>
                        }
                    })}
                </div>
            );
        } catch (error) {
            return <div>Error while displaying panel: {error.message}</div>;
        }
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
        setReset(true);
        setTimeout(() => {
            setReset(false);
            setfilteredCategoryData(null);
            setFilteredRangeData(null);
        }, 0);
        setSortOrder('none');

        // Reset the risk level checkboxes and done button
        setSelectedRiskLevels([]); // Assuming setSelectedRiskLevels is your state setter for selected risk levels
        setIsDoneButtonClickable(false); // Assuming setIsDoneButtonClickable is your state setter for the done button
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

    console.log("Current listSortedData:", listSortedData);

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
                    <p>Severe: {1}</p>
                    <p>High: {1}</p>
                    <p>Medium: {0}</p>
                    <p>Low: {0}</p>
                    <p>Insignificant: {34}</p>

                    {/* Quality Factors Measures */}
                    <h4>Measures for Quality Factors</h4>
                    <p>Severe: {3}</p>
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
                        <button className={sortType === "asc_value" ? "selected" : ""} onClick={() => handleSort("asc_value")}>
                            Value - Ascending
                        </button>
                        <button className={sortType === "desc_value" ? "selected" : ""} onClick={() => handleSort("desc_value")}>
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

                {/* filter Dropdown */}
                <div className="main-dropdown">
                    <button className="dropbtn">Filter</button>
                    <div className="main-dropdown-content">
                        {/* Sub-button for Filter by Risk Levels */}
                        <div className="sub-dropdown">
                            <span className="dropbtn">Filter (Risk Levels)</span>
                            <div className="sub-dropdown-content">
                                {['Insignificant', 'Minor', 'Moderate', 'High', 'Severe'].map(riskLevel => (
                                    <div key={riskLevel}>
                                        <input
                                            type="checkbox"
                                            id={riskLevel}
                                            name={riskLevel}
                                            checked={selectedRiskLevels.includes(riskLevel)}
                                            onChange={() => handleCheckboxChange(riskLevel)}
                                        />
                                        <label htmlFor={riskLevel}>{riskLevel}</label>
                                    </div>
                                ))}
                                <button
                                    onClick={handleDoneClick}
                                    disabled={!isDoneButtonClickable}
                                    style={{
                                        backgroundColor: isDoneButtonClickable ? 'lightgreen' : 'lightgray'
                                    }}
                                >
                                    Done
                                </button>
                            </div>
                        </div>

                        {/* Sub-button for Filter by Values Range */}
                        <div className="sub-dropdown">
                            <span className="dropbtn" onClick={() => handlefilterByValueRange()}>
                                Filter (Values Range)
                            </span>
                        </div>

                        {/* Sub-button for Filter by Weights Range */}
                        <div className="sub-dropdown">
                            <span className="dropbtn" onClick={() => handleFilterByWeightRange()}>
                                Filter (Weights Range)
                            </span>
                        </div>
                    </div>
                </div>


                {/* Layout Options Dropdown */}
                <div className="dropdown">
                    <span className="dropbtn">Layout Options</span>
                    <div className="dropdown-content">
                        <button className="layout-btn-doing">Tree (Default)</button>
                        <button className="layout-btn-doing" onClick={toggleListPanel}>List</button>
                        <button className="layout-btn-doing" onClick={openListLayoutModal}>Nested List</button>
                    </div>
                </div>

                {/* Use the function to render the list panel */}
                {isListPanelOpen && renderListPanel(sortedData || filteredCategoryData || filteredRangeData || fileData)}

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
