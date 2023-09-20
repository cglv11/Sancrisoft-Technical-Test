import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Avatar, TableContainer, IconButton } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Pagination from '@material-ui/lab/Pagination';
import { VehicleContext } from "../../context/VehicleContext";
import EditVehicleModal from "../EditModal/EditVehicleModal";
import "./VehiclesTable.css";
import Toast from '../Toast';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const VehiclesTable = () => {
    const { vehicles, loading, setLoading, totalPages, getVehicles, deleteVehicle } = useContext(VehicleContext);
    const [error, setError] = useState();
    //setLoading(true)
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const history = useNavigate();
    const location = useLocation();
    
    const searchParams = new URLSearchParams(location.search);
    const initialPage = Number(searchParams.get('page')) || 1;
    const [page, setPage] = useState(initialPage);


    const handleEditClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setSelectedVehicle(null);
    };

    const handleDeleteClick = async (vehicleId) => {
        const success = await deleteVehicle(vehicleId);
        if (success) {
            getVehicles(page);
            setError('Vehicle deleted successfully!');  // This seems counter-intuitive. Maybe rename setError to setNotification or something similar?
        } else {
            setError("We're sorry, something went wrong on our end. Please try again later or contact our support team");
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        history(`/vehicles?page=${value}`);  // Update URL with the new page number
    };

    useEffect(() => {
        const currentPage = Number(searchParams.get('page')) || 1;
        if (currentPage !== page) {
            setPage(currentPage);
        }
    }, [location.search]);
    
    useEffect(() => {
        getVehicles(page);
    }, [page]);

    return (
        <div className="flexContainer">
            <Paper className="tablePaper">
                <TableContainer className="customTableContainer">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="truncate"></TableCell>
                                <TableCell className="truncate">#</TableCell>
                                <TableCell className="truncate">Year</TableCell>
                                <TableCell className="truncate">Make</TableCell>
                                <TableCell className="truncate">Model</TableCell>
                                <TableCell className="truncate">Location</TableCell>
                                {/* Add more table cells if needed */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                // Display Skeleton when data is loading
                                Array.from(new Array(10)).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="truncate">
                                            <Skeleton variant="rect" width={210} height={118} />
                                        </TableCell>
                                        <TableCell className="truncate">
                                            <Skeleton variant="text" width={50} />
                                        </TableCell>
                                        <TableCell className="truncate">
                                            <Skeleton variant="text" width={80} />
                                        </TableCell>
                                        <TableCell className="truncate">
                                            <Skeleton variant="text" width={80} />
                                        </TableCell>
                                        <TableCell className="truncate">
                                            <Skeleton variant="text" width={80} />
                                        </TableCell>
                                        <TableCell className="truncate">
                                            <Skeleton variant="text" width={80} />
                                        </TableCell>
                                        <TableCell className="truncate">
                                            <Skeleton variant="circle" width={40} height={40} />
                                        </TableCell>
                                        <TableCell className="truncate">
                                            <Skeleton variant="circle" width={40} height={40} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : vehicles.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6}>No vehicles found.</TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    {vehicles.map(vehicle => (
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
                                                            className="squareAvatar"
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
                                            <TableCell className="truncate">{vehicle.location}</TableCell>
                                            <TableCell style={{ textAlign: 'center'}}>
                                                <IconButton 
                                                    className="editButton" 
                                                    onClick={() => handleEditClick(vehicle)}
                                                    style={{ backgroundColor: '#536C79', marginRight: '5%' }}
                                                >
                                                    <EditIcon fontSize="medium" style={{ color: 'white'}} />
                                                </IconButton>
                                                <IconButton 
                                                    className="deleteButton" 
                                                    onClick={() => handleDeleteClick(vehicle.id)}
                                                    style={{ backgroundColor: '#B00020' }}
                                                >
                                                    <DeleteIcon fontSize="medium" style={{ color: 'white' }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                </>
                            )}
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
            <Pagination 
                className="paginationBorder"
                count={totalPages} 
                page={Number(page)} 
                onChange={handlePageChange} 
            />
        </div>
    );
};



export default VehiclesTable;
