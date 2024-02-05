import React, { useState } from 'react';
import { Box, Select, Button, Flex, Text } from "@radix-ui/themes";
import { ChevronDownIcon, UploadIcon, SliderIcon, DropdownMenuIcon } from '@radix-ui/react-icons';
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


    return (
        <Flex direction={'column'}>
            <Flex><Text size={'8'}> Profile Selection</Text></Flex>
            <Flex align={'center'} justify={'between'} gap={'3'} direction={'row'}>
                {/* Select a predefined profile */}
                <Flex direction={'column'} align={'center'} justify={'center'}>
                    <Box>
                        <Text> <DropdownMenuIcon /> Option 1: Select a Predefined Industry Profiles: </Text>
                    </Box>
                    <Box>
                        <Select.Root onValueChange={handleProfileChange} size={'3'} >
                            <Select.Trigger style={{ width: "100px" }} aria-label="Profile" className="SelectTrigger" placeholder="None"> <ChevronDownIcon />
                            </Select.Trigger>
                            <Select.Content className="SelectContent" >
                                {[...new Set([...profilesData, ...uploadedProfiles].map(profile => profile.type))].map((type, index) => (
                                    <Select.Item className="SelectItem" key={index} value={type}>
                                        <Select.Item value={type}>{type}</Select.Item>
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Root>
                    </Box>
                </Flex>

                {/* Upload a self-defined profile */}
                <Flex direction={'column'} align={'center'} justify={'center'}>
                    <Box>  <UploadIcon /> <Text>Option 2: Upload your personal profile</Text></Box>
                    <Box> <input type="file" onChange={handleFileUpload} /> </Box>
                </Flex>

                {/* Custermize profile based on the default setting in the evaluation results */}
                <Flex direction={'column'} align={'center'} justify={'center'}>
                    <Box> <SliderIcon /> <Text>Option 3: Custermize</Text></Box>
                   
                </Flex>


            </Flex>
        </Flex>
    );
};
