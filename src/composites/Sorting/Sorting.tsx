import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Select, DropdownMenu, Separator, Flex, Text } from "@radix-ui/themes";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { base } from "../../data/schema";


export const sortObjectByValue = (obj, ascending = true) => {
    const sortedEntries = Object.entries(obj).sort(([, a], [, b]) => {
        return ascending ? a.value - b.value : b.value - a.value;
    });
    return Object.fromEntries(sortedEntries);
};


export const handleSortAscending = () => {
    const [dataset, setDataset] = useAtom(State.dataset);
    if (dataset) {
        console.log("Original dataset:", dataset);
        const sortedQualityAspects = dataset.factors && dataset.factors.quality_aspects
            ? sortObjectByValue(dataset.factors.quality_aspects, true)
            : dataset.factors.quality_aspects;

        const sortedProductFactors = dataset.factors && dataset.factors.product_factors
            ? sortObjectByValue(dataset.factors.product_factors, true)
            : dataset.factors.product_factors;

        const sortedMeasures = dataset.measures
            ? sortObjectByValue(dataset.measures, true)
            : dataset.measures;

        const sortedDiagnostics = dataset.diagnostics
            ? sortObjectByValue(dataset.diagnostics, true)
            : dataset.diagnostics;

        const updatedDataset: base.Schema = {
            ...dataset,
            factors: {
                ...dataset.factors,
                quality_aspects: sortedQualityAspects as Record<string, any>,
                product_factors: sortedProductFactors as Record<string, any>,
            },
            measures: sortedMeasures as Record<string, any>,
            diagnostics: sortedDiagnostics as Record<string, any>
        };
        console.log("Updated dataset:", updatedDataset);

        setDataset(updatedDataset);
    }
};

// sorting with state management
type SortKey = 'value' | 'weights'; // Define the keys you want to sort by
type SortableItem = { [key in SortKey]: number }; // Type for items that can be sorted

const sortObject = <T extends Record<string, SortableItem>>(
    obj: T,
    sortKey: SortKey,
    ascending: boolean = true
): T => {
    const sortedEntries = Object.entries(obj).sort(([, a], [, b]) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        return ascending ? aValue - bValue : bValue - aValue;
    });
    return Object.fromEntries(sortedEntries) as T;
};


// const dataset = useAtom(State.dataset);
// const sortedMeasuresByValue = sortObject(dataset.measures, 'value', true); // Sort measures by value ascending
// const sortedMeasuresByWeight = sortObject(dataset.measures, 'weights', false); // Sort measures by weight descending
