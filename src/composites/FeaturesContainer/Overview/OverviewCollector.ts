import { overviewData } from './index.ts';
import { State } from "../../../state.ts";
import { useAtomValue } from "jotai";

//expected DSStats for compact-output: 0-0-0-0-6 / 1-1-0-0-34 / 4-0-1-0-161

export function OverviewDataCollector():overviewData {
    const dataset = useAtomValue(State.dataset);

    const overviewData: overviewData = {
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
                
                overviewData.measureNodes.push({
                    name: measureName,
                    value: measure.value,
                    description: measure.description,
                    eval_strategy: measure.eval_strategy,
                    normalizer: measure.normalizer,
                    utility_function: extractUtilityFunctionName(measure.utility_function),
                });

                if (measure.value < 0.2) {overviewData.measuresCount[0]++;}
                else if (measure.value >= 0.2 && measure.value < 0.4) {overviewData.measuresCount[1]++;}
                else if (measure.value >= 0.4 && measure.value < 0.6) {overviewData.measuresCount[2]++;}
                else if (measure.value >= 0.6 && measure.value < 0.8) {overviewData.measuresCount[3]++;}
                else if (measure.value >= 0.8 && measure.value <= 1.0) {overviewData.measuresCount[4]++;}
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

                            overviewData.qualityFactorNodes.push({
                                name: factorName,
                                value: factor.value,
                                description: factor.description,
                                eval_strategy: factor.eval_strategy,
                                normalizer: factor.normalizer,
                                utility_function: extractUtilityFunctionName(factor.utility_function),
                            });

                            if (factor.value < 0.2) {overviewData.qualityFactorsCount[0]++;}
                            else if (factor.value >= 0.2 && factor.value < 0.4) {overviewData.qualityFactorsCount[1]++;}
                            else if (factor.value >= 0.4 && factor.value < 0.6) {overviewData.qualityFactorsCount[2]++;}
                            else if (factor.value >= 0.8 && factor.value < 0.8) {overviewData.qualityFactorsCount[3]++;}
                            else if (factor.value >= 0.8 && factor.value <= 1.0) {overviewData.qualityFactorsCount[4]++;}            
                        }        
                    }
                    else if (factorGroupName === "quality_aspects") {
                        if (Object.prototype.hasOwnProperty.call(factorGroup, factorName)) {
                            const aspect = factorGroup[factorName];

                            overviewData.qualityAspectNodes.push({
                                name: factorName,
                                value: aspect.value,
                                description: aspect.description,
                                eval_strategy: aspect.eval_strategy,
                                normalizer: aspect.normalizer,
                                utility_function: extractUtilityFunctionName(aspect.utility_function),
                            });

                            if (aspect.value < 0.2) {overviewData.qualityAspectsCount[0]++;}
                            else if (aspect.value >= 0.2 && aspect.value < 0.4) {overviewData.qualityAspectsCount[1]++;}
                            else if (aspect.value >= 0.4 && aspect.value < 0.6) {overviewData.qualityAspectsCount[2]++;}
                            else if (aspect.value >= 0.8 && aspect.value < 0.8) {overviewData.qualityAspectsCount[3]++;}
                            else if (aspect.value >= 0.8 && aspect.value <= 1.0) {overviewData.qualityAspectsCount[4]++;}                          
                        }
                    }
                    else console.log("Error in counter, factor group name not found.");
                }
            }
        }
    }
    return overviewData;
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