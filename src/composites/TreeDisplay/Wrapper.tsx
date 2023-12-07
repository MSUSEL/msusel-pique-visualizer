import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { TreeDisplay } from "./TreeDisplay";
import { Box } from "@radix-ui/themes";

export const Wrapper = () => {
  const dataset = useAtomValue(State.dataset);

  return (
    <Box width="100%">
      <TreeDisplay fileData={dataset} />
    </Box>
  );
};
