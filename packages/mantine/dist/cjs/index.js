'use strict';
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-querybuilder_mantine.cjs.production.js');
} else {
  module.exports = require('./react-querybuilder_mantine.cjs.development.js');
}
