import React from "react";
import { DropListData, OverviewData, ListNode } from "./index.ts";
import * as Accordion from "@radix-ui/react-accordion";
import { Theme, Box, Text, Strong } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";
import "./Overview.css";

export const OverviewDropList = (props: DropListData): React.ReactNode => {
  /* Creates a new array of all nodes matching the given classification and risk level */
  const targetArray: ListNode[] = getRelatedArray(
    props.section,
    props.riskLvl,
    props.ovData
  );

  if (targetArray.length === 0) {
    /* Returns a paragraph in place of a descriptive list */
    return (
      <Accordion.Item value="noNodes">
        No nodes match this risk level
      </Accordion.Item>
    );
  } else {
    const items = targetArray.map((item, index: number) => (
      <Box className="DroppedContent" key={index}>
        <Strong style={{ padding: "8px" }}>{item.name}</Strong>
        <Table.Root>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Value: </Table.Cell>
              <Table.Cell>{item.value.toPrecision(2)}</Table.Cell>
            </Table.Row>
            {item.description && (
              <Table.Row>
                <Table.Cell>Description: </Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
              </Table.Row>
            )}
            <Table.Row>
              <Table.Cell>Evaluation Strategy: </Table.Cell>
              <Table.Cell>{item.eval_strategy}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Normalizer: </Table.Cell>
              <Table.Cell>{item.normalizer}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Utility Function: </Table.Cell>
              <Table.Cell>{item.utility_function}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>
    ));
    return <Box>{items}</Box>;
  }
};

function getRelatedArray(
  section: string,
  riskLvl: string,
  overviewData: OverviewData
): ListNode[] {
  let tempArr: ListNode[] = [],
    finalArray: ListNode[] = [];
  if (section === "quality_aspects") {
    tempArr = overviewData.qualityAspectNodes;
  } else if (section === "product_factors") {
    tempArr = overviewData.qualityFactorNodes;
  } else if (section === "measures") {
    tempArr = overviewData.measureNodes;
  }

  for (const iter of tempArr) {
    const value: number = iter.value;
    if (riskLvl === "severe" && value < 0.2) {
      finalArray.push(iter);
    } else if (riskLvl === "high" && value >= 0.2 && value < 0.4) {
      finalArray.push(iter);
    } else if (riskLvl === "moderate" && value >= 0.4 && value < 0.6) {
      finalArray.push(iter);
    } else if (riskLvl === "minor" && value >= 0.6 && value < 0.8) {
      finalArray.push(iter);
    } else if (riskLvl === "insignificant" && value >= 0.8 && value <= 1.0) {
      finalArray.push(iter);
    }
  }

  return finalArray;
}
