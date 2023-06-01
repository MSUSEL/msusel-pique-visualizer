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
}

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

