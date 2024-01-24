import { useAtom, useAtomValue } from "jotai";
import React, { useMemo, useState } from 'react';
import { State } from "../../state";
import { Button, Dialog, Flex, Text, HoverCard, Link, Strong, Table, Callout, Box, Inset, Grid } from "@radix-ui/themes";
import { InfoCircledIcon, GearIcon } from "@radix-ui/react-icons";
import * as Slider from '@radix-ui/react-slider';
import "../FeaturesContainer/Slider.css";
import * as schema from '../../data/schema';



interface Weights {
  [key: string]: number;
}

interface TQIEntry {
  weights: Weights;
}

interface SingleTableRowProps {
  tqiKey: string;
  name: string;
  qualityAspectValue: number;
  weightValue: number; // Original weight before adjustment
  sliderValue: number; // Current slider value after adjustment
  maxSliderValue: number; // Maximum value for the slider
  onSliderChange: (tqiKey: string, name: string, newWeight: number) => void;
}


const SingleTableRow: React.FC<SingleTableRowProps> = ({ tqiKey, name, qualityAspectValue, weightValue, sliderValue, maxSliderValue, onSliderChange }) => {
  return (
    <Table.Row>
      <Table.RowHeaderCell>{name}</Table.RowHeaderCell>
      <Table.Cell>{qualityAspectValue.toFixed(4)}</Table.Cell>
      <Table.Cell>{weightValue.toFixed(4)}</Table.Cell> {/* Original weight value */}
      <Table.Cell>
        <Box>
          <Slider.Root value={[sliderValue]} onValueChange={value => onSliderChange(tqiKey, name, value[0])} min={0} max={maxSliderValue} step={0.05} className="SliderRoot">
            <Slider.Track className="SliderTrack">
              <Slider.Range className="SliderRange" />
            </Slider.Track>
            <Slider.Thumb className="SliderThumb" />
          </Slider.Root>
        </Box>
      </Table.Cell>
      <Table.Cell>{sliderValue.toFixed(4)}</Table.Cell> {/* Adjusted weight value */}
    </Table.Row>
  );
};

export const CharacteristicsTableGenerator = () => {
  const dataset = useAtomValue(State.dataset);
  if (!dataset) return null
  var adjustedDataset = JSON.parse(JSON.stringify(dataset));
  const currentTQI = Object.values(dataset.factors.tqi)[0]?.value || 0;


  // State to track slider values
  const [sliderValues, setSliderValues] = useState(() => {
    const initialSliderValues: Record<string, number> = {};
    Object.entries(adjustedDataset.factors.tqi).forEach(([tqiKey, tqiEntry]) => {
      const entry = tqiEntry as TQIEntry; // Type assertion here
      Object.keys(entry.weights).forEach(name => {
        initialSliderValues[`${tqiKey}-${name}`] = entry.weights[name];
      });
    });
    return initialSliderValues;
  });

  // Function to reset all sliders
  const resetAllAdjustments = () => {
    setSliderValues(() => {
      const resetValues: Record<string, number> = {};
      Object.entries(adjustedDataset.factors.tqi).forEach(([tqiKey, tqiEntry]) => {
        const entry = tqiEntry as TQIEntry; // Type assertion here
        Object.keys(entry.weights).forEach(name => {
          resetValues[`${tqiKey}-${name}`] = entry.weights[name];
        });
      });
      return resetValues;
    });
  };


  // Function to handle slider change
  const handleSliderChange = (tqiKey: string, name: string, newWeight: number) => {
    setSliderValues(prevValues => ({
      ...prevValues,
      [`${tqiKey}-${name}`]: newWeight
    }));
    adjustedDataset.factors.tqi[tqiKey].weights[name] = newWeight; // Update adjusted dataset
  };


  const updatedTQI = useMemo(() => {
    let totalTQI = 0;
    Object.entries(adjustedDataset.factors.tqi).forEach(([_, tqiEntry]) => {
      const entry = tqiEntry as TQIEntry; // Type assertion for tqiEntry
      Object.keys(entry.weights).forEach(name => {
        const aspectValue = adjustedDataset.factors.quality_aspects[name]?.value || 0;
        const sliderValue = sliderValues[`${Object.keys(dataset.factors.tqi)[0]}-${name}`];
        totalTQI += aspectValue * sliderValue;
      });
    });
    return totalTQI;
  }, [sliderValues, adjustedDataset]);
  return (
    <Flex direction={"column"} align={"center"}>
      <Box>
        <Table.Root variant='surface'>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Characteristics</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Current Value</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Current Weight</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Weight Adjustment Slider</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Adjusted Weight</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Object.entries(adjustedDataset.factors.tqi).map(([tqiKey, tqiEntry]) => {
              const entry = tqiEntry as TQIEntry; // Type assertion for tqiEntry

              return Object.entries(entry.weights).map(([name, weightValue]) => {
                // Calculate the sum of all other weights
                const sumOtherWeights = Object.entries(entry.weights).reduce((sum, [otherName, otherWeightValue]) => {
                  return otherName !== name ? sum + sliderValues[`${tqiKey}-${otherName}`] : sum;
                }, 0);

                // Calculate the maximum value for this slider
                const maxSliderValue = 1 - sumOtherWeights;

                return (
                  <SingleTableRow
                    key={`${tqiKey}-${name}`}
                    tqiKey={tqiKey}
                    name={name}
                    qualityAspectValue={adjustedDataset.factors.quality_aspects[name]?.value || 0}
                    weightValue={weightValue as number}
                    sliderValue={sliderValues[`${tqiKey}-${name}`]}
                    maxSliderValue={maxSliderValue}
                    onSliderChange={handleSliderChange}
                  />
                );
              });
            })}
          </Table.Body>


        </Table.Root>
      </Box>

      <Flex direction={"row"} align={"center"} gap={"3"}>
        <Box>
          <Text> <Strong>Current TQI: </Strong> {currentTQI.toFixed(4)} </Text>
        </Box>
        <Box>
          <Text> <Strong>Updated TQI: </Strong> {updatedTQI.toFixed(4)} </Text>
        </Box>
        <Box><Button variant={"surface"} onClick={resetAllAdjustments}>Reset All Adjustments</Button></Box>
      </Flex>


    </Flex>
  );
}
