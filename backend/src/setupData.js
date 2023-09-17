// setupData.js
const axios = require('axios');
const db = require("./utils/sqlite");

function storeVehicleData(vehicle) {
    const sql = `
        INSERT INTO vehicles (city_mpg, class, combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg, make, model, transmission, year) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [vehicle.city_mpg, vehicle.class, vehicle.combination_mpg, vehicle.cylinders, vehicle.displacement, vehicle.drive, vehicle.fuel_type, vehicle.highway_mpg, vehicle.make, vehicle.model, vehicle.transmission, vehicle.year]);
}

axios.get('https://api.api-ninjas.com/v1/cars?limit=49&year=2020', {
    headers: {
        'X-Api-Key': 'cHHHBVdIjCrDep9ciWgiNg==UDZY9HNxkh3SLXz4'  // Replace with your actual API key
    }
})
.then(response => {
    const vehicles = response.data;
    vehicles.forEach(storeVehicleData);
})
.catch(error => {
    console.error('Request failed:', error);
});