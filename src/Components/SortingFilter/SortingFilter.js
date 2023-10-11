import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const options = ["None", "Prices", "Date"];



function SortingFilter({ sortBy, handleSortByChange }) {
    return (
        <div className='sorting_filter_container'>
            <h2 className='sorting_filter_container_title'>Sort by:</h2>

            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth >
                    <Select
                        id="demo-simple-select"
                        value={sortBy}
                        label="Age"
                        onChange={handleSortByChange}
                    >

                        {
                            options.map((option, index) => (
                                <MenuItem key={index} value={option.toLowerCase()}>
                                    {option}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}

export default SortingFilter;