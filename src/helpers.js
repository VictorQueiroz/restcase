function addMethod (length, method, attribute) {
  switch (length) {
    case 1: return function() {
      return _[method](this[attribute]);
    };
    case 2: return function(value) {
      return _[method](this[attribute], value);
    };
    case 3: return function(iteratee, context) {
      return _[method](this[attribute], iteratee, context);
    };
    case 4: return function(iteratee, defaultVal, context) {
      return _[method](this[attribute], iteratee, defaultVal, context);
    };
    default: return function() {
      var args = slice.call(arguments);
      args.unshift(this[attribute]);
      return _[method].apply(_, args);
    };
  }
};

function addUnderscoreMethods (Class, methods, attribute) {
  _.each(methods, function(length, method) {
    if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
  });
};