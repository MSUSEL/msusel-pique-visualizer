import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Separator, Flex } from "@radix-ui/themes";
import { SortButton } from "./SortButton";
import { FilterButton } from "./FilterButton";
import { ResetButton } from "./ResetButton";
import { QuickActionButton } from "./QuickActionButton";
import { DynamicWeightsButton } from "./DynamicWeightsAdjustSettingWindow";

export const ButtonContainer = () => {
  const dataset = useAtomValue(State.dataset);

  return (
    // Change Flex direction to 'column' for vertical layout
    <Flex direction="column" gap="3" align="start">
      {/* Quick Actions */}
      <QuickActionButton />
      <Separator orientation="horizontal" /> 

      {/* Sorting */}
      <SortButton />
      <Separator orientation="horizontal" /> 

      {/* Filtering */}
      <FilterButton />
      <Separator orientation="horizontal" /> 

      {/* reset */}
      <ResetButton />
      <Separator orientation="horizontal" /> 

      {/* descriptive statistics */}
      {/* <DesStatButton /> */}
      {/* <Separator orientation="horizontal" /> */} {/* Changed to horizontal */}

      {/* Others */}
      {/* <HideZeroWeightsSwitch /> */}
      <DynamicWeightsButton />
    </Flex>
  );
};
