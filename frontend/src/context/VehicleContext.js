import React, { createContext, useState } from "react";

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <VehicleContext.Provider value={{ vehicles, setVehicles, loading, setLoading }}>
            {children}
        </VehicleContext.Provider>
    );
};