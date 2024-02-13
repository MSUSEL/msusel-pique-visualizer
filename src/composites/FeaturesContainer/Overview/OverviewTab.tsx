import { useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import * as Schema from "../../../data/schema";
import { State } from "../../../state";
import {
  Flex,
  Text,
  Box,
  Button,
  Avatar,
  HoverCard,
  Link,
  Separator,
  Badge,
  Strong,
} from "@radix-ui/themes";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { OverviewList } from ".";
import "./Overview.css";

interface FilterableItem {
  value: number;
  weights: Record<string, number>;
  [key: string]: any;
}

interface Impact {
  aspectName: string;
  weight: number;
}

// define a function classifyRiskLevels for a high-level object, such as tqi, quality_aspects, product_factors
// input: an object: NestedObject
// ouput: two arrays or a dictionary: risk level counts, and objects.names in each level

function classifyNestedObjRiskLevel(
  obj: Record<string, FilterableItem>
): [number[], string[][]] {
  const riskCounts = [0, 0, 0, 0, 0];
  const riskSubObjNames: string[][] = [[], [], [], [], []];

  for (const key in obj) {
    const item = obj[key];
    if (item.value < 0.2) {
      riskCounts[0]++;
      riskSubObjNames[0].push(item.name);
    } else if (item.value >= 0.2 && item.value < 0.4) {
      riskCounts[1]++;
      riskSubObjNames[1].push(item.name);
    } else if (item.value >= 0.4 && item.value < 0.6) {
      riskCounts[2]++;
      riskSubObjNames[2].push(item.name);
    } else if (item.value >= 0.6 && item.value < 0.8) {
      riskCounts[3]++;
      riskSubObjNames[3].push(item.name);
    } else if (item.value >= 0.8) {
      riskCounts[4]++;
      riskSubObjNames[4].push(item.name);
    }
  }

  return [riskCounts, riskSubObjNames];
}

function hasWeights(obj: any): obj is { weights: Record<string, number> } {
  return obj && typeof obj === "object" && "weights" in obj;
}

const generateChartData = (riskData: [number[], string[][]] | null) => {
  if (!riskData) return [];
  const [riskCounts] = riskData;
  return ["Severe", "High", "Medium", "Low", "Insignificant"].map(
    (level, index) => ({
      name: level,
      Count: riskCounts[index],
    })
  );
};

export const OverviewTab = () => {
  const dataset: Schema.base.Schema = useAtomValue(
    State.dataset
  ) as Schema.base.Schema;
  const tqiRiskData = useMemo(
    () => (dataset ? classifyNestedObjRiskLevel(dataset.factors.tqi) : null),
    [dataset]
  );
  const qualityAspectsRiskData = useMemo(
    () =>
      dataset
        ? classifyNestedObjRiskLevel(dataset.factors.quality_aspects)
        : null,
    [dataset]
  );
  const productFactorsRiskData = useMemo(
    () =>
      dataset
        ? classifyNestedObjRiskLevel(dataset.factors.product_factors)
        : null,
    [dataset]
  );

  // Determine the risk level and name for TQI
  const tqiRiskLevel = useMemo(() => {
    if (!tqiRiskData || !dataset) return { level: "", name: "" };
    const [riskCounts, riskSubObjNames] = tqiRiskData;
    const levelIndex = riskCounts.findIndex((count) => count > 0);
    const levelName =
      levelIndex >= 0
        ? ["Severe", "High", "Medium", "Low", "Insignificant"][levelIndex]
        : "";
    const name = levelIndex >= 0 ? riskSubObjNames[levelIndex][0] : "";
    const value = Object.values(dataset.factors.tqi)[0].value;
    return { level: levelName, name, value };
  }, [tqiRiskData]);

  const [isOverviewListOpen, setOverviewListOpen] = useState(false);

  const toggleOverviewList = () => {
    setOverviewListOpen(!isOverviewListOpen);
  };

  // Prepare data for the chart
  const qualityAspectsChartData = useMemo(
    () => generateChartData(qualityAspectsRiskData),
    [qualityAspectsRiskData]
  );
  const productFactorsChartData = useMemo(
    () => generateChartData(productFactorsRiskData),
    [productFactorsRiskData]
  );

  // Define colors for each slice of the pie chart
  const COLORS = ["red", "orange", "yellow", "blue", "green"];

  // Get top 3 problematic objects for characteristics and factors
  const topProblematicQualityAspects = useMemo(() => {
    if (!qualityAspectsRiskData || !dataset) return [];

    // Assuming there's only one subobject in dataset.factors.tqi
    const tqiSubObject = Object.values(dataset.factors.tqi)[0];
    const tqiWeights = hasWeights(tqiSubObject) ? tqiSubObject.weights : {};

    const [_, riskSubObjNames] = qualityAspectsRiskData;
    return riskSubObjNames
      .flat()
      .slice(0, 3)
      .map((name) => {
        const details = dataset.factors.quality_aspects[name];
        const weight = name in tqiWeights ? tqiWeights[name] : 0;

        return { name, details, weight: weight };
      });
  }, [qualityAspectsRiskData, dataset]);

  const topProblematicProductFactors = useMemo(() => {
    if (!productFactorsRiskData || !dataset) return [];

    const [_, riskSubObjNames] = productFactorsRiskData;
    return riskSubObjNames
      .flat()
      .slice(0, 3)
      .map((productFactorName) => {
        const details = dataset.factors.product_factors[productFactorName];
        const impacts: Impact[] = [];

        // Iterate over each quality aspect
        Object.entries(dataset.factors.quality_aspects).forEach(
          ([qualityAspectName, qualityAspect]) => {
            if (productFactorName in qualityAspect.weights) {
              impacts.push({
                aspectName: qualityAspectName,
                weight: qualityAspect.weights[productFactorName],
              });
            }
          }
        );

        return { name: productFactorName, details, impacts };
      });
  }, [productFactorsRiskData, dataset]);

  return (
    <Flex direction={"row"} gap={"3"}>
      <Flex
        direction={"column"}
        gap={"3"}
        align={"center"}
        style={{ width: "100%" }}
      >
        <Flex
          direction={"row"}
          gap={"3"}
          align={"center"}
          style={{ width: "100%" }}
          justify="center"
        >
          <Box>
            <Avatar size="5" fallback="TQI" />
          </Box>
          <Flex direction={"column"}>
            <Text> Project Name: {tqiRiskLevel.name}</Text>
            <Text> Total Quality Index: {tqiRiskLevel.value?.toFixed(3)}</Text>
            <Text> Risk Level: {tqiRiskLevel.level}</Text>
          </Flex>
        </Flex>

        <Separator my="3" size="4" />

        <Flex direction={"row"} style={{ width: "100%" }} justify="between">
          <Flex
            direction={"column"}
            align={"center"}
            gap={"5"}
            style={{ flexBasis: "30%" }}
          >
            <Box>
              {" "}
              <Badge size="2">Charactertistics</Badge>{" "}
            </Box>
            <Box>
              {/* Display risk counts here */}
              {qualityAspectsChartData.map((data, index) => (
                <Text key={index}>
                  <Text as="p">
                    {data.name}: {data.Count}
                  </Text>
                </Text>
              ))}
            </Box>
          </Flex>

          <Flex
            direction={"column"}
            align={"center"}
            gap={"5"}
            style={{ flexBasis: "30%" }}
          >
            <Box>
              <Text> Risk Level Distribution</Text>
            </Box>
            <Box>
              {/* Pie chart visualization */}
              <PieChart width={300} height={300}>
                <Pie
                  data={qualityAspectsChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="Count"
                  label
                >
                  {qualityAspectsChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Box>
          </Flex>

          <Flex
            direction={"column"}
            align={"center"}
            gap={"5"}
            style={{ flexBasis: "30%" }}
          >
            <Box>
              <Text>Top 3 lowest Quality Characteristics:</Text>
            </Box>
            <Box>
              {topProblematicQualityAspects.map((item, index) => (
                <HoverCard.Root key={index}>
                  <HoverCard.Trigger>
                    <Button
                      onClick={toggleOverviewList}
                      style={{ background: "none" }}
                    >
                      <Text as="p">
                        <Link href="#">
                          {item.name}: {item.details.value.toFixed(3)}
                        </Link>
                      </Text>
                    </Button>
                  </HoverCard.Trigger>
                  <HoverCard.Content>
                    <Text as="div" size="1" style={{ maxWidth: 250 }}>
                      <Text as="p">
                        <Strong>Name:</Strong> {item.name}
                      </Text>
                      <Text as="p">
                        <Strong>Value:</Strong> {item.details.value.toFixed(3)}
                      </Text>
                      <Text as="p">
                        <Strong>Impact to TQI:</Strong> {item.weight.toFixed(3)}
                      </Text>
                      <Text as="p">
                        <Strong>Description:</Strong> {item.details.description}
                      </Text>
                    </Text>
                  </HoverCard.Content>
                </HoverCard.Root>
              ))}
            </Box>
          </Flex>
        </Flex>

        <Separator my="3" size="4" />

        <Flex direction={"row"} style={{ width: "100%" }} justify="between">
          <Flex
            direction={"column"}
            align={"center"}
            gap={"5"}
            style={{ flexBasis: "30%" }}
          >
            <Box>
              {" "}
              <Badge size="2">Factors</Badge>{" "}
            </Box>
            <Box>
              {/* Display risk counts here */}
              {productFactorsChartData.map((data, index) => (
                <Text key={index}>
                  <Text as="p">
                    {data.name}: {data.Count}
                  </Text>
                </Text>
              ))}
            </Box>
          </Flex>

          <Flex
            direction={"column"}
            align={"center"}
            gap={"5"}
            style={{ flexBasis: "30%" }}
          >
            <Box>
              <Text> Risk Level Distribution</Text>
            </Box>
            <Box>
              {/* Pie chart visualization */}
              <PieChart width={300} height={300}>
                <Pie
                  data={productFactorsChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="Count"
                  label
                >
                  {productFactorsChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Box>
          </Flex>

          <Flex
            direction={"column"}
            align={"center"}
            gap={"5"}
            style={{ flexBasis: "30%" }}
          >
            <Box>
              <Text>Top 3 lowest Factors:</Text>
            </Box>
            <Box>
              {topProblematicProductFactors.map((item, index) => (
                <HoverCard.Root key={index}>
                  <HoverCard.Trigger>
                    <Button
                      onClick={toggleOverviewList}
                      style={{ background: "none" }}
                    >
                      <Text as="p">
                        <Link href="#">
                          {item.name}: {item.details.value.toFixed(3)}
                        </Link>
                      </Text>
                    </Button>
                  </HoverCard.Trigger>
                  <HoverCard.Content>
                    <Text as="div" size="1" style={{ maxWidth: 250 }}>
                      <Text as="p">
                        <Strong>Name:</Strong> {item.name}
                      </Text>
                      <Text as="p">
                        <Strong>Value:</Strong> {item.details.value.toFixed(3)}
                      </Text>
                      <Text as="p">
                        <Strong>
                          Impact to corresponding Characteristics:
                        </Strong>
                      </Text>
                      {item.impacts.map((impact, idx) => (
                        <Text as="p" key={idx}>
                          {impact.aspectName}: {impact.weight.toFixed(3)}
                        </Text>
                      ))}
                      <Text as="p">
                        <Strong>Description:</Strong> {item.details.description}
                      </Text>
                    </Text>
                  </HoverCard.Content>
                </HoverCard.Root>
              ))}
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction={"column"}>
        {/* Toggle Button */}
        <Button
          onClick={toggleOverviewList}
          style={{
            position: "relative",
            top: 0,
            right: 0,
            width: 304,
            borderRadius: 0,
          }}
          variant="surface"
        >
          Overview List{" "}
          {isOverviewListOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </Button>

        {/* DSSide panel */}
        <Box
          className="OverviewListContainer"
          style={{
            flex: "0 0 auto",
            display: isOverviewListOpen ? "block" : "none",
          }}
        >
          <OverviewList filedata={dataset} />
        </Box>
      </Flex>
    </Flex>
  );
};
