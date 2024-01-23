import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Switch, Flex, HoverCard, Link, Text, Strong  } from "@radix-ui/themes";
import { CaretDownIcon, SwitchIcon } from "@radix-ui/react-icons";
import { HideZeroWeightsSwitch } from "./HideZeroWeightsSwitch";
import React from 'react';
import * as Separator from '@radix-ui/react-separator';
import './Separator.css';

export const QuickActionButton = () => {

  return (

    <Flex gap="3" align="center">
      <div style={{ width: '100%', maxWidth: 300, margin: '0 15px' }}>
        <div className="Text" style={{ fontWeight: 500 }}>
          <Text>
            <HoverCard.Root>
              <HoverCard.Trigger>
                <Link href="#" size='3' style={{margin: '0px', }} > <SwitchIcon /> Quick Actions for Decluttering</Link>
              </HoverCard.Trigger>
              <HoverCard.Content>
                <Text as="div" size="1" style={{ maxWidth: 325 }}>
                  <Strong>Quick Actions</Strong> provides several options that
                  predefined for users to perform quickly for decluttering.
                </Text>
              </HoverCard.Content>
            </HoverCard.Root>
          </Text>
        </div>

        

        <HideZeroWeightsSwitch />



      </div>


      {/*
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            <SwitchIcon />
            Quick Actions for Decluttering
            <CaretDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <HideZeroWeightsSwitch />
          <DropdownMenu.Separator />
          <Text as="label" size="2">
            <Flex gap="2">
              <Switch /> Show Top 5 Problematic Objects
            </Flex>
          </Text>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    */}
    </Flex>
  );
};