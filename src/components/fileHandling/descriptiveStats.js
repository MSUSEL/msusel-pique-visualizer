import React, { Component } from "react";
import cloneDeep from "lodash/cloneDeep";
import { findObjectsWithValue } from "../features/Filter";
import { update } from "lodash";

export function countChars(fileData)
{
    var qChar = [0,0,0,0,0], qFact = [0,0,0,0,0], qfMeas = [0,0,0,0,0];
    
    const cFileData = cloneDeep(fileData)

    let qAspectsArr = findObjectsWithValue(cFileData, 'quality_aspects')
    for (let node of qAspectsArr)
    {
        let value = node.value;
        if (value < 0.2) {qChar[0]++;}
        else if (value >= 0.2 && value < 0.4) {qChar[1]++;}
        else if (value >= 0.4 && value < 0.6) {qChar[2]++;}
        else if (value >= 0.8 && value < 0.8) {qChar[3]++;}
        else if (value >= 0.8 && value <= 1.0) {qChar[4]++;}
    }

    let pFactorsArr = findObjectsWithValue(cFileData, 'product_factors')
    for (let node of pFactorsArr)
    {
        let value = node.value;
        if (value < 0.2) {qFact[0]++;}
        else if (value >= 0.2 && value < 0.4) {qFact[1]++;}
        else if (value >= 0.4 && value < 0.6) {qFact[2]++;}
        else if (value >= 0.8 && value < 0.8) {qFact[3]++;}
        else if (value >= 0.8 && value <= 1.0) {qFact[4]++;}
    }

    let fMeasuresArr = findObjectsWithValue(cFileData, 'measures')
    for (let node of fMeasuresArr)
    {
        let value = node.value;
        if (value < 0.2) {qfMeas[0]++;}
        else if (value >= 0.2 && value < 0.4) {qfMeas[1]++;}
        else if (value >= 0.4 && value < 0.6) {qfMeas[2]++;}
        else if (value >= 0.6 && value < 0.8) {qfMeas[3]++;}
        else if (value >= 0.8 && value <= 1.0) {qfMeas[4]++;}
    }

    var DescStats = {qChar,qFact,qfMeas,qAspectsArr,pFactorsArr,fMeasuresArr};

    return DescStats;
}

export function getRelatedArray(section, riskLvl, DescStats) {
    let tempArr = [], finalArray = [];
    if (section == "quality_aspects") {tempArr = DescStats.qAspectsArr}
    else if (section == "product_factors") {tempArr = DescStats.pFactorsArr}
    else if (section == "measures") {tempArr = DescStats.fMeasuresArr}
    else console.log("error 1");

    for (let iter of tempArr)
    {
        let value = iter.value;
        if (riskLvl == "severe" && value < 0.2) {finalArray.push(iter);}
        else if (riskLvl == "high" && (value >= 0.2 && value < 0.4)) {finalArray.push(iter);}
        else if (riskLvl == "moderate" && (value >= 0.4 && value < 0.6)) {finalArray.push(iter);}
        else if (riskLvl == "minor" && (value >= 0.6 && value < 0.8)) {finalArray.push(iter);}
        else if (riskLvl == "insignificant" && (value >= 0.8 && value <= 1.0)) {finalArray.push(iter);}
    }

    return finalArray;
}

export class DisplayDSList extends Component {
    constructor(props) {
        super(props);
        this.state = {isAddnlDetVisible: Array(getRelatedArray(this.props.section, this.props.riskLvl, this.props.DescStats).length).fill(false)};
    }

    toggleAddnlDet = (index) => {
        const updatedState = [...this.state.isAddnlDetVisible];
        updatedState[index] = !updatedState[index];
        this.setState({isAddnlDetVisible: updatedState});
    };

    render() {
        let targetArray = getRelatedArray(this.props.section, this.props.riskLvl, this.props.DescStats);
        const childClass = getChildClass(this.props.riskLvl);

        if (targetArray.length == 0)
        {
            return <div className = {childClass}><p>No nodes match this risk level</p></div>
        }
        else
        {
            const items = targetArray.map((item, index) => (
                <div className = {childClass} key={index}>
                        <dt>{item.name}</dt>
                        <dd>{"Value: " + item.value}</dd>
                        {item.description && (<dd>{"Description: " + item.description}</dd>)}
                        <dd><button className="additionalDetailsBtn" onClick={() => this.toggleAddnlDet(index)}>Additional Details &or;</button></dd>
                        {this.state.isAddnlDetVisible[index] && (
                            <div className="additionalDetailsList">
                                <dd>{"Evaluation Strategy: " + item.eval_strategy}</dd>
                                <dd>{"Normalizer: " + item.normalizer}</dd>
                                <dd>{"Utility Function: " + item.utility_function}</dd>
                            </div>
                        )}
                </div>
            ));
            return (
                <div className = {childClass}>
                    <dl>{items}</dl>
                </div>
            );
        }
    }
}

function getChildClass(riskLvl)
{
    switch (riskLvl){
        case 'severe': return 'dsSevLevelDrop';
        case 'high': return 'dsHighLevelDrop';
        case 'moderate': return 'dsModLevelDrop';
        case 'minor': return 'dsMinLevelDrop';
        case 'insignificant': return 'dsInsigLevelDrop';
    }
}