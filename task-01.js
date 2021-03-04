/*
Function groupBy groups an array by a specific function
*/

const groupBy = (array, func) => {
  return array.reduce((acc, item) => {
    const res = func(item);
    return { ...acc, [res]: [...(acc[res] || []), item] }
  }, {});
};

console.log(groupBy([2.4, 4.5, 4.3, 7.7, 2.4], Math.trunc));
