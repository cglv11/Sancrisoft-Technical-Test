import React, { useState, useContext } from 'react';
import { Modal, TextField, Button } from '@material-ui/core';
import { VehicleContext } from '../../context/VehicleContext';
import { CircularProgress } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import './EditVehicleModal.css';

function EditVehicleModal({ isOpen, onClose, vehicleData }) {
    const [vehicle, setVehicle] = useState(vehicleData);
    const { updateVehicle } = useContext(VehicleContext);
    const [isLoading, setIsLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVehicle(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
    
        try {
            const updated = await updateVehicle(vehicle);
    
            if (updated) {
                setAlertSeverity('success');
                setSnackbarMessage('Vehicle updated successfully!');
                setOpenSnackbar(true);
                onClose();
            } else {
                throw new Error();
            }
        } catch (error) {
            setAlertSeverity('error');
            setSnackbarMessage('Error updating vehicle. Please try again.');
            setOpenSnackbar(true);
        }
    
        setIsLoading(false);
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="modalContent">
                <h2>Edit Vehicle</h2>
                <div className="fieldsRow">
                    <TextField
                        required
                        label="Year"
                        name="year"
                        value={vehicle.year}
                        onChange={handleInputChange}
                        className="yearField"
                    />
                    <TextField
                        required
                        label="Make"
                        name="make"
                        value={vehicle.make}
                        onChange={handleInputChange}
                        className="makeField"
                    />
                </div>
                <TextField
                    required
                    label="Model"
                    name="model"
                    value={vehicle.model}
                    onChange={handleInputChange}
                    className="modelField"
                />
                <div className="buttonsRow">
                    <Button 
                        onClick={onClose} 
                        variant="outlined" 
                        disabled={isLoading}  // Disable when loading
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained" 
                        color="primary" 
                        disabled={isLoading}  // Disable when loading
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Update"}
                    </Button>
                </div>
                <Snackbar 
                    open={openSnackbar} 
                    autoHideDuration={6000} 
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                <Alert onClose={() => setOpenSnackbar(false)} severity={alertSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            </div>
        </Modal>
    );
}

export default EditVehicleModal;
