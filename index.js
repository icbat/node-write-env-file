const fs = require('fs');
const writeEnvFile = require('./lib/writeEnvFile');

module.exports = writeEnvFile(fs);
