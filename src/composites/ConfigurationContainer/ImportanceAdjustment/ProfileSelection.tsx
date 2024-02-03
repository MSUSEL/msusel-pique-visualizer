import React, { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { Box, Text, Button } from "@radix-ui/themes";
import { Profile } from '../../../types';
import profilesData from "../../../assets/PIQUE_json_files/ExampleProfile.json";

interface ProfileSelectionProps {
  onProfileChange: (selectedProfiles: Profile[] | null) => void;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({ onProfileChange }) => {
  // Use state to manage the dynamically uploaded or customized profiles
  const [selectedProfileType, setSelectedProfileType] = useState<string | null>(null);
  const [uploadedProfiles, setUploadedProfiles] = useState<Profile[]>([]);

  // Function to handle profile selection changes
  const handleProfileChange = (value: string) => {
    setSelectedProfileType(value);
    const filteredProfiles = [...profilesData, ...uploadedProfiles].filter(profile => profile.type === value);
    onProfileChange(filteredProfiles.length > 0 ? filteredProfiles : null);
  };

  // Function to handle file uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const uploadedProfiles: Profile[] = JSON.parse(e.target?.result as string);
          setUploadedProfiles(uploadedProfiles);
          onProfileChange(uploadedProfiles);
        } catch (error) {
          console.error("Error parsing the uploaded file", error);
          onProfileChange(null);
        }
      };
      reader.readAsText(file);
    }
  };

  // Function for custom profile customization
  const handleCustomizeProfile = () => {
    onProfileChange(null); // Placeholder for customization logic
  };

  return (
    <Box>
      <Text>Select a Profile:</Text>
      <Select.Root onValueChange={handleProfileChange}>
        <Select.Trigger aria-label="Profile" />
        <Select.Content>
          {/* Combine profiles from the preloaded data and any uploaded profiles */}
          {[...new Set([...profilesData, ...uploadedProfiles].map(profile => profile.type))].map((type, index) => (
            <Select.Item key={index} value={type}>
              <Select.ItemText>{type}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <input type="file" onChange={handleFileUpload} />
      <Button onClick={handleCustomizeProfile}>Customize Profile</Button>
    </Box>
  );
};
