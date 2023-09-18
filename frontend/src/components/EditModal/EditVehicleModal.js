import React, { useState, useContext } from 'react';
import { Modal, TextField, Button } from '@material-ui/core';
import { VehicleContext } from '../../context/VehicleContext';
import { CircularProgress } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import './EditVehicleModal.css';

const useStyles = makeStyles({
    underline: {
      "&&&:before": {
        borderBottomColor: "#00000"
      },
      "&&:after": {
        borderBottomColor: "#2297C5"
      }
    },
    colorLabel: {     
        "&.Mui-focused": {
            color: "#2297C5"
          }
    }
  });

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
    const classes = useStyles();

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
                        variant="filled"
                        InputProps={ {classes} }
                        InputLabelProps={{ className: classes.colorLabel }}
                    />
                    <TextField
                        required
                        label="Make"
                        name="make"
                        value={vehicle.make}
                        onChange={handleInputChange}
                        className="makeField"
                        variant="filled"
                        InputProps={{ classes }}
                        InputLabelProps={{ className: classes.colorLabel }}
                    />
                </div>
                <TextField
                    required
                    label="Model"
                    name="model"
                    value={vehicle.model}
                    onChange={handleInputChange}
                    variant="filled"
                    InputProps={{ classes }}
                    InputLabelProps={{ className: classes.colorLabel }}
                />
                <div className="buttonsRow">
                    <Button 
                        onClick={onClose}
                        size="large"
                        variant="outlined"
                        style={{
                            backgroundColor: '#536C79',  // Replace with your desired color
                            color: 'white',  // Text color, you can change it if you want
                            textTransform: 'none'
                        }}
                        disabled={isLoading}  // Disable when loading
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained" 
                        size="large"
                        style={{
                            backgroundColor: '#2297C5',  // Replace with your desired color
                            color: 'white',  // Text color, you can change it if you want
                            textTransform: 'none'
                        }}
                        disabled={isLoading}  // Disable when loading
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Confirm"}
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
