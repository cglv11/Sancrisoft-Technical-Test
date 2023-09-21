import React, { createContext, useState } from "react";
import axios from 'axios';

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const rowsPerPage = 10;

    const updateVehicle = async (vehicleData) => {
        try {
            const response = await axios.put(`http://localhost:3000/vehicles/${vehicleData.id}`, vehicleData);
            if (response.status === 200) {
                
                const index = vehicles.findIndex(v => v.id === vehicleData.id);
                if (index !== -1) {
                    const newVehicles = [...vehicles];
                    newVehicles[index] = vehicleData;
                    setVehicles(newVehicles); 
                }
                setSnackbar({ open: true, message: 'Vehicle updated successfully!', severity: 'success' });
                return true;
            }
        } catch (error) {
            setSnackbar({ open: true, message: 'Error updating vehicle.', severity: 'error' });
            console.error('Failed to update vehicle:', error);
            return false;  // Indicate failure
        }
    }

    const getVehicles = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/vehicles?page=${page}`);
            
            const totalCount = response.data.totalCount;
            const totalPages = Math.ceil(totalCount / rowsPerPage);
    
            setTotalPages(totalPages);
            setVehicles(response.data.vehicles);
        } catch (error) {
            console.error("Failed to fetch vehicles", error);
            setError("We're sorry, something went wrong on our end. Please try again later or contact our support team");
        }
        setLoading(false);
    }

    const deleteVehicle = async (vehicleId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/vehicles/${vehicleId}`);
            if (response.status === 200) {

                return true;
            } else {
                console.error('Failed to delete vehicle with id:', vehicleId);
                return false;
            }
        } catch (error) {
            console.error('Error deleting the vehicle:', error);
            return false;
        }
    };

    return (
        <VehicleContext.Provider 
            value={{ 
                vehicles, 
                setVehicles, 
                loading, 
                setLoading, 
                updateVehicle, 
                getVehicles, 
                totalPages,
                deleteVehicle,
                snackbar, setSnackbar
            }}>
            {children}
        </VehicleContext.Provider>
    );
};