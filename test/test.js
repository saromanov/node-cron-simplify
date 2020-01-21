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
      this.timeout(3800);
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

    it("should run every 5s", function(done) {
      this.timeout(12000);
      var available = false;
      var count = 0;
      var cr = cron.New('every 1s', function(d){
        count += 1;
        if (count== 2 ) {
          cr.stop();
        }
      });
      cr.start();
      setTimeout((function(){
        assert.equal(count,2);
        done();
      }), 11000);
    });

    it("should not start because of invalid every", function() {
      var cr = cron.New('every 1qqqq', function(d){
      });
      assert.equal(cr, undefined);
    });
  });

  describe('testing at', function() {
    it("should't start because of invalid expression", function() {
        var cr = cron.New('at 1oooo');
        assert.equal(cr.pattern, undefined);
    });

    it("should run after 1s", function() {
      var date = new Date();
      date.setSeconds(date.getSeconds()+1);
      assert.equal(cr.pattern, undefined);
  });
  });
