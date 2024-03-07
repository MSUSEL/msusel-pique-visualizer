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
  ScrollArea,
} from "@radix-ui/themes";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import "./Overview.css";
import "@radix-ui/colors/mauve.css";
import LevelAccordion from "./LevelAccordion";

interface FilterableItem {
  name: string;
  value: number;
  description: string;
  weights?: Record<string, number>;
}

interface ChartDataItem {
  name: string;
  Count: number;
}

interface Impact {
  aspectName: string;
  weight: number;
}

interface TopProblematicItem {
  name: string;
  details: FilterableItem;
  weight?: number;
  impacts?: Impact[];
}

interface SectionComponentProps {
  title: string;
  nestedObj: Record<string, FilterableItem>;
  chartData: ChartDataItem[];
  colors: Record<string, string>;
  topProblematicItems: TopProblematicItem[];
  isDiagnostics?: boolean;
}

const SectionComponent: React.FC<SectionComponentProps> = ({
  title,
  nestedObj,
  chartData,
  colors,
  topProblematicItems,
  isDiagnostics = false,
}) => {
  return (
    <Flex direction={"row"} style={{ width: "100%" }} justify="between">
      {/* Accordion section */}
      <Flex
        direction={"column"}
        align={"center"}
        gap={"5"}
        style={{ flexBasis: "30%" }}
      >
        <Box>
          <Badge size="2">{title}</Badge>
        </Box>
        <Box>
          <ScrollArea style={{ height: "35vh" }}>
            <LevelAccordion
              nestedobj={nestedObj}
              isDiagnostics={isDiagnostics}
            />
          </ScrollArea>
        </Box>
      </Flex>

      {/* Pie chart section */}
      <Flex
        direction={"column"}
        align={"center"}
        gap={"5"}
        style={{ flexBasis: "30%" }}
      >
        <Box>
          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="Count"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Box>
      </Flex>

      {/* Top problematic items section */}
      <Flex
        direction={"column"}
        align={"center"}
        gap={"5"}
        style={{ flexBasis: "30%" }}
      >
        <Box>
          <Text>Lowest 3 Scores:</Text>
        </Box>
        <Box>
          <Flex direction="column" gap="7" align="start">
            {topProblematicItems.map((item, index) => (
              <HoverCard.Root key={index}>
                <HoverCard.Trigger>
                  <Button style={{ background: "none" }}>
                    <Text as="p">
                      <Link href="#">
                        {item.name}:{" "}
                        <Strong style={{ color: "#0070f3", fontSize: "1.2em" }}>
                          {item.details.value.toFixed(2)}
                        </Strong>
                      </Link>
                    </Text>
                  </Button>
                </HoverCard.Trigger>
                <HoverCard.Content>
                  <Text as="div" size="1" style={{ maxWidth: 250 }}>
                    {item.impacts && item.impacts.length > 0 ? (
                      item.impacts.map((impact, impactIndex) => (
                        <Text as="p" key={impactIndex}>
                          <Strong>Impact to {impact.aspectName}:</Strong>{" "}
                          {impact.weight.toFixed(3)}
                        </Text>
                      ))
                    ) : item.weight !== undefined ? (
                      <Text as="p">
                        <Strong>Impact to TQI:</Strong> {item.weight.toFixed(3)}
                      </Text>
                    ) : null}

                    <Text as="p">
                      <Strong>Description:</Strong>{" "}
                      {item.details.description || "Not Provided"}
                    </Text>
                  </Text>
                </HoverCard.Content>
              </HoverCard.Root>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SectionComponent;
