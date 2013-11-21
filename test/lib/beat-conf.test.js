var Beat = require('beat');
var BeatConf = require('../../');

describe('beat-conf', function(){
  it('should provide a "conf" object', function(){
    var beat = new Beat('test', ['/']);
    beat.value('package', {});
    beat.run(function(conf){
      expect(conf).to.be.an('object');
    });
  });
  it('"conf" object should contain the "package.json" config', function(){
    var beat = new Beat('test', ['/']);
    var fakePackage = {config: {port:80}};
    beat.value('package', fakePackage);
    beat.run(function(conf){
      expect(conf.port).to.be.equal(fakePackage.config.port);
    });
  });
  it('"conf" object should contain the "package.json" config at "default" key', function(){
    process.env.NODE_ENV = null;
    var beat = new Beat('test', ['/']);
    var fakePackage = {config: {default: {a: 'A'}}};
    beat.value('package', fakePackage);
    beat.run(function(conf){
      expect(conf.a).to.be.equal(fakePackage.config.default.a);
    });
  });
  it('"conf" object should contain the "package.json" config at the current NODE_ENV key', function(){
    process.env.NODE_ENV = 'test';
    var beat = new Beat('test', ['/']);
    var fakePackage = {config: {
      default: {a:'A', b:'B'},
      test: {a:'testA'}
    }};
    beat.value('package', fakePackage);
    beat.run(function(conf){
      expect(conf.a).to.be.equal(fakePackage.config.test.a);
    });
  });
});
