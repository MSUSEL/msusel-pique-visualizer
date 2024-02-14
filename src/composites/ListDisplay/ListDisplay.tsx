import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Text } from "@radix-ui/themes";
import * as Accordion from "@radix-ui/react-accordion";
import {
  ChevronDownIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { useProcessedData } from "../../data/useProcessedData";
import AdditionalDetailsItem from "./AdditionalDetailsItem";

export const ListDisplay = () => {
  // get dataset and processed dataset
  const dataset = useAtomValue(State.dataset);
  const processedData = useProcessedData();

  // State to manage the expanded state of accordion items
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleItem = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderDetails = (
    Data: { [key: string]: any },
    toggleItemFn: (key: string) => void,
    expandedState: Record<string, boolean>
  ) => {
    return (
      <Accordion.Root type="multiple" className="AccordionRoot">
        {Object.entries(Data).map(([key, value]) => {
          const isExpanded = expandedState[key] || false;

          return (
            <Accordion.Item key={key} value={key} className="AccordionItem">
              <Accordion.Header className="AccordionHeader">
                <Accordion.Trigger
                  className="AccordionTrigger"
                  onClick={() => toggleItemFn(key)}
                >
                  {value.name ?? "N/A"}: {value.value.toFixed(4) ?? "N/A"}
                  {isExpanded ? <EyeOpenIcon /> : <EyeClosedIcon />}
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

  const renderMeasuresDetails = (
    measuresData: { [key: string]: any },
    toggleItemFn: (key: string) => void,
    expandedState: Record<string, boolean>
  ) => {
    return (
      <Accordion.Root type="multiple" className="AccordionRoot">
        {Object.entries(measuresData).map(([key, measure]) => {
          const isExpanded = expandedState[key] || false;

          // Use the key as a fallback if the name property is missing
          const measureName = measure.name ?? key;
          const measureValue = measure.value ?? "N/A";

          return (
            <Accordion.Item key={key} value={key} className="AccordionItem">
              <Accordion.Header className="AccordionHeader">
                <Accordion.Trigger
                  className="AccordionTrigger"
                  onClick={() => toggleItemFn(key)}
                >
                  {measureName}: {measureValue}
                  {isExpanded ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="AccordionContent">
                {isExpanded && renderAdditionalDetails(measure)}
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    );
  };

  const renderAdditionalDetails = (
    details: { [key: string]: any },
    depth: number = 0
  ) => {
    return (
      <Accordion.Root type="multiple">
        {Object.entries(details).map(([key, value]) => {
          return (
            <AdditionalDetailsItem
              key={key}
              itemKey={key}
              value={value}
              depth={depth}
            />
          );
        })}
      </Accordion.Root>
    );
  };

  if (!processedData) {
    return <div>Loading data...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Title */}
      <Text weight="medium" align="center" size="5" as="div">
        {dataset?.name}
      </Text>

      {/* Accordion for different data levels */}
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
            {processedData?.factors?.tqi &&
              renderDetails(
                processedData.factors.tqi,
                toggleItem,
                expandedItems
              )}
          </Accordion.Content>
        </Accordion.Item>

        {/* 2nd level: quality_aspects */}
        <Accordion.Item value="quality_aspects" className="AccordionItem">
          <Accordion.Header>
            <Accordion.Trigger className="AccordionTrigger">
              {
                Object.keys(processedData?.factors?.quality_aspects || {})
                  .length
              }{" "}
              Characteristics
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            {processedData?.factors?.quality_aspects &&
              renderDetails(
                processedData.factors.quality_aspects,
                toggleItem,
                expandedItems
              )}
          </Accordion.Content>
        </Accordion.Item>

        {/* 3rd level: product_factors */}
        <Accordion.Item value="product_factors" className="AccordionItem">
          <Accordion.Header>
            <Accordion.Trigger className="AccordionTrigger">
              {
                Object.keys(processedData?.factors?.product_factors || {})
                  .length
              }{" "}
              Factors
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            {processedData?.factors?.product_factors &&
              renderDetails(
                processedData.factors.product_factors,
                toggleItem,
                expandedItems
              )}
          </Accordion.Content>
        </Accordion.Item>

        {/* 4th level: measures */}
        <Accordion.Item value="measures" className="AccordionItem">
          <Accordion.Header>
            <Accordion.Trigger className="AccordionTrigger">
              {Object.keys(processedData?.measures || {}).length} Measures
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            {processedData?.measures &&
              renderMeasuresDetails(
                processedData.measures,
                toggleItem,
                expandedItems
              )}
          </Accordion.Content>
        </Accordion.Item>

        {/* 5th level: diagnostics */}
        <Accordion.Item value="diagnostics" className="AccordionItem">
          <Accordion.Header>
            <Accordion.Trigger className="AccordionTrigger">
              {Object.keys(processedData?.diagnostics || {}).length} Diagnostics
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            {processedData?.diagnostics &&
              renderDetails(
                processedData.diagnostics,
                toggleItem,
                expandedItems
              )}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
};
