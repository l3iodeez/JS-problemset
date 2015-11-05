( function () {
  // Make a namespace `Assessment`.

  // write String.prototype.mySlice. It should take a start index and an
  // (optional) end index.

  String.prototype.mySlice = function (start, end) {
    if (!(end < this.length)){
      end = this.length;
    }
    var result = ""
    for (i = start; i < end; i++){
      result += this[i];
    };
    return result;
  };

  // write Array.prototype.myReduce (analogous to Ruby's Array#inject).

  Array.prototype.myReduce = function (callback) {
    accumulator = this[0];
    for (i=1; i<this.length; i++){
      accumulator = callback(accumulator, this[i]);
    }
    return accumulator;
  };


  // write Array.prototype.quickSort. Here's a quick refresher if
  // you've forgotten how quickSort works:
  //   - choose a pivot element from the array (usually the first)
  //   - for each remaining element of the array:
  //     - if the element is less than the pivot, put it in the left half of the
  //     array.
  //     - otherwise, put it in the right half of the array.
  //   - recursively call quickSort on the left and right halves, and return the
  //   full sorted array.

  Array.prototype.quickSort = function (comparator){
debugger
    if (this.length <= 1) {
      return this;
    }
    comparator = comparator || function (x, y) {
      if (x == y) {
        return 0;
      } else if (x > y) {
        return 1;
      } else {
        return -1;
      }
    };
    var pivot = this[0];
    var left = [];
    var right = [];
    for (var i=1; i<this.length; i++){
      var compare = comparator(this[i], pivot);
      if (compare === -1) {
        left.push(this[i]);
      }
      else {
        right.push(this[i]);
      };
    }
    return left.quickSort(comparator).concat(pivot,right.quickSort(comparator));

  };

  Assessment = {

  };

  // write myFind(array, callback). It should return the first element for which
  // callback returns true, or undefined if none is found.

  Assessment.myFind = function (array, callback) {
    for (var i=0; i < array.length; i++){
      if (callback(array[i]) === true) {
        return array[i];
      }
    }
  };


  // Write isPrime(n)

  Assessment.isPrime = function (n) {
    if (n === 0 || n === 1){
      return false;
    }

    for (var i = 2; i < n; i++) {
      if (n % i === 0){
        return false;
      }
    }
    return true;
  };
  // Write primes(n) It should return an array of the first n primes.

  Assessment.primes = function (n) {
    var result = [];
    var i = 2;
    while (result.length < n) {
      if (Assessment.isPrime(i)) {
        result.push(i);
      }
      i++;
    }
    return result;
  };


  // Write sumNPrimes(n) returns the sum of the first n primes

  Assessment.sumNPrimes = function (n) {
    var primes = Assessment.primes(n);
    var sum = 0;

    for (var i = 0; i < primes.length; i++) {
      sum += primes[i];
    }
    return sum ;
  };

  // Write factors(n) returns the factors of a number

  Assessment.factors = function (n) {
    var result = []
    for (var i = 1; i < n; i++) {
      if (n % i === 0){
        result.push(i);
      }
    }
    result.push(n);
    return result;
  };

  // Write factorialsRec(num)
  // Write a **recursive** implementation of a method that returns the
  // first `n` factorial numbers.
  // Be aware that the first factorial number is 0!, which is defined to
  // equal 1. So the 2nd factorial is 1!, the 3rd factorial is 2!, etc.

  Assessment.factorialsRec = function (num) {
    if (num === 0){
      return [];
    } else if (num === 1) {
      return [1];
    } else {
      var sub_case = Assessment.factorialsRec(num - 1);
      sub_case.push(sub_case[sub_case.length - 1] * (num - 1));
      return sub_case;
    }
  };


  // Write String.prototype.jumbleSort(alphabet)
  // Jumble sort will take a string and return a string with the letters ordered
  // according to the order of an alphabet array that will be handed to the method.
  // If no alphabet array is provided, it should default to alphabetical order.

  String.prototype.jumbleSort = function (alphabet) {
    alphabet = alphabet || ['a','b','c','d','e','f','g','h','j','k','l','m','n','o','p','q','r','s','t','u','v','x','y','z']

    var result = "";
    for (var i = 0; i < alphabet.length; i++) {
      var matcher = RegExp("[^" + alphabet[i] +"]", "g");
      var letters = this.replace(matcher, "");
      result += letters
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
      for (var j = i+1; j < this.length; j++) {
        if (this[i] === this[j]) {
          result[this[i]] = result[this[i]] || [i];
          if (result[this[i]].indexOf(j) === -1){
            result[this[i]].push(j);
          }
        }
      }
    }
    return result;
  };


  // Write an Array.prototype.bubbleSort that returns a bubble-sorted copy of an array
  Array.prototype.bubbleSort = function (comparator) {
    var array = this;
    var swapped = true;
    comparator = comparator || function (x, y) {
      if (x == y){
        return 0;
      } else if (x < y) {
        return -1;
      } else {
        return 1;
      }
    };
    while (swapped) {
      swapped = false;
      for (var i = 0; i < array.length - 1; i++) {
        if (comparator(array[i], array[i+1]) == 1 ) {
          var temp = array[i+1];
          array[i+1] = array[i];
          array[i] = temp;
          swapped = true;
        }
      }
    }
    return array;
  };
  // Write an Array.prototype.transpose method.
  Array.prototype.transpose = function (argument) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
      for (var j = 0; j < this[0].length; j++) {
        result[j] = result[j] || [];
        result[j].push(this[i][j]);
      }
    }
    return result;
  }

  // Write an Array.prototype.sumRec that recursively calculates the sum of an array of numbers
  Array.prototype.sumRec = function () {
    var dupe = this.slice(0);
    if (dupe.length === 1){
      return dupe[0];
    }
    else if (dupe.length === 0) {
      return 0;
    } else {
      return dupe.pop() + dupe.sumRec()
    }
  };
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

  String.prototype.foldingCipher = function () {
    lookupKey = {
      "a": "z", "z": "a",
      "b": "y", "y": "b",
      "c": "x", "x": "c",
      "d": "w", "w": "d",
      "e": "v", "v": "e",
      "f": "u", "u": "f",
      "g": "t", "t": "g",
      "h": "s", "s": "h",
      "i": "r", "r": "i",
      "j": "q", "q": "j",
      "k": "p", "p": "k",
      "l": "o", "o": "l",
      "m": "n", "n": "m"
    };
    var result = ""
    for (var i = 0; i < this.length; i++) {
      result += lookupKey[this[i]];
    }
    return result;
  };


  // Write String.prototype.symmetrical
  //   Determine if a string is symmetrical. 'racecar' and
  // 'too hot to hoot' are examples of symmetrical strings.
  // You are NOT permitted to use Array.prototype.reverse.

  String.prototype.symmetrical = function () {
    var dupe = this.slice(0).toLowerCase().replace(/\s/,"");
    if (dupe.length === 1) {
      return true;
    } else if (dupe.length === 2 && dupe[0] === dupe[1]) {
      return true;
    } else if (dupe.length > 2) {
      if (dupe[0] === dupe[dupe.length - 1]) {
      return dupe.slice(1, dupe.length - 1).symmetrical();
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  // Write Array.prototype.mergeSort(comparator) It should use a comparator function f
  // one is passed. You will probably want to write a merge(arr1, arr2) function as well.
  var merge = function (arr1, arr2, comparator) {
    var result = []
    while (arr1.length > 0 && arr2.length > 0) {
      if (comparator(arr1[0], arr2[0]) == -1){
        result.push(arr1[0]);
        arr1 = arr1.slice(1);
      } else {
        result.push(arr2[0]);
        arr2 = arr2.slice(1)
      }
    }
    return result.concat(arr1, arr2);
  };

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
  };


  Array.prototype.mergeSort = function (comparator) {

    comparator = comparator || function (x, y) {
      if (x == y){
        return 0;
      } else if (x < y) {
        return -1;
      } else {
        return 1;
      }
    };
    if (this.length < 2) {
      return this;
    } else {
      var middleIdx = Math.floor(this.length / 2);
      var left = this.slice(0, middleIdx).mergeSort(comparator)
      var right = this.slice(middleIdx, this.length).mergeSort(comparator)

      return merge(left, right, comparator)
    }
  };

  // write Function.prototype.myBind.

  Function.prototype.myBind = function (context) {
    var args = Array.prototype.slice.call(arguments, 1)
    var fn = this;
    return function () {
      var bindTimeArgs = args;
      var callTimeArgs = Array.prototype.slice.call(arguments);

      return fn.apply(context, bindTimeArgs.concat(callTimeArgs));
    }
  }

  // write Function.prototype.inherits.

  Function.prototype.inherits = function (parentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = parentClass.prototype;
    this.prototype = new Surrogate;
  }

})();
