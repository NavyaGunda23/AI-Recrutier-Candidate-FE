import React from 'react';
import { Box, Typography } from '@mui/material';

interface StatWidgetProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

const StatWidget: React.FC<StatWidgetProps> = ({ icon, label, value, color }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Box sx={{ color, fontSize: 36 }}>{icon}</Box>
    <Box>
      <Typography variant="h6" fontWeight={700}>{value}</Typography>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
  </Box>
);

export default StatWidget;