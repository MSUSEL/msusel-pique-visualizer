import { useAtomValue } from "jotai";
import { useState } from 'react';
import { State } from "../../state";
import { TreeDisplay } from "./TreeDisplay";
import { ListDisplay } from "../ListDisplay/ListDisplay";
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

  // Dynamic width calculations considering the left sub-block can be closed
  const leftWidth = isLeftSidebarOpen ? '20%' : '50px'; // Minimized when closed, allowing for a narrow trigger area
  const middleWidth = (() => { // Enhanced calculation for middleWidth based on sidebar states
    if (!isLeftSidebarOpen && !isRightSidebarOpen) {
      return 'calc(100% - 50px)'; // Only the middle sub-block is visible, minus the minimal width of the left
    } else if (isLeftSidebarOpen && !isRightSidebarOpen) {
      return '80%'; // Left is open, right is closed
    } else if (!isLeftSidebarOpen && isRightSidebarOpen) {
      return 'calc(80% - 50px)'; // Right is open, left is minimized
    }
    return '60%'; // Default case when both sidebars are open
  })();
  const rightWidth = isRightSidebarOpen ? '20%' : '50px'; // Adjusted to keep space for the IconButton when closed


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
            width: leftWidth,
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
                height: '100%',
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
          style={{
            flexGrow: 1,
            minWidth: '10%',
            height: '90vh', // Ensure this is the total height of the middle sub-block
          }}>

          {/* Legend - Risk Level: Occupying 10% of the Middle Sub-Block Height */}
          <Flex
            direction={'column'}
            align={'center'}
            justify={'start'}
            style={{
              height: '5%', // Adjusted for 10% of the middle sub-block height
            }}>
            <LegendContainer />
          </Flex>

          {/* Layout Tabs: Occupying the remaining 90% of the Middle Sub-Block Height */}
          <Flex
            direction={'column'}
            align={'start'}
            justify={'between'}
            style={{
              height: '95%', // Adjusted for 90% of the middle sub-block height
              overflow: 'hidden', // Prevents overflow outside the container
            }}>
            <Tabs.Root defaultValue="alternativeOverview">
              <Tabs.List>
                <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                <Tabs.Trigger value="alternativeOverview">Alternative Overview</Tabs.Trigger>
                <Tabs.Trigger value="tree">Tree</Tabs.Trigger>
                <Tabs.Trigger value="list">List</Tabs.Trigger>
              </Tabs.List>

              {/* Tab Content with Overflow Handling */}
              <Box
                style={{
                  height: '100%', // Ensures the tab content takes full height of its container
                  overflow: 'auto', // Allows scrolling within the tab content if it exceeds the container's height
                }}
              >
                <Tabs.Content value="overview"><OverviewTab /></Tabs.Content>
                <Tabs.Content value="alternativeOverview"><AlternativeOverviewTab /></Tabs.Content>
                <Tabs.Content value="tree"><TreeDisplay fileData={dataset} /></Tabs.Content>
                <Tabs.Content value="list"><ListDisplay /></Tabs.Content>
              </Box>
            </Tabs.Root>
          </Flex>
        </Flex>



        {/* Right Configuration Bar */}
        <Flex
          direction="column"
          style={{
            width: isRightSidebarOpen ? rightWidth : '50px', // Width when sidebar is closed should just be the icon's space
            transition: 'width 0.3s ease-in-out',
            position: 'relative',
            flexShrink: 0,
            overflow: 'hidden', // This will hide the sidebar content when its width is decreased
            height: '100%',
          }}>

          {/* Right Sidebar Content */}
          {isRightSidebarOpen && (
            <Flex
              style={{
                flexDirection: 'column',
                padding: '10px',
                height: '100%',
                overflowY: 'auto',
              }}
            >
              {/* Sidebar content */}
              <ConfigurationContainer />
            </Flex>
          )}

          {/* GearIcon to toggle the sidebar */}
          {/* Adjust the positioning so it's always visible */}
          <IconButton
            size="3"
            variant="soft"
            style={{
              position: 'absolute',
              top: '10px',
              right: isRightSidebarOpen ? '10px' : '10px', 
              zIndex: 1, 
              transition: 'right 0.3s ease-in-out',
            }}
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          >
            <GearIcon />
          </IconButton>
        </Flex>




      </Flex>

    </Flex>
  );
};
