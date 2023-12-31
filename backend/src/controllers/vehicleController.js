const db = require("../utils/sqlite");

const getAllVehicles = (req, reply) => {
    const page = req.query.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    let totalCount;

    db.get("SELECT COUNT(*) as count FROM vehicles", [], (err, row) => {
        if (err) {
            console.error("Error retrieving vehicle count:", err.message);
            return reply.status(500).send({ error: "Failed to retrieve vehicle count" });
        }
        totalCount = row.count;
        if (totalCount === 0) {
            return reply.status(200).send({ message: "There are no vehicles found" });
        }

        db.all("SELECT * FROM vehicles LIMIT ? OFFSET ?", [limit, offset], (err, rows) => {
            if (err) {
                console.error("Error retrieving vehicles:", err.message);
                return reply.status(500).send({ error: "Failed to retrieve vehicles" });
            }
            reply.send({
                vehicles: rows,
                totalCount: totalCount
            });
        });
    });
};

const addVehicle = (req, reply) => {
    const { city_mpg, class: vehicleClass, combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg, make, model, transmission, year, location } = req.body;
    
    const sql = `
        INSERT INTO vehicles (city_mpg, "class", combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg, make, model, transmission, year, location) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [city_mpg, vehicleClass, combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg, make, model, transmission, year, location], function(err) {
        if (err) {
            console.error("Error adding vehicle:", err.message);
            return reply.status(500).send({ error: "Failed to add vehicle" });
        }
        reply.send({ message: "New vehicle added", id: this.lastID });
    });
};


const updateVehicle = (req, reply) => {
    const vehicleId = req.params.vehicleId;
    const vehicleData = req.body;

    const sql = `
        UPDATE vehicles SET 
            city_mpg = ?, 
            class = ?, 
            combination_mpg = ?, 
            cylinders = ?, 
            displacement = ?, 
            drive = ?, 
            fuel_type = ?, 
            highway_mpg = ?, 
            make = ?, 
            model = ?, 
            transmission = ?, 
            year = ?,
            location = ?
        WHERE id = ?
    `;

    const values = [
        vehicleData.city_mpg, 
        vehicleData.class, 
        vehicleData.combination_mpg, 
        vehicleData.cylinders, 
        vehicleData.displacement, 
        vehicleData.drive, 
        vehicleData.fuel_type, 
        vehicleData.highway_mpg, 
        vehicleData.make, 
        vehicleData.model, 
        vehicleData.transmission, 
        vehicleData.year, 
        vehicleData.location, 
        vehicleId
    ];

    db.run(sql, values, function(err) {
        if (err) {
            console.error(err.message);
            return reply.status(500).send({ error: "Failed to update vehicle" });
        } 
        reply.send({ message: "Vehicle updated successfully", id: vehicleId });
    });
};

const deleteVehicle = (req, reply) => {
    const vehicleId = req.params.vehicleId;

    const sql = `DELETE FROM vehicles WHERE id = ?`;

    db.run(sql, [vehicleId], function(err) {
        if (err) {s
            console.error(err.message);
            return reply.status(500).send({ error: "Failed to delete vehicle" });
        }
        reply.send({ message: "Vehicle deleted successfully", id: vehicleId });
    });
};

module.exports = {
    getAllVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle
};
