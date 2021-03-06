module.exports = function(target, property, load, onLoad) {
  if (!target._singletons) target._singletons = {};
  var event = "singleton:" + property;
  target.once(event, onLoad || function() { });
  var singleton = target._singletons[property];
  if (singleton != void 0) return singleton;

  target._singletons[property] = singleton = {
    dispose: function() {
      target._singletons[property] = void 0;
    }
  };

  load.call(target, function(err, value) {
    target.emit.apply(target, [event, err, value]);
  });

  return singleton;
};
