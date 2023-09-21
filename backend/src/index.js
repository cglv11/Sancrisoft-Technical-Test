const fastify = require('fastify')({
    logger: true
});
const cors = require('@fastify/cors')

const db = require("./utils/sqlite");
const vehicleRoutes = require("./routes/vehicleRoutes");
const vehicleModel = require("./models/vehicle");

fastify.register(cors, {})

// Register Vehicle Routes
vehicleRoutes.forEach((route) => {
    fastify.route(route);
});

// Create Vehicles Table if not exists
vehicleModel.createTable();

// Function to check and seed data if needed
function checkAndSeedData() {
    db.get("SELECT COUNT(*) as count FROM vehicles", [], (err, row) => {
        if (err) {
            throw err; 
        }

        if (row.count === 0) {
            console.log("Database seems empty. Populating with data...");
            require('./setupData');
        }
    });
}

const start = async () => {
    await fastify.listen({ port: 3000 })
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);

    // Check and seed data after server starts
    checkAndSeedData();
}

start();
