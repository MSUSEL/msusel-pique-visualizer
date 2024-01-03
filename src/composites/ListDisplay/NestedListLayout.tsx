import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Text } from "@radix-ui/themes";
import * as Accordion from '@radix-ui/react-accordion';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import "./ListDisplay.css";
import { useState } from 'react';

export const NestedListDisplay = () => {
  const dataset = useAtomValue(State.dataset);
  const [expandedItems, setExpandedItems] = useState(new Set<string>());

  const toggleItem = (key: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const renderAccordion = (Data: { [key: string]: any }, path: string) => {
    return (
      <Accordion.Root type="multiple" className="AccordionRoot" value={[...expandedItems]}>
        {Object.entries(Data).map(([key, value]) => {
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            const isWeight = key === 'weights';
            const details = isWeight ? mapWeightsToData(value, path) : value;
            return renderAccordionItem(key, details, isWeight, path);
          } else {
            // Render primitive values directly
            return <div key={key}>{key}: {value.toString()}</div>;
          }
        })}
      </Accordion.Root>
    );
  };

  const renderAccordionItem = (key: string, value: any, path: string) => {
    const itemKey = path + '.' + key; // Unique key for each accordion item
    const isExpanded = expandedItems.has(itemKey);
  
    return (
      <Accordion.Item key={itemKey} value={itemKey} className="AccordionItem">
        <Accordion.Header className="AccordionHeader">
          <Accordion.Trigger className="AccordionTrigger" onClick={() => toggleItem(itemKey)}>
            {key}
            <span>{isExpanded ? <EyeOpenIcon /> : <EyeClosedIcon />}</span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="AccordionContent">
          {isExpanded ? renderAccordion(value, itemKey) : null}
        </Accordion.Content>
      </Accordion.Item>
    );
  };
  

  const mapWeightsToData = (weights: { [key: string]: any }, path: string) => {
    let data = {};
    Object.entries(weights).forEach(([key]) => {
      let relatedData = path === 'tqi' ? dataset.factors.quality_aspects[key] :
                        path.includes('quality_aspects') ? dataset.factors.product_factors[key] :
                        path.includes('product_factors') ? dataset.measures[key] : 
                        dataset.diagnostics[key]; // Update as per your data structure
      data[key] = {...relatedData};
    });
    return data;
  };

  return (
    <div>
      <Text weight="medium" align="center" size="5" as="div">{dataset?.name}</Text>
      {dataset?.factors?.tqi ? renderAccordion(dataset.factors.tqi, 'tqi') : <p>No TQI data available.</p>}
      {/* Similarly for quality_aspects, product_factors, measures, diagnostics */}
    </div>
  );
};
