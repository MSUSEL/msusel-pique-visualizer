import * as Schema from "../../../data/schema";
export interface ListProps {
  section: string;
  riskLvl: string;
  overviewData: OverviewData;
}

export interface DropDownState {
  isMainDropVisible: boolean[];
}

export interface OvListData {
  filedata: Schema.base.Schema;
}

export interface DropListData {
  riskLvl: string;
  section: string;
  ovData: OverviewData;
}

export interface AddDetState {
  isAddDetVisible: boolean[];
}

export interface ListNode {
  name: string;
  value: number;
  description: string;
  eval_strategy: string;
  normalizer: string;
  utility_function: string;
}

export interface OverviewData {
  qualityAspectsCount: number[];
  qualityFactorsCount: number[];
  measuresCount: number[];
  qualityAspectNodes: ListNode[];
  qualityFactorNodes: ListNode[];
  measureNodes: ListNode[];
}
