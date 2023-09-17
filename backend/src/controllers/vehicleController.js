const db = require("../utils/sqlite");

const getAllVehicles = (req, reply) => {
    const page = req.query.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    db.all("SELECT * FROM vehicles LIMIT ? OFFSET ?", [limit, offset], (err, rows) => {
        if (err) {
            throw err;
        }
        reply.send(rows);
    });
};

const addVehicle = (req, reply) => {
    const { city_mpg, class: vehicleClass, combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg, make, model, transmission, year } = req.body;
    
    const sql = `
        INSERT INTO vehicles (city_mpg, class, combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg, make, model, transmission, year) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [city_mpg, vehicleClass, combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg, make, model, transmission, year], function(err) {
        if (err) {
            return console.error(err.message);
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
            year = ?
        WHERE id = ?
    `;

    db.run(sql, [vehicleData.city_mpg, vehicleData.class, vehicleData.combination_mpg, vehicleData.cylinders, vehicleData.displacement, vehicleData.drive, vehicleData.fuel_type, vehicleData.highway_mpg, vehicleData.make, vehicleData.model, vehicleData.transmission, vehicleData.year, vehicleId], function(err) {
        if (err) {
            console.error(err.message);
            reply.status(500).send({ error: "Failed to update vehicle" });
        } else {
            reply.send({ message: "Vehicle updated successfully", id: vehicleId });
        }
    });
};

module.exports = {
    getAllVehicles,
    addVehicle,
    updateVehicle
};
