var assert = require('assert');
var cron = require('../src');

  describe('init cron', function() {
    it("should't init cron", function() {
      var cr = cron.New('', function(){
          console.log('YES');
      });
      assert.equal(cr.pattern, undefined);
    });
    it("should't init cron because of empty decl", function() {
        var cr = cron.New('every 1s');
        assert.equal(cr.pattern, undefined);
      });
  });

  describe('testing every', function() {
    it("should run every 1s", function(done) {
      var available = false;
      var count = 0;
      var cr = cron.New('every 1s', function(d){
        count += 1;
        if (count== 3 ) {
          cr.stop();
        }
      });
      cr.start();
      setTimeout((function(){
        assert.equal(count,3);
        done();
      }), 3500);
    });
  });
