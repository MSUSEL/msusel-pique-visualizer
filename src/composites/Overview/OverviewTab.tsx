import { useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import * as Schema from "../../data/schema";
import { State } from "../../state";
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
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { OverviewList } from ".";
import "./Overview.css";
import "@radix-ui/colors/mauve.css";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import LevelAccordion from "./LevelAccordion";

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
    if (item.value <= 0.2) {
      riskCounts[0]++;
      riskSubObjNames[0].push(item.name);
    } else if (item.value > 0.2 && item.value <= 0.4) {
      riskCounts[1]++;
      riskSubObjNames[1].push(item.name);
    } else if (item.value > 0.4 && item.value <= 0.6) {
      riskCounts[2]++;
      riskSubObjNames[2].push(item.name);
    } else if (item.value > 0.6 && item.value <= 0.8) {
      riskCounts[3]++;
      riskSubObjNames[3].push(item.name);
    } else if (item.value > 0.8) {
      riskCounts[4]++;
      riskSubObjNames[4].push(item.name);
    }
  }
  return [riskCounts, riskSubObjNames];
}

function classifyDiagnosticsRiskLevel(
  obj: Record<string, FilterableItem>
): [number[], string[][]] {
  const riskCounts = [0, 0, 0, 0, 0];
  const riskSubObjNames: string[][] = [[], [], [], [], []];

  for (const key in obj) {
    const item = obj[key];
    if (item.value < 0.2) {
      riskCounts[4]++;
      riskSubObjNames[4].push(item.name);
    } else if (item.value <= 0.5) {
      riskCounts[3]++;
      riskSubObjNames[3].push(item.name);
    } else if (item.value <= 0.8) {
      riskCounts[2]++;
      riskSubObjNames[2].push(item.name);
    } else if (item.value <= 1.5) {
      riskCounts[1]++;
      riskSubObjNames[1].push(item.name);
    } else {
      riskCounts[0]++;
      riskSubObjNames[0].push(item.name);
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
  const measuresRiskData = useMemo(
    () => (dataset ? classifyNestedObjRiskLevel(dataset.measures) : null),
    [dataset]
  );
  const diagnosticsRiskData = useMemo(
    () => (dataset ? classifyDiagnosticsRiskLevel(dataset.diagnostics) : null),
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
  const measuresChartData = useMemo(
    () => generateChartData(measuresRiskData),
    [measuresRiskData]
  );
  const diagnosticsChartData = useMemo(
    () => generateChartData(diagnosticsRiskData),
    [diagnosticsRiskData]
  );

  // Define colors for each slice of the pie chart
  const COLORS: { [key: string]: string } = {
    Severe: "#f3000d80",
    High: "#ff9c0080",
    Moderate: "#ffee0080",
    Minor: "#008ff580",
    Insignificant: "#00a43380",
  };

  // Get top 3 problematic objects for characteristics, factors, measures, and diagnostics
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

  const topProblematicMeasures = useMemo(() => {
    if (!measuresRiskData || !dataset) return [];

    const [_, riskSubObjNames] = measuresRiskData;
    return riskSubObjNames
      .flat()
      .map((measureName) => {
        const details = dataset.measures[measureName];
        return {
          name: measureName,
          value: details.value,
          details,
        };
      })
      .sort((a, b) => a.value - b.value)
      .slice(0, 3)
      .map(({ name, details }) => {
        const impacts: Impact[] = [];
        Object.entries(dataset.factors.product_factors).forEach(
          ([productFactorName, productFactor]) => {
            if (name in productFactor.weights) {
              impacts.push({
                aspectName: productFactorName,
                weight: productFactor.weights[name],
              });
            }
          }
        );
        return { name, details, impacts };
      });
  }, [measuresRiskData, dataset]);

  const topProblematicDiagnostics = useMemo(() => {
    if (!diagnosticsRiskData || !dataset) return [];

    const [_, riskSubObjNames] = diagnosticsRiskData;
    return riskSubObjNames
      .flat()
      .map((diagnosticsName) => {
        const details = dataset.diagnostics[diagnosticsName];
        return {
          name: diagnosticsName,
          value: details.value,
          details,
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map(({ name, details }) => {
        const impacts: Impact[] = [];
        Object.entries(dataset.measures).forEach(([measureName, measure]) => {
          if (name in measure.weights) {
            impacts.push({
              aspectName: measureName,
              weight: measure.weights[name],
            });
          }
        });
        return { name, details, impacts };
      });
  }, [diagnosticsRiskData, dataset]);

  // filter out risk level counts = 0
  const filteredQualityAspects = qualityAspectsChartData.filter(
    (entry) => entry.Count !== 0
  );
  const filteredProductFactors = productFactorsChartData.filter(
    (entry) => entry.Count !== 0
  );
  const filteredMeasures = measuresChartData.filter(
    (entry) => entry.Count !== 0
  );
  const filteredDiagnostics = diagnosticsChartData.filter(
    (entry) => entry.Count !== 0
  );

  return (
    <Flex direction={"row"} gap={"3"}>
      <Flex
        direction={"column"}
        gap={"3"}
        align={"center"}
        style={{ width: "100%", marginTop: "24px" }}
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
        {/* characteristics */}
        <Flex direction={"row"} style={{ width: "100%" }} justify="between">
          <Flex
            direction={"column"}
            align={"center"}
            gap={"5"}
            style={{ flexBasis: "30%" }}
          >
            <Box>
              {" "}
              <Badge size="2">Characteristics</Badge>{" "}
            </Box>
            <Box>
              <LevelAccordion nestedobj={dataset.factors.quality_aspects}  isDiagnostics={false}/>
            </Box>
          </Flex>

          <Flex
            direction={"column"}
            align={"center"}
            gap={"5"}
            style={{ flexBasis: "30%" }}
          >
            <Box>
              {/* Pie chart visualization */}
              <PieChart width={300} height={300}>
                <Pie
                  data={filteredQualityAspects}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="Count"
                  label
                >
                  {filteredQualityAspects.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
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
              <Text>Top 3 Problematic Quality Characteristics:</Text>
            </Box>
            <Box>
              <Flex direction="column" gap="7" align="start">
                {topProblematicQualityAspects.map((item, index) => (
                  <HoverCard.Root key={index}>
                    <HoverCard.Trigger>
                      <Button
                        onClick={toggleOverviewList}
                        style={{ background: "none" }}
                      >
                        <Text as="p">
                          <Link href="#">
                            {item.name}: <Strong style={{ color: '#0070f3', fontSize: "1.2em" }}>{item.details.value.toFixed(3)}</Strong>
                          </Link>
                        </Text>
                      </Button>
                    </HoverCard.Trigger>
                    <HoverCard.Content>
                      <Text as="div" size="1" style={{ maxWidth: 250 }}>
                        <Text as="p">
                          <Strong>Impact to Measures:</Strong>{" "}
                          {item.weight.toFixed(3)}
                        </Text>
                        <Text as="p">
                          <Strong>Description:</Strong>{" "}
                          {item.details.description}
                        </Text>
                      </Text>
                    </HoverCard.Content>
                  </HoverCard.Root>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Flex>

        <Separator my="3" size="4" />
        {/* factors */}
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
              <LevelAccordion nestedobj={dataset.factors.product_factors}  isDiagnostics={false}/>
            </Box>
          </Flex>

          <Flex
            direction={"column"}
            align={"center"}
            gap={"5"}
            style={{ flexBasis: "30%" }}
          >
            <Box>
              {/* Pie chart visualization */}
              <PieChart width={300} height={300}>
                <Pie
                  data={filteredProductFactors}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="Count"
                  label
                >
                  {filteredProductFactors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
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
              <Text>Top 3 Problematic Factors:</Text>
            </Box>
            <Box>
              <Flex direction="column" gap="7" align="start">
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
                          <Strong>Description:</Strong>{" "}
                          {item.details.description}
                        </Text>
                      </Text>
                    </HoverCard.Content>
                  </HoverCard.Root>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Flex>

        <Separator my="3" size="4" />
        {/* measure */}
        <Flex direction={"row"} style={{ width: "100%" }} justify="between">
          <Flex
            direction={"column"}
            align={"center"}
            gap={"5"}
            style={{ flexBasis: "30%" }}
          >
            <Box>
              {" "}
              <Badge size="2">Measures</Badge>{" "}
            </Box>
            <Box>
              {/* Display risk counts here */}
              <LevelAccordion nestedobj={dataset.measures}  isDiagnostics={false}/>
            </Box>
          </Flex>

          <Flex
            direction={"column"}
            align={"center"}
            gap={"5"}
            style={{ flexBasis: "30%" }}
          >
            <Box>
              {/* Pie chart visualization */}
              <PieChart width={300} height={300}>
                <Pie
                  data={filteredMeasures}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="Count"
                  label
                >
                  {filteredMeasures.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
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
              <Text>Top 3 Problematic Measures:</Text>
            </Box>
            <Box>
              <Flex direction="column" gap="7" align="start">
                {topProblematicMeasures.map((item, index) => (
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
                          <Strong>Impact to corresponding factors:</Strong>
                        </Text>
                        {item.impacts.map((impact, idx) => (
                          <Text as="p" key={idx}>
                            {impact.aspectName}: {impact.weight.toFixed(3)}
                          </Text>
                        ))}
                        <Text as="p">
                          <Strong>Description:</Strong>{" "}
                          {item.details.description}
                        </Text>
                      </Text>
                    </HoverCard.Content>
                  </HoverCard.Root>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Flex>

        <Separator my="3" size="4" />
        {/* diagnostics */}
        <Flex direction={"row"} style={{ width: "100%" }} justify="between">
          <Flex
            direction={"column"}
            align={"center"}
            gap={"5"}
            style={{ flexBasis: "30%" }}
          >
            <Box>
              {" "}
              <Badge size="2">Diagnostics</Badge>{" "}
            </Box>
            <Box>
              {/* Display risk counts here */}
              <LevelAccordion nestedobj={dataset.diagnostics} isDiagnostics={true} />
            </Box>
          </Flex>

          <Flex
            direction={"column"}
            align={"center"}
            gap={"5"}
            style={{ flexBasis: "30%" }}
          >
            <Box>
              {/* Pie chart visualization */}
              <PieChart width={300} height={300}>
                <Pie
                  data={filteredDiagnostics}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="Count"
                  label
                >
                  {filteredDiagnostics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
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
              <Text>Top 3 Problematic Diagnostics:</Text>
            </Box>
            <Box>
              <Flex direction="column" gap="7" align="start">
                {topProblematicDiagnostics.map((item, index) => (
                  <HoverCard.Root key={index}>
                    <HoverCard.Trigger>
                      <Button
                        onClick={toggleOverviewList}
                        style={{ background: "none" }}
                      >
                        <Text as="p">
                          <Link href="#">
                            {/* {item.name}: {item.details.value.toFixed(3)} */}
                            <Stat>
                              <StatLabel>{item.name}</StatLabel>
                              <StatNumber>
                                {item.details.value.toFixed(3)}
                              </StatNumber>
                            </Stat>
                          </Link>
                        </Text>
                      </Button>
                    </HoverCard.Trigger>
                    <HoverCard.Content>
                      <Text as="div" size="1" style={{ maxWidth: 250 }}>
                        <Text as="p">
                          <Strong>Impact to corresponding measures:</Strong>
                        </Text>
                        {item.impacts.map((impact, idx) => (
                          <Text as="p" key={idx}>
                            {impact.aspectName}: {impact.weight.toFixed(3)}
                          </Text>
                        ))}
                        <Text as="p">
                          <Strong>Description:</Strong>{" "}
                          {item.details.description}
                        </Text>
                      </Text>
                    </HoverCard.Content>
                  </HoverCard.Root>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction={"row"} style={{ height: "65vh" }}>
        {/* Toggle Button */}
        <Button onClick={toggleOverviewList} variant="surface">
          {isOverviewListOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
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
