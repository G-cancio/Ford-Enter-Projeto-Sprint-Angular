const sqlite3 = require('sqlite3').verbose();

function createDBConnection() {
    return new sqlite3.Database('./data2.db');
}

module.exports = function() {
    return createDBConnection;
};