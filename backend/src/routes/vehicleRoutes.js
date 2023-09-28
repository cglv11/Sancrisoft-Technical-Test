const vehicleController = require("../controllers/vehicleController");
const vehicleMiddleware = require('../middlewares/vehicleMiddleware');

const routes = [
    {
        method: 'GET',
        url: '/vehicles',
        handler: vehicleController.getAllVehicles
    },
    {
        method: 'POST',
        url: '/vehicles',
        handler: vehicleController.addVehicle,
        preHandler: vehicleMiddleware.checkVehicleExists
    },
    {
        method: 'PUT',
        url: '/vehicles/:vehicleId',
        handler: vehicleController.updateVehicle,
        preHandler: [vehicleMiddleware.checkVehicleIdExists, vehicleMiddleware.checkVehicleExists]
    },
    {
        method: 'DELETE',
        url: '/vehicles/:vehicleId',
        handler: vehicleController.deleteVehicle,
        preHandler: vehicleMiddleware.checkVehicleIdExists
    }
]

module.exports = routes;
