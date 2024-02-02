import { useAtom, useAtomValue } from "jotai";
import React, { useMemo, useState } from 'react';
import { State } from "../../../state";
import { Button, Dialog, Flex, Text, HoverCard, Link, Strong, Table, Callout, Box, Inset, Grid, Card, Avatar } from "@radix-ui/themes";
import { InfoCircledIcon, GearIcon, UpdateIcon, ResetIcon, DownloadIcon } from "@radix-ui/react-icons";
import * as Slider from '@radix-ui/react-slider';
import "../../Style/Slider.css";
import * as schema from '../../../data/schema';



interface Weights {
  [key: string]: number;
}

interface TQIEntry {
  weights: Weights;
}

interface SingleTableRowProps {
  name: string;
  qualityAspectValue: number;
  qualityAspectDescription: string;
  weightValue: number;
  sliderValue: number;
  recalculatedWeight: number;
  onSliderChange: (name: string, newImportance: number) => void;
}

const SingleTableRow: React.FC<SingleTableRowProps> = ({
  name,
  qualityAspectValue,
  qualityAspectDescription,
  weightValue,
  sliderValue,
  recalculatedWeight,
  onSliderChange,
}) => {

  return (
    <Table.Row>
      <Table.ColumnHeaderCell justify={'center'}>
        <HoverCard.Root>
          <HoverCard.Trigger>
            <Link href="#">{name}</Link>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <Text as="div" style={{ maxWidth: 325 }}>
              <Strong>Meaning of {name}</Strong> : {qualityAspectDescription}
            </Text>
          </HoverCard.Content>
        </HoverCard.Root>
      </Table.ColumnHeaderCell>

      <Table.Cell justify={'center'}>{qualityAspectValue.toFixed(3)}</Table.Cell>
      <Table.Cell justify={'center'}>{weightValue.toFixed(3)}</Table.Cell> {/* Original weight value */}
      <Table.Cell>
        <Box style={{ position: 'relative', padding: '20px' }}>
          <Slider.Root
            value={[sliderValue]}
            onValueChange={(value) => onSliderChange(name, value[0])}
            min={0}
            max={1}
            step={0.01}
            className="SliderRoot">
            <Slider.Track className="SliderTrack">
              <Slider.Range className="SliderRange" />
            </Slider.Track>
            <Slider.Thumb className="SliderThumb" />
          </Slider.Root>
          <div style={{ position: 'absolute', top: '-2px', left: `${sliderValue * 100}%`, transform: 'translateX(-50%)' }}>
            {sliderValue.toFixed(2)}
          </div>
        </Box>
      </Table.Cell>
      <Table.Cell>{recalculatedWeight.toFixed(3)}</Table.Cell>
    </Table.Row>
  );
};

export const CharacteristicsTableGenerator = () => {
  const dataset = useAtomValue(State.dataset);
  if (!dataset) return null;

  const currentTQI = Object.values(dataset.factors.tqi)[0]?.value || 0;

  const initialWeights = useMemo(() => {
    const weights: Weights = {};
    Object.entries(dataset.factors.tqi).forEach(([_, tqiEntry]) => {
      const entry = tqiEntry as TQIEntry;
      Object.keys(entry.weights).forEach(name => {
        weights[name] = entry.weights[name];
      });
    });
    return weights;
  }, [dataset]);

  const [sliderValues, setSliderValues] = useState(initialWeights);

  const totalImportance = useMemo(() => Object.values(sliderValues).reduce((sum, importance) => sum + importance, 0), [sliderValues]);

  const recalculatedWeights = useMemo(() => {
    const newWeights: Weights = {};
    Object.keys(sliderValues).forEach(name => {
      newWeights[name] = sliderValues[name] / totalImportance;
    });
    return newWeights;
  }, [sliderValues, totalImportance]);

  const handleSliderChange = (name: string, newImportance: number) => {
    setSliderValues(prev => ({ ...prev, [name]: newImportance }));
  };

  const updatedTQI = useMemo(() => {
    return Object.entries(recalculatedWeights).reduce((total, [name, weight]) => {
      return total + (dataset.factors.quality_aspects[name]?.value || 0) * weight;
    }, 0);
  }, [recalculatedWeights, dataset]);

  const resetAllAdjustments = () => setSliderValues(initialWeights);


  return (
    <Flex direction={"column"} align={"center"}>
      <Box>
        <Table.Root variant='surface'>
          <Table.Header>
            <Table.Row align={'center'}>
              <Table.ColumnHeaderCell justify={'center'} width={'25%'}>
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <Link href="#">Characteristics</Link>
                  </HoverCard.Trigger>
                  <HoverCard.Content>
                    <Text as="div" style={{ maxWidth: 325 }}>
                      These are the Quality Characteristics that have impacts towards the TQI (Total Quality Index).
                    </Text>
                  </HoverCard.Content>
                </HoverCard.Root>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify={'center'} width={'15%'}>Current Value</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify={'center'} width={'15%'}>Current Weight</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify={'center'} width={'30%'}>
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <Link href="#">Importance Adjustment Slider</Link>
                  </HoverCard.Trigger>
                  <HoverCard.Content>
                    <Text as="div" style={{ maxWidth: 325 }}>
                      Please drag the thumb on the slider to adjust the improtance.
                      The importance could be between 0 and 1.
                      The next column <Strong>Adjusted Weight</Strong> renders the updated weight values based on the adjusted importance.
                      The <Strong>Updated TQI</Strong> is updated while adjustment immediately.
                    </Text>
                  </HoverCard.Content>
                </HoverCard.Root></Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell justify={'center'} width={'15%'}>Adjusted Weight</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Object.entries(dataset.factors.tqi).map(([_, tqiEntry]) => {
              return Object.entries(tqiEntry.weights).map(([name, weight]) => {
                return (
                  <SingleTableRow
                    key={name}
                    name={name}
                    qualityAspectValue={dataset.factors.quality_aspects[name]?.value || 0}
                    qualityAspectDescription={dataset.factors.quality_aspects[name]?.description || ''}
                    weightValue={weight}
                    sliderValue={sliderValues[name]}
                    recalculatedWeight={recalculatedWeights[name]}
                    onSliderChange={handleSliderChange}
                  />
                );
              });
            })}
          </Table.Body>


        </Table.Root>
      </Box>

      <Flex direction={"row"} align={"center"} justify="between" style={{ width: '100%' }}>
        <Box style={{ flexBasis: '40%' }}>
          <Card size="1">
            <Flex gap="3" align="center">
              <Avatar size="3" radius="full" fallback="Ini" color="indigo" />
              <Box>
                <Text as="div" size="2" weight="bold">
                  Initial TQI
                </Text>
                <Text as="div" size="2" color="gray">
                  {currentTQI.toFixed(4)}
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
        <Box style={{ flexBasis: '40%' }}>
          <Card size="1">
            <Flex gap="3" align="center">
              <Avatar size="3" radius="full" fallback="New" color="indigo" />
              <Box>
                <Text as="div" size="2" weight="bold">
                  Updated TQI
                </Text>
                <Text as="div" size="2" color="gray">
                  {updatedTQI.toFixed(4)}
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
        <Flex direction={"column"} style={{ width: '20%' }}>
          <Box> {/* Add some spacing between buttons */}
            <Button variant={"surface"} onClick={resetAllAdjustments} style={{ width: '100%', height: '30px' }}>
              <ResetIcon width="16" height="16" />
              Reset
            </Button>
          </Box>
          <Box>
            <Button variant={"surface"} style={{ width: '100%', height: '30px' }}>
              <DownloadIcon width="16" height="16" />
              Download
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
