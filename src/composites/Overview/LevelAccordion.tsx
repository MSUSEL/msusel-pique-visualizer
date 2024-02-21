import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import "../Style/LevelAccordion.css";

interface FilterableItem {
  name: string;
  value: number;
  description: string;
  [key: string]: any;
}

interface ProcessedItems {
  [riskLevel: string]: Record<string, FilterableItem>;
}

const classifyRiskLevels = (
  items: Record<string, FilterableItem>,
  isDiagnostics: boolean
): ProcessedItems => {
  const riskLevels: ProcessedItems = {
    Insignificant: {},
    Low: {},
    Medium: {},
    High: {},
    Severe: {},
  };

  Object.entries(items).forEach(([key, item]) => {
    const { value } = item;
    let riskLevel = "";

    if (isDiagnostics) {
      // Use the modified classification for diagnostics
      if (value >= 1.5) riskLevel = "Severe";
      else if (value > 0.8) riskLevel = "High";
      else if (value > 0.5) riskLevel = "Medium";
      else if (value > 0.2) riskLevel = "Low";
      else riskLevel = "Insignificant";
    } else {
      // Use the original classification
      if (value <= 0.2) riskLevel = "Severe";
      else if (value <= 0.4) riskLevel = "High";
      else if (value <= 0.6) riskLevel = "Medium";
      else if (value <= 0.8) riskLevel = "Low";
      else riskLevel = "Insignificant";
    }

    riskLevels[riskLevel][key] = item;
  });

  return riskLevels;
};

// Function to recursively render object properties
const renderObjectDetails = (obj: { [key: string]: any }, keyPrefix = "") => {
  return Object.entries(obj).map(([key, value]) => {
    // Check if the value is an object and not an array or null
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return (
        <div key={`${keyPrefix}${key}`}>
          <strong>{key}:</strong>
          <div style={{ paddingLeft: "20px" }}>
            {renderObjectDetails(value, `${keyPrefix}${key}-`)}
          </div>
        </div>
      );
    } else {
      // Directly render the value if it is not an object
      return (
        <div key={`${keyPrefix}${key}`}>
          <strong>{key}:</strong> {value.toString()}
        </div>
      );
    }
  });
};

const LevelAccordion = ({
  nestedobj,
  isDiagnostics,
}: {
  nestedobj: Record<string, FilterableItem>;
  isDiagnostics: boolean;
}) => {
  const processedItems = classifyRiskLevels(nestedobj, isDiagnostics);

  return (
    <Accordion.Root type="multiple" className="Level--AccordionRoot">
      {Object.entries(processedItems).map(([riskLevel, items]) => (
        <Accordion.Item
          value={riskLevel}
          key={riskLevel}
          className="Level--AccordionLevel"
        >
          <Accordion.Header className="Level--AccordionHeader">
            <Accordion.Trigger className="Level--AccordionTrigger">
              {riskLevel} ({Object.keys(items).length})
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="Level--AccordionContent">
            <Accordion.Root type="multiple" className="Level--AccordionRoot">
              {Object.entries(items).map(([key, details]) => (
                <Accordion.Item
                  value={key}
                  key={key}
                  className="Level--AccordionLevel"
                >
                  <Accordion.Header className="Level--AccordionHeader">
                    <Accordion.Trigger className="Level--AccordionTrigger">
                      {details.name}
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="Level--AccordionContent">
                    {renderObjectDetails(details)}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default LevelAccordion;
