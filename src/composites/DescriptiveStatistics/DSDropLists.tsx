// import { Component, ReactNode } from "react";
import { descriptiveStatisticData, listNode } from './index.ts';
import * as Accordion from "@radix-ui/react-accordion";

// export class DisplayDSList extends Component<listProps, addDetState> {
//     constructor(props: listProps) {
//         super(props);
//         this.state = {isAddDetVisible: Array(getRelatedArray(this.props.section, this.props.riskLvl, this.props.descriptiveStatisticData).length).fill(false)};
//     }

//     toggleAdditionalDetailsList = (index: number) => {
//         const updatedState = [...this.state.isAddDetVisible];
//         updatedState[index] = !updatedState[index];
//         this.setState({isAddDetVisible: updatedState});
//     };

//     render(): ReactNode {
//         /* Creates a new array of all nodes matching the given classification and risk level */
//         const targetArray: listNode[] = getRelatedArray(this.props.section, this.props.riskLvl, this.props.descriptiveStatisticData);

//         /* Finds suitable class name for css styling */
//         const childClass: string = getChildClass(this.props.riskLvl);

//         if (targetArray.length === 0)
//         {
//             /* Returns a paragraph in place of a descriptive list */
//             return ( 
//             <div className = {childClass}>
//                 <dd>No nodes match this risk level</dd>
//             </div>
//             );
//         }
//         else
//         {
//             const items = targetArray.map((item, index:number) => (
//                 <div className = {childClass} key={index}>
//                     <div className="dropBox">
//                         <dt>{item.name}
//                             { /* Zooms tree graph to given node */ }
//                             <button>View Node</button>
//                         </dt>
                        

//                         <dd>{"Value: " + item.value}</dd>
//                         {item.description && (<dd>{"Description: " + item.description}</dd>)}
//                         <dd><button className="additionalDetailsBtn" onClick={() => this.toggleAdditionalDetailsList(index)}>Additional Details &or;</button></dd>
//                         {this.state.isAddDetVisible[index] && (
//                             /* Writes additional details; Lines below may be temporary to make way for
//                                 desired information */
//                             <div className="additionalDetailsList">
//                                 <dd>{"Evaluation Strategy: " + item.eval_strategy}</dd>
//                                 <dd>{"Normalizer: " + item.normalizer}</dd>
//                                 <dd>{"Utility Function: " + item.utility_function}</dd>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             ));
//             return (
//                 <dl>{items}</dl>
//             );
//         }
//     }
// }

export function DisplayDSList(risk:string, section:string, props:descriptiveStatisticData): JSX.Element {

    /* Creates a new array of all nodes matching the given classification and risk level */
    const targetArray: listNode[] = getRelatedArray(section, risk, props);
    /* Finds suitable class name for css styling */
    const childClass: string = getChildClass(risk);

    if (targetArray.length === 0) {
        /* Returns a paragraph in place of a descriptive list */
        return ( 
            <Accordion.Root type='single'>
                <Accordion.Item value = 'noNodes'>
                    No nodes match this risk level
                </Accordion.Item>
            </Accordion.Root>
        );
    }
    else {
        const items = targetArray.map((item, index:number) => (
            <div className = {childClass} key={index}>
                <div className="dropBox">
                    <dt>{item.name}
                        { /* Zooms tree graph to given node */ }
                        <button>View Node</button>
                    </dt>
                    <dd>{"Value: " + item.value}</dd>
                    {item.description && (<dd>{"Description: " + item.description}</dd>)}
                    <dd>{"Evaluation Strategy: " + item.eval_strategy}</dd>
                    <dd>{"Normalizer: " + item.normalizer}</dd>
                    <dd>{"Utility Function: " + item.utility_function}</dd>
                </div>
            </div>
        ));
        return (
            <Accordion.Root type='multiple'>{items}</Accordion.Root>
        );
    }
}

function getChildClass(riskLvl: string): string
{
    switch (riskLvl){
        case 'severe': return 'Severe-Level-Droplist';
        case 'high': return 'High-Level-Droplist';
        case 'moderate': return 'Moderate-Level-Droplist';
        case 'minor': return 'Minor-Level-Droplist';
        case 'insignificant': return 'Insignificant-Level-Droplist';
        default: return 'getChildClass-error';
    }
}

function getRelatedArray(section: string, riskLvl: string, descriptiveStatisticData: descriptiveStatisticData): listNode[] {
    var tempArr:listNode[] = [], finalArray:listNode[] = [];
    if (section === "quality_aspects") {tempArr = descriptiveStatisticData.qualityAspectNodes}
    else if (section === "product_factors") {tempArr = descriptiveStatisticData.qualityFactorNodes}
    else if (section === "measures") {tempArr = descriptiveStatisticData.measureNodes}

    for (const iter of tempArr) {
        const value: number = iter.value;
        if (riskLvl === "severe" && value < 0.2) {finalArray.push(iter);}
        else if (riskLvl === "high" && (value >= 0.2 && value < 0.4)) {finalArray.push(iter);}
        else if (riskLvl === "moderate" && (value >= 0.4 && value < 0.6)) {finalArray.push(iter);}
        else if (riskLvl === "minor" && (value >= 0.6 && value < 0.8)) {finalArray.push(iter);}
        else if (riskLvl === "insignificant" && (value >= 0.8 && value <= 1.0)) {finalArray.push(iter);}
    }

    return finalArray;
}