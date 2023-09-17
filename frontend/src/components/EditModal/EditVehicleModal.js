import React, { useState, useContext } from 'react';
import { Modal, TextField, Button } from '@material-ui/core';
import { VehicleContext } from '../../context/VehicleContext';
import './EditVehicleModal.css';

function EditVehicleModal({ isOpen, onClose, vehicleData }) {
    const [vehicle, setVehicle] = useState(vehicleData);
    const { updateVehicle } = useContext(VehicleContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVehicle(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        // Call the updateVehicle function from context
        const updated = await updateVehicle(vehicle);
        if (updated) {
            onClose();
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="modalContent">
                <h2>Edit Vehicle</h2>
                <TextField
                    required
                    label="Year"
                    name="year"
                    value={vehicle.year}
                    onChange={handleInputChange}
                />
                {/* Add other fields similarly */}
                <Button onClick={handleSubmit}>Update</Button>
            </div>
        </Modal>
    );
}

export default EditVehicleModal;
