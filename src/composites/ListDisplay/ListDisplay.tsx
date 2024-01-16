import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Text } from "@radix-ui/themes";
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import "./ListDisplay.css"
import { useState } from 'react';
import { sort } from "../Sorting/Sorting";
import { filterByRiskLevels, filterByValueRange, filterByWeightRange } from '../Filtering/Filtering';
import { hideZeroWeightEdges } from "../Filtering/hideZeroWeightEdges";
import { styled } from '@stitches/react';


// Styled components to differentiate between different levels
const StyledTrigger = styled(Accordion.Trigger, {
  // Add your custom styles here
  backgroundColor: '#f0f0f0',
  padding: '10px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  margin: '5px 0',
  '&[data-state="closed"]': { backgroundColor: '#e0e0e0' },
  '&[data-state="open"]': { backgroundColor: '#d0d0d0' },
});

const StyledContent = styled(Accordion.Content, {
  // Add your custom styles here
  padding: '0 20px',
  borderBottom: '1px solid #e0e0e0',
  marginLeft: '20px', // Indentation for nested items
});

const StyledItem = styled('div', {
  // Non-accordion items
  padding: '4px 0',
});

export const ListDisplay = () => {
  const dataset = useAtomValue(State.dataset);
  const sortState = useAtomValue(State.sortingState);
  const filterState = useAtomValue(State.filteringState);
  const [checkboxStates] = useAtom(State.filteringByRiskLevelCheckboxStates);
  const hideZeroWeightEdgeState = useAtomValue(State.hideZeroWeightEdgeState);
  const minValueState = useAtomValue(State.minValueState)
  const maxValueState = useAtomValue(State.maxValueState)
  const minWeightState = useAtomValue(State.minWeightState)
  const maxWeightState = useAtomValue(State.maxWeightState)

  let processedData = dataset;

  // Check if dataset is not undefined before trying to process it
  if (dataset) {
    const sortedData = sort(sortState);
    processedData = filterByRiskLevels(sortedData);
    // processedData = filterByValueRange(processedData);
    // processedData = filterByWeightRange(processedData);
    processedData = hideZeroWeightEdges(processedData);

  }


  const renderDetails = (Data: { [key: string]: any }) => {
    return (
      <Accordion.Root type="multiple" className="AccordionRoot">
        {Object.entries(Data).map(([key, value]) => {
          const [isExpanded, setIsExpanded] = useState(false);
          const toggleExpanded = () => setIsExpanded(!isExpanded);

          return (
            <Accordion.Item key={key} value={key} className="AccordionItem">
              <Accordion.Header className="AccordionHeader">
                <Accordion.Trigger className="AccordionTrigger">
                  {value.name ?? 'N/A'}: {value.value ?? 'N/A'}
                  <span onClick={toggleExpanded}>
                    {isExpanded ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="AccordionContent">
                {isExpanded && renderAdditionalDetails(value)}
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    );
  };


  const renderAdditionalDetails = (details: { [key: string]: any }, depth: number = 0) => {
    const renderDetailItem = (key: string, value: any, depth: number): JSX.Element => {
      const isNestedObject = typeof value === 'object' && value !== null && !Array.isArray(value);

      if (isNestedObject) {
        // It's a nested object, render an accordion
        return (
          <Accordion.Item key={key} value={key}>
            <StyledTrigger style={{ marginLeft: `${depth * 10}px` }}>{key}</StyledTrigger>
            <StyledContent>
              {Object.entries(value).map(([nestedKey, nestedValue]) =>
                renderDetailItem(nestedKey, nestedValue, depth + 1)
              )}
            </StyledContent>
          </Accordion.Item>
        );
      } else {
        // It's a normal value or an array, render it inline
        return (
          <StyledItem key={key} style={{ marginLeft: `${depth * 10}px` }}>
            <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
          </StyledItem>
        );
      }
    };

    return (
      <Accordion.Root type="multiple">
        {Object.entries(details).map(([key, value]) => {
          return renderDetailItem(key, value, depth);
        })}
      </Accordion.Root>
    );
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Title */}
      <Text weight="medium" align="center" size="5" as="div">{dataset?.name}</Text>

      <Accordion.Root type="multiple" className="AccordionRoot">

        {/* 1st level: tqi */}
        <Accordion.Item value="tqi" className="AccordionItem">
          <Accordion.Header>
            <Accordion.Trigger className="AccordionTrigger">
              TQI
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            {processedData?.factors?.tqi
              ? renderDetails(processedData.factors.tqi)
              : <p>No TQI data available.</p>}
          </Accordion.Content>
        </Accordion.Item>

        {/* 2nd level: characteristics (quality_aspects) */}
        <Accordion.Item value="quality_aspects" className="AccordionItem">
          <Accordion.Header>
            <Accordion.Trigger className="AccordionTrigger">
              Characteristics
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            {processedData?.factors?.quality_aspects
              ? renderDetails(processedData.factors.quality_aspects)
              : <p>No characteristics data available.</p>}
          </Accordion.Content>
        </Accordion.Item>

        {/* 3rd level: factors (product_factors) */}
        <Accordion.Item value="product_factors" className="AccordionItem">
          <Accordion.Header>
            <Accordion.Trigger className="AccordionTrigger">
              Factors
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            {processedData?.factors?.product_factors
              ? renderDetails(processedData.factors.product_factors)
              : <p>No factors data available.</p>}
          </Accordion.Content>
        </Accordion.Item>

        {/* 4th level: measures */}
        <Accordion.Item value="measures" className="AccordionItem">
          <Accordion.Header>
            <Accordion.Trigger className="AccordionTrigger">
              Measures
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            {processedData?.measures
              ? renderDetails(processedData.measures)
              : <p>No measures data available.</p>}
          </Accordion.Content>
        </Accordion.Item>

        {/* 5th level: factors (product_factors) */}
        <Accordion.Item value="diagnostics" className="AccordionItem">
          <Accordion.Header>
            <Accordion.Trigger className="AccordionTrigger">
              Diagnostics
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            {processedData?.diagnostics
              ? renderDetails(processedData.diagnostics)
              : <p>No diagnostics data available.</p>}
          </Accordion.Content>
        </Accordion.Item>


      </Accordion.Root>



    </div>

  );
};
