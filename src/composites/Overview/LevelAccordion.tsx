import * as Accordion from "@radix-ui/react-accordion";
import "../Style/LevelAccordion.css";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Table, Button } from "@radix-ui/themes";
import { useState } from "react";

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
      // classification for diagnostics
      if (value >= 1.5) riskLevel = "Severe";
      else if (value > 0.8) riskLevel = "High";
      else if (value > 0.5) riskLevel = "Medium";
      else if (value > 0.2) riskLevel = "Low";
      else riskLevel = "Insignificant";
    } else {
      // classification for others
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

// render object properties recursively
const renderObjectDetails = (obj: { [key: string]: any }, keyPrefix = "") => {
  return Object.entries(obj).map(([key, value]) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return (
        <div key={`${keyPrefix}${key}`}>
          <Table.Cell>
            <strong>{key}:</strong>
          </Table.Cell>
          <div style={{ paddingLeft: "20px" }}>
            {renderObjectDetails(value, `${keyPrefix}${key}-`)}
          </div>
        </div>
      );
    } else {
      if (
        keyPrefix === "" &&
        (key === "name" || key === "value" || key === "description")
      )
        return;
      else {
        console.log(key, value);
        return (
          <div key={`${keyPrefix}${key}`}>
            <Table.Cell>
              <strong>{key}:</strong>
            </Table.Cell>
            <Table.Cell>{value.toString()}</Table.Cell>
          </div>
        );
      }
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

  const [detailsVisible, setDetailsVisible] = useState(false); // State to track visibility

  const toggleDetailsVisibility = () => {
    setDetailsVisible((prevState) => !prevState); // Toggle visibility
  };

  return (
    <Accordion.Root type="multiple" className="Level--AccordionRoot">
      {Object.entries(processedItems).map(([riskLevel, items]) => (
        <Accordion.Item
          value={riskLevel}
          key={riskLevel}
          className="Level--AccordionLevel"
        >
          <Accordion.Header className="Level--AccordionHeader">
            <Accordion.Trigger
              className={`Level--AccordionTrigger ${
                Object.keys(items).length === 0 ? "disabled" : ""
              }`}
              disabled={Object.keys(items).length === 0}
            >
              {riskLevel} ({Object.keys(items).length})
              <ChevronDownIcon
                className="Level--AccordionChevron"
                display={Object.keys(items).length === 0 ? "none" : ""}
              />
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
                      {details.name}: {details.value.toFixed(2)}
                      <ChevronDownIcon className="Level--AccordionChevron" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="Level--AccordionContent">
                    <Table.Root>
                      <Table.Body>
                        <Table.Row>
                          {
                            <Table.Cell>
                              <strong>Description: </strong>
                              {details.description || "Not Provided"}
                            </Table.Cell>
                          }
                        </Table.Row>
                        <div className="toggle-button-container">
                          <Button
                            className="toggle-button"
                            onClick={toggleDetailsVisibility}
                            style={{ right: "0" }}
                          >
                            Additional Details
                            {detailsVisible ? (
                              <ChevronUpIcon className="chevron-icon" />
                            ) : (
                              <ChevronDownIcon className="chevron-icon" />
                            )}
                          </Button>
                        </div>
                        <Table.Row className="AdditionalDetails">
                          {detailsVisible && renderObjectDetails(details)}
                        </Table.Row>
                      </Table.Body>
                    </Table.Root>
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
