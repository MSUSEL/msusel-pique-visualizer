import "./Features.css";

export function filterZero(fileData) {
    if (!fileData) {
        return fileData; // If fileData or factors is not defined, return original data
    }

    let filteredFileData = JSON.parse(JSON.stringify(fileData));

    if (filteredFileData.factors && filteredFileData.factors.product_factors) {
        let productFactors = filteredFileData.factors.product_factors;

        Object.keys(productFactors).forEach((key) => {
            if (productFactors[key].value === 0) {
                delete productFactors[key];
            }
        });
    }

    if (filteredFileData.factors && filteredFileData.factors.quality_aspects) {
        let qualityAspects = filteredFileData.factors.quality_aspects;

        Object.keys(qualityAspects).forEach((key) => {
            if (qualityAspects[key].value === 0) {
                delete qualityAspects[key];
            }
        });
    }

    if (filteredFileData.measures) {
        let measures = filteredFileData.measures;

        Object.keys(measures).forEach((key) => {
            if (measures[key].value === 0) {
                delete measures[key];
            }
        });
    }

    if (filteredFileData.diagnostics) {
        let diagnostics = filteredFileData.diagnostics;

        Object.keys(diagnostics).forEach((key) => {
            if (diagnostics[key].value === 0) {
                delete diagnostics[key];
            }
        });
    }

    console.log("Quick Filtering all zero values out!");
    return filteredFileData;
}

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

export function filterByCategory(fileData, selectedCategory) {
    if (!fileData) {
        return fileData; // If fileData is not defined, return original data
    }

    let filteredFileData = JSON.parse(JSON.stringify(fileData));

    const filterNode = (node, category) => {
        if (!node) {
            return false;
        }

        const nodeCategory = node.category || "";

        if (nodeCategory === category || node.children.some((child) => filterNode(child, category))) {
            return true;
        }

        return false;
    };

    filteredFileData.children = filteredFileData.children.filter((node) => filterNode(node, selectedCategory));

    console.log(`Filtering based on the ${selectedCategory} category!`);
    return filteredFileData;
}
