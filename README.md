# Object-Assign-Deep
See the [object-assign](https://www.npmjs.com/package/object-assign) module for more information. Only use this with **plain** JavaScript objects.

## Example Usage
```javascript
var objectAssignDeep = require('../objectAssignDeep');

var a = {
  prop1: 'Hello',
  prop2: 'World',
  nested: {
    bool: true,
    super: 123,
    still: 'here!'
  }
};

var b = {
  prop2: 'Universe',
  name:  'Josh',
  nested: {
    bool: false
  }
};

var c = {
  location: 'United Kingdom',
  name:     'Bob',
  nested: {
    super: 999
  }
};

var result = objectAssignDeep(a, b, c);

console.log('Result:', result);
```


Simples!