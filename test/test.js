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