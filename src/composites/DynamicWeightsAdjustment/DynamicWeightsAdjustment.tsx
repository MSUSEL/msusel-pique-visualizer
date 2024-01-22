import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material//Typography';
import Box from '@mui/material//Box';

export default function DynamicWeightsAdjustment() {
  const [value, setValue] = useState<number>(30);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography id="input-slider" gutterBottom>
        Availability
      </Typography>
      <Slider
        value={typeof value === 'number' ? value : 0}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        min={0}
        max={100}
      />
      {/* You can add more sliders and inputs here */}
    </Box>
  );
}
