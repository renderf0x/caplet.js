var Model = require("../lib/model");
var Caplet = require("../lib");
var expect = require("expect.js");

describe(__filename + "#", function() {

    it("bind one property to another property on a different model", function() {
        var am = new Caplet.Model({a:1});
        var bm = new Caplet.Model();
        Caplet.bindProperty(am, "a", bm, "b");
        am.set("a", 2);
        expect(bm.b).to.be(2);
    });


    it("bind the same property on a different model", function() {
        var am = new Caplet.Model({a:1});
        var bm = new Caplet.Model();
        Caplet.bindProperty(am, "a", bm);
        am.set("a", 2);
        expect(bm.a).to.be(2);
    });


    it("can trigger a binding", function() {
        var am = new Caplet.Model({a:1});
        var bm = new Caplet.Model();
        Caplet.bindProperty(am, "a", bm).trigger();
        expect(bm.a).to.be(1);
    });


    it("can dispose a binding", function() {
        var am = new Caplet.Model({a:1});
        var bm = new Caplet.Model();
        var binding = Caplet.bindProperty(am, "a", bm).trigger();
        expect(bm.a).to.be(1);
        binding.dispose();
        am.set("a", 2);
        expect(bm.a).to.be(1);
    });
});