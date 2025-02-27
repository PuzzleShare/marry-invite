import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function FloatingActionButtonSize() {
    return (
        <Fab
            color="secondary"
            aria-label="add"
            sx = {{
                width: '80px',
                height: '80px',
                position: 'absolute',
                bottom: 80,
                right: 50,
            }}
        >
            <AddIcon sx = {{
                width: '50%',
                height: '50%',
            }}/>
        </Fab>
    );
}