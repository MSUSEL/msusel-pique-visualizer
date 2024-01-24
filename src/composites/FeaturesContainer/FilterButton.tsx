import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Callout, HoverCard, Dialog, Button, Flex, Text, DropdownMenu, Link, Strong, Em, Heading } from "@radix-ui/themes";
import { MixerHorizontalIcon, CheckCircledIcon, SliderIcon } from "@radix-ui/react-icons";
import * as React from "react";
import * as Slider from '@radix-ui/react-slider';
import '@radix-ui/colors/black-alpha.css';
import '@radix-ui/colors/violet.css';
import './Slider.css'
import * as Accordion from '@radix-ui/react-accordion';


export const FilterButton = () => {
  const dataset = useAtomValue(State.dataset);

  const [checkboxStates, setCheckboxStates] = useAtom(State.filteringByRiskLevelCheckboxStates);

  const handleCheckboxChange = (label: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxStates({ ...checkboxStates, [label]: e.target.checked });
  };

  console.log("Current filter checkboxes status", checkboxStates);

  // user typed in min and max
  // State for local form values
  const [localMinValue, setLocalMinValue] = React.useState(0);
  const [localMaxValue, setLocalMaxValue] = React.useState(1);
  const [localMinWeight, setLocalMinWeight] = React.useState(0);
  const [localMaxWeight, setLocalMaxWeight] = React.useState(1); 

  // Atoms from state.ts
  const [, setMinValueState] = useAtom(State.minValueState);
  const [, setMaxValueState] = useAtom(State.maxValueState);
  const [, setMinWeightState] = useAtom(State.minWeightState);
  const [, setMaxWeightState] = useAtom(State.maxWeightState);

  const handleSaveValueRange = () => {
    if (localMinValue <= localMaxValue) {
      setMinValueState(localMinValue);
      setMaxValueState(localMaxValue);
    } else {
      // Show an error message or handle the error appropriately
      alert("Minimum value cannot be greater than maximum value.");
    }
  };


  const handleSaveWeightRange = () => {
    setMinWeightState(localMinWeight);
    setMaxWeightState(localMaxWeight);
  };

  const generateFilterSummary = () => {
    // Selected risk levels
    const selectedRiskLevels = Object.entries(checkboxStates)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);

    // Summary for value range
    const isFullValueRange = localMinValue === -1 && localMaxValue === 1;
    const valueFilterSummary = !isFullValueRange ? `Value: ${localMinValue.toFixed(1)} to ${localMaxValue.toFixed(1)}` : '';

    // Summary for weight range
    const isFullWeightRange = localMinWeight === 0 && localMaxWeight === 1;
    const weightFilterSummary = !isFullWeightRange ? `Weight: ${localMinWeight.toFixed(1)} to ${localMaxWeight.toFixed(1)}` : '';

    // Combine summaries
    const filterSummaries = [
      selectedRiskLevels.join(', '),
      valueFilterSummary,
      weightFilterSummary,
    ].filter(Boolean); // Removes any empty strings

    // Handling pluralization and localization (as an example)
    const riskLevelText = selectedRiskLevels.length === 1 ? 'Selected Risk Level' : 'Selected Risk Levels';
    const riskLevelSummary = selectedRiskLevels.length > 0 ? `${riskLevelText}: ${selectedRiskLevels.join(', ')}` : '';

    if (filterSummaries.length === 0) {
      return 'No Filtering';
    }


    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

        {selectedRiskLevels.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'left' }}>
            <span style={{ marginLeft: '0px' }}>{`${riskLevelSummary}`}</span>
          </div>
        )}
        {<div style={{ display: 'flex', alignItems: 'left' }}>
          <span style={{ marginLeft: '0px' }}>{`Value: ${localMinValue.toFixed(1)} to ${localMaxValue.toFixed(1)}`}</span>
        </div>
        }
        {<div style={{ display: 'flex', alignItems: 'left' }}>
          <span style={{ marginLeft: '0px' }}>{`Weight: ${localMinWeight.toFixed(1)} to ${localMaxWeight.toFixed(1)}`}</span>
        </div>
        }
        {selectedRiskLevels.length === 0 && isFullValueRange && isFullWeightRange && 'No Filtering'}
      </div>
    );
  }


  return (

    <Flex gap="3" align="center">
      <div style={{ width: '100%', maxWidth: 300, margin: '0 15px' }}>
        {/* Title */}
        <div className="Text" style={{ fontWeight: 500 }}>
          <Text>
            <HoverCard.Root>
              <HoverCard.Trigger>
                <Link href="#" size='3'>
                  <MixerHorizontalIcon /> Filtering
                </Link>

              </HoverCard.Trigger>
              <HoverCard.Content>
                <Text as="div" size="1" style={{ maxWidth: 325 }}>
                  <Strong>Filter</Strong> the evaluation results, consisting of quality characteristics, factors, measures and diagnostics,
                  based on their <Em>risk levels</Em>, <Em> values range </Em>, or <Em> weights range </Em>.

                </Text>
              </HoverCard.Content>
            </HoverCard.Root>
          </Text>
        </div>

        {/* Filter summary */}
        <div>
          <Callout.Root>
            <Callout.Icon>
              <CheckCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              <Strong>
                Current Filtering Criteria
              </Strong>
              {generateFilterSummary()}
            </Callout.Text>
          </Callout.Root>

        </div>

        {/* Filter by risk level */}
        <div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger >
              <Button variant="surface" style={{ width: '100%', maxWidth: 300, margin: '0 15px' }}>
                <MixerHorizontalIcon /> Filter by Risk Level
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {/* filter by risk level*/}
              <DropdownMenu.Group>
                <DropdownMenu.Label>Risk Level</DropdownMenu.Label>
                {["Insignificant", "Low", "Medium", "High", "Severe"].map((label) => (
                  <DropdownMenu.Item key={label}>
                    <label>
                      <input
                        type="checkbox"
                        checked={checkboxStates[label]}
                        onChange={handleCheckboxChange(label)}
                      />
                      {label}
                    </label>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Group>

            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        {/* filter by objects value range*/}
        <div>
          <Dialog.Root>
            <Dialog.Trigger >
              <Button variant="surface" style={{ width: '100%', maxWidth: 300, margin: '0 15px' }}>
                <SliderIcon /> Filter by Value Range
              </Button>
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: '350px', width: '100%' }}>
              <Dialog.Title>By value range</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Drag the slider to decide the minimum and maximum of value range.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <Flex justify="between" align="center">
                  <Text size="2">Min: {localMinValue.toFixed(1)}</Text>
                  <Text size="2">Max: {localMaxValue.toFixed(1)}</Text>
                </Flex>
                <Slider.Root
                  className="SliderRoot"
                  defaultValue={[0, 1]}
                  min={-1}
                  max={1}
                  step={0.1}
                  value={[localMinValue, localMaxValue]}
                  onValueChange={([min, max]) => {
                    setLocalMinValue(min);
                    setLocalMaxValue(max);
                  }}
                >
                  <Slider.Track className="SliderTrack">
                    <Slider.Range className="SliderRange" />
                  </Slider.Track>
                  <Slider.Thumb className="SliderThumb" />
                  <Slider.Thumb className="SliderThumb" />
                </Slider.Root>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close >
                  <Button variant="soft" color="gray">Cancel</Button>
                </Dialog.Close>
                <Dialog.Close onClick={handleSaveValueRange}>
                  <Button>Save</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </div>

        {/* filter by objects weights range*/}
        <div>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button variant="surface" style={{ width: '100%', maxWidth: 300, margin: '0 15px' }}>
                <SliderIcon /> Filter by Weight Range
              </Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: '350px', width: '100%' }}>
              <Dialog.Title>By weight range</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Drag the slider to decide the minimum and maximum of weight range.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <Flex justify="between" align="center">
                  <Text size="2">Min: {localMinWeight.toFixed(1)}</Text>
                  <Text size="2">Max: {localMaxWeight.toFixed(1)}</Text>
                </Flex>
                <Slider.Root
                  className="SliderRoot"
                  defaultValue={[0, 1]}
                  min={0}
                  max={1}
                  step={0.1}
                  value={[localMinWeight, localMaxWeight]}
                  onValueChange={([min, max]) => {
                    setLocalMinWeight(min);
                    setLocalMaxWeight(max);
                  }}
                >
                  <Slider.Track className="SliderTrack">
                    <Slider.Range className="SliderRange" />
                  </Slider.Track>
                  <Slider.Thumb className="SliderThumb" />
                  <Slider.Thumb className="SliderThumb" />
                </Slider.Root>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close onClick={handleSaveWeightRange}>
                  <Button>Save</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      </div>
    </Flex>

  );
};