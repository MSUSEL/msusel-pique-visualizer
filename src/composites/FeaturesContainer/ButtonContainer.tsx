import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Flex } from "@radix-ui/themes";
import { SortButton } from "./SortButton";
import { FilterButton } from "./FilterButton";
import { ResetButton } from "./ResetButton";
import { QuickActionButton } from "./QuickActionButton";
import { DynamicWeightsButton } from "../ConfigurationContainer/DynamicWeightsAdjustSettingWindow";
import * as Separator from '@radix-ui/react-separator';
import "./Separator.css"

export const ButtonContainer = () => {
  const dataset = useAtomValue(State.dataset);

  return (
    // Change Flex direction to 'column' for vertical layout
    <Flex direction="column" gap="3" align="start">
      {/* Quick Actions */}
      
      <QuickActionButton />
      <Separator.Root className="SeparatorRoot" style={{ margin: '15px 0' }} />
       

      {/* Sorting */}
      <SortButton />
      <Separator.Root className="SeparatorRoot" style={{ margin: '15px 0' }} />
       

      {/* Filtering */}
      <FilterButton />
      <Separator.Root className="SeparatorRoot" style={{ margin: '15px 0' }} />
       
      {/* reset */}
      <ResetButton />
      <Separator.Root className="SeparatorRoot" style={{ margin: '15px 0' }} />
       

      {/* descriptive statistics */}
      {/* <DesStatButton /> */}
      {/* <Separator orientation="horizontal" /> */} {/* Changed to horizontal */}

      {/* Others */}
      {/* <HideZeroWeightsSwitch /> */}
      {/* <DynamicWeightsButton /> */}
    </Flex>
  );
};
