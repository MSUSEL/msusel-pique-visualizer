import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Select, TextField, Dialog, Button, Flex, Text, DropdownMenu } from "@radix-ui/themes";
import { MixerHorizontalIcon, SliderIcon } from "@radix-ui/react-icons";
import * as React from "react";
import * as Slider from '@radix-ui/react-slider';
import '@radix-ui/colors/black-alpha.css';
import '@radix-ui/colors/violet.css';
import './Slider.css'


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
    const riskLevelText = selectedRiskLevels.length === 1 ? 'Risk Level' : 'Risk Levels';
    const riskLevelSummary = selectedRiskLevels.length > 0 ? `${riskLevelText}: ${selectedRiskLevels.join(', ')}` : '';

    if (filterSummaries.length === 0) {
      return 'No Filtering';
    }


    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {selectedRiskLevels.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SliderIcon /> <span style={{ marginLeft: '8px' }}>{`${riskLevelText}: ${selectedRiskLevels.join(', ')}`}</span>
          </div>
        )}
        {!isFullValueRange && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SliderIcon /> <span style={{ marginLeft: '8px' }}>{`Value: ${localMinValue.toFixed(1)} to ${localMaxValue.toFixed(1)}`}</span>
          </div>
        )}
        {!isFullWeightRange && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SliderIcon /> <span style={{ marginLeft: '8px' }}>{`Weight: ${localMinWeight.toFixed(1)} to ${localMaxWeight.toFixed(1)}`}</span>
          </div>
        )}
        {selectedRiskLevels.length === 0 && isFullValueRange && isFullWeightRange && 'No Filtering'}
      </div>
    );
  }


  return (

    <Flex gap="3" align="center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger >
          <Button variant="soft">
            <MixerHorizontalIcon />
            {generateFilterSummary()}
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

          <DropdownMenu.Separator />

          {/* filter by objects value range*/}
          <DropdownMenu.Group>
            <DropdownMenu.Label>Value</DropdownMenu.Label>
            <Dialog.Root>
              <Dialog.Trigger >
                <Button>Value range</Button>
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


          </DropdownMenu.Group>

          <DropdownMenu.Separator />

          {/* filter by objects weights range*/}
          <DropdownMenu.Group>
            <DropdownMenu.Label>Weight</DropdownMenu.Label>
            <Dialog.Root>
              <Dialog.Trigger>
                <Button>Weight range</Button>
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


          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

    </Flex>

  );
};