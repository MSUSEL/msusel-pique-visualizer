import React from "react";
import "./Overview.css"
import {OverviewDataCollector, OverviewDropList} from './index.ts';
import { ScrollArea, Theme, Heading } from "@radix-ui/themes";
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as Accordion from "@radix-ui/react-accordion";
import classNames from 'classnames';

export function OverviewList(): JSX.Element {
    { /* Creates the array of tallies for each risk level */ }
    const overviewData = OverviewDataCollector();

    return (        
        <ScrollArea 
            id="OverviewLists"
            type="always" 
            scrollbars="vertical"
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
                        <AccordionTrigger className="SevereTitleCard">Severe: {overviewData.qualityAspectsCount[0]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('severe', 'quality_aspects', overviewData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-2">
                        <AccordionTrigger className="HighTitleCard">High: {overviewData.qualityAspectsCount[1]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('high', 'quality_aspects', overviewData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-3">
                        <AccordionTrigger className="ModerateTitleCard">Moderate: {overviewData.qualityAspectsCount[2]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('moderate', 'quality_aspects', overviewData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-4">
                        <AccordionTrigger className="MinorTitleCard">Minor: {overviewData.qualityAspectsCount[3]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('minor', 'quality_aspects', overviewData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-5">
                        <AccordionTrigger className="InsignificantTitleCard">Insignificant: {overviewData.qualityAspectsCount[4]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('insignificant', 'quality_aspects', overviewData)}</AccordionContent>
                    </Accordion.Item>
                </Accordion.Root>


                {/* Quality Factors */}
                <Heading className="AccordionTitle">Quality Factors</Heading>
                <Accordion.Root className="AccordionRoot" type="multiple" defaultValue={[]}>
                    <Accordion.Item className="AccordionItem" value="item-1" color="red">
                        <AccordionTrigger className="SevereTitleCard">Severe: {overviewData.qualityFactorsCount[0]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('severe', 'product_factors', overviewData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-2" color="orange">
                        <AccordionTrigger className="HighTitleCard">High: {overviewData.qualityFactorsCount[1]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('high', 'product_factors', overviewData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-3" color="yellow">
                        <AccordionTrigger className="ModerateTitleCard">Moderate: {overviewData.qualityFactorsCount[2]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('moderate', 'product_factors', overviewData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-4" color="blue">
                        <AccordionTrigger className="MinorTitleCard">Minor: {overviewData.qualityFactorsCount[3]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('minor', 'product_factors', overviewData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-5" color="green">
                        <AccordionTrigger className="InsignificantTitleCard">Insignificant: {overviewData.qualityFactorsCount[4]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('insignificant', 'product_factors', overviewData)}</AccordionContent>
                    </Accordion.Item>
                </Accordion.Root>
                
                {/* Quality Factors Measures */}
                <Heading className="AccordionTitle">Quality Factor Measures</Heading>
                <Accordion.Root className="AccordionRoot" type="multiple" defaultValue={[]}>
                    <Accordion.Item className="AccordionItem" value="item-1">
                        <AccordionTrigger className="SevereTitleCard">Severe: {overviewData.measuresCount[0]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('severe', 'measures', overviewData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-2">
                        <AccordionTrigger className="HighTitleCard">High: {overviewData.measuresCount[1]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('high', 'measures', overviewData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-3">
                        <AccordionTrigger className="ModerateTitleCard">Moderate: {overviewData.measuresCount[2]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('moderate', 'measures', overviewData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-4">
                        <AccordionTrigger className="MinorTitleCard">Minor: {overviewData.measuresCount[3]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('minor', 'measures', overviewData)}</AccordionContent>
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-5">
                        <AccordionTrigger className="InsignificantTitleCard">Insignificant: {overviewData.measuresCount[4]}</AccordionTrigger>
                        <AccordionContent>{OverviewDropList('insignificant', 'measures', overviewData)}</AccordionContent>
                    </Accordion.Item>
                </Accordion.Root>  
            </Theme>          
        </ScrollArea>
    );
};


/* Taken from Radix UI docs */
const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<{ className?: string }>>(
    ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames('AccordionTrigger', className)}
        {...props}
        ref={forwardedRef as React.RefObject<HTMLButtonElement>}
      >
        {children}
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
));

const AccordionContent = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{ className?: string }>>(
    ({ children, className, ...props }, forwardedRef) => (
<Accordion.Content
    className={classNames('AccordionContent', className)}
    {...props}
    ref={forwardedRef as React.RefObject<HTMLDivElement>}>

    <div className="AccordionContentText">{children}</div>
</Accordion.Content>
));