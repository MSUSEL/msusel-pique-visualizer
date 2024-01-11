import { useAtom } from "jotai";
import { State } from "../../state";
import * as schema from "../../data/schema";

interface FilterableItem {
    value: number;
    weights: Record<string, number>;
    [key: string]: any;
}

export function filterByRiskLevels(dataset: schema.base.Schema | undefined): schema.base.Schema | undefined {
    const [checkboxStates] = useAtom(State.filteringByRiskLevelCheckboxStates);
    if (!dataset) return undefined;

    // Helper function to classify risk level
    const classifyRiskLevel = (value: number) => {
        if (value < 0.2) return 'Severe';
        if (value < 0.4) return 'High';
        if (value < 0.6) return 'Medium';
        if (value < 0.8) return 'Low';
        return 'Insignificant';
    };

    // Helper function to filter objects by value
    function filterObjectsByRiskLevel(obj: Record<string, FilterableItem>): Record<string, FilterableItem> {
        return Object.fromEntries(
            Object.entries(obj).filter(([key, val]) => {
                const riskLevel = classifyRiskLevel(val.value);
                return checkboxStates[riskLevel];
            })
        );
    }

    // Clone the dataset
    const filteredDataset = JSON.parse(JSON.stringify(dataset));

    // Apply filtering based on risk level
    if (filteredDataset.factors) {
        ['tqi', 'quality_aspects', 'product_factors'].forEach(part => {
            if (filteredDataset.factors[part]) {
                filteredDataset.factors[part] = filterObjectsByRiskLevel(filteredDataset.factors[part]);
            }
        });
    }

    filteredDataset.measures = filterObjectsByRiskLevel(filteredDataset.measures);
    filteredDataset.diagnostics = filterObjectsByRiskLevel(filteredDataset.diagnostics);

    return filteredDataset;
}
