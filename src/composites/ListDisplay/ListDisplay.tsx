import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Text } from "@radix-ui/themes";
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import "./ListDisplay.css"
import { useState } from 'react';



export const ListDisplay = () => {
  const dataset = useAtomValue(State.dataset);

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


  const renderAdditionalDetails = (details: { [key: string]: any }) => {
    return Object.entries(details)
      .filter(([key]) => key !== 'name' && key !== 'value')  // Exclude 'name' and 'value'
      .map(([key, value]) => (
        <div key={key} style={{ padding: '4px 0' }}>
          <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
        </div>
      ));
  };



  const getFirstKeyValue = (obj: { [key: string]: any }) => {
    const firstKey = Object.keys(obj)[0];
    return obj[firstKey]?.value;
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
              {/*
              {typeof getFirstKeyValue(dataset?.factors?.tqi) !== 'undefined'
                ? getFirstKeyValue(dataset.factors.tqi)
                : <p>No TQI score available.</p>}
              */}
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            {dataset?.factors?.tqi
              ? renderDetails(dataset.factors.tqi)
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
            {dataset?.factors?.tqi
              ? renderDetails(dataset.factors.quality_aspects)
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
            {dataset?.factors?.tqi
              ? renderDetails(dataset.factors.product_factors)
              : <p>No factors data available.</p>}
          </Accordion.Content>
        </Accordion.Item>


      </Accordion.Root>



    </div>

  );
};
