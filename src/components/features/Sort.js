import _ from 'lodash';

/**
 * Return the sorted json object
 */

// based on node values

export function sortASC(fileData) {
    if (!fileData) {
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


export function sortDESC(fileData) {
    if (!fileData) {
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

// based on weights

export function sortASCforWeights(fileData) {
    if (!fileData) {
        return fileData;  // If fileData or factors is not defined, return original data
    }

    let sortedFileData = JSON.parse(JSON.stringify(fileData));

    let dataArray_product_factors = fileData.factors.product_factors ? Object.values(sortedFileData.factors.product_factors) : [];
    //console.log(dataArray_product_factors);
    let dataArray_quality_aspects = fileData.factors.quality_aspects ? Object.values(sortedFileData.factors.quality_aspects) : [];
    let dataArray_measures = sortedFileData.measures ? Object.values(sortedFileData.measures) : [];
    let dataArray_diagnostics = sortedFileData.diagnostics ? Object.values(sortedFileData.diagnostics) : [];

    // Sort the array based on the "value" property in ascending order
    dataArray_product_factors.sort((a, b) => a.weights - b.weights);
    dataArray_quality_aspects.sort((a, b) => a.weights - b.weights);
    dataArray_measures.sort((a, b) => a.weights - b.weights);
    dataArray_diagnostics.sort((a, b) => a.weights - b.weights);

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


/**
 * Sort all nodes based on weights in ascending order (smallest on the left and largest on the right)
 * @param {Object} treeData - The hierarchical tree data.
 * @return {Object} The tree data sorted in ascending order based on weights.

export function sortASCforWeights(treeData) {
    if (!treeData) return treeData; // Return if null or undefined

    function sortTreeData(data, parentWeights) {
        if (!data) return;
        if (data.hasOwnProperty('children')) {
            if (parentWeights) {
                data.children.sort((a, b) => parentWeights[a.name] - parentWeights[b.name]);
            }
            data.children.forEach(child => sortTreeData(child, data.weights));
        }
    }

    sortTreeData(treeData, null);
    console.log("Ascending Sorting Done! Smallest <---> Larest")
    return treeData;

}
 */

/**
 * Sort all nodes based on weights in descending order (largest on the left and smallest on the right)
 * @param {Object} treeData - The hierarchical tree data.
 * @return {Object} The tree data sorted in descending order based on weights.
 */
export function sortDESCforWeights(treeData) {
    if (!treeData) return treeData; // Return if null or undefined

    function sortTreeData(data, parentWeights) {
        if (!data) return;
        if (data.hasOwnProperty('children')) {
            if (parentWeights) {
                data.children.sort((a, b) => parentWeights[b.name] - parentWeights[a.name]);
            }
            data.children.forEach(child => sortTreeData(child, data.weights));
        }
    }

    sortTreeData(treeData, null);

    return treeData;
}