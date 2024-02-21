import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import {
  Callout,
  HoverCard,
  Dialog,
  Button,
  Flex,
  Text,
  DropdownMenu,
  Link,
  Strong,
  Em,
  Heading,
  Box,
} from "@radix-ui/themes";
import {
  MixerHorizontalIcon,
  CheckCircledIcon,
  SliderIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import * as React from "react";
import * as Slider from "@radix-ui/react-slider";
import "@radix-ui/colors/black-alpha.css";
import "@radix-ui/colors/violet.css";
import "../Style/Separator.css";
import * as Accordion from "@radix-ui/react-accordion";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as schema from "../../data/schema";
import { findMinMaxValues } from "../Filtering/FindMinMaxValues";

export const FilterButton = () => {
  const dataset = useAtomValue(State.dataset);

  const [checkboxStates, setCheckboxStates] = useAtom(
    State.filteringByRiskLevelCheckboxStates
  );

  const handleCheckboxChange =
    (label: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckboxStates({ ...checkboxStates, [label]: e.target.checked });
    };

  // Determine the min and max values for the slider
  const [sliderMin, sliderMax] = dataset ? findMinMaxValues(dataset) : [0, 1];

  // user typed in min and max
  const [minValue, setMinValue] = useAtom(State.minValueState);
  const [maxValue, setMaxValue] = useAtom(State.maxValueState);
  const [minWeight, setMinWeight] = useAtom(State.minWeightState);
  const [maxWeight, setMaxWeight] = useAtom(State.maxWeightState);

  const handleSaveValueRange = () => {
    if (minValue <= maxValue) {
      setMinValue(minValue);
      setMaxValue(maxValue);
    } else {
      alert("Minimum value cannot be greater than maximum value.");
    }
  };

  const handleSaveWeightRange = () => {
    setMinWeight(minWeight);
    setMaxWeight(maxWeight);
  };

  const generateFilterSummary = () => {
    // Selected risk levels
    const selectedRiskLevels = Object.entries(checkboxStates)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);

    // Summary for value range
    const isFullValueRange = minValue === -1 && maxValue === 1;
    const valueFilterSummary = !isFullValueRange
      ? `Value: ${minValue.toFixed(1)} to ${maxValue.toFixed(1)}`
      : "";

    // Summary for weight range
    const isFullWeightRange = minWeight === 0 && maxWeight === 1;
    const weightFilterSummary = !isFullWeightRange
      ? `Weight: ${minWeight.toFixed(1)} to ${maxWeight.toFixed(1)}`
      : "";

    // Combine summaries
    const filterSummaries = [
      selectedRiskLevels.join(", "),
      valueFilterSummary,
      weightFilterSummary,
    ].filter(Boolean); // Removes any empty strings

    // Handling pluralization and localization (as an example)
    const riskLevelText =
      selectedRiskLevels.length === 1
        ? "Selected Risk Level"
        : "Selected Risk Levels";
    const riskLevelSummary =
      selectedRiskLevels.length > 0
        ? `${riskLevelText}: ${selectedRiskLevels.join(", ")}`
        : "";

    if (filterSummaries.length === 0) {
      return "No Filtering";
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {selectedRiskLevels.length > 0 && (
          <div style={{ display: "flex", alignItems: "left" }}>
            <span style={{ marginLeft: "0px" }}>{`${riskLevelSummary}`}</span>
          </div>
        )}
        {
          <div style={{ display: "flex", alignItems: "left" }}>
            <span style={{ marginLeft: "0px" }}>{`Value: ${minValue.toFixed(
              1
            )} to ${maxValue.toFixed(1)}`}</span>
          </div>
        }
        {
          <div style={{ display: "flex", alignItems: "left" }}>
            <span style={{ marginLeft: "0px" }}>{`Weight: ${minWeight.toFixed(
              1
            )} to ${maxWeight.toFixed(1)}`}</span>
          </div>
        }
        {selectedRiskLevels.length === 0 &&
          isFullValueRange &&
          isFullWeightRange &&
          "No Filtering"}
      </div>
    );
  };

  return (
    <Flex gap="3" align={"start"} direction={"column"}>
      {/* Title */}
      <Box>
        <HoverCard.Root>
          <HoverCard.Trigger>
            <Link href="#" size="3">
              <MixerHorizontalIcon /> Filtering{" "}
            </Link>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <Text as="div" size="1" style={{ maxWidth: 325 }}>
              <Strong>Filter</Strong> the evaluation results, consisting of
              quality characteristics, factors, measures and diagnostics, based
              on their <Em>risk levels</Em>, <Em> values range </Em>, or{" "}
              <Em> weights range </Em>.
            </Text>
          </HoverCard.Content>
        </HoverCard.Root>
      </Box>

      {/* Filter summary */}
      <Box style={{ width: "100%" }}>
        <Callout.Root>
          <Callout.Icon>
            <CheckCircledIcon />
          </Callout.Icon>
          <Callout.Text align={"left"}>
            <Strong>Current Filtering Criteria: </Strong>{" "}
            {generateFilterSummary()}
          </Callout.Text>
        </Callout.Root>
      </Box>

      <Flex direction={"column"} align={"start"}>
        {/* Filter by risk level */}
        <Box style={{ width: "100%" }}> 
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button
                variant="surface"
                style={{ width: "100%", margin: "0 15px" }}
              >
                <MixerHorizontalIcon /> Filter by Risk Level
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              
              <DropdownMenu.Group>
                <DropdownMenu.Label>Risk Level</DropdownMenu.Label>
                {["Insignificant", "Low", "Medium", "High", "Severe"].map(
                  (label) => (
                    <DropdownMenu.Item key={label} onSelect={(event) => event.preventDefault()} >
                      <label>
                        {checkboxStates[label] && <CheckIcon />}{" "}
                      
                        <input
                          type="checkbox"
                          checked={checkboxStates[label]}
                          onChange={handleCheckboxChange(label)}
                        />
                        {label}
                      </label>
                    </DropdownMenu.Item>
                  )
                )}
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>

        {/* filter by objects value range*/}
        <Box style={{ width: "100%" }}>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button
                variant="surface"
                style={{ width: "100%", maxWidth: 300, margin: "0 15px" }}
              >
                <SliderIcon /> Filter by Value Range
              </Button>
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: "350px", width: "100%" }}>
              <Dialog.Title>By value range</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Drag the slider to decide the minimum and maximum of value
                range.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <Flex justify="between" align="center">
                  <Text size="2">Min: {minValue.toFixed(1)}</Text>
                  <Text size="2">Max: {maxValue.toFixed(1)}</Text>
                </Flex>
                <Slider.Root
                  className="SliderRoot"
                  defaultValue={[minValue, maxValue]}
                  min={sliderMin}
                  max={sliderMax}
                  step={0.1}
                  value={[minValue, maxValue]}
                  onValueChange={([min, max]) => {
                    setMinValue(min);
                    setMaxValue(max);
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
                <Dialog.Close onClick={handleSaveValueRange}>
                  <Button>Save</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Box>

        {/* filter by objects weights range*/}
        <Box style={{ width: "100%" }}>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button
                variant="surface"
                style={{ width: "100%", maxWidth: 300, margin: "0 15px" }}
              >
                <SliderIcon /> Filter by Weight Range
              </Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: "350px", width: "100%" }}>
              <Dialog.Title>By weight range</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Drag the slider to decide the minimum and maximum of weight
                range.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <Flex justify="between" align="center">
                  <Text size="2">Min: {minWeight.toFixed(1)}</Text>
                  <Text size="2">Max: {maxWeight.toFixed(1)}</Text>
                </Flex>
                <Slider.Root
                  className="SliderRoot"
                  defaultValue={[0, 1]}
                  min={0}
                  max={1}
                  step={0.1}
                  value={[minWeight, maxWeight]}
                  onValueChange={([min, max]) => {
                    setMinWeight(min);
                    setMaxWeight(max);
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
        </Box>
      </Flex>
    </Flex>
  );
};
