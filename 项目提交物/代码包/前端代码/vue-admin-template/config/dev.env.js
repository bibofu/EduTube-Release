'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:9001"',
  // BASE_ADDRESS: '"http://localhost:"'
  // BASE_API: '"http://192.168.137.1:8001"',
  // BASE_ADDRESS: '"http://192.168.137.1:"'
})
