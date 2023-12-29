import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Box, Tabs } from "@radix-ui/themes";

export const ListDisplay = () => {
  const dataset = useAtomValue(State.dataset);

  return (
    <div>
      <p>LIST LAYOUT IN PROGRESS</p>
    </div>
  );
};
