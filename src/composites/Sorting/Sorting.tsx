import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import * as schema from '../../data/schema';

interface SortableItem {
    value: number;
    weights: Record<string, number>;
    [key: string]: any;
}

// for sorting by value
function sortObjectsByValue(obj: Record<string, SortableItem>, ascending: boolean = true): Record<string, SortableItem> {
    return Object.entries(obj)
        .sort(([, a], [, b]) => ascending ? a.value - b.value : b.value - a.value)
        .reduce<Record<string, SortableItem>>((acc, [key, val]) => ({ ...acc, [key]: val }), {});
}

// for soring by weights
function sortChildrenByWeights(children: Record<string, any>, weights: Record<string, number>, ascending: boolean = true): Record<string, any> {
    // Sort the keys in weights, either in ascending or descending order
    const sortedKeys = Object.entries(weights)
        .sort(([, a], [, b]) => ascending ? a - b : b - a)
        .map(([key]) => key);

    // Reorder children based on sorted keys
    const sortedChildren: Record<string, any> = {};
    sortedKeys.forEach(key => {
        const child = children[key];
        if (child !== undefined) {
            sortedChildren[key] = child;
        }
    });

    return sortedChildren;
}

function sortWeightsAndChildren(children: Record<string, any>, weights: Record<string, number>, ascending: boolean = true): { sortedWeights: Record<string, number>, sortedChildren: Record<string, any> } {
    // Sort the keys in weights, either in ascending or descending order
    const sortedKeys = Object.entries(weights)
        .sort(([, a], [, b]) => ascending ? a - b : b - a)
        .map(([key]) => key);

    // Create a new weights object with sorted keys
    const sortedWeights: Record<string, number> = {};
    sortedKeys.forEach(key => {
        sortedWeights[key] = weights[key];
    });

    // Reorder children based on sorted weights keys
    const sortedChildren: Record<string, any> = {};
    sortedKeys.forEach(key => {
        const child = children[key];
        if (child !== undefined) {
            sortedChildren[key] = child;
        }
    });

    return { sortedWeights, sortedChildren };
}



export function sort(sortState: string): schema.base.Schema | undefined {
    const dataset = useAtomValue(State.dataset);
    if (!dataset) return undefined;

    // Clone the dataset
    const sortedDataset = JSON.parse(JSON.stringify(dataset));

    switch (sortState) {
        case 'value-asc':
            // sorting by value in ascending order
            sortedDataset.factors.product_factors = sortObjectsByValue(sortedDataset.factors.product_factors, true);
            sortedDataset.factors.quality_aspects = sortObjectsByValue(sortedDataset.factors.quality_aspects, true);
            sortedDataset.factors.tqi = sortObjectsByValue(sortedDataset.factors.tqi, true);
            sortedDataset.measures = sortObjectsByValue(sortedDataset.measures, true);
            sortedDataset.diagnostics = sortObjectsByValue(sortedDataset.diagnostics, true);
            break;
        case 'value-desc':
            // sorting by value in descending order
            sortedDataset.factors.product_factors = sortObjectsByValue(sortedDataset.factors.product_factors, false);
            sortedDataset.factors.quality_aspects = sortObjectsByValue(sortedDataset.factors.quality_aspects, false);
            sortedDataset.factors.tqi = sortObjectsByValue(sortedDataset.factors.tqi, false);
            sortedDataset.measures = sortObjectsByValue(sortedDataset.measures, false);
            sortedDataset.diagnostics = sortObjectsByValue(sortedDataset.diagnostics, false);
            
            break;
        case 'weight-asc':
            // sorting by weight in ascending order
            

            
            break;
        case 'weight-desc':
            // sorting by weight in descending order
            
            /*
            ['tqi', 'product_factors', 'quality_aspects', 'measures'].forEach(part => {
                if (sortedDataset.factors && sortedDataset.factors[part]) {
                    Object.entries(sortedDataset.factors[part]).forEach(([key, obj]) => {
                        const parentObj = obj as SortableItem;
                        if (parentObj.weights) {
                            const result = sortWeightsAndChildren(sortedDataset.factors[part][key], parentObj.weights, false);
                            sortedDataset.factors[part][key] = result.sortedChildren;
                            // Update weights to reflect the new order
                            parentObj.weights = result.sortedWeights;
                        }
                    });
                }
            });*/
            
            break;
        default:
            // No sorting or unrecognized sort state
            return dataset;
    }

    // Return the sorted dataset
    // Placeholder return, replace with actual sorted dataset
    return sortedDataset;
}
