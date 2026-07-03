module.exports = function(app) {
    
    app.get('/vehicle', (req, res) => {
        const connection = app.infra.connectionFactory();
        
        const sql = `
            SELECT 
                vehicle_id AS id, 
                vehicle_model AS vehicle, 
                vehicle_volumetotal AS volumetotal, 
                vehicle_connected AS connected, 
                vehicle_softwareUpdates AS softwareUpdates 
            FROM VEHICLE
        `;

        connection.all(sql, [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ vehicles: rows });
        });
        connection.close();
    });

    app.get('/vehicleData', (req, res) => {
        const connection = app.infra.connectionFactory();
        
        const sql = `
            SELECT 
                vehicledata_id AS id, 
                vehicledata_vin AS vin, 
                vehicledata_odometer AS odometer, 
                vehicledata_tirePressure AS tirePressure, 
                vehicledata_status AS status, 
                vehicledata_batteryStatus AS batteryStatus, 
                vehicledata_fuelLevel AS fuelLevel, 
                vehicledata_lat AS lat, 
                vehicledata_long AS long
            FROM VEHICLEDATA
        `;

        connection.all(sql, [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        });
        connection.close();
    });
};