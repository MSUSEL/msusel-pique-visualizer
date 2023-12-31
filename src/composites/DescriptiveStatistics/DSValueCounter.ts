import "./DescriptiveStats.css";
import { descriptiveStatisticData } from './index.ts';
import { State } from "../../state.ts";
import { useAtomValue } from "jotai";


//expected DSStats: 0-0-0-0-6 / 1-1-0-0-34 / 4-0-1-0-161

/* Counts the number of nodes in each classification and risk level */
// export function nodeRiskTally(props:schema.base.Schema): descriptiveStatisticData
// {
//     const fileData = useAtomValue(State.dataset)
//     const qualityCharacteristicsCount: number[] = [0,0,0,0,0];
//     const qualityFactorsCount: number[] = [0,0,0,0,0];
//     const measuresCount: number[] = [0,0,0,0,0];
    
//     const cFileData:schema.base.Schema = props;


//     const qualityAspectNodes: listNode[] = findObjectsWithValue(cFileData, 'quality_aspects')
//     for (const node of qualityAspectNodes)
//     {
//         const value: number = node.value;
//         if (value < 0.2) {qualityCharacteristicsCount[0]++;}
//         else if (value >= 0.2 && value < 0.4) {qualityCharacteristicsCount[1]++;}
//         else if (value >= 0.4 && value < 0.6) {qualityCharacteristicsCount[2]++;}
//         else if (value >= 0.8 && value < 0.8) {qualityCharacteristicsCount[3]++;}
//         else if (value >= 0.8 && value <= 1.0) {qualityCharacteristicsCount[4]++;}
//     }

//     const qualityFactorNodes: listNode[] = findObjectsWithValue(cFileData, 'product_factors')
//     for (const node of qualityFactorNodes)
//     {
//         const value: number = node.value;
//         if (value < 0.2) {qualityFactorsCount[0]++;}
//         else if (value >= 0.2 && value < 0.4) {qualityFactorsCount[1]++;}
//         else if (value >= 0.4 && value < 0.6) {qualityFactorsCount[2]++;}
//         else if (value >= 0.8 && value < 0.8) {qualityFactorsCount[3]++;}
//         else if (value >= 0.8 && value <= 1.0) {qualityFactorsCount[4]++;}
//     }

//     const measureNodes: listNode[] = findObjectsWithValue(cFileData, 'measures')
//     for (const node of measureNodes)
//     {
//         const value: number = node.value;
//         if (value < 0.2) {measuresCount[0]++;}
//         else if (value >= 0.2 && value < 0.4) {measuresCount[1]++;}
//         else if (value >= 0.4 && value < 0.6) {measuresCount[2]++;}
//         else if (value >= 0.6 && value < 0.8) {measuresCount[3]++;}
//         else if (value >= 0.8 && value <= 1.0) {measuresCount[4]++;}
//     }

//     const result: descriptiveStatisticData = {qualityCharacteristicsCount,qualityFactorsCount,measuresCount,qualityAspectNodes,qualityFactorNodes,measureNodes};
//     return result;
// }

export function nodeRiskTally():descriptiveStatisticData {
    const dataset = useAtomValue(State.dataset);

    const descriptiveStatisticData: descriptiveStatisticData = {
        qualityAspectsCount: [0, 0, 0, 0, 0],
        qualityFactorsCount: [0, 0, 0, 0, 0],
        measuresCount: [0, 0, 0, 0, 0],
        qualityAspectNodes: [],
        qualityFactorNodes: [],
        measureNodes: [],
    };

    if(dataset) {
        for (const measureName in dataset.measures) {
            if (Object.prototype.hasOwnProperty.call(dataset.measures, measureName)) {
                const measure = dataset.measures[measureName];
                
                descriptiveStatisticData.measureNodes.push({
                    name: measureName,
                    value: measure.value,
                    description: measure.description,
                    eval_strategy: measure.eval_strategy,
                    normalizer: measure.normalizer,
                    utility_function: measure.utility_function,
                });

                if (measure.value < 0.2) {descriptiveStatisticData.measuresCount[0]++;}
                else if (measure.value >= 0.2 && measure.value < 0.4) {descriptiveStatisticData.measuresCount[1]++;}
                else if (measure.value >= 0.4 && measure.value < 0.6) {descriptiveStatisticData.measuresCount[2]++;}
                else if (measure.value >= 0.6 && measure.value < 0.8) {descriptiveStatisticData.measuresCount[3]++;}
                else if (measure.value >= 0.8 && measure.value <= 1.0) {descriptiveStatisticData.measuresCount[4]++;}
            }
        }

        for (const factorGroupName in dataset.factors) {
            if (Object.prototype.hasOwnProperty.call(dataset.factors, factorGroupName)) {
                const factorGroup = dataset.factors[factorGroupName];

                for (const factorName in factorGroup) {
                    if (factorGroupName === "tqi") { /* Do nothing for now */ }
                    else if (factorGroupName === "product_factors") {
                        if (Object.prototype.hasOwnProperty.call(factorGroup, factorName)) {
                            const factor = factorGroup[factorName];

                            descriptiveStatisticData.qualityFactorNodes.push({
                                name: factorName,
                                value: factor.value,
                                description: factor.description,
                                eval_strategy: factor.eval_strategy,
                                normalizer: factor.normalizer,
                                utility_function: factor.utility_function,
                            });

                            if (factor.value < 0.2) {descriptiveStatisticData.qualityFactorsCount[0]++;}
                            else if (factor.value >= 0.2 && factor.value < 0.4) {descriptiveStatisticData.qualityFactorsCount[1]++;}
                            else if (factor.value >= 0.4 && factor.value < 0.6) {descriptiveStatisticData.qualityFactorsCount[2]++;}
                            else if (factor.value >= 0.8 && factor.value < 0.8) {descriptiveStatisticData.qualityFactorsCount[3]++;}
                            else if (factor.value >= 0.8 && factor.value <= 1.0) {descriptiveStatisticData.qualityFactorsCount[4]++;}            
                        }        
                    }
                    else if (factorGroupName === "quality_aspects") {
                        if (Object.prototype.hasOwnProperty.call(factorGroup, factorName)) {
                            const aspect = factorGroup[factorName];

                            descriptiveStatisticData.qualityAspectNodes.push({
                                name: factorName,
                                value: aspect.value,
                                description: aspect.description,
                                eval_strategy: aspect.eval_strategy,
                                normalizer: aspect.normalizer,
                                utility_function: aspect.utility_function,
                            });

                            if (aspect.value < 0.2) {descriptiveStatisticData.qualityAspectsCount[0]++;}
                            else if (aspect.value >= 0.2 && aspect.value < 0.4) {descriptiveStatisticData.qualityAspectsCount[1]++;}
                            else if (aspect.value >= 0.4 && aspect.value < 0.6) {descriptiveStatisticData.qualityAspectsCount[2]++;}
                            else if (aspect.value >= 0.8 && aspect.value < 0.8) {descriptiveStatisticData.qualityAspectsCount[3]++;}
                            else if (aspect.value >= 0.8 && aspect.value <= 1.0) {descriptiveStatisticData.qualityAspectsCount[4]++;}                          
                        }
                    }
                    else console.log("Error in counter, factor group name not found.");
                }
            }
        }
    }
    return descriptiveStatisticData;
}