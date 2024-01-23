// import { Component, ReactNode } from "react";
import { overviewData, listNode } from './index.ts';
import * as Accordion from "@radix-ui/react-accordion";
import { Button, Theme, Box, Text, Strong } from '@radix-ui/themes';
import { DotFilledIcon } from '@radix-ui/react-icons';
import "./Overview.css"

export function OverviewDropList(risk:string, section:string, props:overviewData): JSX.Element {

    /* Creates a new array of all nodes matching the given classification and risk level */
    const targetArray: listNode[] = getRelatedArray(section, risk, props);

    /* Finds suitable class name for css styling */
    const childClass: string = getChildClass(risk);

    if (targetArray.length === 0) {
        /* Returns a paragraph in place of a descriptive list */
        return ( 
            <Accordion.Item value = 'noNodes'>
                No nodes match this risk level
            </Accordion.Item>
        );
    }
    else {
        const items = targetArray.map((item, index:number) => (
            <Box className = {childClass} key={index}>
                <Text as='p'><Strong>{item.name}</Strong>
                    { /* Zooms tree graph to given node */ }
                    <Button className='Button'>View Node</Button>
                </Text>
                <Text as='p'><DotFilledIcon/>{"Value: " + item.value}</Text>
                {item.description && (<Text as='p'><DotFilledIcon/>{"Description: " + item.description}</Text>)}
                <Text as='p'><DotFilledIcon/>{"Evaluation Strategy: " + item.eval_strategy}</Text>
                <Text as='p'><DotFilledIcon/>{"Normalizer: " + item.normalizer}</Text>
                <Text as='p'><DotFilledIcon/>{"Utility Function: " + item.utility_function}</Text>
            </Box>
        ));
        return (
            <Box>
                <Theme
                    accentColor="gray"
                    grayColor="gray"
                    panelBackground="solid"
                    scaling="100%"
                    radius="full">
                    {items}
                </Theme>
            </Box>
        );
    }
}

function getChildClass(riskLvl: string): string
{
    switch (riskLvl){
        case 'severe': return 'SevereTitleCard';
        case 'high': return 'HighTitleCard';
        case 'moderate': return 'ModerateTitleCard';
        case 'minor': return 'MinorTitleCard';
        case 'insignificant': return 'InsignificantTitleCard';
        default: return 'getChildClass-error';
    }
}

function getRelatedArray(section: string, riskLvl: string, overviewData: overviewData): listNode[] {
    var tempArr:listNode[] = [], finalArray:listNode[] = [];
    if (section === "quality_aspects") {tempArr = overviewData.qualityAspectNodes}
    else if (section === "product_factors") {tempArr = overviewData.qualityFactorNodes}
    else if (section === "measures") {tempArr = overviewData.measureNodes}

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