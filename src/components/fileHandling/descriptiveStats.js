import cloneDeep from "lodash/cloneDeep";
import { findObjectsWithValue } from "../features/Filter";

export default function countChars(fileData)
{
    var qChar = [0,0,0,0,0], qFact = [0,0,0,0,0], qfMeas = [0,0,0,0,0];
    
    let cFileData = cloneDeep(fileData)

    let qAspects = findObjectsWithValue(cFileData, 'quality_aspects')
    for (let node of qAspects)
    {
        let value = node.value;
        if (value < 0.2) {qChar[0]++;}
        else if (value >= 0.2 && value < 0.4) {qChar[1]++;}
        else if (value >= 0.4 && value < 0.6) {qChar[2]++;}
        else if (value >= 0.8 && value < 0.8) {qChar[3]++;}
        else if (value >= 0.8 && value <= 1.0) {qChar[4]++;}
    }

    let pFactors = findObjectsWithValue(cFileData, 'product_factors')
    for (let node of pFactors)
    {
        let value = node.value;
        if (value < 0.2) {qFact[0]++;}
        else if (value >= 0.2 && value < 0.4) {qFact[1]++;}
        else if (value >= 0.4 && value < 0.6) {qFact[2]++;}
        else if (value >= 0.8 && value < 0.8) {qFact[3]++;}
        else if (value >= 0.8 && value <= 1.0) {qFact[4]++;}
    }

    let fMeasures = findObjectsWithValue(cFileData, 'measures')
    for (let node of fMeasures)
    {
        let value = node.value;
        if (value < 0.2) {qfMeas[0]++;}
        else if (value >= 0.2 && value < 0.4) {qfMeas[1]++;}
        else if (value >= 0.4 && value < 0.6) {qfMeas[2]++;}
        else if (value >= 0.8 && value < 0.8) {qfMeas[3]++;}
        else if (value >= 0.8 && value <= 1.0) {qfMeas[4]++;}
    }

    var qualityChars = {qChar,qFact,qfMeas};
    return qualityChars;
}