(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("objectAssignDeep", [], factory);
	else if(typeof exports === 'object')
		exports["objectAssignDeep"] = factory();
	else
		root["objectAssignDeep"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * OBJECT ASSIGN DEEP
 * Allows deep cloning of plain objects that contain primitives, nested plain objects, or nested plain arrays.
 */

/*
 * A unified way of returning a string that describes the type of the given variable.
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function getTypeOf(input) {

	if (input === null) {
		return 'null';
	} else if (typeof input === 'undefined') {
		return 'undefined';
	} else if (typeof input === 'object') {
		return Array.isArray(input) ? 'array' : 'object';
	}

	return typeof input === 'undefined' ? 'undefined' : _typeof(input);
}

/*
 * Branching logic which calls the correct function to clone the given value base on its type.
 */
function cloneValue(value) {

	// The value is an object so lets clone it.
	if (getTypeOf(value) === 'object') {
		return quickCloneObject(value);
	}

	// The value is an array so lets clone it.
	else if (getTypeOf(value) === 'array') {
			return quickCloneArray(value);
		}

	// Any other value can just be copied.
	return value;
}

/*
 * Enumerates the given array and returns a new array, with each of its values cloned (i.e. references broken).
 */
function quickCloneArray(input) {
	return input.map(cloneValue);
}

/*
 * Enumerates the properties of the given object (ignoring the prototype chain) and returns a new object, with each of
 * its values cloned (i.e. references broken).
 */
function quickCloneObject(input) {

	var output = {};

	for (var key in input) {
		if (!input.hasOwnProperty(key)) {
			continue;
		}

		output[key] = cloneValue(input[key]);
	}

	return output;
}

/*
 * Does the actual deep merging.
 */
function executeDeepMerge(target) {
	var _objects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	var options = {
		arrayBehaviour: _options.arrayBehaviour || 'replace' // Can be "merge" or "replace".
	};

	// Ensure we have actual objects for each.
	var objects = _objects.map(function (object) {
		return object || {};
	});

	var output = target || {};

	// Enumerate the objects and their keys.
	for (var oindex = 0; oindex < objects.length; oindex++) {
		var object = objects[oindex];
		var keys = Object.keys(object);

		for (var kindex = 0; kindex < keys.length; kindex++) {
			var key = keys[kindex];
			var value = object[key];
			var type = getTypeOf(value);
			var existingValueType = getTypeOf(output[key]);

			if (type === 'object') {
				if (existingValueType !== 'undefined') {
					var existingValue = existingValueType === 'object' ? output[key] : {};
					output[key] = executeDeepMerge({}, [existingValue, quickCloneObject(value)], options);
				} else {
					output[key] = quickCloneObject(value);
				}
			} else if (type === 'array') {
				if (existingValueType === 'array') {
					var newValue = quickCloneArray(value);
					output[key] = options.arrayBehaviour === 'merge' ? output[key].concat(newValue) : newValue;
				} else {
					output[key] = quickCloneArray(value);
				}
			} else {
				output[key] = value;
			}
		}
	}

	return output;
}

/*
 * Merge all the supplied objects into the target object, breaking all references, including those of nested objects
 * and arrays, and even objects nested inside arrays. The first parameter is not mutated unlike Object.assign().
 * Properties in later objects will always overwrite.
 */
module.exports = function objectAssignDeep(target) {
	for (var _len = arguments.length, objects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		objects[_key - 1] = arguments[_key];
	}

	return executeDeepMerge(target, objects);
};

/*
 * Same as objectAssignDeep() except it doesn't mutate the target object and returns an entirely new object.
 */
module.exports.noMutate = function objectAssignDeepInto() {
	for (var _len2 = arguments.length, objects = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		objects[_key2] = arguments[_key2];
	}

	return executeDeepMerge({}, objects);
};

/*
 * Allows an options object to be passed in to customise the behaviour of the function.
 */
module.exports.withOptions = function objectAssignDeepInto(target, objects, options) {
	return executeDeepMerge(target, objects, options);
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=objectAssignDeep.js.map