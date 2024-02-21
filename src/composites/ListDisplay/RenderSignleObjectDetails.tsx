import { useAtomValue } from "jotai";
import { State } from "../../state";
import { useState } from "react";

import { Text } from "@radix-ui/themes";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

import { useProcessedData } from "../../data/useProcessedData";
import AdditionalDetailsItem from "./AdditionalDetailsItem";
import {
  getNormalColorBasedOnValue,
  getDiagnosticColorBasedOnValue,
} from "../LegendContainer/GetColorVasedOnValue";

import "../Style/ListDisplay.css";

export const renderSignleObjectDetails = (
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
