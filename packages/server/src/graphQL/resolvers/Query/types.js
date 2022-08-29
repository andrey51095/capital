const { startCase } = require('lodash');
const { TYPES } = require('../../../constants');

module.exports = () => TYPES.map(type => ({id: type, label: startCase(type)}));
