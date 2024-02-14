import { useAtomValue } from "jotai";
import { useState } from "react";
import { State } from "../../state";
import { TreeDisplay } from "./TreeDisplay";
import { ListDisplay } from "../ListDisplay/ListDisplay";
import { Box, IconButton, Tabs, Flex, Heading } from "@radix-ui/themes";
import { ButtonContainer } from "../FeaturesContainer/ButtonContainer";
import { LegendContainer } from "../LegendContainer/Legend";

import {
  ViewVerticalIcon,
  BarChartIcon,
  GearIcon,
  HomeIcon,
  PinLeftIcon,
  PinRightIcon,
} from "@radix-ui/react-icons";
import { OverviewTab } from "../FeaturesContainer/Overview/OverviewTab";

// import { AlternativeOverviewTab } from "../FeaturesContainer/AlternativeOverviewTab";
import { ConfigurationContainer } from "../ConfigurationContainer/ConfigurationContainer";

export const Wrapper = () => {
  const dataset = useAtomValue(State.dataset);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // Dynamic width calculations considering the left sub-block can be closed
  const leftWidth = isLeftSidebarOpen ? "20%" : "50px"; // Minimized when closed, allowing for a narrow trigger area
  const middleWidth = (() => {
    // Enhanced calculation for middleWidth based on sidebar states
    if (!isLeftSidebarOpen && !isRightSidebarOpen) {
      return "calc(100% - 50px)"; // Only the middle sub-block is visible, minus the minimal width of the left
    } else if (isLeftSidebarOpen && !isRightSidebarOpen) {
      return "80%"; // Left is open, right is closed
    } else if (!isLeftSidebarOpen && isRightSidebarOpen) {
      return "calc(80% - 50px)"; // Right is open, left is minimized
    }
    return "60%"; // Default case when both sidebars are open
  })();
  const rightWidth = isRightSidebarOpen ? "30%" : "50px"; // Adjusted to keep space for the IconButton when closed

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Title and Icon Centered */}
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          backgroundColor: "#f9f9f9",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
          overflowY: "auto",
        }}
      >
        <img
          src="https://www.cisa.gov/profiles/cisad8_gov/themes/custom/gesso/dist/images/backgrounds/6fdaa25709d28dfb5cca.svg"
          alt="CISA Logo"
          width="100"
          height="100"
          style={{ marginRight: "20px" }}
        />
        <Heading>PIQUE Visualizer</Heading>
        <img
          src="https://raw.githubusercontent.com/MSUSEL/msusel-pique-visualizer/refactorZiyi/src/assets/PIQUE_svg.svg"
          alt="PIQUE Logo"
          width="100"
          height="100"
          style={{ marginLeft: "20px" }}
        />
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          overflowY: "auto",
          height: "100%",
        }}
      >
        {/* Left Side Panel */}
        <Flex
          direction={"column"}
          style={{
            width: leftWidth,
            transition: "width 0.3s ease-in-out",
            flexShrink: 0,
            position: "relative",
            height: "90vh",
          }}
        >
          {/* Sidebar */}
          {isLeftSidebarOpen && (
            <Flex
              style={{
                flexDirection: "column",
                // backgroundColor: "#f0f0f0",
                // borderRight: "2px solid #ccc",
                padding: "10px",
                height: "100%",
                overflowY: "auto",
              }}
            >
              <IconButton
                onClick={() => setIsLeftSidebarOpen(false)}
                size="3"
                variant="soft"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
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
                position: "absolute",
                left: "10px",
                top: "15px",
                cursor: "pointer",
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
          direction={"column"}
          align={"stretch"}
          style={{
            width: middleWidth,
            height: "90vh",
          }}
        >
          {/* Legend - Risk Level: Occupying 10% of the Middle Sub-Block Height */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LegendContainer />
          </div>

          {/* Layout Tabs: Occupying the remaining 90% of the Middle Sub-Block Height */}

          <Tabs.Root defaultValue="overview">
            <Tabs.List>
              <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
              <Tabs.Trigger value="tree">Tree</Tabs.Trigger>
              <Tabs.Trigger value="list">List</Tabs.Trigger>
            </Tabs.List>

            {/* Tab Content with Overflow Handling */}
            <Box
              style={{
                height: "100%", // Ensures the tab content takes full height of its container
                overflow: "auto", // Allows scrolling within the tab content if it exceeds the container's height
              }}
            >
              <Tabs.Content value="overview">
                <Box width="100%">
                  <OverviewTab />
                </Box>
              </Tabs.Content>
              <Tabs.Content value="tree">
                <TreeDisplay fileData={dataset} />
              </Tabs.Content>
              <Tabs.Content value="list">
                <ListDisplay />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Flex>

        {/* Right Configuration Bar */}
        <Flex
          direction="column"
          style={{
            width: isRightSidebarOpen ? rightWidth : "50px",
            transition: "width 0.3s ease-in-out",
            position: "relative",
            flexShrink: 0,
            overflow: "hidden",
            height: "100%",
          }}
        >
          {/* GearIcon to toggle the sidebar */}
          {/* Position to the left when sidebar is open, and keep on the right when closed */}
          <IconButton
            size="3"
            variant="soft"
            style={{
              position: "absolute",
              top: "10px",
              left: isRightSidebarOpen ? "10px" : "10px",
              zIndex: 2,
              transition: "left 0.3s ease-in-out",
            }}
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          >
            <GearIcon />
          </IconButton>

          {/* Right Sidebar Content */}
          {isRightSidebarOpen && (
            <Flex
              style={{
                flexDirection: "column",
                padding: "10px",
                height: "100%",
                overflowY: "auto",
                paddingLeft: "50px", // Adjust this value to match the width of your IconButton
              }}
            >
              {/* Sidebar content */}
              <ConfigurationContainer />
            </Flex>
          )}
        </Flex>
      </div>
    </div>
  );
};
