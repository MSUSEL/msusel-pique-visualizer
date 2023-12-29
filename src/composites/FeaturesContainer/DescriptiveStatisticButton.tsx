import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Button, IconButton, Flex } from "@radix-ui/themes";
import { BarChartIcon} from "@radix-ui/react-icons";

export const DesStatButton = () => {
  const dataset = useAtomValue(State.dataset);

  return (

    <Flex gap="3" align="center">
      <Button  size="2" variant="soft" highContrast>
        <BarChartIcon width="18" height="18" /> Desctiptive Statisitcs
      </Button>


    </Flex>




  );
};