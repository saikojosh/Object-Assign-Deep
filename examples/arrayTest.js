/*
 * Example.
 */

var objectAssignDeep = require('../objectAssignDeep');

var a = {
  prop1: 'Hello',
  prop2: 'World',
  arr:   ['a', 'x', 'y', 'y', 'y']
};

var b = {
  prop2: 'Universe',
  name:  'Josh',
  arr:   ['z', 'G', 'a']
};

var result = objectAssignDeep(a, b);

console.log('Result:', result);