import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Text } from "@radix-ui/themes";
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as Accordion from '@radix-ui/react-accordion';
import './ListDisplay.css'

export const ListDisplay = () => {
  const dataset = useAtomValue(State.dataset);

  const renderTQIDetails = (tqiData) => {
    return Object.entries(tqiData).map(([key, value]) => (
      <div key={key}>
        <strong>{key}:</strong> {JSON.stringify(value)}
      </div>
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Title */}
      <Text weight="medium" align="center" size="5" as="div">{dataset?.name}</Text>

      <AccordionPrimitive.Root type="single" collapsible>
        <AccordionPrimitive.Item value="tqi">
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger>TQI</AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content>
            {dataset?.factors?.tqi ? renderTQIDetails(dataset.factors.tqi) : <p>No TQI data available.</p>}
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>

        {/* Repeat for other sections */}
      </AccordionPrimitive.Root>

      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Header>
            <Accordion.Trigger />
          </Accordion.Header>
          <Accordion.Content />
        </Accordion.Item>
      </Accordion.Root>
    </div>

  );
};
