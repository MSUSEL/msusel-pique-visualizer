import "./DescriptiveStats.css";
import cloneDeep from "lodash/cloneDeep";
import { findObjectsWithValue } from "../../features/Filter";
import { listNode, descriptiveStatisticData } from './index.ts';

/* Counts the number of nodes in each classification and risk level */
export function nodeRiskTally(fileData): descriptiveStatisticData
{
    const qualityCharacteristicsCount: number[] = [0,0,0,0,0];
    const qualityFactorsCount: number[] = [0,0,0,0,0];
    const measuresCount: number[] = [0,0,0,0,0];
    
    const cFileData = cloneDeep(fileData)

    const qualityAspectNodes: listNode[] = findObjectsWithValue(cFileData, 'quality_aspects')
    for (const node of qualityAspectNodes)
    {
        const value: number = node.value;
        if (value < 0.2) {qualityCharacteristicsCount[0]++;}
        else if (value >= 0.2 && value < 0.4) {qualityCharacteristicsCount[1]++;}
        else if (value >= 0.4 && value < 0.6) {qualityCharacteristicsCount[2]++;}
        else if (value >= 0.8 && value < 0.8) {qualityCharacteristicsCount[3]++;}
        else if (value >= 0.8 && value <= 1.0) {qualityCharacteristicsCount[4]++;}
    }

    const qualityFactorNodes: listNode[] = findObjectsWithValue(cFileData, 'product_factors')
    for (const node of qualityFactorNodes)
    {
        const value: number = node.value;
        if (value < 0.2) {qualityFactorsCount[0]++;}
        else if (value >= 0.2 && value < 0.4) {qualityFactorsCount[1]++;}
        else if (value >= 0.4 && value < 0.6) {qualityFactorsCount[2]++;}
        else if (value >= 0.8 && value < 0.8) {qualityFactorsCount[3]++;}
        else if (value >= 0.8 && value <= 1.0) {qualityFactorsCount[4]++;}
    }

    const measureNodes: listNode[] = findObjectsWithValue(cFileData, 'measures')
    for (const node of measureNodes)
    {
        const value: number = node.value;
        if (value < 0.2) {measuresCount[0]++;}
        else if (value >= 0.2 && value < 0.4) {measuresCount[1]++;}
        else if (value >= 0.4 && value < 0.6) {measuresCount[2]++;}
        else if (value >= 0.6 && value < 0.8) {measuresCount[3]++;}
        else if (value >= 0.8 && value <= 1.0) {measuresCount[4]++;}
    }

    const result: descriptiveStatisticData = {qualityCharacteristicsCount,qualityFactorsCount,measuresCount,qualityAspectNodes,qualityFactorNodes,measureNodes};
    return result;
}
