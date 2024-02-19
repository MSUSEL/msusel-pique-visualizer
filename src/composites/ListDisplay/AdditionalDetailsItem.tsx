import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { StyledTrigger, StyledContent, StyledItem } from "./StyledComponents";

// Define a type for the props
type AdditionalDetailsItemProps = {
  itemKey: React.Key;
  value: any;
  depth: number;
};

const AdditionalDetailsItem: React.FC<AdditionalDetailsItemProps> = ({
  itemKey,
  value,
  depth,
}) => {
  const isNestedObject =
    typeof value === "object" && value !== null && !Array.isArray(value);

  if (isNestedObject) {
    return (
      <Accordion.Item key={String(itemKey)} value={String(itemKey)}>
        <StyledTrigger style={{ marginLeft: `${depth * 10}px` }}>
          {String(itemKey)} <ChevronDownIcon />
        </StyledTrigger>
        <StyledContent>
          {Object.entries(value).map(([nestedKey, nestedValue]) => (
            <AdditionalDetailsItem
              key={nestedKey}
              itemKey={nestedKey}
              value={nestedValue}
              depth={depth + 1}
            />
          ))}
        </StyledContent>
      </Accordion.Item>
    );
  } else {
    return (
      <StyledItem
        key={String(itemKey)}
        style={{ marginLeft: `${depth * 10}px`, padding: "10px" }}
      >
        <strong>{String(itemKey)}:</strong> {JSON.stringify(value, null, 2)}
      </StyledItem>
    );
  }
};

export default AdditionalDetailsItem;
