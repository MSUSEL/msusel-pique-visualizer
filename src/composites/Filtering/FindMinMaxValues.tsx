import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Callout, HoverCard, Dialog, Button, Flex, Text, DropdownMenu, Link, Strong, Em, Heading, Box } from "@radix-ui/themes";
import { MixerHorizontalIcon, CheckCircledIcon, SliderIcon } from "@radix-ui/react-icons";
import * as React from "react";
import * as Slider from '@radix-ui/react-slider';
import '@radix-ui/colors/black-alpha.css';
import '@radix-ui/colors/violet.css';
import '../Style/Slider.css'
import * as Accordion from '@radix-ui/react-accordion';
import * as schema from '../../data/schema';
// Function to find min and max values in the dataset
export const findMinMaxValues = (dataset: schema.base.Schema | undefined): [number, number] => {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    const findValues = (obj: any) => {
        for (const key in obj) {
            if (key === 'diagnostics' || key === 'measures') continue;

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                findValues(obj[key]);
            } else if (key === 'value' && typeof obj[key] === 'number') {
                min = Math.min(min, obj[key]);
                max = Math.max(max, obj[key]);
            }
        }
    };

    if (dataset) {
        findValues(dataset);
    }

    return [min, max];
};
