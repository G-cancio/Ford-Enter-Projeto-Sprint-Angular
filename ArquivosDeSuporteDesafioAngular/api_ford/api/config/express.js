const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = function() {
    const app = express();

    app.set('port', 3000);

    app.use(cors()); 

    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    app.infra = {
        connectionFactory: require('../app/infra/connectionFactory')()
    };

    const rotasVeiculo = require('../app/routes/veiculo');
    rotasVeiculo(app);

    return app;
};