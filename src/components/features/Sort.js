/**
 * Return the sorted json object
 */

export function sortASC(fileData){
    if(!fileData) {
        return fileData;  // If fileData or factors is not defined, return original data
    }

    let sortedFileData = JSON.parse(JSON.stringify(fileData));
    
    let dataArray_product_factors = fileData.factors.product_factors ? Object.values(sortedFileData.factors.product_factors) : [];
    //console.log(dataArray_product_factors);
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
    

    console.log("Ascending Sorting Done! Smallest <---> Larest")
    
            
    return sortedFileData;
}


export function sortDESC(fileData){
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
    

    console.log("Descending Sorting Done! Largest <---> Smallest")
    
            
    return sortedFileData;
}
