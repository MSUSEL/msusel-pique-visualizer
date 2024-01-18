import React from "react";
import "./DescriptiveStats.css";
import {nodeRiskTally, DisplayDSList} from './index.ts';
import { ScrollArea, Theme, Heading, Text, Button } from "@radix-ui/themes";
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as Accordion from "@radix-ui/react-accordion";
import classNames from 'classnames';

export function DSSide(): JSX.Element {
    { /* Creates the array of tallies for each risk level */ }
    const descriptiveStatisticData = nodeRiskTally();

    return (        
        <ScrollArea 
            className="ScrollArea"
            type="always" 
            scrollbars="vertical" 
            style={{width: 400, height: 500}} 
            radius="full"
            size="1">
            <Theme
                accentColor="purple"
                grayColor="gray"
                panelBackground="solid"
                scaling="100%"
                radius="full">


                {/* Quality Characteristics */}
                <Heading className="AccordionTitle">Quality Characteristics</Heading>
                
                <Accordion.Root className="AccordionRoot" type="multiple" defaultValue={[]}>
                    <Accordion.Item className="AccordionItem" value="item-1">
                        <AccordionTrigger className="SevereTitleCard">Severe: {descriptiveStatisticData.qualityAspectsCount[0]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('severe', 'quality_aspects', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-2">
                        <AccordionTrigger className="HighTitleCard">High: {descriptiveStatisticData.qualityAspectsCount[1]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('high', 'quality_aspects', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-3">
                        <AccordionTrigger className="ModerateTitleCard">Moderate: {descriptiveStatisticData.qualityAspectsCount[2]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('moderate', 'quality_aspects', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-4">
                        <AccordionTrigger className="MinorTitleCard">Minor: {descriptiveStatisticData.qualityAspectsCount[3]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('minor', 'quality_aspects', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-5">
                        <AccordionTrigger className="InsignificantTitleCard">Insignificant: {descriptiveStatisticData.qualityAspectsCount[4]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('insignificant', 'quality_aspects', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>
                </Accordion.Root>


                {/* Quality Factors */}
                <Heading className="AccordionTitle">Quality Factors</Heading>
                <Accordion.Root className="AccordionRoot" type="multiple" defaultValue={[]}>
                    <Accordion.Item className="AccordionItem" value="item-1" color="red">
                        <AccordionTrigger className="SevereTitleCard">Severe: {descriptiveStatisticData.qualityFactorsCount[0]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('severe', 'product_factors', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-2" color="orange">
                        <AccordionTrigger className="HighTitleCard">High: {descriptiveStatisticData.qualityFactorsCount[1]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('high', 'product_factors', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-3" color="yellow">
                        <AccordionTrigger className="ModerateTitleCard">Moderate: {descriptiveStatisticData.qualityFactorsCount[2]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('moderate', 'product_factors', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-4" color="blue">
                        <AccordionTrigger className="MinorTitleCard">Minor: {descriptiveStatisticData.qualityFactorsCount[3]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('minor', 'product_factors', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-5" color="green">
                        <AccordionTrigger className="InsignificantTitleCard">Insignificant: {descriptiveStatisticData.qualityFactorsCount[4]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('insignificant', 'product_factors', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>
                </Accordion.Root>
                
                {/* Quality Factors Measures */}
                <Heading className="AccordionTitle">Measures for Quality Factors</Heading>
                <Accordion.Root className="AccordionRoot" type="multiple" defaultValue={[]}>
                    <Accordion.Item className="AccordionItem" value="item-1">
                        <AccordionTrigger className="SevereTitleCard">Severe: {descriptiveStatisticData.measuresCount[0]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('severe', 'measures', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-2">
                        <AccordionTrigger className="HighTitleCard">High: {descriptiveStatisticData.measuresCount[1]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('high', 'measures', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-3">
                        <AccordionTrigger className="ModerateTitleCard">Moderate: {descriptiveStatisticData.measuresCount[2]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('moderate', 'measures', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-4">
                        <AccordionTrigger className="MinorTitleCard">Minor: {descriptiveStatisticData.measuresCount[3]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('minor', 'measures', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-5">
                        <AccordionTrigger className="InsignificantTitleCard">Insignificant: {descriptiveStatisticData.measuresCount[4]}</AccordionTrigger>
                        <AccordionContent>{DisplayDSList('insignificant', 'measures', descriptiveStatisticData)}</AccordionContent>
                    </Accordion.Item>
                </Accordion.Root>            
            </Theme>
        </ScrollArea>
    );
};


/* Taken from Radix UI docs */
const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames('AccordionTrigger', className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
));
  
const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
<Accordion.Content
    className={classNames('AccordionContent', className)}
    {...props}
    ref={forwardedRef}>

    <div className="AccordionContentText">{children}</div>
</Accordion.Content>
));