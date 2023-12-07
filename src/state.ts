import { atom } from "jotai";
import * as schema from "./data/schema";

export function createState() {
  return {
    dataset: atom<schema.base.Schema | undefined>(undefined),
  };
}

export const State = createState();
