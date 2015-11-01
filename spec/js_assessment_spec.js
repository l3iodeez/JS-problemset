describe("String.prototype.mySlice", function() {
  it("slices the string from the start index to the end index", function() {
    expect("abcd".mySlice(0, 2)).toEqual("ab");
  });

  it("slices to the end of the string when no second argument is passed", function() {
    expect("foobar".mySlice(3)).toEqual("bar");
  });

  it("returns an empty string when the first argument is higher", function() {
    expect("empty!".mySlice(1, 0)).toEqual("");
  });

  it("slices to the end of the string when the end index is greater than the string's length", function() {
    expect("super long string".mySlice(0, 200)).toEqual("super long string");
  });

  it("doesn't call `substr`, `slice`, or `substring`", function() {
    var str = new String("don't you do it!");
    spyOn(str, "substr");
    spyOn(str, "slice");
    spyOn(str, "substring");

    str.mySlice(0);

    expect(str.substr).not.toHaveBeenCalled();
    expect(str.slice).not.toHaveBeenCalled();
    expect(str.substring).not.toHaveBeenCalled();
  });
});

describe("Array.prototype.myReduce", function() {
  var myArray;
  var noOp = function (accum, el) { return accum; };

  var spy = {
    sum: function (accum, el) { return accum + el; }
  }

  it("calls the callback, passing in the accumulator and each element", function () {
    myArray = [1, 2, 3];
    spyOn(spy, "sum").and.callThrough();

    myArray.myReduce(spy.sum);

    expect(spy.sum).toHaveBeenCalledWith(1, 2);
    expect(spy.sum).toHaveBeenCalledWith(3, 3);
  });

  it("works with a sum callback", function() {
    myArray = [1, 2, 3, 4];
    expect(myArray.myReduce(spy.sum)).toEqual(10);
  });

  it("works with a multiplier callback", function () {
    myArray = [4, 4, 4];
    var times = function(accum, el) { return accum * el; };

    expect(myArray.myReduce(times)).toEqual(64);
  });

  it("uses the first item as the accumulator", function() {
    myArray = [1, 2, 3, 4];
    expect(myArray.myReduce(noOp)).toEqual(1);
  });

  it("does not call Array.prototype.reduce", function () {
    myArray = [1, 2, 3, 4];
    spyOn(myArray, "reduce");

    myArray.myReduce(spy.sum);

    expect(myArray.reduce).not.toHaveBeenCalled();
  });
});

describe("Array.prototype.quickSort", function () {
  var array =  [1, 5, 2, 4, 3];

  it("works with an empty array", function () {
    expect([].quickSort()).toEqual([]);
  });

  it("works with an array of one item", function () {
    expect([1].quickSort()).toEqual([1]);
  });

  it("sorts numbers", function () {
    expect(array.quickSort()).toEqual(array.slice(0).sort());
  });

  it("sorts arrays with duplicates", function () {
    expect([5, 4, 3, 3, 2, 1].quickSort()).toEqual([1, 2, 3, 3, 4, 5]);
  });

  it("uses a comparator function if passed in", function () {
    var reversed = array.quickSort(function (x, y) {
      if (x == y) {
        return 0;
      } else if (x < y) {
        return 1;
      } else {
        return -1;
      }
    });
    expect(reversed).toEqual([5, 4, 3, 2, 1]);
  });

  it("calls itself recursively", function () {
    spyOn(Array.prototype, "quickSort").and.callThrough();

    array.quickSort();

    var count = Array.prototype.quickSort.calls.count();
    expect(count).toBeGreaterThan(4);
    expect(count).toBeLessThan(10);
  });

  it("does not modify original", function (){
    dupedArray = [1, 5, 2, 4, 3];
    dupedArray.quickSort();
    expect(dupedArray).toEqual(array);
  });
});

describe("myFind", function () {
  var arr, spy;
  beforeEach(function () {
    arr = [1, 2, 3];
    spy = {
      callback: function (el) { return false; }
    }
  });

  var equalsThree = function (el) { return el === 3; };
  var equalsFour = function (el) { return el === 4; };

  it("calls the callback passed to it", function () {
    spyOn(spy, "callback");

    Assessment.myFind(arr, spy.callback);

    expect(spy.callback).toHaveBeenCalled();
  });

  it("yields each element to the callback", function () {
    spyOn(spy, "callback");

    Assessment.myFind(arr, spy.callback);

    expect(spy.callback).toHaveBeenCalledWith(1);
    expect(spy.callback).toHaveBeenCalledWith(2);
    expect(spy.callback).toHaveBeenCalledWith(3);
  });

  it("returns undefined if no element satisfies the callback", function () {
    expect(Assessment.myFind(arr, equalsFour)).toEqual(undefined);
  });

  it("returns the first element for which the callback returns true", function () {
    expect(Assessment.myFind(arr, equalsThree)).toEqual(3);
  });

  it("does NOT call the built in Array#find method", function () {
    Array.prototype.find = Array.prototype.find || function () {};
    spyOn(arr, "find");

    Assessment.myFind(arr, equalsFour);

    expect(arr.find).not.toHaveBeenCalled();
  });
});

describe("isPrime", function () {
  it("returns false for 0", function () {
    expect(Assessment.isPrime(0)).toEqual(false);
  });

  it("returns false for 1", function () {
    expect(Assessment.isPrime(1)).toEqual(false);
  });

  it("returns false for a low composite", function () {
    expect(Assessment.isPrime(8)).toEqual(false);
  });

  it("returns true for a low prime", function () {
    expect(Assessment.isPrime(11)).toEqual(true);
  });

  it("returns true for a larger prime", function () {
    expect(Assessment.isPrime(83)).toEqual(true);
  });
});

describe("sumNPrimes", function () {
  it("returns 0 for 0", function () {
    expect(Assessment.sumNPrimes(0)).toEqual(0);
  });

  it("returns 2 for 1", function () {
    expect(Assessment.sumNPrimes(1)).toEqual(2);
  });

  it("sums the first 4 primes", function () {
    expect(Assessment.sumNPrimes(4)).toEqual(17);
  });

  it("sums the first 20 primes", function () {
    expect(Assessment.sumNPrimes(20)).toEqual(639);
  });
});

describe("factors", function () {
  it("returns factors of 10 in order", function () {
    expect(Assessment.factors(10)).toEqual([1, 2, 5, 10]);
  });

  it("returns just two factors for primes", function () {
    expect(Assessment.factors(13)).toEqual([1,13]);
  });
});

describe("factorialsRec", function () {
  it("returns first factorial number", function () {
    expect(Assessment.factorialsRec(1)).toEqual([1]);
  });

  it("returns first two factorial numbers", function () {
    expect(Assessment.factorialsRec(2)).toEqual([1, 1]);
  });

  it("returns many factorials numbers", function () {
    expect(Assessment.factorialsRec(6)).toEqual([1, 1, 2, 6, 24, 120]);
  });

  it("calls itself recursively", function () {
    spyOn(Assessment, "factorialsRec").and.callThrough();

    Assessment.factorialsRec(6);
    var count = Assessment.factorialsRec.calls.count();
    expect(count).toBeGreaterThan(4);
    expect(count).toBeLessThan(10);
  });
});

describe("String.prototype.jumbleSort", function() {
  it("should default to alphabetical order", function() {
    expect("hello".jumbleSort()).toEqual("ehllo");
  });

  it("should take an alphabet array and sort by that order", function() {
    var alph = ['h','e','l','o','a','b','c',
      'd','f','g','i','j','k','m','n','p',
      'q','r','s','t','u','v','x','y','z'];

    expect("hello".jumbleSort(alph)).toEqual("hello");
  });

  it("should be able to do reverse alphabetical order", function() {

    var reverse = ['a','b','c',
      'd','e','f','g','h','i','j','k','l','m','n','o','p',
      'q','r','s','t','u','v','x','y','z'].reverse();

      expect("hello".jumbleSort(alph)).toEqual("ollhe");
  });
});

describe("Array.prototype.dups", function() {
  it("solves a simple example" , function() {
    expect([1, 3, 0, 1].dups).toEqual({ 1: [0, 3] });
  });

  it("finds two dups", function() {
    expect([1, 3, 0, 3, 1].dups).toEqual({ 1: [0, 4], 3: [1, 3] });
  });

  it("should be able to do reverse alphabetical order", function() {
    expect([1, 3, 4, 3, 0, 3].dups).toEqual({ 3: [1, 3, 5] });
  });

  it("returns {} when no dups found", function() {
    expect([1, 3, 4, 5].dups).toEqual({});
  });
});

describe("Array.prototype.bubbleSort", function () {
  var array =  [1, 5, 2, 4, 3];

  it("works with an empty array", function () {
    expect([].bubbleSort()).toEqual([]);
  });

  it("works with an array of one item", function () {
    expect([1].bubbleSort()).toEqual([1]);
  });

  it("sorts numbers", function () {
    expect(array.bubbleSort()).toEqual(array.slice(0).sort());
  });

  it("sorts arrays with duplicates", function () {
    expect([5, 4, 3, 3, 2, 1].bubbleSort()).toEqual([1, 2, 3, 3, 4, 5]);
  });

  it("uses a comparator function if passed in", function () {
    var reversed = array.bubbleSort(function (x, y) {
      if (x == y) {
        return 0;
      } else if (x < y) {
        return 1;
      } else {
        return -1;
      }
    });
    expect(reversed).toEqual([5, 4, 3, 2, 1]);
  });

  it("does not call itself recursively", function () {
    spyOn(Array.prototype, "bubbleSort").and.callThrough();

    array.bubbleSort();

    var count = Array.prototype.bubbleSort.calls.count();
    expect(count).toBeLessThan(2);
  });

  it("does not modify original", function (){
    dupedArray = [1, 5, 2, 4, 3];
    dupedArray.bubbleSort();
    expect(dupedArray).toEqual(array);
  });
});




describe("Array.prototype.transpose", function() {
  var square = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
      ];
  var small = [
      [1, 2],
      [3, 4]
      ];
  var rect = [
      [1, 2, 3],
      [4, 5, 6]
      ];
    var tall_rect = [
      [1, 2],
      [3, 4],
      [5, 6]
      ];
      it('should transpose a matrix' , function() {
        expect(square.transpose).toEqual([
          [1, 4, 7],
          [2, 5, 8],
          [3, 6, 9]
          ]);
      });

      it("should transpose a matrix of a different size", function() {
        expect(small.transpose).toEqual([
          [1, 3],
          [2, 4]
          ]);
      });


      it("should transpose a rectangular matrix", function() {
        expect(rect.transpose).toEqual([
          [1, 4],
          [2, 5],
          [3, 6]
          ]);
      });

      it("should transpose a different rectangular matrix", function() {
        expect(tall_rect.transpose).toEqual([
          [1, 3, 5],
          [2, 4, 6]
          ]);
      });

      it("should not modify the original", function() {
        small.transpose();
        expect(small).toEqual([
          [1, 2],
          [3, 4]
          ]);
      });

});

describe("Array.prototype.sumRec", function () {
  it("returns 0 if no values are given", function () {
    expect([].sumRec).toEqual(0);
  });

  it("returns the first value if 1 value is given", function () {
    expect([1].sumRec).toEqual(1);
  });


  it("calls itself recursively", function () {
    spyOn(Array.prototype, "sumRec").and.callThrough();

    [1,2,3,4,5,6].sumRec;
    var count = Array.sumRec.calls.count();
    expect(count).toBeGreaterThan(4);
    expect(count).toBeLessThan(10);
  });

  it("sums multiple numbers", function () {
    expect([1,2,3,4].sumRec).toEqual(10);
  });

  it("sums multiple numbers", function () {
    expect([-10, 10, 5, 4].sumRec).toEqual(9);
  });
});

describe("String.prototype.foldingCipher", function() {
  it("should use the folding cipher", function() {
    expect("a".foldingCipher).toEqual("z");
    expect("d".foldingCipher).toEqual("w");
  });

  it("should encode words correctly", function() {
    expect("hello".foldingCipher).toEqual("svool");
    expect("goodbye".foldingCipher).toEqual("tllwybv");
  });

  it("should decode words correctly", function() {
    expect("svool".foldingCipher).toEqual("hello");
    expect("tllwybv".foldingCipher).toEqual("goodbye");
  });
});

describe("String.prototype.symmetrical", function() {
  it("doesn't use reverse", function() {
    spyOn(Array.prototype, "reverse").and.callThrough();

    [1,2,3].symmetrical();

    var count = Array.prototype.symmetrical.calls.count();
    expect(count).toBeLessThan(1);
  });

  it("detects palindromes with an odd number of letters", function() {
    expect("racecar".symmetrical).toEqual(true);
  });

  it("detects palindromes with an EVEN number of letters", function() {
    expect("toot".symmetrical).toEqual(true);
  });

  it("doesn't give false positives", function() {
    expect("racelikecar".symmetrical).toEqual(false);
  });

  it("can handle multi word palindromes", function() {
    expect("too hot to hoot".symmetrical).toEqual(true);
  });

});


describe("Array.prototype.mergeSort", function () {
  var array =  [1, 5, 2, 4, 3];

  it("works with an empty array", function () {
    expect([].mergeSort()).toEqual([]);
  });

  it("works with an array of one item", function () {
    expect([1].mergeSort()).toEqual([1]);
  });

  it("sorts numbers", function () {
    expect(array.mergeSort()).toEqual(array.slice(0).sort());
  });

  it("sorts arrays with duplicates", function () {
    expect([5, 4, 3, 3, 2, 1].mergeSort()).toEqual([1, 2, 3, 3, 4, 5]);
  });

  it("uses a comparator function if passed in", function () {
    var reversed = array.mergeSort(function (x, y) {
      if (x == y) {
        return 0;
      } else if (x < y) {
        return 1;
      } else {
        return -1;
      }
    });
    expect(reversed).toEqual([5, 4, 3, 2, 1]);
  });

  it("calls itself recursively", function () {
    spyOn(Array.prototype, "mergeSort").and.callThrough();

    array.mergeSort();

    var count = Array.prototype.mergeSort.calls.count();
    expect(count).toBeGreaterThan(4);
    expect(count).toBeLessThan(10);
  });

  it("does not modify original", function (){
    dupedArray = [1, 5, 2, 4, 3];
    dupedArray.mergeSort();
    expect(dupedArray).toEqual(array);
  });
});

describe("Function.prototype.myBind", function () {
  var Cat;
  var sally, markov, curie;

  beforeEach(function () {
    Cat = function Cat (name) {
      this.name = name;
    };

    Cat.prototype.sayHello = function () {
      return this.name + " says hello!";
    };

    Cat.prototype.greetOne = function (otherCat) {
      return this.name + " says hello to " + otherCat.name;
    };

    Cat.prototype.greetTwo = function (otherCat1, otherCat2) {
      return this.name + " says hello to " + otherCat1.name + " and " +
        otherCat2.name;
    };

    sally = new Cat("Sally");
    markov = new Cat("Markov");
    curie = new Cat("Curie");
  });

  it("should call the function method style on the context", function () {
    expect(sally.sayHello.myBind(sally)()).toEqual("Sally says hello!");
  });

  it("should pass in bind-time argument to the method", function () {
    expect(sally.greetOne.myBind(sally, markov)())
      .toEqual("Sally says hello to Markov");
  });

  it("should pass in two bind-time arguments to the method", function () {
    expect(sally.greetTwo.myBind(sally, markov, curie)())
      .toEqual("Sally says hello to Markov and Curie");
  });

  it("should combine bind-time and call-time arguments", function () {
    expect(sally.greetTwo.myBind(sally, markov)(curie))
      .toEqual("Sally says hello to Markov and Curie");
  });
});

describe("inherits", function() {
  var Animal, Dog, dog;

  beforeEach(function() {
    Animal = function() {
      this.name = "Yogi";
    };

    Animal.prototype.makeNoise = function() { return "Hi!"; };

    Dog = function() {
      this.age = 7;
    };

    Dog.inherits(Animal);

    Dog.prototype.bark = function() { return "Woof!"; };

    dog = new Dog();
  });

  it("should properly set up the prototype chain between a child and parent", function() {
    expect(dog.bark()).toBe("Woof!");
    expect(dog.makeNoise()).toBe("Hi!");
  });

  it("should not call the parent's constructor function", function() {
    expect(dog.name).toBeUndefined();
  });

  it("should maintain separation of parent and child prototypes", function() {
    Dog.prototype.someProperty = 42;
    var animal = new Animal();
    expect(animal.someProperty).toBeUndefined();
    expect(animal.makeNoise()).toBe("Hi!");
  });

  it("should properly work for longer inheritance chains", function() {
    var Poodle = function() { this.name = "Bill"; };

    Poodle.inherits(Dog);

    Poodle.prototype.shave = function() { return "Brrr."; };

    var poodle = new Poodle();
    expect(poodle.name).toBe("Bill");
    expect(poodle.shave()).toBe("Brrr.");
    expect(poodle.makeNoise()).toBe("Hi!");
    expect(poodle.bark()).toBe("Woof!");
  });
});
