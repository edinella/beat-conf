# beat-conf [![Build Status](https://travis-ci.org/edinella/beat-conf.png?branch=master)](https://travis-ci.org/edinella/beat-conf) [![Code Climate](https://codeclimate.com/github/edinella/beat-conf.png)](https://codeclimate.com/github/edinella/beat-conf)
Simple configuration utility for Beat dependency injection

[![NPM](https://nodei.co/npm/beat-conf.png)](https://npmjs.org/package/beat-conf)

This module provide a `conf` object to be injected in [beat](https://npmjs.org/package/beat) instances.

## How to use

Set your configurations normally in the native [package.json](https://npmjs.org/doc/files/package.json.html) _(abbreviated here for simplicity)_
```js
{
  ...
  "config": {
    "serverPort": "3000",
    "mongo": "mongodb://localhost:27017/production_db",
    "publicPath": "/public"
  }
}
```

Install this module with NPM:

```sh
npm install --save beat-conf
```

Declare it as a dependency of your Beat module and inject `conf` object where you need it

```
var Beat = require('beat');
var server = module.exports = new Beat('server', [
  'beat-conf',
  'http'
]);

server.run(function(http, conf){
  http.createServer().listen(conf.serverPort);
});
```

## Config environments

This utility is very simply crafted, but it's important to understand its behavior.

The config object in `package.json` can contain several sub-objects whose key refers to current `env`.

The `default` one will be used, and will be overlapped by the configs according to current `process.env.NODE_ENV`, if exists.

As in this example:
```js
{
  ...
  "config": {
    "default": {
      "serverPort": "3000",
      "mongo": "mongodb://localhost:27017/production_db",
      "publicPath": "/public"
    },
    "test": {
      "mongo": "mongodb://localhost:27017/test_db"
    }
  }
}
```

`mongo` property will normally be `mongodb://localhost:27017/production_db`;

while with `process.env.NODE_ENV` setted as 'test', it will be setted to `mongodb://localhost:27017/test_db`.

The other configurations continue the same.

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/3c564cef8f3514f15ebd6c06666f4318 "githalytics.com")](http://githalytics.com/edinella/beat-conf)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/edinella/beat-conf/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

