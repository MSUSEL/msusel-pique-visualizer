import { atom } from "jotai";
import * as schema from "./data/schema";

export function createState() {
  const dataset = atom<schema.base.Schema | undefined>(undefined);
  const sortingState = atom<"no-sort" | "value-asc" | "value-desc" | "weight-asc" | "weight-desc">("no-sort");
  const filteringState = atom<"no-filter" | "by-risk-level" | "by-range">("no-filter");
  const hideZeroWeightEdgeState = atom<"not-hidding" | "hidding">("not-hidding");
  

  // when filteringState = by-risk-level, checkbox states
  const filteringByRiskLevelCheckboxStates = atom<Record<string, boolean>>({
    Insignificant: true,
    Low: true,
    Medium: true,
    High: true,
    Severe: true,
  });

  // State for managing minimum and maximum values for value and weight ranges
  const minValueState = atom<number>(-100);
  const maxValueState = atom<number>(1);
  const minWeightState = atom<number>(0);
  const maxWeightState = atom<number>(1);

  return {
    dataset,
    sortingState,
    filteringState,
    filteringByRiskLevelCheckboxStates,
    hideZeroWeightEdgeState,
    minValueState,
    maxValueState,
    minWeightState,
    maxWeightState,
  };
}

export const State = createState();
