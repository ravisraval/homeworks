// Write a function, `shuffledSentenceDetector(sentence1, sentence2)`, that
// returns true if the words in `sentence1` can be rearranged to form
// `sentence2`.

function shuffledSentenceDetector(sentence1, sentence2) {
  let words1 = sentence1.split(" ");
  let words2 = sentence2.split(" ");

  if (!(words1.length === words2.length)) {
    return false;
  }
  for (let i = 0; i < words1.length; i++) {
    if (words2.includes(words1[i])) {
    } else {
      return false;
    }
    if (words1.includes(words2[i])) {
    } else {
      return false;
    }
  }
  return true;
}


// Write an Array function, myEach(callback), that passes each element to
// `callback` and does not modify the original array. Do NOT call the built-in
// Array#forEach method in your implementation.

Array.prototype.myEach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i]);
  }
}

// Write an Array method, myFilter(callback), that returns an array made up of
// the elements in the original array for which `callback` returns `true`.
// Use the Array#myEach method you defined above. Do NOT call the built-in
// Array#forEach or Array#filter methods in your implementation.
Array.prototype.myFilter = function (cb) {
  let filtered = [];
  this.myEach((n) => {
    if (cb(n) === true) {
      filtered.push(n);
    }
  });
  return filtered;
}



// Write a function `pairMatch(array, callback)`. It should return all pairs
// of indices ([i, j]) for which `callback(array[i], array[j])` returns true.


function pairMatch(array, callback) {
  let indices = [];

  for (let i = 0; i < array.length; i++){
    for (let j = 0; j < array.length; j++){
      if (i === j) {
        continue;
      }
      if (callback(array[i], array[j])) {
        indices.push([i,j]);
      }
    }
  }
  return indices;
}
// NB: Keep in mind that the order of the arguments to the callback may matter.
// e.g., callback = function(a, b) { return a < b }

// Write an Array method that merge sorts an array. It should take an optional
// callback that compares two elements, returning -1 if the first element should
// appear before the second, 0 if they are equal, and 1 if the first element
// should appear after the second. Define and use a helper method,
// merge(left, right, comparator), to merge the halves. Make sure that merge is
// defined on the window. Do NOT call the built-in Array#sort method in your
// implementation.
//
// Here's a summary of the merge sort algorithm:
//
// Split the array into left and right halves, then merge sort them recursively
// until a base case is reached. Use a helper method, merge, to combine the
// halves in sorted order, and return the merged array.

// write a Function method, myBind(context). It should return a copy of the
// original function, where `this` is set to `context`.

// write a Function method, inherits(ParentClass). It should extend the methods
// of `ParentClass.prototype` to the constructor function it is called on.

// write a method, `myCurry(fn, object, numArgs)`, that curries the
// function. Remember that a curried function is invoked with one argument at a
// time. For example, the curried form of `sum(1, 2, 3)` would be written as
// `curriedSum(1)(2)(3)`. After `numArgs` have been passed in, invoke the
// original `fn` with the accumulated arguments, using `object` as the
// context.

Array.prototype.mergeSort = function (comparator) {
  if (this.length <= 1){
    return this;
  }

  const mid = Math.floor(this.length / 2);
  const left = this.slice(0, mid).mergeSort();
  const right = this.slice(mid).mergeSort();

  return merge(left, right, comparator);
}

function merge(left, right, comparator) {
  const res = [];
  while (left.length > 0 && right.length > 0) {

    if (comparator === undefined) {
      if (left[0] > right[0]) {
        res.push(right.shift());
      } else {
        res.push(left.shift());
      }
    } else {
      if (comparator(left[0], right[0]) === -1) {
        res.push(right.shift());
      } else {
        res.push(left.shift());
      }
    }
  }
  if (comparator) {
    return res.concat(left,right).reverse();
  }
  return res.concat(left, right);
}

x = [4,5,2,1,7];
x.mergeSort();
Function.prototype.myBind = function (ctx) {
  const fn = this;
  const bindArgs = Array.from(arguments).slice(1);
  return function () {
    const callArgs = Array.from(arguments);
    return fn.apply(ctx, bindArgs.concat(callArgs));
  }
}

Function.prototype.inherits = function (ParentClass) {
  this.prototype = Object.create(ParentClass.prototype);
  this.prototype.constructor = this;
}


function myCurry (fn, object, numArgs) {
  let args = [];
  const _myCurry = (arg) => {
    args.push(arg);
    if (args.length === numArgs) {
      return fn.apply(object, args);
    }
    return _myCurry;
  }
  return _myCurry;
}
