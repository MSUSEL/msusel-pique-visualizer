import "./DescriptiveStats.css";
import { descriptiveStatisticData } from './index.ts';
import { State } from "../../../state.ts";
import { useAtomValue } from "jotai";

//expected DSStats for compact-output: 0-0-0-0-6 / 1-1-0-0-34 / 4-0-1-0-161

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
                    utility_function: extractUtilityFunctionName(measure.utility_function),
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
                    if (factorGroupName === "tqi") { /* Does nothing for now */ }
                    else if (factorGroupName === "product_factors") {
                        if (Object.prototype.hasOwnProperty.call(factorGroup, factorName)) {
                            const factor = factorGroup[factorName];

                            descriptiveStatisticData.qualityFactorNodes.push({
                                name: factorName,
                                value: factor.value,
                                description: factor.description,
                                eval_strategy: factor.eval_strategy,
                                normalizer: factor.normalizer,
                                utility_function: extractUtilityFunctionName(factor.utility_function),
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
                                utility_function: extractUtilityFunctionName(aspect.utility_function),
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

function extractUtilityFunctionName(utilityFunction: string | object): string {
    if (typeof utilityFunction === 'string') {
        return utilityFunction;
    }
    else if (typeof utilityFunction === 'object' && 'name' in utilityFunction) {
        return (utilityFunction as {name:string}).name;
    }
    else return 'extractUtilityFunctionName error';
}