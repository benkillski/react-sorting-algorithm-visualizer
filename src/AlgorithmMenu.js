import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function AlgorithmMenu({generateArray, array, selectedAlgorithm, algorithmOptions, setSelectedAlgorithm, sortFunction}) {
  return (
    <React.Fragment>
      <AppBar color="primary" position="relative">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center" }}>
          <Button onClick={sortFunction} variant="contained" sx={{mx: 10}}>Sort</Button>
          <Button onClick={generateArray} variant="contained" sx={{mx: 10}}>New Array</Button>
          <Typography sx={{mx: 10}}>Algorithm: {selectedAlgorithm}</Typography>
          <Typography sx={{mx: 10}}>Array Size: {array.length}</Typography>
        </Box>
      </Toolbar>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center" }}>
          {algorithmOptions.map((value, idx) => (
                      <Button variant="contained" key={idx} onClick={() => setSelectedAlgorithm(value)}>{value}</Button>
                  ))}
        </Box>
      </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
