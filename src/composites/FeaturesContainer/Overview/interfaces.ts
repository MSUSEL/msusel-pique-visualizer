export interface ListProps {
    section: string;
    riskLvl: string;
    overviewData: OverviewData;
}

export interface DropDownState {
    isMainDropVisible: boolean[];
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