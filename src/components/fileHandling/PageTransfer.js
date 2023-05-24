import React, {useEffect, useState} from "react";
import TreeDisplay from "../treeDisplay/TreeDisplay";
//import sortNestedJson from "../features/Sort";
import {filterZero, filterRange} from "../features/Filter";
import "./UploadFile.css"

// Retrieve the fileJSON value from local storage


function sortASC(fileData){
    if(!fileData) {
        return fileData;  // If fileData or factors is not defined, return original data
    }

    let sortedFileData = JSON.parse(JSON.stringify(fileData));
    
    let dataArray_product_factors = fileData.factors.product_factors ? Object.values(sortedFileData.factors.product_factors) : [];
    console.log(dataArray_product_factors);
    let dataArray_quality_aspects = fileData.factors.quality_aspects ? Object.values(sortedFileData.factors.quality_aspects) : [];
    let dataArray_measures = sortedFileData.measures ? Object.values(sortedFileData.measures) : [];
    let dataArray_diagnostics = sortedFileData.diagnostics ? Object.values(sortedFileData.diagnostics) : [];

    // Sort the array based on the "value" property in ascending order
    dataArray_product_factors.sort((a, b) => a.value - b.value);
    dataArray_quality_aspects.sort((a, b) => a.value - b.value);
    dataArray_measures.sort((a, b) => a.value - b.value);
    dataArray_diagnostics.sort((a, b) => a.value - b.value);

    sortedFileData.factors.product_factors = {};
    sortedFileData.factors.quality_aspects = {};
    sortedFileData.measures = {};
    sortedFileData.diagnostics = {};

    dataArray_product_factors.forEach(item => {
        sortedFileData.factors.product_factors[item.name] = item;
    });
    dataArray_quality_aspects.forEach(item => {
        sortedFileData.factors.quality_aspects[item.name] = item;
    });
    dataArray_measures.forEach(item => {
        sortedFileData.measures[item.name] = item;
    });
    dataArray_diagnostics.forEach(item => {
        sortedFileData.diagnostics[item.name] = item;
    });
    

    alert("done!")
    
            
    return sortedFileData;
}


function sortDESC(fileData){
    if(!fileData) {
        return fileData;  // If fileData or factors is not defined, return original data
    }

    let sortedFileData = JSON.parse(JSON.stringify(fileData));
    
    let dataArray_product_factors = fileData.factors.product_factors ? Object.values(sortedFileData.factors.product_factors) : [];
    console.log(dataArray_product_factors);
    let dataArray_quality_aspects = fileData.factors.quality_aspects ? Object.values(sortedFileData.factors.quality_aspects) : [];
    let dataArray_measures = sortedFileData.measures ? Object.values(sortedFileData.measures) : [];
    let dataArray_diagnostics = sortedFileData.diagnostics ? Object.values(sortedFileData.diagnostics) : [];

    // Sort the array based on the "value" property in ascending order
    dataArray_product_factors.sort((a, b) => b.value - a.value);
    dataArray_quality_aspects.sort((a, b) => b.value - a.value);
    dataArray_measures.sort((a, b) => b.value - a.value);
    dataArray_diagnostics.sort((a, b) => b.value - a.value);

    sortedFileData.factors.product_factors = {};
    sortedFileData.factors.quality_aspects = {};
    sortedFileData.measures = {};
    sortedFileData.diagnostics = {};

    dataArray_product_factors.forEach(item => {
        sortedFileData.factors.product_factors[item.name] = item;
    });
    dataArray_quality_aspects.forEach(item => {
        sortedFileData.factors.quality_aspects[item.name] = item;
    });
    dataArray_measures.forEach(item => {
        sortedFileData.measures[item.name] = item;
    });
    dataArray_diagnostics.forEach(item => {
        sortedFileData.diagnostics[item.name] = item;
    });
    

    alert("done!")
    
            
    return sortedFileData;
}


export default function PageTransfer(props) {

    // const fileData = JSON.parse(localStorage.getItem('fileData'));
    const { fileData } = props;
    // sort and filter
    const [ascSortedData, setAscSortedData] = useState(null);
    const [descSortedData, setDescSortedData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);

    const handleASCSort = () => {
        // Sort the fileData and update the sortedData state
        const sorted = sortASC(fileData);//sortNestedJson(fileData);
        setAscSortedData(sorted);
        setDescSortedData(null);
        setFilteredData(null); // Reset filteredData when sorting is applied
      };

    const handleDESCSort = () => {
        // Sort the fileData and update the sortedData state
        const sorted = sortDESC(fileData);//sortNestedJson(fileData);
        setAscSortedData(null);
        setDescSortedData(sorted);
        setFilteredData(null); // Reset filteredData when sorting is applied
      };


    const handleFilter = () => {
        // Filter out data with zero value and update the filteredData state
        const filtered = filterZero(fileData)
        setFilteredData(filtered);
        setAscSortedData(null); 
        setDescSortedData(null);  // Reset sortedData when filtering is applied
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
                <button onClick={handleFilter}>Filter</button>
            </div>
            <TreeDisplay fileData={ascSortedData || descSortedData || filteredData || fileData} />
        </div>
    );
}