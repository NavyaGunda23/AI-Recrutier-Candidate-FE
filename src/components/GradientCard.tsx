import React from 'react';
import { Card, CardContent, Box } from '@mui/material';

interface GradientCardProps {
  gradient: string;
  children: React.ReactNode;
  sx?: object;
  childLayout?:object
  onClick?:() => void
}

const GradientCard: React.FC<GradientCardProps> = ({ gradient, children, sx,childLayout,onClick}) => (
  <Card
    sx={{
      background: gradient,
      color: '#fff',
      borderRadius: 3,
      boxShadow: 3,
      ...sx,
    }}
    onClick={onClick}
  >
    <CardContent>
      <Box sx={{...childLayout}}>{children}</Box>
    </CardContent>
  </Card>
);

export default GradientCard;