import React, { useState, useContext, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Avatar, TableContainer, IconButton } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Pagination from '@material-ui/lab/Pagination';
import { VehicleContext } from "../../context/VehicleContext";
import EditVehicleModal from "../EditModal/EditVehicleModal";
import "./VehiclesTable.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import fallbackImage from '../../assets/image.jpeg';

const VehiclesTable = () => {
    const { vehicles, loading, snackbar, setSnackbar, totalPages, getVehicles, deleteVehicle, setLoading } = useContext(VehicleContext);
    const [error, setError] = useState();
    // setLoading(true)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [vehicleToDelete, setVehicleToDelete] = useState(null);
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const navigate = useNavigate();
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

    const handleDeleteClick = (vehicleId) => {
        setVehicleToDelete(vehicleId);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        // perform deletion logic here
        const success = await deleteVehicle(vehicleToDelete);
        if (success) {
            getVehicles(page);
            setError('Vehicle deleted successfully!');
        } else {
            setError("We're sorry, something went wrong on our end. Please try again later or contact our support team");
        }
        // Close the dialog box and reset vehicleToDelete
        setIsDeleteDialogOpen(false);
        setVehicleToDelete(null);
    };

    const handleCloseDeleteDialog = () => {
        // Close the dialog box and reset vehicleToDelete
        setIsDeleteDialogOpen(false);
        setVehicleToDelete(null);
    };
    
    const handlePageChange = (event, value) => {
        setPage(value);
        navigate(`/vehicles?page=${value}`); 
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
                                                        <div 
                                                            className="avatarWrapper"
                                                            onClick={() => {
                                                                navigate(`/vehicles/${vehicle.id}`, {
                                                                    state: { vehicleDetails: vehicle }
                                                                });
                                                            }}
                                                        >
                                                            <Avatar 
                                                                className="squareAvatar"
                                                                alt={`${vehicle.make} ${vehicle.model}`}
                                                                src={`https://loremflickr.com/320/240/${vehicle.year},${vehicle.make}/all`}
                                                                onError={(e) => {
                                                                    console.log("Image load error", e.currentTarget);
                                                                    e.target.onerror = null; 
                                                                    e.target.src=fallbackImage
                                                                }}
                                                            />
                                                        </div>
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
                                                >
                                                    <EditIcon fontSize="medium" style={{ color: 'white'}} />
                                                </IconButton>
                                                <IconButton 
                                                    className="deleteButton" 
                                                    onClick={() => handleDeleteClick(vehicle.id)}
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
                <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
                    <Alert onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} severity={snackbar.severity}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
                <Dialog
                    open={isDeleteDialogOpen}
                    onClose={handleCloseDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this vehicle? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteDialog} style={{ color: 'black' }} >
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
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
