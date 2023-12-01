import "./DescriptiveStats.css";
import cloneDeep from "lodash/cloneDeep";
import { findObjectsWithValue } from "../../features/Filter";

/* Counts the number of nodes in each classification and risk level */
export function nodeRiskTally(fileData)
{
    var qChar = [0,0,0,0,0], qFact = [0,0,0,0,0], qfMeas = [0,0,0,0,0];
    
    const cFileData = cloneDeep(fileData)

    let qAspectsArr = findObjectsWithValue(cFileData, 'quality_aspects')
    for (let node of qAspectsArr)
    {
        let value = node.value;
        if (value < 0.2) {qChar[0]++;}
        else if (value >= 0.2 && value < 0.4) {qChar[1]++;}
        else if (value >= 0.4 && value < 0.6) {qChar[2]++;}
        else if (value >= 0.8 && value < 0.8) {qChar[3]++;}
        else if (value >= 0.8 && value <= 1.0) {qChar[4]++;}
    }

    let pFactorsArr = findObjectsWithValue(cFileData, 'product_factors')
    for (let node of pFactorsArr)
    {
        let value = node.value;
        if (value < 0.2) {qFact[0]++;}
        else if (value >= 0.2 && value < 0.4) {qFact[1]++;}
        else if (value >= 0.4 && value < 0.6) {qFact[2]++;}
        else if (value >= 0.8 && value < 0.8) {qFact[3]++;}
        else if (value >= 0.8 && value <= 1.0) {qFact[4]++;}
    }

    let fMeasuresArr = findObjectsWithValue(cFileData, 'measures')
    for (let node of fMeasuresArr)
    {
        let value = node.value;
        if (value < 0.2) {qfMeas[0]++;}
        else if (value >= 0.2 && value < 0.4) {qfMeas[1]++;}
        else if (value >= 0.4 && value < 0.6) {qfMeas[2]++;}
        else if (value >= 0.6 && value < 0.8) {qfMeas[3]++;}
        else if (value >= 0.8 && value <= 1.0) {qfMeas[4]++;}
    }

    var NodeCount = {qChar,qFact,qfMeas,qAspectsArr,pFactorsArr,fMeasuresArr};

    return NodeCount;
}
