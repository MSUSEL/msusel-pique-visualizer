/**
 * Return the sorted json object
 */

export default function sortNestedJson(fileData) {
    // Convert the JSON object to an array of key-value pairs
    let dataArray_product_factors = Object.entries(fileData.fileData.factors.product_factors);
    let dataArray_quality_aspects = Object.entries(fileData.fileData.factors.quality_aspects);
    let dataArray_measures = Object.entries(fileData.fileData.measures);
    let dataArray_diagnostics = Object.entries(fileData.fileData.diagnostics);

    // Sort the array based on the "value" property in ascending order
    dataArray_product_factors.sort((a, b) => a[1].value - b[1].value);
    dataArray_quality_aspects.sort((a, b) => a[1].value - b[1].value);
    dataArray_measures.sort((a, b) => a[1].value - b[1].value);
    dataArray_diagnostics.sort((a, b) => a[1].value - b[1].value);

    // Create a new object to store the sorted data
    let sortedData = {
        fileData: {
        name: fileData.fileData.name,
        additionalData: fileData.fileData.additionalData,
        global_config: fileData.fileData.global_config,
        factors: {
            product_factors: {},
            quality_aspects: {},
            tqi: fileData.fileData.factors.tqi
        },
        measures: {},
        diagnostics:{}
        }
    };

    // Populate the sorted data object with the sorted array
    dataArray_product_factors.forEach(([key, value]) => {
        sortedData.fileData.factors.product_factors[key] = value;
    });
    dataArray_quality_aspects.forEach(([key, value]) => {
        sortedData.fileData.factors.quality_aspects[key] = value;
    });
    dataArray_measures.forEach(([key, value]) => {
        sortedData.fileData.measures[key] = value;
    });
    dataArray_diagnostics.forEach(([key, value]) => {
        sortedData.fileData.diagnostics[key] = value;
    });
    

    alert("done!")
    
            
    return (sortedData);
}

 /* initial code
    const sortedKeys = Object.keys(fileData).sort((a, b) => {
        const aValue = fileData[a].value;
        const bValue = fileData[b].value;
            
        if (aValue && bValue) {
            return aValue.localeCompare(bValue);
        }
            
        return a.localeCompare(b);
        });
        const sortedObj = {};
        for (const key of sortedKeys) {
        sortedObj[key] = sortNestedJson(fileData[key]);
        }
    */