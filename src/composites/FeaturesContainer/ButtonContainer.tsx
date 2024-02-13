import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Flex, Box } from "@radix-ui/themes";
import * as Tabs from "@radix-ui/react-tabs";
import { SortButton } from "./SortButton";
import { FilterButton } from "./FilterButton";
import { ResetButton } from "./ResetButton";
import { QuickActionButton } from "./QuickActionButton";
import {
  MagicWandIcon,
  CaretSortIcon,
  MixerHorizontalIcon,
  ResetIcon,
} from "@radix-ui/react-icons";
import * as Separator from "@radix-ui/react-separator";
import "../Style/Slider.css";
import "../Style/Tab.css";

export const ButtonContainer = () => {

  return (
    // Change Flex direction to 'column' for vertical layout
    <Flex direction="column" gap="3" align="start">
      <Tabs.Root className="TabsRoot" defaultValue="quick">
        <Tabs.List className="TabsList">
          <Tabs.Trigger value="quick" className="TabsTrigger">
            {" "}
            <MagicWandIcon />{" "}
          </Tabs.Trigger>
          <Tabs.Trigger value="sort" className="TabsTrigger">
            <CaretSortIcon />
            Sort
          </Tabs.Trigger>
          <Tabs.Trigger value="filter" className="TabsTrigger">
            <MixerHorizontalIcon />
            Filter
          </Tabs.Trigger>
          <Tabs.Trigger value="reset" className="TabsTrigger">
            {" "}
            <ResetIcon />{" "}
          </Tabs.Trigger>
        </Tabs.List>

        {/* Quick Actions */}

        <Flex>
          <Tabs.Content value="quick" className="TabsContent">
            <Box width="100%">
              <QuickActionButton />
            </Box>
          </Tabs.Content>

          {/* Sort */}
          <Tabs.Content value="sort" className="TabsContent">
            <Box width="100%">
              <SortButton />
            </Box>
          </Tabs.Content>

          {/* Filter */}
          <Tabs.Content value="filter" className="TabsContent">
            <Box width="100%">
              <FilterButton />
            </Box>
          </Tabs.Content>

          {/* Reset */}
          <Tabs.Content value="reset" className="TabsContent">
            <Box width="100%">
              <ResetButton />
            </Box>
          </Tabs.Content>
        </Flex>
      </Tabs.Root>
    </Flex>
  );
};
