import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


function SortingFilter() {
    return (
        <div className='sorting_filter_container'>
            <h2 className='sorting_filter_container_title'>Sort by:</h2>

            <Box sx={{ maxWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"

                        id="demo-simple-select"
                        // value={age}
                        label="Age"
                    // onChange={handleChange}
                    >
                        {/* <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}

export default SortingFilter;