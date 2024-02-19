import * as Accordion from '@radix-ui/react-accordion';

import { styled } from '@stitches/react';

// Styled components to differentiate between different levels
export const StyledTrigger = styled(Accordion.Trigger, {
    backgroundColor: 'white',
    padding: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: '0px 0',
    '&[data-state="closed"]': { backgroundColor: 'white' },
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