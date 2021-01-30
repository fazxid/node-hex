/**
 * Export Node
 */

exports = module.exports = require('./lib/node-hex.js');

/*
  Export the version
*/

exports.version = require('./package.json').version;
