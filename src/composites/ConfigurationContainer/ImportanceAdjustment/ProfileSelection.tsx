import React, { useState } from "react";
import { Box, Select, Button, Flex, Text, Separator } from "@radix-ui/themes";
import {
  ChevronDownIcon,
  UploadIcon,
  SliderIcon,
  DropdownMenuIcon,
} from "@radix-ui/react-icons";
import { Profile } from "../../../types";
import profilesData from "../../../assets/PIQUE_json_files/ExampleProfile.json";

interface ProfileSelectionProps {
  onProfileChange: (selectedProfiles: Profile[] | null) => void;
  selectedProfile: Profile | Profile[] | null;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({
  onProfileChange,
  selectedProfile,
}) => {
  const selectValue = selectedProfile
    ? Array.isArray(selectedProfile)
      ? selectedProfile[0].type
      : selectedProfile.type
    : "";

  // Function to handle profile selection changes
  const handleProfileChange = (value: string) => {
    const filteredProfiles = profilesData.filter(
      (profile) => profile.type === value
    );
    onProfileChange(filteredProfiles.length > 0 ? filteredProfiles : null);
  };

  // Function to handle file uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const uploadedProfiles: Profile[] = JSON.parse(
            e.target?.result as string
          );
          onProfileChange(uploadedProfiles);
        } catch (error) {
          console.error("Error parsing the uploaded file", error);
          onProfileChange(null);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Flex direction={"column"}>
      <Flex>
        <Text size={"8"}> (Optional) Profile Selection</Text>
      </Flex>
      <Flex align={"center"} justify={"between"} gap={"6"} direction={"row"}>
        <Separator my="3" size="3" />
        <Flex direction={"column"} align={"center"} justify={"start"}>
          <Box>
            <Text>
              {" "}
              <DropdownMenuIcon /> Option 1: Predefined Industry Profiles:{" "}
            </Text>
          </Box>
          <Box>
            <Select.Root
              onValueChange={handleProfileChange}
              value={selectValue}
            >
              <Select.Trigger aria-label="Profile" className="trigger">
                <ChevronDownIcon />
              </Select.Trigger>
              <Select.Content className="content">
                {profilesData.map((profile, index) => (
                  <Select.Item key={index} value={profile.type}>
                    {profile.type}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Box>
        </Flex>

        <Separator orientation="vertical" size={"3"} />

        <Flex direction={"column"} align={"center"} justify={"start"}>
          <Box>
            {" "}
            <UploadIcon /> <Text>Option 2: Personal profile</Text>
          </Box>
          <Box>
            {" "}
            <input type="file" onChange={handleFileUpload} />{" "}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
