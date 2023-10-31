import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import TreeDisplay from "../treeDisplay/TreeDisplay";
import { sortASCforValues, sortDESCforValues, sortASCforWeights, sortDESCforWeights } from "../features/Sort";
import { filterByValueRange, filterRiskLevels, filterByWeightRange } from "../features/Filter";
import cloneDeep from "lodash/cloneDeep";
import "./UploadFile.css";
import "../treeDisplay/TreeDisplay.css";
import "../top_header/TopHeader.css";
import { ListDisplay } from "../layouts/List.js"

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

    // data to use for display
    const dataToUse = sortedData || filteredCategoryData || filteredRangeData || fileData;

    // all layouts
    const [layout, setLayout] = useState('tree');  // default layout is 'tree'
    const setListLayout = () => {
        setLayout('list');
    };

    const setTreeLayout = () => {
        setLayout('tree');
    };

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
        let fileDataCopy = cloneDeep(fileData);
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


    const handleReset = () => {
        console.log("reset:")
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
        //setSortOrder('none');

        // Reset the risk level checkboxes and done button
        setSelectedRiskLevels([]); 
        setIsDoneButtonClickable(false); 
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
                        {/* Custom Modal */}
                        {
                            isFilterRangeOpen && (
                                <div className="custom-modal">
                                    <div className="modal-content">
                                        <h2>Node Value Range</h2>
                                        <h4>Please enter the range of node values</h4>
                                        <input
                                            type="text"
                                            placeholder="Minimum node value"
                                            value={minValue}
                                            onChange={(e) => setMinValue(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Maximum node value"
                                            value={maxValue}
                                            onChange={(e) => setMaxValue(e.target.value)}
                                        />
                                        <div className="modal-actions">
                                            <button onClick={handleApplyFilterByValueRange}>Apply</button>
                                            <button onClick={closeModal}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* Sub-button for Filter by Weights Range */}
                        <div className="sub-dropdown">
                            <span className="dropbtn" onClick={() => handleFilterByWeightRange()}>
                                Filter (Weights Range)
                            </span>
                        </div>
                        {/* Custom Modal */}
                        {
                            isWeightFilterRangeOpen && (
                                <div className="custom-modal">
                                    <div className="modal-content">
                                        <h2>Weights Denoted on Edges </h2>
                                        <h4>Please enter the range of weights</h4>
                                        <input
                                            type="text"
                                            placeholder="Minimum weight"
                                            value={minValue}
                                            onChange={(e) => setMinValue(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Maximum weight"
                                            value={maxValue}
                                            onChange={(e) => setMaxValue(e.target.value)}
                                        />
                                        <div className="modal-actions">
                                            <button onClick={handleApplyFilterbyWeightRange}>Apply</button>
                                            <button onClick={closeWeightModal}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* Layout Options Dropdown */}
                <div className="dropdown">
                    <span className="dropbtn">Layout Options</span>
                    <div className="dropdown-content">
                        <button className="layout-btn-doing" onClick={setTreeLayout}>Tree</button>
                        <button className="layout-btn-doing" onClick={setListLayout}>List</button>
                    </div>
                </div>

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


            {/* Conditional Rendering based on Layout */}
            <div className="layout-container">
                {layout === 'tree' && <TreeDisplay fileData={dataToUse} reset={reset} />}
                {layout === 'list' && <ListDisplay fileData={dataToUse}/>}
            </div>
        </div >
    );
}
