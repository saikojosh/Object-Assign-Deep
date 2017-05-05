# Object-Assign-Deep
Like [Object.assign()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) but deeper. This module is the holy grail of simple object manipulation in JavaScript and it does not resort to using the JSON functions.

## Caution! Danger of Death!
This module is to be used with PLAIN objects that contain primitive values ONLY. Every time you misuse this module a kitten dies.. yes you're a kitten killer.

Do not use this module if:
* Your objects are (or contain) native objects such as Date (nested Array is fine).
* Your objects contain circular references (you'll cause a stack overflow).
* Your objects are instances of some class you've written.
* You are concerned with prototype chains, property descriptors, unenumerable properties, and any other advanced uses.

If you need to do something fancy like the above there are better solutions out there.

## Differences to Object.Assign()
This module does NOT mutate the first parameter like Object.assign(), instead it always returns a new object with all the properties copied across and the parameters left intact.

## Quick Start
You can merge plain objects or clone them:

```javascript
const objectAssignDeep = require(`object-assign-deep`);

const mergedObjects = objectAssignDeep(object1, object2, ...objectN);

const clonedObject = objectAssignDeep(originalObject);
```

Simples!

## Full Example
See the `./examples` directory for a few examples, including one example case that demonstrates why you can't get clever with object cloning.

```javascript
const objectAssignDeep = require(`object-assign-deep`);

const objectA = {
	prop1: `Hello`,
	prop2: `World`,
	nested: {
		bool: true,
		super: 123,
		still: `here!`,
	},
	array1: [1, 2, 3],
	array2: [4, 5, 6],
};

const objectB = {
	prop2: `Universe`,
	name: `Josh`,
	nested: {
		bool: false,
	},
	array1: null,
};

const objectC = {
	location: `United Kingdom`,
	name: `Bob`,
	nested: {
		super: 999,
	},
};

const result = objectAssignDeep(objectA, objectB, objectC);

console.log(`Result:`, result);

/*
*   {
*     prop1: 'Hello',
*     prop2: 'Universe',
*     nested: { bool: false, super: 999, still: 'here!' },
*     array1: null,
*     array2: [ 4, 5, 6 ],
*     name: 'Bob',
*     location: 'United Kingdom'
*   }
*/
```
