import React from "react";
import VehiclesTable from './components/VehiclesTable/VehiclesTable';
import { VehicleProvider } from './context/VehicleContext';

function App() {
    return (
        <VehicleProvider>
            <VehiclesTable />
        </VehicleProvider>
    );
}

export default App;