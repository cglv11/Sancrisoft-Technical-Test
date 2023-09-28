const db = require("../utils/sqlite");

const checkVehicleExists = (req, reply, next) => {
    const { make, model, year, location } = req.body;

    const sql = `
        SELECT id FROM vehicles WHERE make = ? AND model = ? AND year = ? AND location = ?
    `;

    db.get(sql, [make, model, year, location], (err, row) => {
        if (err) {
            console.error("Error checking vehicle existence:", err.message);
            return reply.status(500).send({ error: "Failed to verify vehicle" });
        }

        if (row) {
            return reply.status(409).send({ error: "Vehicle already exists" });
        }

        next(); // Move to the next middleware or route handler if vehicle doesn't exist
    });
};

const checkVehicleIdExists = (req, reply, next) => {
    const vehicleId = req.params.vehicleId;

    const sql = `
        SELECT id FROM vehicles WHERE id = ?
    `;

    db.get(sql, [vehicleId], (err, row) => {
        if (err) {
            console.error("Error checking vehicle ID existence:", err.message);
            return reply.status(500).send({ error: "Failed to verify vehicle ID" });
        }

        if (!row) {
            return reply.status(404).send({ error: "Vehicle ID not found" });
        }

        next(); // Move to the next middleware or route handler if vehicle ID exists
    });
};

module.exports = {
    checkVehicleExists,
    checkVehicleIdExists
};