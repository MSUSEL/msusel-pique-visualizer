import { OverviewData } from "./index.ts";
import * as Schema from "../../data/schema.ts";

//Reads through dataset information and targets specific data
// from it to display information more easily in surrounding
// overview functions.
export function collectOverviewData(
  fileData: Schema.base.Schema
): OverviewData {
  const overviewData: OverviewData = {
    qualityAspectsCount: [0, 0, 0, 0, 0],
    qualityFactorsCount: [0, 0, 0, 0, 0],
    measuresCount: [0, 0, 0, 0, 0],
    qualityAspectNodes: [],
    qualityFactorNodes: [],
    measureNodes: [],
  };

  if (fileData) {
    //Iterate through measure nodes in dataset
    for (const measureName in fileData.measures) {
      const measure = fileData.measures[measureName];
      //Push node into array of measure nodes containing specified values from file data
      overviewData.measureNodes.push({
        name: measureName,
        value: measure.value,
        description: measure.description,
        eval_strategy: measure.eval_strategy,
        normalizer: measure.normalizer,
        utility_function: extractUtilityFunctionName(measure.utility_function),
      });

      //Tally the node based on risk level
      if (measure.value < 0.2) {
        overviewData.measuresCount[0]++;
      } else if (measure.value >= 0.2 && measure.value < 0.4) {
        overviewData.measuresCount[1]++;
      } else if (measure.value >= 0.4 && measure.value < 0.6) {
        overviewData.measuresCount[2]++;
      } else if (measure.value >= 0.6 && measure.value < 0.8) {
        overviewData.measuresCount[3]++;
      } else if (measure.value >= 0.8 && measure.value <= 1.0) {
        overviewData.measuresCount[4]++;
      }
    }

    //Iterate through product factors and quality aspects
    for (const factorGroupName in fileData.factors) {
      const factorGroup = fileData.factors[factorGroupName];

      for (const factorName in factorGroup) {
        if (factorGroupName === "tqi") {
          /* Does nothing for now */
        } else if (factorGroupName === "product_factors") {
          const factor = factorGroup[factorName];

          //Push node into array of factor nodes containing specified values from file data
          overviewData.qualityFactorNodes.push({
            name: factorName,
            value: factor.value,
            description: factor.description,
            eval_strategy: factor.eval_strategy,
            normalizer: factor.normalizer,
            utility_function: extractUtilityFunctionName(
              factor.utility_function
            ),
          });

          //Tally node based on risk level
          if (factor.value < 0.2) {
            overviewData.qualityFactorsCount[0]++;
          } else if (factor.value >= 0.2 && factor.value < 0.4) {
            overviewData.qualityFactorsCount[1]++;
          } else if (factor.value >= 0.4 && factor.value < 0.6) {
            overviewData.qualityFactorsCount[2]++;
          } else if (factor.value >= 0.8 && factor.value < 0.8) {
            overviewData.qualityFactorsCount[3]++;
          } else if (factor.value >= 0.8 && factor.value <= 1.0) {
            overviewData.qualityFactorsCount[4]++;
          }
        } else if (factorGroupName === "quality_aspects") {
          const aspect = factorGroup[factorName];

          //Push node into array of aspect nodes containing specified values from file data
          overviewData.qualityAspectNodes.push({
            name: factorName,
            value: aspect.value,
            description: aspect.description,
            eval_strategy: aspect.eval_strategy,
            normalizer: aspect.normalizer,
            utility_function: extractUtilityFunctionName(
              aspect.utility_function
            ),
          });

          //Tally node based on risk level
          if (aspect.value < 0.2) {
            overviewData.qualityAspectsCount[0]++;
          } else if (aspect.value >= 0.2 && aspect.value < 0.4) {
            overviewData.qualityAspectsCount[1]++;
          } else if (aspect.value >= 0.4 && aspect.value < 0.6) {
            overviewData.qualityAspectsCount[2]++;
          } else if (aspect.value >= 0.8 && aspect.value < 0.8) {
            overviewData.qualityAspectsCount[3]++;
          } else if (aspect.value >= 0.8 && aspect.value <= 1.0) {
            overviewData.qualityAspectsCount[4]++;
          }
        }
      }
    }
  }
  return overviewData;
}

//Carry name of utility function through
function extractUtilityFunctionName(utilityFunction: string | object): string {
  //Original JSON Format, no extra details
  if (typeof utilityFunction === "string") {
    return utilityFunction;
  }
  //New JSON format with expanded utility function information,
  // just relays name of utility function for now
  else if (typeof utilityFunction === "object" && "name" in utilityFunction) {
    return (utilityFunction as { name: string }).name;
  } else return "extractUtilityFunctionName error";
}
