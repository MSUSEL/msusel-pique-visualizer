import { useAtom, useAtomValue } from "jotai";
import React, { useState } from 'react';
import { State } from "../../state";
import { Button, Dialog, Flex, Text, HoverCard, Link, Strong, Table, Callout, Box, Inset, Grid } from "@radix-ui/themes";
import { InfoCircledIcon, GearIcon } from "@radix-ui/react-icons";
import * as Slider from '@radix-ui/react-slider';
import "../FeaturesContainer/Slider.css";


const SingleTableRowContent = () => {
  return (
    <Table.Row>
      <Table.RowHeaderCell>1</Table.RowHeaderCell>
      <Table.Cell>2</Table.Cell>
      <Table.Cell>3</Table.Cell>
      <Table.Cell>
        <Box>
        <Slider.Root min={0} max={1} step={0.05} className="SliderRoot">
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange"/>
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" />
        </Slider.Root>
        </Box>
      </Table.Cell>
    </Table.Row>
  )
}

export const CharacteristicsTableGenerator = () => {
  const currentTQI = 0.5;
  const updatedTQI = 0.6;

  return (
    <Flex direction={"column"} align={"center"}>
      <Box>
        <Table.Root variant='surface'>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Characteristics</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Current Value</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Current Weights</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Adjusted Weights</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <SingleTableRowContent />

          </Table.Body>
        </Table.Root>
      </Box>

      <Flex direction={"row"} align={"center"} gap={"3"}>
        <Box>
          <Text> <Strong>Current TQI: </Strong> {currentTQI} </Text>
        </Box>
        <Box>
          <Text> <Strong>Updated TQI: </Strong> {updatedTQI} </Text>
        </Box>

      </Flex>

    </Flex>
  );
}
