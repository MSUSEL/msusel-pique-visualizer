import { atom } from "jotai";
import * as schema from "./data/schema";

export function createState() {
  const dataset = atom<schema.base.Schema | undefined>(undefined);
  const sortingState = atom<"no-sort" | "value-asc" | "value-desc" | "weight-asc" | "weight-desc">("no-sort");

  return {
    dataset,
    sortingState,
  };
}

export const State = createState();
