import "./Features.css";

export function filterRange(fileData, min, max) {
    if (!fileData) {
        return fileData; // If fileData is not defined, return original data
    }

    let filteredFileData = JSON.parse(JSON.stringify(fileData));

    if (filteredFileData.factors && filteredFileData.factors.product_factors) {
        let productFactors = filteredFileData.factors.product_factors;

        Object.keys(productFactors).forEach((factorKey) => {
            let value = productFactors[factorKey].value;

            if (value < min || value > max) {
                delete productFactors[factorKey];
            }
        });
    }

    if (filteredFileData.factors && filteredFileData.factors.quality_aspects) {
        let qualityAspects = filteredFileData.factors.quality_aspects;

        Object.keys(qualityAspects).forEach((qualityKey) => {
            let value = qualityAspects[qualityKey].value;

            if (value < min || value > max) {
                delete qualityAspects[qualityKey];
            }
        });
    }

    if (filteredFileData.measures) {
        let measures = filteredFileData.measures;

        Object.keys(measures).forEach((measureKey) => {
            let value = measures[measureKey].value;

            if (value < min || value > max) {
                delete measures[measureKey];
            }
        });
    }

    if (filteredFileData.diagnostics) {
        let diagnostics = filteredFileData.diagnostics;

        Object.keys(diagnostics).forEach((diagnosticKey) => {
            let value = diagnostics[diagnosticKey].value;

            if (value < min || value > max) {
                delete diagnostics[diagnosticKey];
            }
        });
    }

    console.log("Filtering all values out of the given range!");
    return filteredFileData;
}

const risk_level = {
    Severe: [0.0, 0.2],
    High: [0.2, 0.4],
    Moderate: [0.4, 0.6],
    Minor: [0.6, 0.8],
    Insignificant: [0.8, 1.0],
};

export function findObjectsWithValue(fileData, section) {
    const objects_with_value = [];

    // Recursive function to traverse a specific section of the JSON data
    function traverse_section(obj) {
        if (typeof obj === 'object') {
            if ('value' in obj) {
                objects_with_value.push(obj);
            }
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    traverse_section(obj[key]);
                }
            }
        } else if (Array.isArray(obj)) {
            for (const item of obj) {
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

export function filterByCategory(fileData, selected_category) {
    if(!fileData) {
        return fileData;  // If fileData or factors is not defined, return original data
    }
    // Prepare the parts that will not be changed
    const sections_not_change = ['name', 'additionalData', 'global_config', 'measures', 'diagnostics', 'tqi'];
    const all_nodes = [];
    // 1. Check 'product_factors': only keep the ones under the selected category
    const product_factors_kept_nodes = [];
    const product_factors_objects_names = [];
    const product_factors_objects_with_value = findObjectsWithValue(fileData, 'product_factors');
    all_nodes.push(...product_factors_objects_with_value);
    console.log("Objects with 'value' in product_factors:");
    for (const obj of product_factors_objects_with_value) {
        const node_value = obj.value;
        let node_category = null;
        for (const [level, [lower, upper]] of Object.entries(risk_level)) {
            if (node_value < 0) {
                node_category = 'Severe';
                break;
            }
            if (lower <= node_value && node_value <= upper) {
                node_category = level;
                break;
            }
        }
        if (node_category === selected_category) {
            // Keep this node
            product_factors_kept_nodes.push(obj);
            product_factors_objects_names.push(obj.name);
        }
    }

    console.log(all_nodes.length, product_factors_kept_nodes.length);
    console.log(product_factors_objects_names);

    // 2. Check 'quality_aspects':
    // Keep the nodes
    // 1) that are under this category, and
    // 2) that are parent nodes of kept product factor nodes
    const quality_aspects_kept_nodes = [];
    const quality_aspects_objects_with_value = findObjectsWithValue(fileData, 'quality_aspects');
    all_nodes.push(...quality_aspects_objects_with_value);
    console.log("Objects with 'value' in quality_aspects:");
    for (const obj of quality_aspects_objects_with_value) {
        const node_value = obj.value;
        let node_category = null;
        for (const [level, [lower, upper]] of Object.entries(risk_level)) {
            if (node_value < 0) {
                node_category = 'Severe';
                break;
            }
            if (lower <= node_value && node_value <= upper) {
                node_category = level;
                break;
            }
        }
        console.log(`Node value: ${node_value}, Category: ${node_category}`);
        if (node_category === selected_category) {
            // Keep this node
            quality_aspects_kept_nodes.push(obj);
        } else {
            // First check whether this node is a parent node of any previous kept nodes
            const quality_aspects_objects_related_product_factor_nodes = Object.keys(obj.weights);
            if (quality_aspects_objects_related_product_factor_nodes.some((name) => product_factors_objects_names.includes(name))) {
                quality_aspects_kept_nodes.push(obj);
            }
        }
    }

    console.log(all_nodes.length, quality_aspects_kept_nodes.length);
    console.log();

    const filter_fileData = { ...fileData };
    //dataArray_product_factors.forEach(item => {
    //    sortedFileData.factors.product_factors[item.name] = item;
    //});
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

/*
export function filterByCategory(node, selectedCategory) {
    if (!node) {
        return null;
    }

    // Check if the current node's category matches the selected category
    if (node.category === selectedCategory) {
        return node;
    }

    // Filter child nodes recursively
    if (node.children) {
        const filteredChildren = node.children
            .map((child) => filterByCategory(child, selectedCategory))
            .filter((child) => child !== null);

        // If any child node is kept, keep the current node
        if (filteredChildren.length > 0) {
            return { ...node, children: filteredChildren };
        }
    }

    return null; // Filter out the node and its descendants
}*/

export function filterParentNodes(node) {
    if (!node) {
        return null;
    }

    const newNode = { ...node };

    // Remove the children nodes recursively
    if (newNode.children) {
        newNode.children = newNode.children.map((child) => filterParentNodes(child));
    }

    return newNode;
}

// Utility function to filter nodes by category
export const filterNodesByCategory = (data, category) => {
    // Extract nodes and edges from the data
    const { nodes, edges } = data;

    // Filter nodes based on the selected category
    const filteredNodes = nodes.filter((node) => {
        const { value } = node;

        // Define the risk level boundaries
        const riskLevels = {
            Severe: [0, 0.2],
            High: [0.2, 0.4],
            Moderate: [0.4, 0.6],
            Minor: [0.6, 0.8],
            Insignificant: [0.8, 1],
        };

        // Check if the node's value falls within the selected category's range
        const [min, max] = riskLevels[category];
        return value >= min && value <= max;
    });

    return filteredNodes;
};

// Utility function to filter edges based on filtered nodes
export const filterEdgesByNodes = (data, filteredNodes) => {
    // Extract edges from the data
    const { edges } = data;

    // Get the IDs of the filtered nodes
    const filteredNodeIds = filteredNodes.map((node) => node.id);

    // Filter edges based on the filtered nodes
    const filteredEdges = edges.filter((edge) => {
        const { source, target } = edge;
        return filteredNodeIds.includes(source) && filteredNodeIds.includes(target);
    });

    return filteredEdges;
};
