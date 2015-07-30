"use strict";

const bluebird = require('bluebird');
const kue = require('kue');

bluebird.promisifyAll(kue.Job);

module.exports = kue;