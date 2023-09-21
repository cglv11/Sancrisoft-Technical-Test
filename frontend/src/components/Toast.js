import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';

const Toast = ({ open, message, onClose }) => (
    <Snackbar
        open={open}
        message={message}
        onClose={onClose}
        autoHideDuration={2000}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}
        
    >
        <SnackbarContent 
            message={message} 
            style={{ marginTop: 70 }} 
        />
    </Snackbar>
);

export default Toast;