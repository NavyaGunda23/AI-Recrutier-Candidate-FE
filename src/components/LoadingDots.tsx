import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

const FullScreenLoaderOverlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, #F4F2EE 0%, #F4F2EE 100%)', // Semi-transparent dark background
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999, // Ensure it's on top of everything
});

const LoadingDots: React.FC = () => {
  return (
    <FullScreenLoaderOverlay>
      {/* You can replace CircularProgress with a custom loading dots animation */}
      {/* <CircularProgress sx={{ color: '#a084e8' }} /> */}
      {/* Example of simple text dots (can be animated with CSS) */}
       <Typography variant="h5" sx={{ color: '#000', ml: 2 }}>Loading...</Typography>
    </FullScreenLoaderOverlay>
  );
};

export default LoadingDots; 