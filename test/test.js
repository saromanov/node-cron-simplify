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
    before(function(){
      this.reached = false;
    })
    after(function(){
      console.log(this.reached);
    })
    it("should run every 1s", function(done) {
      setTimeout(done, 3000);
      var cr = cron.New('every 1s', function(){
          this.reached = true;
      });
      done();
    });
  });
