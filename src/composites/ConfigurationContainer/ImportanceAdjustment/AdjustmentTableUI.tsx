// AdjustmentTableUI.tsx
import React from "react";
import {
  Flex,
  Text,
  HoverCard,
  Link,
  Strong,
  Table,
  Box,
  Card,
  Avatar,
  Button,
} from "@radix-ui/themes";
import { ResetIcon, DownloadIcon } from "@radix-ui/react-icons";
import SingleTableRow from "./SingleRowInTable";
import * as schema from "../../../data/schema";

interface AdjustmentTableUIProps {
  dataset: schema.base.Schema;
  values: { [key: string]: number };
  recalculatedWeights: { [key: string]: number };
  handleSliderChange: (name: string, newImportance: number) => void;
  resetAllAdjustments: () => void;
  handleDownload: () => void;
}

export const AdjustmentTableUI: React.FC<AdjustmentTableUIProps> = ({
  dataset,
  values,
  recalculatedWeights,
  handleSliderChange,
  resetAllAdjustments,
  handleDownload,
}) => {
  const currentTQI = Object.values(dataset.factors.tqi)[0]?.value || 0;
  const updatedTQI =
    recalculatedWeights &&
    Object.entries(recalculatedWeights).reduce(
      (total, [name, weight]) =>
        total + (dataset.factors.quality_aspects[name]?.value || 0) * weight,
      0
    );
  // Construct the equation string
  const updatedTQIEquation = Object.entries(recalculatedWeights)
    .map(
      ([name, weight]) =>
        `${(dataset.factors.quality_aspects[name]?.value || 0).toFixed(
          2
        )} * ${weight.toFixed(2)}`
    )
    .join(" + ");

  return (
    <Flex direction={"column"} align={"center"}>
      <Box>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row align={"center"}>
              <Table.ColumnHeaderCell justify={"center"} width={"25%"}>
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <Link href="#">Characteristics</Link>
                  </HoverCard.Trigger>
                  <HoverCard.Content>
                    <Text as="div" style={{ maxWidth: 325 }}>
                      These are the Quality Characteristics that have impacts
                      towards the TQI (Total Quality Index).
                    </Text>
                  </HoverCard.Content>
                </HoverCard.Root>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify={"center"} width={"15%"}>
                Current Value
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify={"center"} width={"15%"}>
                Current Weight
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify={"center"} width={"30%"}>
                <HoverCard.Root>
                  <HoverCard.Trigger>
                    <Link href="#">Importance Adjustment Slider</Link>
                  </HoverCard.Trigger>
                  <HoverCard.Content>
                    <Text as="div" style={{ maxWidth: 325 }}>
                      Please drag the thumb on the slider to adjust the
                      importance. The next column{" "}
                      <Strong>Adjusted Weight</Strong> renders the updated
                      weight values based on the adjusted importance. The{" "}
                      <Strong>Updated TQI</Strong> is updated while adjustment
                      immediately.
                    </Text>
                  </HoverCard.Content>
                </HoverCard.Root>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell justify={"center"} width={"15%"}>
                Adjusted Weight
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Object.entries(dataset.factors.tqi).map(([_, tqiEntry]) => {
              return Object.entries(tqiEntry.weights).map(([name, weight]) => {
                return (
                  <SingleTableRow
                    key={name}
                    name={name}
                    qualityAspectValue={
                      dataset.factors.quality_aspects[name]?.value || 0
                    }
                    qualityAspectDescription={
                      dataset.factors.quality_aspects[name]?.description || ""
                    }
                    weightValue={weight}
                    sliderValue={values[name]}
                    recalculatedWeight={recalculatedWeights[name]}
                    onSliderChange={handleSliderChange}
                  />
                );
              });
            })}
          </Table.Body>
        </Table.Root>
      </Box>

      <Flex
        direction={"row"}
        align={"center"}
        justify="between"
        style={{ width: "100%" }}
      >
        <Box style={{ flexBasis: "40%" }}>
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
        <Box style={{ flexBasis: "40%" }}>
          <Card size="1">
            <Flex gap="3" align="center">
              <Avatar size="3" radius="full" fallback="New" color="indigo" />
              <Box>
                <Text as="div" size="2" weight="bold">
                  Updated TQI
                </Text>

                {/* <Text
                  as="div"
                  size="2"
                  color="gray"
                  style={{ fontSize: "small" }}
                >
                  Equation: {update
                    dTQIEquation} = 
                </Text> 
                */}
                <Text as="div" size="2" color="gray">
                  {updatedTQI.toFixed(4)}
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
        <Flex direction={"column"} style={{ width: "20%" }}>
          <Box>
            <Button
              variant="surface"
              onClick={resetAllAdjustments}
              style={{ width: "100%", height: "30px" }}
            >
              <ResetIcon width="16" height="16" />
              Reset
            </Button>
          </Box>
          <Box>
            <Button
              variant={"surface"}
              onClick={handleDownload}
              style={{ width: "100%", height: "30px" }}
            >
              <DownloadIcon width="16" height="16" />
              Download
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AdjustmentTableUI;
