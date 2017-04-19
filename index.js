const express = require('express');
const api = express();

require('./settings')(api);       console.log('>> Initialized settings');
require('./models')(api);         console.log('>> Initialized models');
require('./middlewares')(api);    console.log('>> Initialized middleware');
require('./actions')(api);        console.log('>> Initialized actions');
require('./routes')(api);         console.log('>> Initialized routes');

console.log(`Server started and listening on port ${api.settings.port}`)
api.listen(api.settings.port);
