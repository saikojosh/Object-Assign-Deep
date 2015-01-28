/*
 * Object Assign Deep.
 */

var objectAssign = require('object-assign');
var _            = require('underscore');

module.exports = function ME (target, source) {

  var args       = Array.prototype.slice.call(arguments);
  var startIndex = 1;
  var output     = Object(target || {});

  // Cycle the source object arguments.
	for (var a = startIndex, alen = args.length ; a < alen ; a++) {
		var from = args[a];
		var keys = Object.keys(Object(from));

    // Cycle the properties.
		for (var k = 0; k < keys.length; k++) {
      var key = keys[k];

      // Merge arrays.
      if (_.isArray(output[key]) || _.isArray(from[key])) {
        var o = (_.isArray(output[key]) ? output[key].slice() : []);
        var f = (_.isArray(from[key])   ? from[key].slice()   : []);
        output[key] = o.concat(f);
      }

      // Copy functions references.
      else if (_.isFunction(output[key]) || _.isFunction(from[key])) {
        output[key] = from[key];
      }

      // Extend objects.
      else if (_.isObject(output[key]) || _.isObject(from[key])) {
        output[key] = ME(output[key], from[key]);
      }

      // Copy all other types.
      else {
        output[key] = from[key];
      }

		}

	}

	return output;

};