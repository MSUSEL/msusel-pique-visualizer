import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { TreeDisplay } from "./TreeDisplay";
import { Box} from "@radix-ui/themes";
import {ButtonContainer} from "../FeaturesContainer/ButtonContainer"

export const Wrapper = () => {
  const dataset = useAtomValue(State.dataset);

  return (
    <div>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img src="https://www.cisa.gov/profiles/cisad8_gov/themes/custom/gesso/dist/images/backgrounds/6fdaa25709d28dfb5cca.svg" alt="CISA Logo" width="100" height="100" style={{ marginRight: '20px' }} />
        <h1>PIQUE Visualizer</h1>
      </div>

      <Box width={"100%"}>
        <ButtonContainer />
      </Box>


      <Box width="100%">
        <TreeDisplay fileData={dataset} />
      </Box>
    </div>
  );
};
