import "./Features.css"
/**
 * Return the filtered json object
 */

export function filterZero(fileData) {
    const {filteredObj} = Object.values(fileData).filter((node) => node.value !== 0);       
    return (filteredObj);
}

export function filterRange(fileData, min, max) {
    let {filteredObj} = fileData.filter((node) => node.value >= min);     
    filteredObj = filteredObj.filter((node) => node.value <= max);   
    return (filteredObj);
}