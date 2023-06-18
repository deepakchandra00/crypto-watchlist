import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function SearchBox(props) {
  return (
    <Paper
      component="form"
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="(i.e. bitcoin, ethereum, ripple, etc)"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={props?.handleChange}
              value={props?.value}
      />

<IconButton onClick={props?.handleSearch} type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}