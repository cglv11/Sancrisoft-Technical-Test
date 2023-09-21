import React from "react";
import VehiclesTable from './components/VehiclesTable/VehiclesTable';
import VehicleDetails from './components/VehicleDetails/VehicleDetails';
import { VehicleProvider } from './context/VehicleContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <VehicleProvider>
                <Routes>
                    <Route path="/vehicles/:id" element={<VehicleDetails />} />
                    <Route path="*" element={<VehiclesTable />} /> {/* catch-all route */}
                </Routes>
            </VehicleProvider>
        </Router>
    );
}

export default App;