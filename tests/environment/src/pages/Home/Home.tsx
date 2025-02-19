import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Link from '../../components/Link/Link';

function Home() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        color: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ mb: 3 }} variant="h3">
        q5xts
      </Typography>
      <Link to="/sandbox" title="sandbox" />
      <Link to="/colortester" title="color tester" />
      <Link title="github" href="https://github.com/dchicchon/q5xts" />
    </Box>
  );
}
export default Home;
