import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface ResponsiveChartProps {
  children: React.ReactNode;
  height?:string
}

const ResponsiveChart: React.FC<ResponsiveChartProps> = ({ children ,height=180}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box sx={{ width: '100%', height: isSm ? 220 : height }}>
      {children}
    </Box>
  );
};

export default ResponsiveChart;