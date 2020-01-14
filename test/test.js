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
      setTimeout(done, 1000);
      var available = false;
      var cr = cron.New('every 1s', function(){
          available = true;
      }, function(job){
        job.stop();
      });
      assert.equal(available, true);
    });
  });
