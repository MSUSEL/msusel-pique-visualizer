import { useAtomValue } from "jotai";
import { useState } from 'react';
import { State } from "../../state";
import { TreeDisplay } from "./TreeDisplay";
import { ListDisplay } from "../ListDisplay/ListDisplay";
import { NestedListDisplay } from "../ListDisplay/NestedListLayout";
import { TreeDisplayRefactored } from "./TreeDisplayRefactored";
import { Box, IconButton, Tabs, Flex, Heading } from "@radix-ui/themes";
import { ButtonContainer } from "../FeaturesContainer/ButtonContainer";
import { LegendContainer } from "../LegendContainer/Legend";
import { GearIcon, PinLeftIcon, PinRightIcon } from "@radix-ui/react-icons";
import { OverviewTab } from "../FeaturesContainer/OverviewTab";
import { AlternativeOverviewTab } from "../FeaturesContainer/AlternativeOverviewTab";
import { ConfigurationContainer } from "../ConfigurationContainer/ConfigurationContainer";

export const Wrapper = () => {
  const dataset = useAtomValue(State.dataset);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <Flex direction="column" align="center" style={{ overflow: 'hidden', maxHeight: '100vh' }}>

      {/* Title and Icon Centered */}
      <Flex direction={'row'} align={'center'} justify={'center'} gap={'3'}
        style={{ height: '10vh', width: '100%', backgroundColor: '#f9f9f9', marginBottom: '10px', overflowY: 'auto', }}>
        <img src="https://www.cisa.gov/profiles/cisad8_gov/themes/custom/gesso/dist/images/backgrounds/6fdaa25709d28dfb5cca.svg" alt="CISA Logo" width="100" height="100" style={{ marginRight: '20px' }} />
        <Heading>PIQUE Visualizer</Heading>
        <img src="https://raw.githubusercontent.com/MSUSEL/msusel-pique-visualizer/refactorZiyi/src/assets/PIQUE_svg.svg" alt="PIQUE Logo" width="100" height="100" style={{ marginLeft: '20px' }} />
      </Flex>

      {/* Main Content */}
      <Flex 
      direction="row" 
      align="start" 
      justify="center" 
      style={{ 
        height: '90vh', 
        width: '100%', 
        overflow: 'hidden',
       }} 
      gap={'3'}>
        

        {/* Left Side Panel */}
        <Flex 
        direction={'column'} 
        style={{ 
          width: isLeftSidebarOpen ? '20%' : '50px', 
          transition: 'width 0.3s ease-in-out', 
          flexShrink: 0,
          position: 'relative', 
          height: '90vh', 
          }}>
          {/* Sidebar */}
          {isLeftSidebarOpen && (
            <Flex
              style={{
                flexDirection: 'column',
                backgroundColor: '#f0f0f0',
                borderRight: '2px solid #ccc',
                padding: '10px',
                height: '100%', // Make sure sidebar takes full height
                overflowY: 'auto',
              }}
            >
              <IconButton
                onClick={() => setIsLeftSidebarOpen(false)}
                size="3"
                variant="soft"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px', 
                }}
              >
                <PinLeftIcon />
              </IconButton>
              <ButtonContainer />
           
            </Flex>
          )}

          {/* Hover Card Panel */}
          {!isLeftSidebarOpen && (
            <Flex
              style={{
                position: 'absolute',
                left: '10px', 
                top: '15px', 
                cursor: 'pointer',
              }}
              onClick={() => setIsLeftSidebarOpen(true)}
            >
              <IconButton size="3" variant="soft">
                <PinRightIcon />
              </IconButton>
            </Flex>
          )}
        </Flex>


        {/* Middle Majority Content */}
        <Flex 
        direction={'column'} 
        align={'stretch'} 
        justify="between"
        style={{ 
          flexGrow: 1, 
          transition: 'flex-grow 0.3s ease-in-out' ,
          minWidth: 0,
          height: '90vh'
           }}>

          {/* legend - risk level */}
          <Flex direction={'column'} align={'center'} justify={'start'}>
            <LegendContainer />
          </Flex>

          {/* layout tabs */}
          <Tabs.Root defaultValue="alternativeOverview">
            <Tabs.List>
              <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
              <Tabs.Trigger value="alternativeOverview">Alternative Overview</Tabs.Trigger>
              <Tabs.Trigger value="tree">Tree</Tabs.Trigger>
              <Tabs.Trigger value="list">List</Tabs.Trigger>
            </Tabs.List>

            <Box px="4" pt="3" pb="3">
              <Tabs.Content value="overview">
                <Box width="100%">
                  <OverviewTab />
                </Box>
              </Tabs.Content>

              <Tabs.Content value="alternativeOverview">
                <Box width="100%">
                  <AlternativeOverviewTab />
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

        </Flex>


        {/* Right Configuration Bar */}
        <Flex 
        direction="column" 
        style={{ 
          width: isRightSidebarOpen ? '20%' : '50px', 
          height: '90vh', 
          transition: 'width 0.3s ease-in-out', 
          position: 'relative' ,
          flexShrink: 0,
          }}>
          {/* Right Sidebar */}
          {isRightSidebarOpen && (
            <Flex
              style={{
                flexDirection: 'column',
                backgroundColor: '#f0f0f0',
                borderLeft: '2px solid #ccc',
                padding: '10px',
                height: '100%', // Stretch to fill the height
                overflowY: 'auto',
              }}
            >
              {/* Sidebar content */}
              <ConfigurationContainer />
              {/* Close IconButton inside the sidebar for closing it */}
              <IconButton
                size="3"
                variant="soft"
                style={{
                  position: 'absolute',
                  top: '10px', // Adjust as needed
                  right: '10px', // Adjust as needed
                }}
                onClick={() => setIsRightSidebarOpen(false)}
              >
                <GearIcon />
              </IconButton>
            </Flex>
          )}

          {/* GearIcon to open the sidebar, only shown when the sidebar is not open */}
          {!isRightSidebarOpen && (
            <IconButton
              size="3"
              variant="soft"
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px', // Adjust as needed, set to '0px' to align with the right edge of the sidebar
              }}
              onClick={() => setIsRightSidebarOpen(true)} // Open the sidebar
            >
              <GearIcon />
            </IconButton>
          )}
        </Flex>



      </Flex>

    </Flex>
  );
};
