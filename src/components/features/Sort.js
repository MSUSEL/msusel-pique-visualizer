import _ from 'lodash';

/**
 * Return the sorted json object
 */

// based on node values

export function sortASCforValues(fileData) {
    if (!fileData) {
        return fileData;  // If fileData is not defined, return original data
    }

    let sortedFileData = JSON.parse(JSON.stringify(fileData));

    // Sort measures based on their "value"
    if (sortedFileData.measures) {
        let dataArray_measures = Object.values(sortedFileData.measures);
        dataArray_measures.sort((a, b) => a.value - b.value);
        sortedFileData.measures = {};
        dataArray_measures.forEach(item => {
            sortedFileData.measures[item.name] = item;
        });
    }

    // Sort product_factors based on their "value" and align their weights
    if (sortedFileData.factors && sortedFileData.factors.product_factors) {
        let dataArray_product_factors = Object.values(sortedFileData.factors.product_factors);
        dataArray_product_factors.sort((a, b) => a.value - b.value);
        sortedFileData.factors.product_factors = {};
        dataArray_product_factors.forEach(item => {
            // Sort the weights based on measures
            if (item.weights) {
                item.weights = Object.fromEntries(Object.entries(item.weights).sort((a, b) => {
                    return sortedFileData.measures[a[0]].value - sortedFileData.measures[b[0]].value;
                }));
            }
            sortedFileData.factors.product_factors[item.name] = item;
        });
    }

    // Sort quality_aspects based on their "value" and align their weights
    if (sortedFileData.factors && sortedFileData.factors.quality_aspects) {
        let dataArray_quality_aspects = Object.values(sortedFileData.factors.quality_aspects);
        dataArray_quality_aspects.sort((a, b) => a.value - b.value);
        sortedFileData.factors.quality_aspects = {};
        dataArray_quality_aspects.forEach(item => {
            // Sort the weights based on product_factors
            if (item.weights) {
                item.weights = Object.fromEntries(Object.entries(item.weights).sort((a, b) => {
                    return sortedFileData.factors.product_factors[a[0]].value - sortedFileData.factors.product_factors[b[0]].value;
                }));
            }
            sortedFileData.factors.quality_aspects[item.name] = item;
        });
    }

    // Sort tqi and align its weights
    if (sortedFileData.factors && sortedFileData.factors.tqi) {
        let dataArray_tqi = Object.values(sortedFileData.factors.tqi);
        dataArray_tqi.sort((a, b) => a.value - b.value);
        sortedFileData.factors.tqi = {};
        dataArray_tqi.forEach(item => {
            // Sort the weights based on quality_aspects
            if (item.weights) {
                item.weights = Object.fromEntries(Object.entries(item.weights).sort((a, b) => {
                    return sortedFileData.factors.quality_aspects[a[0]].value - sortedFileData.factors.quality_aspects[b[0]].value;
                }));
            }
            sortedFileData.factors.tqi[item.name] = item;
        //if (sortedFileData.factors.tqi.weights) {
        //    sortedFileData.factors.tqi.weights = Object.fromEntries(Object.entries(sortedFileData.factors.tqi.weights).sort((a, b) => {
        //        return sortedFileData.factors.quality_aspects[a[0]].value - sortedFileData.factors.quality_aspects[b[0]].value;
        //    }));
        });
    }

    console.log("Ascending Sorting Done! Smallest <---> Largest");

    return sortedFileData;
}



export function sortDESCforValues(fileData) {
    if (!fileData) {
        return fileData;  // If fileData is not defined, return original data
    }

    let sortedFileData = JSON.parse(JSON.stringify(fileData));

    // Sort measures based on their "value" in descending order
    if (sortedFileData.measures) {
        let dataArray_measures = Object.values(sortedFileData.measures);
        dataArray_measures.sort((a, b) => b.value - a.value);
        sortedFileData.measures = {};
        dataArray_measures.forEach(item => {
            sortedFileData.measures[item.name] = item;
        });
    }

    // Sort product_factors based on their "value" in descending order
    if (sortedFileData.factors && sortedFileData.factors.product_factors) {
        let dataArray_product_factors = Object.values(sortedFileData.factors.product_factors);
        dataArray_product_factors.sort((a, b) => b.value - a.value);
        sortedFileData.factors.product_factors = {};
        dataArray_product_factors.forEach(item => {
            sortedFileData.factors.product_factors[item.name] = item;
        });
    }

    // Sort quality_aspects based on their "value" in descending order
    if (sortedFileData.factors && sortedFileData.factors.quality_aspects) {
        let dataArray_quality_aspects = Object.values(sortedFileData.factors.quality_aspects);
        dataArray_quality_aspects.sort((a, b) => b.value - a.value);
        sortedFileData.factors.quality_aspects = {};
        dataArray_quality_aspects.forEach(item => {
            sortedFileData.factors.quality_aspects[item.name] = item;
        });
    }

    // Sort tqi and align its weights in descending order
    if (sortedFileData.factors && sortedFileData.factors.tqi) {
        let dataArray_tqi = Object.values(sortedFileData.factors.tqi);
        dataArray_tqi.sort((a, b) => b.value - a.value);
        sortedFileData.factors.tqi = {};
        dataArray_tqi.forEach(item => {
            sortedFileData.factors.tqi[item.name] = item;
        });
    }

    console.log("Descending Sorting Done! Largest <---> Smallest");

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

export function newSortASCforWeights(treeData) {
    if (!treeData) return treeData; // Return if null or undefined

    // Sort children nodes based on their weights in the parent node
    function sortChildrenByWeights(parentNode, childNodeKey) {
        if (!parentNode || !parentNode.weights || !parentNode[childNodeKey]) return;

        // Extract children nodes and weights
        const childrenNodes = Object.values(parentNode[childNodeKey]);
        const weights = parentNode.weights;

        // Sort children nodes based on weights
        childrenNodes.sort((a, b) => weights[a.name] - weights[b.name]);

        // Update the parent node with sorted children
        parentNode[childNodeKey] = {};
        childrenNodes.forEach(child => {
            parentNode[childNodeKey][child.name] = child;
        });
    }

    // Step 1: Sort 'quality_aspects' based on 'tqi.weights'
    sortChildrenByWeights(treeData, 'factors');

    // Step 2: Sort 'product_factors' based on their own 'weights'
    Object.values(treeData.factors).forEach(factor => {
        sortChildrenByWeights(factor, 'product_factors');
    });

    // Step 3: Sort 'measures' based on 'product_factors.weights' and 'diagnostics' based on 'measures.weights'
    Object.values(treeData.factors.product_factors).forEach(product_factor => {
        sortChildrenByWeights(product_factor, 'measures');
    });

    Object.values(treeData.measures).forEach(measure => {
        sortChildrenByWeights(measure, 'diagnostics');
    });

    console.log("New Ascending Sorting Done! Smallest <---> Larest");
    return treeData;
}
