export interface listProps {
    section: string;
    riskLvl: string;
    overviewData: overviewData;
}

export interface dropDownState {
    isMainDropVisible: boolean[];
}

export interface addDetState {
    isAddDetVisible: boolean[];
}

export interface listNode {
    name: string;
    value: number;
    description: string;
    eval_strategy: string;
    normalizer: string;
    utility_function: string;
}

export interface overviewData {
    qualityAspectsCount: number[];
    qualityFactorsCount: number[];
    measuresCount: number[];
    qualityAspectNodes: listNode[];
    qualityFactorNodes: listNode[];
    measureNodes: listNode[];
}