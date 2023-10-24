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
//ascending
function sortWeightsASCRecursively(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Recursive call to navigate through nested structure
            sortWeightsASCRecursively(obj[key]);
        }

        if (key === 'weights') {
            // Sort the weights dictionary based on values
            obj[key] = Object.fromEntries(
                Object.entries(obj[key]).sort((a, b) => a[1] - b[1])
            );
        }
    }
    return obj;
}

export function sortASCforWeights(fileData) {
    // Step 1: Read in file, make a copy
    if (!fileData) {
        return fileData;  // If fileData is not defined, return original data
    }
    let sortedFileData = JSON.parse(JSON.stringify(fileData));

    // Step 2: Sort tqi.weights based on their values
    if (sortedFileData.factors && sortedFileData.factors.tqi) {
        let dataArray_tqi = Object.values(sortedFileData.factors.tqi);
        dataArray_tqi = sortWeightsASCRecursively(dataArray_tqi)
        sortedFileData.factors.tqi = {};
        dataArray_tqi.forEach(item => {
            sortedFileData.factors.tqi[item.name] = item;
        });
        //console.log(sortedFileData.factors.tqi)
    }

    // Step 3: Sort quality_aspects and align their weights
    if (sortedFileData.factors && sortedFileData.factors.quality_aspects) {
        // console.log(sortedFileData.factors.quality_aspects)
        //1. for each objects under sortedFileData.factors.quality_aspects, sort their weights ascending
        let dataArray_quality_aspects = Object.values(sortedFileData.factors.quality_aspects);
        dataArray_quality_aspects = sortWeightsASCRecursively(dataArray_quality_aspects);
        // console.log(dataArray_quality_aspects);
        sortedFileData.factors.quality_aspects = {};
        dataArray_quality_aspects.forEach(item => {
            sortedFileData.factors.quality_aspects[item.name] = item;
        });
        //2. sort objects based on their name to make sure they are in the same order of tqi.weights
        // Extract the keys from tqi.weights in the order they appear
        // Loop through each key in tqi
        for (const tqiKey in sortedFileData.factors.tqi) {
            // Extract the keys from the current tqiKey's weights in the order they appear
            const tqiOrder = Object.keys(sortedFileData.factors.tqi[tqiKey].weights);

            // Initialize a new object to store the sorted quality_aspects
            let sortedQualityAspects = {};

            // Iterate through the tqiOrder and populate sortedQualityAspects
            tqiOrder.forEach(key => {
                if (sortedFileData.factors.quality_aspects[key]) {
                    sortedQualityAspects[key] = sortedFileData.factors.quality_aspects[key];
                }
            });

            // Replace the original quality_aspects with the sorted one
            sortedFileData.factors.quality_aspects = sortedQualityAspects;
        }
    }

    // Step 4: Sort product_factors and align their weights
    if (sortedFileData.factors && sortedFileData.factors.product_factors) {
        // console.log(sortedFileData.factors.product_factors)
        //1. for each objects under sortedFileData.factors.product_factors, sort their weights ascending
        let dataArray_product_factors = Object.values(sortedFileData.factors.product_factors);
        dataArray_product_factors = sortWeightsASCRecursively(dataArray_product_factors);
        sortedFileData.factors.product_factors = {};
        dataArray_product_factors.forEach(item => {
            sortedFileData.factors.product_factors[item.name] = item;
        });
        //2. sort objects based on their name to make sure they are in the same order of quality_aspects.weights
        if (sortedFileData.factors.product_factors && sortedFileData.factors.quality_aspects) {
            for (const qaKey in sortedFileData.factors.quality_aspects) {
                const qaOrder = Object.keys(sortedFileData.factors.quality_aspects[qaKey].weights);
                let sortedProductFactors = {};
                qaOrder.forEach(key => {
                    if (sortedFileData.factors.product_factors[key]) {
                        sortedProductFactors[key] = sortedFileData.factors.product_factors[key];
                    }
                });
                sortedFileData.factors.product_factors = sortedProductFactors;
            }
        }
    }

    // Step 5: Sort measures and align their weights
    if (sortedFileData.measures) {
        let dataArray_measures = Object.values(sortedFileData.measures);
        dataArray_measures = sortWeightsASCRecursively(dataArray_measures);
        sortedFileData.measures = {};
        dataArray_measures.forEach(item => {
            sortedFileData.measures[item.name] = item;
        });

    console.log("Ascending Sorting by Weights Done!");
    return sortedFileData;
}
}

// descending
function sortWeightsDESCRecursively(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Recursive call to navigate through nested structure
            sortWeightsDESCRecursively(obj[key]);
        }

        if (key === 'weights') {
            // Sort the weights dictionary based on values
            obj[key] = Object.fromEntries(
                Object.entries(obj[key]).sort((a, b) => b[1] - a[1])
            );
        }
    }
    return obj;
}

export function sortDESCforWeights(fileData) {
    if (!fileData) {
        return fileData;
    }
    let sortedFileData = JSON.parse(JSON.stringify(fileData));

    if (sortedFileData.factors && sortedFileData.factors.tqi) {
        let dataArray_tqi = Object.values(sortedFileData.factors.tqi);
        dataArray_tqi = sortWeightsDESCRecursively(dataArray_tqi);
        sortedFileData.factors.tqi = {};
        dataArray_tqi.forEach(item => {
            sortedFileData.factors.tqi[item.name] = item;
        });
    }

    if (sortedFileData.factors && sortedFileData.factors.quality_aspects) {
        let dataArray_quality_aspects = Object.values(sortedFileData.factors.quality_aspects);
        dataArray_quality_aspects = sortWeightsDESCRecursively(dataArray_quality_aspects);
        sortedFileData.factors.quality_aspects = {};
        dataArray_quality_aspects.forEach(item => {
            sortedFileData.factors.quality_aspects[item.name] = item;
        });

        for (const tqiKey in sortedFileData.factors.tqi) {
            const tqiOrder = Object.keys(sortedFileData.factors.tqi[tqiKey].weights);
            let sortedQualityAspects = {};
            tqiOrder.forEach(key => {
                if (sortedFileData.factors.quality_aspects[key]) {
                    sortedQualityAspects[key] = sortedFileData.factors.quality_aspects[key];
                }
            });
            sortedFileData.factors.quality_aspects = sortedQualityAspects;
        }
    }

    if (sortedFileData.factors && sortedFileData.factors.product_factors) {
        let dataArray_product_factors = Object.values(sortedFileData.factors.product_factors);
        dataArray_product_factors = sortWeightsDESCRecursively(dataArray_product_factors);
        sortedFileData.factors.product_factors = {};
        dataArray_product_factors.forEach(item => {
            sortedFileData.factors.product_factors[item.name] = item;
        });

        if (sortedFileData.factors.product_factors && sortedFileData.factors.quality_aspects) {
            for (const qaKey in sortedFileData.factors.quality_aspects) {
                const qaOrder = Object.keys(sortedFileData.factors.quality_aspects[qaKey].weights);
                let sortedProductFactors = {};
                qaOrder.forEach(key => {
                    if (sortedFileData.factors.product_factors[key]) {
                        sortedProductFactors[key] = sortedFileData.factors.product_factors[key];
                    }
                });
                sortedFileData.factors.product_factors = sortedProductFactors;
            }
        }
    }

    if (sortedFileData.measures) {
        let dataArray_measures = Object.values(sortedFileData.measures);
        dataArray_measures = sortWeightsDESCRecursively(dataArray_measures);
        sortedFileData.measures = {};
        dataArray_measures.forEach(item => {
            sortedFileData.measures[item.name] = item;
        });
    }

    console.log("Descending Sorting by Weights Done!");
    return sortedFileData;
}
