const crons = require('./utils/crons')
const uncaught = require('uncaught');

uncaught.start();
uncaught.addListener(function (error) {
    console.error('Uncaught error or rejection: ', error.message);
});

crons.init()