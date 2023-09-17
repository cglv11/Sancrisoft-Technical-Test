import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Avatar, TableContainer, Button } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Pagination from '@material-ui/lab/Pagination';
import { VehicleContext } from "../../context/VehicleContext";
import EditVehicleModal from "../EditModal/EditVehicleModal";
import "./VehiclesTable.css";
import Toast from '../Toast';
import { useLocation } from 'react-router-dom';


const VehiclesTable = () => {
    const { vehicles, setVehicles, loading, setLoading } = useContext(VehicleContext);
    const [error, setError] = useState();

    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialPage = searchParams.get('page') || 1;
    const [page, setPage] = useState(initialPage);


    const handleEditClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setSelectedVehicle(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/vehicles?page=${page}`);
                console.log(response)
                setVehicles(response.data);
            } catch (error) {
                console.error("Failed to fetch vehicles", error);
                setError("We're sorry, something went wrong on our end. Please try again later or contact our support team"); // You'll need to add a useState for this error message.
            }
            setLoading(false);
        };

        /* const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3000/vehicles");
                console.log(response.data);
                
                // Introduce artificial delay of 5 seconds
                setTimeout(() => {
                    setVehicles(response.data);
                    setLoading(false);
                }, 5000);
                
            } catch (error) {
                console.error("Failed to fetch vehicles", error);
                setLoading(false);  // Ensure loading state is set to false even on error
            }
        } */;
    
        fetchData();
    }, [setVehicles, setLoading, page]);

    return (
        <div className="flexContainer">
            <Paper className="tablePaper">
                <TableContainer className="customTableContainer">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="truncate">Image</TableCell>
                                <TableCell className="truncate">#</TableCell>
                                <TableCell className="truncate">Year</TableCell>
                                <TableCell className="truncate">Make</TableCell>
                                <TableCell className="truncate">Model</TableCell>
                                {/* Add more table cells if needed */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                (vehicles.length === 0)
                                ?   <TableRow><TableCell colSpan={4}>No vehicles found.</TableCell></TableRow>
                                    :   vehicles.map(vehicle => (
                                            <TableRow key={vehicle.id}>
                                                <TableCell className="truncate">
                                                {
                                                    loading 
                                                    ?
                                                    (
                                                        <Skeleton variant="rect" width={210} height={118} />
                                                        ) 
                                                        : 
                                                        (
                                                            <Avatar 
                                                            alt={`${vehicle.make} ${vehicle.model}`}
                                                            src={`https://loremflickr.com/320/240/${vehicle.year},${vehicle.make},${vehicle.model}/all`}
                                                            onError={(e) => {
                                                                        e.target.onerror = null; 
                                                                        e.target.src=`https://via.placeholder.com/320x240?text=${vehicle.make}+${vehicle.model}`
                                                                    }}
                                                                    />
                                                                    )
                                                                }      
                                                </TableCell>
                                                <TableCell className="truncate">{vehicle.id}</TableCell>
                                                <TableCell className="truncate">{vehicle.year}</TableCell>
                                                <TableCell className="truncate">{vehicle.make}</TableCell>
                                                <TableCell className="truncate">{vehicle.model}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleEditClick(vehicle)}
                                                    >
                                                        Edit
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                        </TableBody>
                    </Table>
                    {selectedVehicle && (
                        <EditVehicleModal
                            isOpen={isEditModalOpen}
                            onClose={handleCloseModal}
                            vehicleData={selectedVehicle}
                        />
                    )}
                </TableContainer>
                <Toast open={!!error} message={error} onClose={() => setError('')} />
            </Paper>
            <Pagination count={10} page={page} onChange={(event, value) => setPage(value)} />
        </div>
    );
};



export default VehiclesTable;
