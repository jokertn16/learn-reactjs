import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ProductFilter(props) {
    const [selectYear, setSelectYear] = React.useState('');

    const handleChange = (event) => {
        setSelectYear(event.target.value);
        props.onGetYearFilter(event.target.value);
    };

    return (
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Box sx={{ minWidth: 120, backgroundColor: '#4b4b4b', borderRadius: '12px' }}>
                <FormControl fullWidth>
                    <InputLabel id="select-year-label" sx={{color: 'white', fontWeight: 'bold'}}>
                        Year
                    </InputLabel>
                    <Select
                        labelId="select-year-label"
                        id="select-year"
                        value={selectYear}
                        label="Year"
                        onChange={handleChange}
                    >
                        <MenuItem value={2022}>2022</MenuItem>
                        <MenuItem value={2023}>2023</MenuItem>
                        <MenuItem value={2024}>2024</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}