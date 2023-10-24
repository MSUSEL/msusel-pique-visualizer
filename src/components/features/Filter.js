import "./Features.css";

const risk_level = {
    Severe: [-1, 0.2],
    High: [0.2, 0.4],
    Moderate: [0.4, 0.6],
    Minor: [0.6, 0.8],
    Insignificant: [0.8, 1.0],
};

// filter by risk levels: one or multiple
export function filterRiskLevels(fileData, selectedRiskLevels) {
    if (!fileData) {
        return fileData;  // If fileData is not defined, return original data
    }

    let filteredFileData = JSON.parse(JSON.stringify(fileData));


    // Step 1: Get value range based on selectedRiskLevels
    const value_range = selectedRiskLevels.map(risk => risk_level[risk]);

    // Step 2: Filter product_factors based on value range
    const product_factors = filteredFileData.factors.product_factors;
    const filtered_product_factors = {};
    for (const [key, value] of Object.entries(product_factors)) {
        if (value_range.some(([lower, upper]) => lower <= value.value && value.value <= upper)) {
            filtered_product_factors[key] = value;
        }
    }
    filteredFileData.factors.product_factors = filtered_product_factors;

    // Step 3: Filter quality_aspects based on product_factors
    if (Object.keys(filtered_product_factors).length === 0) {
        const quality_aspects = filteredFileData.factors.quality_aspects;
        const filtered_quality_aspects = {};
        for (const [key, value] of Object.entries(quality_aspects)) {
            if (value_range.some(([lower, upper]) => lower <= value.value && value.value <= upper)) {
                filtered_quality_aspects[key] = value;
            }
        }
        filteredFileData.factors.quality_aspects = filtered_quality_aspects;
    }

    // Step 4: Check for tqi based on quality_aspects
    if (Object.keys(filteredFileData.factors.quality_aspects).length === 0) {
        console.log("NO RESULTS");
    }

    return filteredFileData;
}

// filter by a given range of node values
export function filterByValueRange(fileData, min, max) {
    console.log(fileData)
    if (!fileData) {
        return fileData; // If fileData is not defined, return original data
    }
    let all_nodes = [];
    // 1. Check 'product_factors': only keep the ones under the selected category
    let product_factors_kept_nodes = [];
    let product_factors_objects_names = [];
    let product_factors_objects_with_value = findObjectsWithValue(fileData, 'product_factors');
    all_nodes.push(...product_factors_objects_with_value);
    console.log("Objects with 'value' in product_factors:");
    for (let obj of product_factors_objects_with_value) {
        let node_value = obj.value;
        let lower = min;
        let upper = max;
        if (lower <= node_value && node_value <= upper) {
            // Keep this node
            product_factors_kept_nodes.push(obj);
            product_factors_objects_names.push(obj.name);
        }
    }

    console.log(all_nodes.length, product_factors_kept_nodes.length);

    // 2. Check 'quality_aspects':
    // Keep the nodes
    // 1) that are under this range, or
    // 2) that are parent nodes of kept product factor nodes
    let quality_aspects_kept_nodes = [];
    let quality_aspects_objects_with_value = findObjectsWithValue(fileData, 'quality_aspects');
    all_nodes.push(...quality_aspects_objects_with_value);
    console.log("Objects with 'value' in quality_aspects:");
    for (let obj of quality_aspects_objects_with_value) {
        let node_value = obj.value;
        let lower = min;
        let upper = max;
        if (lower <= node_value && node_value <= upper) {
            // Keep this node
            quality_aspects_kept_nodes.push(obj);
        } else {
            // First check whether this node is a parent node of any previous kept nodes
            let quality_aspects_objects_related_product_factor_nodes = Object.keys(obj.weights);
            if (quality_aspects_objects_related_product_factor_nodes.some((name) => product_factors_objects_names.includes(name))) {
                quality_aspects_kept_nodes.push(obj);
            }
        }
    }

    console.log(all_nodes.length, quality_aspects_kept_nodes.length);
    // prepare the return onject:
    let filter_fileData = { ...fileData };
    filter_fileData.factors.product_factors = {};
    filter_fileData.factors.quality_aspects = {};

    // product_factors_kept_nodes quality_aspects_kept_nodes
    product_factors_kept_nodes.forEach(item => {
        filter_fileData.factors.product_factors[item.name] = item;
    });
    quality_aspects_kept_nodes.forEach(item => {
        filter_fileData.factors.quality_aspects[item.name] = item;
    });

    return filter_fileData;
}


// filter by a given range of node values
export function filterByWeightRange(fileData, min, max) {
    if (!fileData) {
        return fileData;  // If fileData is not defined, return original data
    }

    let filteredFileData = JSON.parse(JSON.stringify(fileData));

    // Helper function to filter weights
    const filterWeights = (weights, min, max) => {
        return Object.fromEntries(
            Object.entries(weights).filter(([key, value]) => value >= min && value <= max)
        );
    };

    // Step 3: For filteredFileData.factors.tqi
    Object.values(filteredFileData.factors.tqi).forEach(f => {
        f.weights = filterWeights(f.weights, min, max);
    });

    // Step 4: For filteredFileData.factors.quality_aspects
    const tqiWeightKeys = Object.values(filteredFileData.factors.tqi).flatMap(f => Object.keys(f.weights));
    filteredFileData.factors.quality_aspects = Object.fromEntries(
        Object.entries(filteredFileData.factors.quality_aspects).filter(([key]) => tqiWeightKeys.includes(key))
    );
    Object.values(filteredFileData.factors.quality_aspects).forEach(f => {
        f.weights = filterWeights(f.weights, min, max);
    });

    // Step 5: For filteredFileData.factors.product_factors
    
    const allQualityAspectWeights = Object.values(filteredFileData.factors.quality_aspects).flatMap(f => Object.keys(f.weights));
    filteredFileData.factors.product_factors = Object.fromEntries(
        Object.entries(filteredFileData.factors.product_factors).filter(([key]) => allQualityAspectWeights.includes(key))
    );
    Object.values(filteredFileData.factors.product_factors).forEach(f => {
        f.weights = filterWeights(f.weights, min, max);
    });

    // Step 6: For filteredFileData.measures
    const allProductFactorWeights = Object.values(filteredFileData.factors.product_factors).flatMap(f => Object.keys(f.weights));
    filteredFileData.measures = Object.fromEntries(
        Object.entries(filteredFileData.measures).filter(([key]) => allProductFactorWeights.includes(key))
    );
    return filteredFileData;
}


export function findObjectsWithValue(fileData, section) {
    let objects_with_value = [];

    // Recursive function to traverse a specific section of the JSON data
    function traverse_section(obj) {
        if (typeof obj === 'object') {
            if ('value' in obj) {
                objects_with_value.push(obj);
            }
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    traverse_section(obj[key]);
                }
            }
        } else if (Array.isArray(obj)) {
            for (let item of obj) {
                traverse_section(item);
            }
        }
    }

    // Access the specified section of the JSON data
    let section_data;
    if (['product_factors', 'quality_aspects', 'tqi'].includes(section)) {
        section_data = fileData.factors?.[section] || {};
    } else {
        section_data = fileData[section] || {};
    }

    // Start traversing the specified section
    traverse_section(section_data);

    return objects_with_value;
}
