// Variable definitions
var $                = require('jQuery');

// Component Scripts
var medium       = require('./components/medium');


// Critical Load
// High priority/UI dependent scripts
$(document).on('ready', medium);

