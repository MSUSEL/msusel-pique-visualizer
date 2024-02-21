import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { State } from '../state';

import { sort } from '../composites/Sorting/Sorting';
import { filterByRiskLevels } from '../composites/Filtering/FilterByRiskLevel';
import { filterByWeightRange } from "../composites/Filtering/FilterByWeightRange";
import { filterByValueRange } from "../composites/Filtering/FilterByValueRange";
import { hideZeroWeightEdges } from "../composites/Filtering/HideZeroWeightEdges";


export const useProcessedData = () => {
  // Retrieve state values
  const dataset = useAtomValue(State.dataset);
  const sortState = useAtomValue(State.sortingState);
  const filterState = useAtomValue(State.filteringState);
  const checkboxStates = useAtomValue(State.filteringByRiskLevelCheckboxStates);
  const hideZeroWeightEdgeState = useAtomValue(State.hideZeroWeightEdgeState);
  const minValueState = useAtomValue(State.minValueState);
  const maxValueState = useAtomValue(State.maxValueState);
  const minWeightState = useAtomValue(State.minWeightState);
  const maxWeightState = useAtomValue(State.maxWeightState);

  return useMemo(() => {
    if (!dataset) return null;

    let data = sort(sortState, dataset);

    const isHiding = hideZeroWeightEdgeState === 'hidding';
    data = hideZeroWeightEdges(data, isHiding);

    data = filterByRiskLevels(data, checkboxStates);

    data = filterByValueRange(data, minValueState, maxValueState);

    data = filterByWeightRange(data, minWeightState, maxWeightState);

    // Add any other processing steps here

    return data;
  }, [dataset, sortState, filterState, checkboxStates, hideZeroWeightEdgeState, minValueState, maxValueState, minWeightState, maxWeightState]);
};
