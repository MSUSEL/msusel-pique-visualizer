import * as Accordion from '@radix-ui/react-accordion';

import { styled } from '@stitches/react';

// Styled components to differentiate between different levels
export const StyledTrigger = styled(Accordion.Trigger, {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: '5px 0',
    '&[data-state="closed"]': { backgroundColor: '#e0e0e0' },
    '&[data-state="open"]': { backgroundColor: '#d0d0d0' },
});

export const StyledContent = styled(Accordion.Content, {

    padding: '0 20px',
    borderBottom: '1px solid #e0e0e0',
    marginLeft: '20px',
});

export const StyledItem = styled('div', {
    padding: '4px 0',
});