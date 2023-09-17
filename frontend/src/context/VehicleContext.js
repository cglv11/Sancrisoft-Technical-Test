import React, { createContext, useState } from "react";
import axios from 'axios';

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);

    const updateVehicle = async (vehicleData) => {
        try {
            const response = await axios.put(`http://localhost:3000/vehicles/${vehicleData.id}`, vehicleData);
            if (response.status === 200) {
                // Find the index of the updated vehicle
                const index = vehicles.findIndex(v => v.id === vehicleData.id);
                if (index !== -1) {
                    const newVehicles = [...vehicles];
                    newVehicles[index] = vehicleData; // Update the vehicle in the array
                    setVehicles(newVehicles); // Update the state with the new array
                }
                return true;
            }
        } catch (error) {
            console.error('Failed to update vehicle:', error);
            return false;  // Indicate failure
        }
    }

    return (
        <VehicleContext.Provider value={{ vehicles, setVehicles, loading, setLoading, updateVehicle }}>
            {children}
        </VehicleContext.Provider>
    );
};