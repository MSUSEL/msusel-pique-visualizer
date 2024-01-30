import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Flex, Tabs, Box } from "@radix-ui/themes";
import { SortButton } from "./SortButton";
import { FilterButton } from "./FilterButton";
import { ResetButton } from "./ResetButton";
import { QuickActionButton } from "./QuickActionButton";
import { MagicWandIcon, CaretSortIcon, MixerHorizontalIcon, ResetIcon } from "@radix-ui/react-icons";
import * as Separator from '@radix-ui/react-separator';
import "./Separator.css"

export const ButtonContainer = () => {
  const dataset = useAtomValue(State.dataset);

  return (
    // Change Flex direction to 'column' for vertical layout
    <Flex direction="column" gap="3" align="start" >

      <Tabs.Root defaultValue="quick">
        <Tabs.List>
          <Tabs.Trigger value="quick"> <MagicWandIcon /> </Tabs.Trigger>
          <Tabs.Trigger value="sort"><CaretSortIcon />Sort</Tabs.Trigger>
          <Tabs.Trigger value="filter"><MixerHorizontalIcon />Filter</Tabs.Trigger>
          <Tabs.Trigger value="reset"> <ResetIcon /> </Tabs.Trigger>
        </Tabs.List>

        {/* Quick Actions */}

        <Flex>
          <Tabs.Content value="quick">
            <Box width="100%">
              <QuickActionButton />
            </Box>
          </Tabs.Content>

          {/* Sort */}
          <Tabs.Content value="sort">
            <Box width="100%">
              <SortButton />
            </Box>
          </Tabs.Content>

          {/* Filter */}
          <Tabs.Content value="filter">
            <Box width="100%">
              <FilterButton />
            </Box>
          </Tabs.Content>

          {/* Reset */}
          <Tabs.Content value="reset">
            <Box width="100%">
              <ResetButton />
            </Box>
          </Tabs.Content>
        </Flex>
      </Tabs.Root>



    </Flex>
  );
};
