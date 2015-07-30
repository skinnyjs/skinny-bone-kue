"use strict";

const bluebird = require('bluebird');
const kue = require('./kue');

module.exports = function attachKue(skinny, options) {
    skinny.on('*initialize', function *initializeKue() {
        skinny.kue = kue.createQueue(options);

        skinny.kue.on('error', function(error) {
            skinny.emit('warning', error);
        });

        bluebird.promisifyAll(skinny.kue);
    });

    skinny.on('*shutdown', function *shutdownKue() {
        if (skinny.kue) {
            yield skinny.kue.shutdownAsync();
        }
    });
};