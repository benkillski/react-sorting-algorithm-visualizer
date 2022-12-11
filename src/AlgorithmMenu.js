import * as React from 'react';
import { Typography, InputLabel, MenuItem, FormControl, Select, Button, Toolbar, Box, AppBar, Slider } from '@mui/material';

export default function AlgorithmMenu({generateArray, array, selectedAlgorithm, algorithmOptions, setSelectedAlgorithm, sortFunction}) {
  return (
    <React.Fragment>
      <AppBar color="primary" position="relative">
      <Toolbar sx={{my: 2}}>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center" }}>
          <Button onClick={sortFunction} variant="contained" sx={{mx: 10}}>Sort</Button>
          <Button onClick={generateArray} variant="contained" sx={{mx: 10}}>New Array</Button>
          <Box sx={{ mx: 10, minWidth: 150, }}>
            <FormControl fullWidth>
              <InputLabel id="algorithm-picker-label" sx={{ color: "white" }}>Select an Algorithm</InputLabel>
              <Select
                sx={{ color: "white" }}
                labelId="algorithm-picker-label"
                id="algorithm-picker"
                value={selectedAlgorithm}
                label="Algorithm"
                onChange={(event) => {setSelectedAlgorithm(event.target.value)}}
              >
                {algorithmOptions.map((value, idx) => (
                        <MenuItem value={value} key={idx} onClick={() => setSelectedAlgorithm(value)}>{value}</MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Box>
          <Typography sx={{mx: 10, display: "flex", alignItems: "center" }}>Array Size: {array.length}</Typography>
        </Box>
      </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
