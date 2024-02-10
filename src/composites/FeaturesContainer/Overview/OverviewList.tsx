import React from "react";
import "./Overview.css"
import {collectOverviewData, OverviewDropList, OvListData} from './index.ts';
import { ScrollArea, Theme, Heading } from "@radix-ui/themes";
import { ChevronDownIcon, CrossCircledIcon, ExclamationTriangleIcon, QuestionMarkCircledIcon, InfoCircledIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import * as Accordion from "@radix-ui/react-accordion";
import classNames from 'classnames';

export const OverviewList = (props:OvListData):React.ReactNode => {
    { /* Creates the array of tallies for each risk level */ }
    const overviewData = collectOverviewData(props.filedata);

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
                        <AccordionTrigger className="SevereTitleCard"><CrossCircledIcon/>Severe: {overviewData.qualityAspectsCount[0]}</AccordionTrigger>
                        <AccordionContent className="SevereBackground"><OverviewDropList riskLvl="severe" section="quality_aspects" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-2">
                        <AccordionTrigger className="HighTitleCard"><ExclamationTriangleIcon/>High: {overviewData.qualityAspectsCount[1]}</AccordionTrigger>
                        <AccordionContent className="HighBackground"><OverviewDropList riskLvl="high" section="quality_aspects" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-3">
                        <AccordionTrigger className="ModerateTitleCard"><QuestionMarkCircledIcon/>Moderate: {overviewData.qualityAspectsCount[2]}</AccordionTrigger>
                        <AccordionContent className="ModerateBackground"><OverviewDropList riskLvl="moderate" section="quality_aspects" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-4">
                        <AccordionTrigger className="MinorTitleCard"><InfoCircledIcon/>Minor: {overviewData.qualityAspectsCount[3]}</AccordionTrigger>
                        <AccordionContent className="MinorBackground"><OverviewDropList riskLvl="minor" section="quality_aspects" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-5">
                        <AccordionTrigger className="InsignificantTitleCard"><CheckCircledIcon/>Insignificant: {overviewData.qualityAspectsCount[4]}</AccordionTrigger>
                        <AccordionContent className="InsignificantBackground"><OverviewDropList riskLvl="insignificant" section="quality_aspects" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>
                </Accordion.Root>


                {/* Quality Factors */}
                <Heading className="AccordionTitle">Quality Factors</Heading>
                <Accordion.Root className="AccordionRoot" type="multiple" defaultValue={[]}>
                    <Accordion.Item className="AccordionItem" value="item-1" color="red">
                        <AccordionTrigger className="SevereTitleCard"><CrossCircledIcon/>Severe: {overviewData.qualityFactorsCount[0]}</AccordionTrigger>
                        <AccordionContent className="SevereBackground"><OverviewDropList riskLvl="severe" section="product_factors" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-2" color="orange">
                        <AccordionTrigger className="HighTitleCard"><ExclamationTriangleIcon/>High: {overviewData.qualityFactorsCount[1]}</AccordionTrigger>
                        <AccordionContent className="HighBackground"><OverviewDropList riskLvl="high" section="product_factors" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-3" color="yellow">
                        <AccordionTrigger className="ModerateTitleCard"><QuestionMarkCircledIcon/>Moderate: {overviewData.qualityFactorsCount[2]}</AccordionTrigger>
                        <AccordionContent className="ModerateBackground"><OverviewDropList riskLvl="moderate" section="product_factors" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-4" color="blue">
                        <AccordionTrigger className="MinorTitleCard"><InfoCircledIcon/>Minor: {overviewData.qualityFactorsCount[3]}</AccordionTrigger>
                        <AccordionContent className="MinorBackground"><OverviewDropList riskLvl="minor" section="product_factors" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-5" color="green">
                        <AccordionTrigger className="InsignificantTitleCard"><CheckCircledIcon/>Insignificant: {overviewData.qualityFactorsCount[4]}</AccordionTrigger>
                        <AccordionContent className="InsignificantBackground"><OverviewDropList riskLvl="insignificant" section="product_factors" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>
                </Accordion.Root>
                
                {/* Quality Factors Measures */}
                <Heading className="AccordionTitle">Quality Factor Measures</Heading>
                <Accordion.Root className="AccordionRoot" type="multiple" defaultValue={[]}>
                    <Accordion.Item className="AccordionItem" value="item-1">
                        <AccordionTrigger className="SevereTitleCard"><CrossCircledIcon/>Severe: {overviewData.measuresCount[0]}</AccordionTrigger>
                        <AccordionContent className="SevereBackground"><OverviewDropList riskLvl="severe" section="product_factors" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-2">
                        <AccordionTrigger className="HighTitleCard"><ExclamationTriangleIcon/>High: {overviewData.measuresCount[1]}</AccordionTrigger>
                        <AccordionContent className="HighBackground"><OverviewDropList riskLvl="high" section="product_factors" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-3">
                        <AccordionTrigger className="ModerateTitleCard"><QuestionMarkCircledIcon/>Moderate: {overviewData.measuresCount[2]}</AccordionTrigger>
                        <AccordionContent className="ModerateBackground"><OverviewDropList riskLvl="moderate" section="product_factors" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-4">
                        <AccordionTrigger className="MinorTitleCard"><InfoCircledIcon/>Minor: {overviewData.measuresCount[3]}</AccordionTrigger>
                        <AccordionContent className="MinorBackground"><OverviewDropList riskLvl="minor" section="product_factors" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>

                    <Accordion.Item className="AccordionItem" value="item-5">
                        <AccordionTrigger className="InsignificantTitleCard"><CheckCircledIcon/>Insignificant: {overviewData.measuresCount[4]}</AccordionTrigger>
                        <AccordionContent className="InsignificantBackground"><OverviewDropList riskLvl="insignificant" section="product_factors" ovData={overviewData}/></AccordionContent> 
                    </Accordion.Item>
                </Accordion.Root>  
            </Theme>          
        </ScrollArea>
    );
};


/* Adapted from Radix UI docs */
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