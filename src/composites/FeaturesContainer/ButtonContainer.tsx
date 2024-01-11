import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Separator, Flex } from "@radix-ui/themes";
import { SortButton} from "./SortButton";
import { FilterButton } from "./FilterButton";
import { ResetButton } from "./ResetButton";
import { DesStatButton } from "./DescriptiveStatisticButton";
import { QuickActionButton } from "./QuickActionButton";
import { HideZeroWeightsSwitch } from "./HideZeroWeightsSwitch";


export const ButtonContainer = () => {
  const dataset = useAtomValue(State.dataset);

  return (
      <Flex gap="3" align="center">

        {/* Quick Actions */}
        <QuickActionButton />
        <Separator orientation="vertical" />

        {/* Sorting */}
        <SortButton />
        <Separator orientation="vertical" />

        {/* Filtering */}
        <FilterButton />

        <Separator orientation="vertical" />
        {/* reset */}
        <ResetButton />

        <Separator orientation="vertical" />
        {/*  descriptive statisitcs*/}
        <DesStatButton />
        <Separator orientation="vertical" />

        {/* Others */}
        <HideZeroWeightsSwitch/>
        
      </Flex>




  );
};