function sum(a, b) {
  return a + b;
}

// CommonJS module export
// module.exports = sum;

// At the time you import the module, you can import it with the name that you want, but for force the name to be the same as the file name, you can export it like this:

module.exports = {
  sum,
  // As same as have the function here
  // sum: function sum(a, b) {
  //   return a + b;
  // }
};
