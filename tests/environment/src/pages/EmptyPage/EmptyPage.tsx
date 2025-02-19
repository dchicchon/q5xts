import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '../../components/Link/Link';

function EmptyPage() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4">404 not found</Typography>
      <Link to="/" title="Back Home" />
    </Box>
  );
}

export default EmptyPage;
