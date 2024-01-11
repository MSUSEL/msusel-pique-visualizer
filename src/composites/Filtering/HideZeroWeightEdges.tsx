import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import * as schema from '../../data/schema';

interface FilterableItem {
    value: number;
    weights: Record<string, number>;
    [key: string]: any;
}

function hideWeightsKey(obj: Record<string, FilterableItem>, hiddingStatus: boolean = true): Record<string, FilterableItem> {
    if (!hiddingStatus) return obj;

    let droppedPairsCount = 0; // Counter for dropped pairs

    Object.keys(obj).forEach(key => {
        const item = obj[key];
        if (item.weights) {
            // Count the pairs with value 0 before filtering
            droppedPairsCount += Object.values(item.weights).filter(value => value === 0).length;

            // Filter out the key-value pairs where value is 0
            const filteredWeights = Object.fromEntries(
                Object.entries(item.weights).filter(([, value]) => {
                    if (value === 0) {
                        droppedPairsCount++; // Increment the counter if a pair is dropped
                        return false; // Filter out this pair
                    }
                    return true;
                })
            );

            // Update the weights object with the filtered weights
            item.weights = filteredWeights;
        }
    });

    console.log(`Dropped ${droppedPairsCount} weight(s) = 0 pairs`); // Log the count of dropped pairs

    return obj;
}



export function hideZeroWeightEdges(dataset: schema.base.Schema | undefined): schema.base.Schema | undefined {
    const hideZeroWeightEdgeState = useAtomValue(State.hideZeroWeightEdgeState);

    if (!dataset) return undefined;

    // Clone the dataset
    const quickFilteredData = JSON.parse(JSON.stringify(dataset));

    // hide weights = 0
    switch (hideZeroWeightEdgeState) {
        case 'hidding':
            // sorting by value in ascending order
            quickFilteredData.factors.product_factors = hideWeightsKey(quickFilteredData.factors.product_factors, true);
            quickFilteredData.factors.quality_aspects = hideWeightsKey(quickFilteredData.factors.quality_aspects, true);
            quickFilteredData.factors.tqi = hideWeightsKey(quickFilteredData.factors.tqi, true);
            quickFilteredData.measures = hideWeightsKey(quickFilteredData.measures, true);
            quickFilteredData.diagnostics = hideWeightsKey(quickFilteredData.diagnostics, true);
            break;
        case 'not-hidding':
            break
    }

    return quickFilteredData



}