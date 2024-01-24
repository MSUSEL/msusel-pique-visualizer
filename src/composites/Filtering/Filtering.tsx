import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import * as schema from "../../data/schema";

interface FilterableItem {
    value: number;
    weights: Record<string, number>;
    [key: string]: any;
}

// type CheckboxStates = Record<'Insignificant' | 'Low' | 'Medium' | 'High' | 'Severe', boolean>;

function calculateFilterRanges(checkboxStates: Record<string, boolean>): [number, number][] {
    const ranges: Record<string, [number, number]> = {
        Insignificant: [0.8, 1],
        Low: [0.6, 0.8],
        Medium: [0.4, 0.6],
        High: [0.2, 0.4],
        Severe: [-10, 0.2]
    };
    const needToFilterRange = Object.entries(checkboxStates)
        .filter(([key, value]) => !value && ranges.hasOwnProperty(key))
        .map(([key, _]) => ranges[key]);

    // console.log(needToFilterRange)

    return needToFilterRange
}


function filterByValueForRiskLevel(obj: Record<string, FilterableItem>, ranges: [number, number][]): Record<string, FilterableItem> {
    const originalLength = Object.keys(obj).length;
    const filteredObj = Object.fromEntries(Object.entries(obj).filter(([_, item]) => {
        return !ranges.some(range => item.value >= range[0] && item.value <= range[1]);
    }));
    const filteredLength = Object.keys(filteredObj).length;

    // console.log(`filterByValue: Filtered out ${originalLength - filteredLength} objects`);

    return filteredObj;
}

function filterByValue(obj: Record<string, FilterableItem>, range: [number, number]): Record<string, FilterableItem> {
    const filteredObj = Object.fromEntries(Object.entries(obj).filter(([_, item]) => {
        return item.value >= range[0] && item.value <= range[1];
    }));

    return filteredObj;
}


function filterWeightsByWeightKeys(obj: Record<string, FilterableItem>, dictionary: string[]): Record<string, FilterableItem> {
    const originalLength = Object.keys(obj).length;
    const filteredObj = Object.fromEntries(
        Object.entries(obj).map(([key, item]) => [
            key,
            { ...item, weights: Object.fromEntries(Object.entries(item.weights).filter(([k, _]) => dictionary.includes(k))) }
        ])
    );
    const filteredLength = Object.keys(filteredObj).length;

    // console.log(`filterByWeights: Filtered out ${originalLength - filteredLength} objects`);

    return filteredObj;
}

// by risk levels
function filterObjectsByRiskLevels(
    filterWeightsObj: Record<string, FilterableItem>,
    filterValueObj: Record<string, FilterableItem>,
    checkboxStates: Record<string, boolean> // Changed type
): [Record<string, FilterableItem>, Record<string, FilterableItem>] {
    // Define the filter range based on checkboxStates
    const filterRange = calculateFilterRanges(checkboxStates);

    // Filter filterValueObj
    const filteredByValueObj = filterByValueForRiskLevel(filterValueObj, filterRange);

    // Get the dictionary of names from filteredByValueObj
    const dictionary = Object.keys(filteredByValueObj);

    // Filter filterWeightsObj
    const filteredByWeightsObj = filterWeightsByWeightKeys(filterWeightsObj, dictionary);

    return [filteredByWeightsObj, filteredByValueObj];
}

// by value range
function filterObjectsByValueRange(
    filterWeightsObj: Record<string, FilterableItem>,
    filterValueObj: Record<string, FilterableItem>,
    minValue: number,
    maxValue: number
): [Record<string, FilterableItem>, Record<string, FilterableItem>] {
    // Define the filter range
    const filterRange: [number, number] = [minValue, maxValue];

    // Filter filterValueObj
    const filteredByValueObj = filterByValue(filterValueObj, filterRange);

    // Get the dictionary of names from filteredByValueObj
    const dictionary = Object.keys(filteredByValueObj);

    // Filter filterWeightsObj
    const filteredByWeightsObj = filterWeightsByWeightKeys(filterWeightsObj, dictionary);

    return [filteredByWeightsObj, filteredByValueObj];
}


// by weight range 

function filterByWeight(obj: Record<string, FilterableItem>, range: [number, number]): Record<string, FilterableItem> {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, item]) => {
            return Object.values(item.weights).some(weight => weight >= range[0] && weight <= range[1]);
        })
    );
}

function filterValueByWeightKeys(obj: Record<string, FilterableItem>, keys: string[]): Record<string, FilterableItem> {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, _]) => keys.includes(key))
    );
}
function filterObjectsByWeightRange(
    filterWeightsObj: Record<string, FilterableItem>,
    filterValueObj: Record<string, FilterableItem>,
    minWeight: number,
    maxWeight: number
): [Record<string, FilterableItem>, Record<string, FilterableItem>] {
    // Define the filter range for weights
    const filterRange: [number, number] = [minWeight, maxWeight];

    // Filter filterWeightsObj by weight range
    const filteredByWeightsObj = filterByWeight(filterWeightsObj, filterRange);

    // Get the dictionary of names from filteredByWeightsObj
    const dictionary = Object.keys(filteredByWeightsObj);

    // Filter filterValueObj based on the keys in the filteredByWeightsObj
    const filteredByValueObj = filterValueByWeightKeys(filterValueObj, dictionary);

    return [filteredByWeightsObj, filteredByValueObj];
}


// exported functions: 
export function filterByRiskLevels(
    dataset: schema.base.Schema | undefined,
    checkboxStates: Record<string, boolean>
): schema.base.Schema | undefined {
    if (!dataset) return undefined;

    const filteredDataset = JSON.parse(JSON.stringify(dataset));

    // Apply filtering based on risk level
    [filteredDataset.factors.product_factors, filteredDataset.measures] = filterObjectsByRiskLevels(filteredDataset.factors.product_factors, filteredDataset.measures, checkboxStates);
    [filteredDataset.factors.quality_aspects, filteredDataset.factors.product_factors] = filterObjectsByRiskLevels(filteredDataset.factors.quality_aspects, filteredDataset.factors.product_factors, checkboxStates);
    [filteredDataset.factors.tqi, filteredDataset.factors.quality_aspects] = filterObjectsByRiskLevels(filteredDataset.factors.tqi, filteredDataset.factors.quality_aspects, checkboxStates);
    
    return filteredDataset;
}



export function filterByValueRange(
    dataset: schema.base.Schema | undefined,
    minValue: number,
    maxValue: number
): schema.base.Schema | undefined {
    if (!dataset) return undefined;

    const filteredDataset = JSON.parse(JSON.stringify(dataset));

    [filteredDataset.factors.product_factors, filteredDataset.measures] = filterObjectsByValueRange(
        filteredDataset.factors.product_factors,
        filteredDataset.measures,
        minValue,
        maxValue
    );
    [filteredDataset.factors.quality_aspects, filteredDataset.factors.product_factors] = filterObjectsByValueRange(
        filteredDataset.factors.quality_aspects,
        filteredDataset.factors.product_factors,
        minValue,
        maxValue
    );
    [filteredDataset.factors.tqi, filteredDataset.factors.quality_aspects] = filterObjectsByValueRange(
        filteredDataset.factors.tqi,
        filteredDataset.factors.quality_aspects,
        minValue,
        maxValue
    );

    return filteredDataset;
}


export function filterByWeightRange(
    dataset: schema.base.Schema | undefined, 
    minWeight: number, 
    maxWeight: number
): schema.base.Schema | undefined {
    if (!dataset) return undefined;

    const filteredDataset = JSON.parse(JSON.stringify(dataset));

    [filteredDataset.factors.product_factors, filteredDataset.measures] = filterObjectsByWeightRange(
        filteredDataset.factors.product_factors, 
        filteredDataset.measures, 
        minWeight, 
        maxWeight
    );
    [filteredDataset.factors.quality_aspects, filteredDataset.factors.product_factors] = filterObjectsByWeightRange(
        filteredDataset.factors.quality_aspects, 
        filteredDataset.factors.product_factors, 
        minWeight, 
        maxWeight
    );
    [filteredDataset.factors.tqi, filteredDataset.factors.quality_aspects] = filterObjectsByWeightRange(
        filteredDataset.factors.tqi, 
        filteredDataset.factors.quality_aspects, 
        minWeight, 
        maxWeight
    );

    return filteredDataset;
}


