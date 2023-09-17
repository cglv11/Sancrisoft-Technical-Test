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
    }
]

module.exports = routes;
