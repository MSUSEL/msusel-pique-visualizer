import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import * as schema from '../../data/schema';

interface FilterableItem {
    value: number;
    weights: Record<string, number>;
    [key: string]: any;
}

export function hideZeroWeightEdges(dataset: schema.base.Schema | undefined) : schema.base.Schema | undefined {
    if (!dataset) return undefined;

    // Clone the dataset
    const quickFilteredData = JSON.parse(JSON.stringify(dataset));
    
    return quickFilteredData



}