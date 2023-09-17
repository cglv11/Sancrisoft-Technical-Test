import React from "react";
import VehiclesTable from './components/VehiclesTable/VehiclesTable';
import { VehicleProvider } from './context/VehicleContext';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
      <Router>
        <VehicleProvider>
            <VehiclesTable />
        </VehicleProvider>
      </Router>
    );
}

export default App;