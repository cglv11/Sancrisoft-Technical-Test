// setupData.js
const axios = require('axios');
const db = require("./utils/sqlite");

function storeVehicleData(vehicle) {
    const incrementedYear = vehicle.year + 2;

    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO vehicles (city_mpg, class, combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg, make, model, transmission, year) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.run(sql, [vehicle.city_mpg, vehicle.class, vehicle.combination_mpg, vehicle.cylinders, vehicle.displacement, vehicle.drive, vehicle.fuel_type, vehicle.highway_mpg, vehicle.make, vehicle.model, vehicle.transmission, incrementedYear], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function fetchAndStoreCars(year) {
    return axios.get(`https://api.api-ninjas.com/v1/cars?limit=10&year=${year}`, {
        headers: {
            'X-Api-Key': 'cHHHBVdIjCrDep9ciWgiNg==UDZY9HNxkh3SLXz4'
        }
    })
    .then(response => {
        const vehicles = response.data;
        return Promise.all(vehicles.map(storeVehicleData));
    });
}

let promises = [];
for (let year = 2000; year <= 2020; year++) {
    promises.push(fetchAndStoreCars(year));
}

Promise.all(promises)
.then(() => {
    console.log("Database is filled with data!");
})
.catch(error => {
    console.error("Error while fetching and storing data:", error);
});
