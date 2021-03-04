/*
Make a function, which changes the keys and values of objects in place.
*/

const invert = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    return { ...acc, [obj[key]]: key };
  }, {});
};

console.log(invert({ 'a': 'some', 'b': 'object', 'c': 1, 'foo': null }));
