( function () {
  // Make a namespace `Assessment`.

  // write String.prototype.mySlice. It should take a start index and an
  // (optional) end index.


  // write Array.prototype.myReduce (analogous to Ruby's Array#inject).


  // write Array.prototype.quickSort. Here's a quick refresher if
  // you've forgotten how quickSort works:
  //   - choose a pivot element from the array (usually the first)
  //   - for each remaining element of the array:
  //     - if the element is less than the pivot, put it in the left half of the
  //     array.
  //     - otherwise, put it in the right half of the array.
  //   - recursively call quickSort on the left and right halves, and return the
  //   full sorted array.


  // write myFind(array, callback). It should return the first element for which
  // callback returns true, or undefined if none is found.




  // Write isPrime(n)


  // Write primes(n) It should return an array of the first n primes.




  // Write sumNPrimes(n) returns the sum of the first n primes



  // Write factors(n) returns the factors of a number


  // Write factorialsRec(num)
  // Write a **recursive** implementation of a method that returns the
  // first `n` factorial numbers.
  // Be aware that the first factorial number is 0!, which is defined to
  // equal 1. So the 2nd factorial is 1!, the 3rd factorial is 2!, etc.



  // Write String.prototype.jumbleSort(alphabet)
  // Jumble sort will take a string and return a string with the letters ordered
  // according to the order of an alphabet array that will be handed to the method.
  // If no alphabet array is provided, it should default to alphabetical order.
  String.prototype.jumbleSort = function (alphabet) {
      alphabet = alphabet || ['a','b','c',
      'd','e','f','g','h','i','j','k','l','m','n','o','p',
      'q','r','s','t','u','v','w','x','y','z'];

      var result = "";
      for (var i = 0; i < alphabet.length; i++) {
        var matcher = new RegExp(alphabet[i] + "*", "g")
        result += this.match(matcher).join('');
      }
      return result;
  };

  // Write Array.prototype.dups will return an object showing all
  // the location of all identical elements. The keys are the
  // duplicated elements, and the values are arrays of their positions,
  // sorted lowest to highest.

  Array.prototype.dups = function () {
    var result = {};
    for (var i = 0; i < this.length; i++) {
      for (var j = 0; j < this.length; j++) {
        if (i != j && this[i] === this[j]) {
          result[this[i]] = result[this[i]] || [i]
          if (result[this[i]].indexOf(j) === -1) {
            result[this[i]].push(j);
          }
        }
      }
    }
    return result;
  }


  // Write an Array.prototype.bubbleSort that returns a bubble-sorted copy of an array

  // Write an Array.prototype.transpose method.

  Array.prototype.transpose = function () {
    var result = []
    for (var i = 0; i < this.length; i++) {
      for (var j = 0; j < this[0].length; j++) {
        result[j] = result[j] || [];
        result[j][i] = this[i][j];
      }
    }
    return result;
  }


  // Write an Array.prototype.sumRec that recursively calculates the sum of an array of numbers

  // Write String.prototype.foldingCipher
  //   We're going to implement a cipher called the Folding Cipher. Why? Because it
  // folds the alphabet in half and uses the adjacent letter.
  //
  // For example,
  // a <=> z
  // b <=> y
  // c <=> x
  // ...
  // m <=> n




  // Write String.prototype.symmetrical
  //   Determine if a string is symmetrical. 'racecar' and
  // 'too hot to hoot' are examples of symmetrical strings.
  // You are NOT permitted to use Array.prototype.reverse.


  //  Write Array.prototype.bsearch

  Array.prototype.bsearch = function (target) {

    var middleIdx = Math.floor(this.length/2);
    if (this.length === 0) {
      return null;
    }
    else if (target === this[middleIdx]) {
      return middleIdx;
    }
    else if (target >= this[middleIdx]) {
      var right = this.slice(middleIdx, this.length)
      return right.bsearch(target) + middleIdx
    }
    else if (true) {
      var left = this.slice(0,middleIdx)
      return left.bsearch(target)
    }
  }


  // Write Array.prototype.mergeSort(comparator) It should use a comparator function if
  // one is passed. You will probably want to write a merge(arr1, arr2) function as well.



  // write Function.prototype.myBind.

  Function.prototype.myBind = function (context) {
    var bindTimeArgs = Array.prototype.slice.call(arguments, 1);
    var fn = this;
    return function () {
      var callTimeArgs = Array.prototype.slice.call(arguments, 0);
      return fn.apply(context, bindTimeArgs.concat(callTimeArgs));
    }
  };

  // write Function.prototype.inherits.

  Function.prototype.inherits = function (parentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = parentClass.prototype;
    this.prototype = new Surrogate();
  };


})();
