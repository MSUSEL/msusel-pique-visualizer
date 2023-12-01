import React, { Component } from "react";

export class DisplayDSList extends Component {
    constructor(props) {
        super(props);
        this.state = {isAddnlDetVisible: Array(getRelatedArray(this.props.section, this.props.riskLvl, this.props.NodeCount).length).fill(false)};
    }

    toggleAdditionalDetailsList = (index) => {
        const updatedState = [...this.state.isAddnlDetVisible];
        updatedState[index] = !updatedState[index];
        this.setState({isAddnlDetVisible: updatedState});
    };

    render() {
        /* Creates a new array of all nodes matching the given classification and risk level */
        let targetArray = getRelatedArray(this.props.section, this.props.riskLvl, this.props.NodeCount);

        /* Finds suitable class name for css styling */
        const childClass = getChildClass(this.props.riskLvl);

        if (targetArray.length == 0)
        {
            /* Returns a paragraph in place of a descriptive list */
            return ( 
            <div className = {childClass}>
                <dd>No nodes match this risk level</dd>
            </div>
            );
        }
        else
        {
            const items = targetArray.map((item, index) => (
                <div className = {childClass} key={index}>
                    <div className="dropBox">
                        <dt>{item.name}
                            <button onClick={() => zoomToNode(item.name)}>View Node</button>
                        </dt>
                        
                        { /* Zooms tree graph to given node */ }
                        {/* <button onClick={() => zoomToNode(item.name)}>View Node</button> */}

                        <dd>{"Value: " + item.value}</dd>
                        {item.description && (<dd>{"Description: " + item.description}</dd>)}
                        <dd><button className="additionalDetailsBtn" onClick={() => this.toggleAdditionalDetailsList(index)}>Additional Details &or;</button></dd>
                        {this.state.isAddnlDetVisible[index] && (
                            /* Writes additional details; Lines below may be temporary to make way for
                                desired information */
                            <div className="additionalDetailsList">
                                <dd>{"Evaluation Strategy: " + item.eval_strategy}</dd>
                                <dd>{"Normalizer: " + item.normalizer}</dd>
                                <dd>{"Utility Function: " + item.utility_function}</dd>
                            </div>
                        )}
                    </div>
                </div>
            ));
            return (
                <dl>{items}</dl>
            );
        }
    }
}

function getPositionX (item) {
    return item.node_center_x;
}
function getPositionY (item) {
    return item.node_center_y;
}

function zoomToNode(item)
{
    console.log(getPositionX(item), " ", getPositionY(item));
};

function getChildClass(riskLvl)
{
    switch (riskLvl){
        case 'severe': return 'Severe-Level-Droplist';
        case 'high': return 'High-Level-Droplist';
        case 'moderate': return 'Moderate-Level-Droplist';
        case 'minor': return 'Minor-Level-Droplist';
        case 'insignificant': return 'Insignificant-Level-Droplist';
    }
}

function getRelatedArray(section, riskLvl, NodeCount) {
    let tempArr = [], finalArray = [];
    if (section == "quality_aspects") {tempArr = NodeCount.qAspectsArr}
    else if (section == "product_factors") {tempArr = NodeCount.pFactorsArr}
    else if (section == "measures") {tempArr = NodeCount.fMeasuresArr}
    else console.log
        ("DescriptiveStatistics function getRelatedArray error: node is not a quality aspect, product factor or measure.");

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