import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { StyledTrigger, StyledContent, StyledItem } from './StyledComponents'; // Ensure these are defined

// Define a type for the props
type AdditionalDetailsItemProps = {
  key: string;
  value: any;
  depth: number;
};

const AdditionalDetailsItem: React.FC<AdditionalDetailsItemProps> = ({ key, value, depth }) => {
  const isNestedObject = typeof value === 'object' && value !== null && !Array.isArray(value);

  if (isNestedObject) {
    return (
      <Accordion.Item key={key} value={key}>
        <StyledTrigger style={{ marginLeft: `${depth * 10}px` }}>{key}</StyledTrigger>
        <StyledContent>
          {Object.entries(value).map(([nestedKey, nestedValue]) =>
            <AdditionalDetailsItem key={nestedKey} value={nestedValue} depth={depth + 1} />
          )}
        </StyledContent>
      </Accordion.Item>
    );
  } else {
    return (
      <StyledItem key={key} style={{ marginLeft: `${depth * 10}px` }}>
        <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
      </StyledItem>
    );
  }
};

export default AdditionalDetailsItem;
