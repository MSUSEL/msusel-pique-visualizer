import { useAtomValue } from "jotai";
import { State } from "../../state";
import { TreeDisplay } from "./TreeDisplay";
import { ListDisplay } from "../ListDisplay/ListDisplay";
import { Box, Tabs } from "@radix-ui/themes";
import { ButtonContainer } from "../FeaturesContainer/ButtonContainer";
import { LegendContainer } from "../LegendContainer/Legend";

export const Wrapper = () => {
  const dataset = useAtomValue(State.dataset);

  return (
    <div>
      {/* button bar */}
      <Box width={"100%"}>
        <ButtonContainer />
      </Box>
      
      {/* Title and Icon Centered */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <img src="https://www.cisa.gov/profiles/cisad8_gov/themes/custom/gesso/dist/images/backgrounds/6fdaa25709d28dfb5cca.svg" alt="CISA Logo" width="100" height="100" style={{ marginRight: '20px' }} />
        <h1>PIQUE Visualizer</h1>
      </div>

      {/* legend - risk level */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <LegendContainer />
      </div>

      {/* layout tabs */}
      <Tabs.Root defaultValue="tree">
        <Tabs.List>
          <Tabs.Trigger value="tree">Tree</Tabs.Trigger>
          <Tabs.Trigger value="list">List</Tabs.Trigger>
   
        </Tabs.List>

        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="tree">
            <Box width="100%">
              <TreeDisplay fileData={dataset} />
            </Box>
          </Tabs.Content>

          <Tabs.Content value="list">
            <Box width="100%">
              <ListDisplay />
            </Box>

          </Tabs.Content>

          <Tabs.Content value="others">

          </Tabs.Content>
        </Box>
      </Tabs.Root>



    </div>
  );
};
