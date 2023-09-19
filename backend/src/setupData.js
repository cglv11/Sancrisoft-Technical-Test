const axios = require('axios');
const { faker } = require('@faker-js/faker');
const db = require('./utils/sqlite'); // Assuming the path is correct, modify accordingly

function ensureLocationColumn() {
    return new Promise((resolve, reject) => {
        db.all("PRAGMA table_info(vehicles);", [], (err, rows) => {  // Changed to `db.all`
            if (err) {
                reject(err);
                return;
            }

            const locationColumnExists = rows && rows.some(row => row.name === "location");
            if (!locationColumnExists) {
                db.run("ALTER TABLE vehicles ADD COLUMN location TEXT;", (alterErr) => {
                    if (alterErr) {
                        reject(alterErr);
                        return;
                    }
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });
}

async function fetchZipCode() {
    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/zipcode?state=NY', {
            headers: {
                'X-Api-Key': 'cHHHBVdIjCrDep9ciWgiNg==UDZY9HNxkh3SLXz4'
            }
        });

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            const randomZipData = response.data[Math.floor(Math.random() * response.data.length)];
            
            if (randomZipData.country && randomZipData.state && randomZipData.city) {
                return `${randomZipData.country} ${randomZipData.state} ${randomZipData.city}`;
            }
        }

    } catch (error) {
        console.error('Error fetching random location from NY:', error);
    }

    return 'Unknown Location';
}

async function storeVehicleData(vehicle) {
    const location = await fetchZipCode();
    vehicle.year += 2;
    vehicle.location = location;
    const sql = `
        INSERT INTO vehicles (city_mpg, class, combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg, make, model, transmission, year, location) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [vehicle.city_mpg, vehicle.class, vehicle.combination_mpg, vehicle.cylinders, vehicle.displacement, vehicle.drive, vehicle.fuel_type, vehicle.highway_mpg, vehicle.make, vehicle.model, vehicle.transmission, vehicle.year, vehicle.location]);
}

async function fetchAndStoreCars(year) {
    try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/cars?limit=10&year=${year}`, {
            headers: {
                'X-Api-Key': 'cHHHBVdIjCrDep9ciWgiNg==UDZY9HNxkh3SLXz4'
            }
        });
        const vehicles = response.data;
        await Promise.all(vehicles.map(storeVehicleData));
    } catch (error) {
        console.error('Error fetching vehicles:', error);
    }
}

async function main() {
    try {
        await ensureLocationColumn();
        
        for (let year = 2000; year <= 2020; year++) {
            await fetchAndStoreCars(year);
        }

        console.log("Database is filled with data!");
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
