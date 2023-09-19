const vehicleController = require("../controllers/vehicleController");

const routes = [
    {
        method: 'GET',
        url: '/vehicles',
        handler: vehicleController.getAllVehicles
    },
    {
        method: 'POST',
        url: '/vehicles',
        handler: vehicleController.addVehicle
    },
    {
        method: 'PUT',
        url: '/vehicles/:vehicleId',
        handler: vehicleController.updateVehicle
    },
    {
        method: 'DELETE',
        url: '/vehicles/:vehicleId',
        handler: vehicleController.deleteVehicle
    }
]

module.exports = routes;
