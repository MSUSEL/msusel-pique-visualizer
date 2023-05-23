/**
 * Return the sorted json file from the initial .json
 * @param fileData PIQUE .json output file.
 */

export function sortNestedJson(fileData) {
    
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
            
    return sortedObj;
}