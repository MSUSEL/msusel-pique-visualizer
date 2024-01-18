import { useAtomValue } from "jotai";
import React, { useState } from 'react';
import { State } from "../../state";
import { TreeDisplay } from "./TreeDisplay";
import { ListDisplay } from "../ListDisplay/ListDisplay";
import { NestedListDisplay } from "../ListDisplay/NestedListLayout";
import { TreeDisplayRefactored } from "./TreeDisplayRefactored";
import { Box, Button, Tabs } from "@radix-ui/themes";
import { ButtonContainer } from "../FeaturesContainer/ButtonContainer";
import { LegendContainer } from "../LegendContainer/Legend";
import { ViewVerticalIcon, BarChartIcon, HomeIcon, PinLeftIcon, PinRightIcon } from "@radix-ui/react-icons";
import { OverviewTab } from "../FeaturesContainer/OverviewTab";
import { styled } from '@stitches/react';


export const Wrapper = () => {
  const dataset = useAtomValue(State.dataset);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const HoverCard = styled('div', {
    // Base styles
    position: 'fixed',
    left: '10px',
    top: '10%',
    cursor: 'pointer',

    // Variants for display
    variants: {
      display: {
        none: {
          display: 'none',
        },
        flex: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
  });


  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>

      {/* Sidebar */}
      <div style={{
        flexDirection: 'column',
        backgroundColor: '#f0f0f0',
        borderRight: '2px solid #ccc',
        padding: '10px',
        width: isSidebarOpen ? '300px' : '0px',
        transition: 'width 0.3s ease-in-out',
        overflowY: 'auto',
        display: isSidebarOpen ? 'flex' : 'none',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'relative',
          height: '50px',
        }}>

          <Button onClick={() => setIsSidebarOpen(false)} >
            <PinLeftIcon />
          </Button>
        </div>
        <HomeIcon />
        <ButtonContainer />
      </div>


      {/* Hover Card */}
      <HoverCard display={isSidebarOpen ? 'none' : 'flex'} onClick={() => setIsSidebarOpen(true)}>
        <Button>
          <PinRightIcon />
        </Button>

      </HoverCard>

      <div style={{ flexGrow: 1 }}>
        {/* Title and Icon Centered */}
        <div style={{
          display: 'flex',
          flexGrow: 1,
          backgroundColor: '#f9f9f9',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          overflowY: 'auto',
        }}>
          <img src="https://www.cisa.gov/profiles/cisad8_gov/themes/custom/gesso/dist/images/backgrounds/6fdaa25709d28dfb5cca.svg" alt="CISA Logo" width="100" height="100" style={{ marginRight: '20px' }} />
          <h1>PIQUE Visualizer</h1>
          <img src="https://raw.githubusercontent.com/MSUSEL/msusel-pique-visualizer/refactorZiyi/src/assets/PIQUE_svg.svg" alt="PIQUE Logo" width="100" height="100" style={{ marginLeft: '20px' }} />
        </div>

        {/* legend - risk level */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LegendContainer />
        </div>

        {/* layout tabs */}
        <Tabs.Root defaultValue="overview">
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="tree">Tree</Tabs.Trigger>
            <Tabs.Trigger value="list">List</Tabs.Trigger>
            


          </Tabs.List>

          <Box px="4" pt="3" pb="3">
            <Tabs.Content value="overview">
              <Box width="100%">
                <OverviewTab />
              </Box>
            </Tabs.Content>

            <Tabs.Content value="tree">
              <Box width="100%">
                <TreeDisplay fileData={dataset} />
              </Box>
            </Tabs.Content>

            <Tabs.Content value="treeRefactored">
              <Box width="100%">
                <TreeDisplayRefactored />
              </Box>
            </Tabs.Content>

            <Tabs.Content value="list">
              <Box width="100%">
                <ListDisplay />
              </Box>
            </Tabs.Content>

            <Tabs.Content value="nestedList">
              <Box width="100%">
                <NestedListDisplay />
              </Box>
            </Tabs.Content>

          </Box>
        </Tabs.Root>

      </div>

    </div>
  );
};
