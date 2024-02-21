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
import "./Overview.css";
import "@radix-ui/colors/mauve.css";
import { ClassifyNestedObjRiskLevel } from "./ClassifyNestedObjRiskLevel";
import { COLORS } from "./PieChartColor";
import SectionComponent from "./SectionComponent";

interface FilterableItem {
  value: number;
  weights: Record<string, number>;
  [key: string]: any;
}

interface Impact {
  aspectName: string;
  weight: number;
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
    () =>
      dataset ? ClassifyNestedObjRiskLevel(dataset.factors.tqi, false) : null,
    [dataset]
  );
  const qualityAspectsRiskData = useMemo(
    () =>
      dataset
        ? ClassifyNestedObjRiskLevel(dataset.factors.quality_aspects, false)
        : null,
    [dataset]
  );
  const productFactorsRiskData = useMemo(
    () =>
      dataset
        ? ClassifyNestedObjRiskLevel(dataset.factors.product_factors, false)
        : null,
    [dataset]
  );
  const measuresRiskData = useMemo(
    () =>
      dataset ? ClassifyNestedObjRiskLevel(dataset.measures, false) : null,
    [dataset]
  );
  const diagnosticsRiskData = useMemo(
    () =>
      dataset ? ClassifyNestedObjRiskLevel(dataset.diagnostics, true) : null,
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

  // Get top 3 problematic objects for characteristics, factors, measures, and diagnostics
  // characteristics, factors, measures: smallest value
  // diagnostics: largest value
  // ziyi's note: this part should be sliced as a sub-component, and being imported and called in this file
  const topProblematicQualityAspects = useMemo(() => {
    if (!qualityAspectsRiskData || !dataset) return [];

    const [_, riskSubObjNames] = qualityAspectsRiskData;
    const sortedAndFiltered = riskSubObjNames
      .flat()
      .map((name) => {
        const details = dataset.factors.quality_aspects[name];
        return {
          name,
          value: details.value,
          details,
        };
      })
      .sort((a, b) => a.value - b.value)
      .slice(0, 3);
    return sortedAndFiltered.map(({ name, details }) => {
      const tqiSubObject = Object.values(dataset.factors.tqi)[0];
      const tqiWeights = hasWeights(tqiSubObject) ? tqiSubObject.weights : {};
      const weight = name in tqiWeights ? tqiWeights[name] : 0;

      return { name, details, weight };
    });
  }, [qualityAspectsRiskData, dataset]);

  const topProblematicProductFactors = useMemo(() => {
    if (!productFactorsRiskData || !dataset) return [];

    const [_, riskSubObjNames] = productFactorsRiskData;
    return riskSubObjNames
      .flat()
      .map((productFactorName) => {
        const details = dataset.factors.product_factors[productFactorName];
        return {
          name: productFactorName,
          value: details.value,
          details,
        };
      })
      .sort((a, b) => a.value - b.value)
      .slice(0, 3)
      .map(({ name, details }) => {
        const impacts: Impact[] = [];
        Object.entries(dataset.factors.quality_aspects).forEach(
          ([qualityAspectName, qualityAspect]) => {
            if (name in qualityAspect.weights) {
              impacts.push({
                aspectName: qualityAspectName,
                weight: qualityAspect.weights[name],
              });
            }
          }
        );

        return { name, details, impacts };
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
        <SectionComponent
          title="Characteristics"
          nestedObj={dataset.factors.quality_aspects}
          chartData={filteredQualityAspects}
          colors={COLORS}
          topProblematicItems={topProblematicQualityAspects}
          isDiagnostics={false}
        />

        <Separator my="3" size="4" />
        {/* factors */}
        <SectionComponent
          title="Factors"
          nestedObj={dataset.factors.product_factors}
          chartData={filteredProductFactors}
          colors={COLORS}
          topProblematicItems={topProblematicProductFactors}
          isDiagnostics={false}
        />

        <Separator my="3" size="4" />
        {/* measure */}
        <SectionComponent
          title="Measures"
          nestedObj={dataset.measures}
          chartData={filteredMeasures}
          colors={COLORS}
          topProblematicItems={topProblematicMeasures}
          isDiagnostics={false}
        />

        <Separator my="3" size="4" />
        {/* diagnostics */}
        <SectionComponent
          title="Factors"
          nestedObj={dataset.diagnostics}
          chartData={filteredDiagnostics}
          colors={COLORS}
          topProblematicItems={topProblematicDiagnostics}
          isDiagnostics={true}
        />
      </Flex>

      {/* Ziyi's note: commented out for rn, lets see whether we need this any more 
      <Flex direction={"row"} style={{ height: "65vh" }}>
        
        <Button onClick={toggleOverviewList} variant="surface">
          {isOverviewListOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
        </Button>

       
        <Box
          className="OverviewListContainer"
          style={{
            flex: "0 0 auto",
            display: isOverviewListOpen ? "block" : "none",
          }}
        >
          <OverviewList filedata={dataset} />
        </Box>
      </Flex> */}
    </Flex>
  );
};
