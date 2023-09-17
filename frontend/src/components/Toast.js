import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';

const Toast = ({ open, message, onClose }) => (
    <Snackbar
        open={open}
        message={message}
        onClose={onClose}
        autoHideDuration={4000}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}
        
    >
        <SnackbarContent 
            message={message} 
            style={{ marginTop: 30 }} 
        />
    </Snackbar>
);

export default Toast;