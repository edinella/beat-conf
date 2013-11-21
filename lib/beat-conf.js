var Beat = require('beat');
var conf = module.exports = new Beat('conf', [{package: '/package'}]);

conf.factory('conf', function(package) {
  var config = {};
  if(package && package.config) {
    config = package.config;
  }
  var conf = config['default'] || config;
  var env = process.env.NODE_ENV || 'default';
  if(env != 'default') {
    for(var i in config[env]) {
      conf[i] = config[env][i];
    }
  }
  return conf;
});