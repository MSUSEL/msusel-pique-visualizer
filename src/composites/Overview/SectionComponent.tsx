import {
  Flex,
  Text,
  Box,
  Button,
  HoverCard,
  Link,
  Badge,
  Strong,
  ScrollArea,
  Popover,
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
    <Flex direction={"column"} style={{ width: "100%" }}>
      <Flex
        align="center"
        style={{
          width: "100%",
          justifyContent: "center",
          borderTop: "2px solid lightgray",
          marginTop: "0",
          marginBottom: "1rem",
          backgroundColor: "#f0f0f0",
        }}
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

      <Flex direction={"row"} style={{ width: "100%" }} justify="between">
        <Flex
          direction={"column"}
          align={"center"}
          gap={"5"}
          style={{ flexBasis: "30%" }}
        >
          <Box style={{ justifyContent: "center", alignContent: "center" }}>
            <LevelAccordion
              nestedobj={nestedObj}
              isDiagnostics={isDiagnostics}
            />
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
                <Popover.Root key={index}>
                  <Popover.Trigger>
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
                  </Popover.Trigger>
                  <Popover.Content>
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
                          <Strong>Impact:</Strong> {item.weight.toFixed(3)}
                        </Text>
                      ) : null}
                    </Text>
                  </Popover.Content>
                </Popover.Root>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SectionComponent;
