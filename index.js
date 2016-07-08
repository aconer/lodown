/*global _*/
'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the action 
 * Function to each value in the collection.
 * 
 * @param {Array or Object} collection The collection over which to iterate.
 * @param {Function} action The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection); 
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each; 

/**
 * identity: Designed to return a value unchanged.
 * 
 * @param {Value} value The value to return unchanged
 * @return {Value} value The value unchanged
*/
function identity(value){ //pass thru dummy function
   return value; 
}
module.exports.identity = identity;

/**
 * typeof: Returns the data type of the value as a string.
 * 
 * @param {Value} value The value used to determine its data type.
 * @return {String} value The string representing the type of data. 
 * 
 * For ex: typeOf([]) // -> 'array'
 */
 function typeOf(value){
    if(Array.isArray(value)) return 'array';
    if(value === null) return 'null';
    if(value instanceof Date) return 'date';
    return typeof value; 
}
module.exports.typeof = typeOf;

/**
 * first: Takes an array and a number and will return the first 'n' number of 
 * elements in the array. If there is no number, it will return the first number
 * in the array. 
 * 
 * @param {Array} array The array used to return its elements.
 * @param {Number} n Amount that determines the number of elements to return from
 * the passed in array.
 * @return {[]} [] A new array containing the n amount of elements.
 */
function first(array, n){
    if(!Array.isArray(array)) return []; // || n < 0
    if(n === undefined) return array[0];
    if(n > 0) return array.slice(0, n);
    //n = n > array.length ? array.length : n
    return [];
}
module.exports.first = first;

/**
 * last: Takes an array and a number and will return the last 'n' number of 
 * elements in the array. If there is no number, it will return the last number
 * in the array. 
 * 
 * @param {Array} array The array used to return its elements.
 * @param {Number} n Amount that determines the number of elements to return 
 * from the passed in array.
 * @return {[]} [] A new array containing the n number of elements.
 */ 
function last(array, n){
    let isArray = Array.isArray(array);
    if(!isArray || n < 0) return [];
    if(n === undefined) return array[array.length - 1];
    if( n > array.length) return array;
    return array.slice(-n);
}
module.exports.last = last;

/**
 * indexOf: Returns the index of the value in the array, if found. 
 * Returns -1 if the value is not in the array.
 * 
 * @param {Array} array The array to be iterated over in search of the value.
 * @param {Value} value The value of which to return its index within the array.
 * @return {Number} i The index of the value in the array.
 * @return {Number} -1 A falsy value indicating that the value is NOT in the
 * array.
 */
function indexOf(array, value){  
    for(var i = 0; i < array.length; i++){
        if(array[i] === value){
            return i;
        }
    }    
    return -1;
}
module.exports.indexOf = indexOf;

/**
 * filter: Takes an array and a function and applies the function to the array. 
 * The function is used to test the elements of the array and return 
 * an array of the elements that have given a true result. 
 * 
 * @param {Collection} collection Takes an Array or Object that holds the list 
 * of elements to be tested against
 * @param {Function} test The given function that takes a value, position, and 
 * collection that is designed to return a boolean.
 * @return {[]} passed A new array containing the elements that have 'passed' 
 * the test.
 */
function filter(collection, test){
   var passed = [];
   _.each(collection, function(value, position, collection){
       if(test(value, position, collection)){
           passed.push(value);
       }   
   });
   return passed;
}
module.exports.filter = filter;

/**
 * filter: Takes an array and a function and applies the function to the array. 
 * The function is used to test the elements of the array and return 
 * an array of the elements that have given a false result. 
 * 
 * @param {Collection} collection Array or Object that holds the list of 
 * elements to be tested against
 * @param {Function} test The given function that takes a value, position, and 
 * collection that is designed to return a boolean.
 * @return {[]} passed A new array containing the elements that have 'failed' 
 * the test.
 */
function reject(array, test){
    return _.filter(array, function(value, position, collection){
        return !test(value, position, collection);
    });
}
module.exports.reject = reject;

/**
 * partition: Calls a function on each element in the array and 
 * returns an array of two sub-arrays. One sub-array containing true elements,
 * and the other sub-array containing false elements.
 * 
 * @param {Collection} collection The Array or Object used to apply the function
 * to all of its elements
 * @param {Function} test The test contains the passed in function used to 
 * determine which elements in the array are true and which are false.
 */
 
function partition(collection, test){
    return [_.filter(collection, test), _.reject(collection,test)];
}
module.exports.partition = partition;

/**
 * unique: Returns a new array of elements from the passed in array of elements 
 * with the duplicates removed.
 * 
 * @param {Array} array The array used to pull elements from for a new array.
 * @return {[]} newArray A new array with the duplicates removed.
 */
 function unique(array){
    var newArray = [];
    for(var i = 0; i < array.length; i++){
        if(_.indexOf(newArray, array[i]) === -1) newArray.push(array[i]); 
    }
    return newArray;
}
module.exports.unique = unique;

/**
 * map: Calls a function that transforms each element in a given collection and
 * returns them in a new array.
 * 
 * @param {Collection} Array or Object to pull elements from to apply the
 * transformation to.
 * @param {Function} transform The function that provides the action of 
 * transforming elements in the given collection
 * @return {[]} newArray an array containing the transformed elements
 */
 
function map(collection, transform){
    var newArray = [];
    _.each(collection, function(value, position, collection){
        newArray.push(transform(value, position, collection));
    });
    return newArray;
}
module.exports.map = map;

/**
 * pluck: Takes an array of objects and a property and returns every value at 
 * each property on every object in a new array
 * 
 * @param {Array} array The Array of objects.
 * @param {String} property The property/key that is on the objects in the array
 * and used to find the values.
 * @return {[]} output The array containing the values at every property
 */
function pluck(array, property){
    var output = [];
    _.map(array, function(element, i, array){
        output.push(element[property]);
    });
    return output;
}
module.exports.pluck = pluck;

/**
 * contains: Takes an array and a value that returns true if the value is in the
 * array, false otherwise
 * 
 * @param {Collection} collection The Array or Object used for its elements
 * @param {String} value The value passed in to be found in the given array
 * @return {Boolean} true or false The boolean to be returned if the value is in
 * the array
 */
function contains(collection, value) {
    return _.reduce(collection, function(match, item){
    return match ? true : item === value;
    }, false);
}

module.exports.contains = contains;

/**
 * every: Takes a collection containing elements which will be tested against
 * to return true if all the elements pass the test or false if just
 * one does not pass. If a function is not passed in, one falsy 
 * element will return false and all truthy elements will return true.
 * 
 * @param {Array or Object} collection Array or object to iterate over
 * @param {Function} test function that takes the element, i, collection and 
 * returns a boolean.
 * @return {Boolean} result The result returns true or false for every element 
 * that either passes or fails the test.
 */
 
function every(collection, test){
    var result = true;
    if(test === undefined){
        test = _.identity;
    }
    _.each(collection, function(value, position, collection){
       if(test(value, position, collection) === false) return result = false;
    });
    return result;
}
module.exports.every = every;

/**
 * some: every: Takes a collection containing elements which will be tested 
 * against to return true if just one of the elements pass the function 
 * or false if none of them do. If a function is not passed in, one truthy 
 * element will return true and all falsy elements will return false.
 * 
 * @param {Collection} Array or object used for its elements
 * @param {Function} test function that takes the element, i, collection and 
 * returns a boolean.
 * @return {Boolean} result The result returns true or false for every element 
 * that either passes or fails the test.
 */
 
function some(collection, test) {
    var Yes = false;
    if(test === undefined){
        test = _.identity;
    }
    _.each(collection, function(element, i, array){
        test(element, i, array) === true ? Yes = true: Yes;
        });
    return Yes;
}
module.exports.some = some;

/**
 * reduce: This function will sum up all of the elements in the given 
 * collection. (as it iterates, it skips the first element. The first element is
 * used as the first 'operand' to be added to the first element that is iterated 
 * over.)
 * 
 * @param {Collection} Array or Object to iterate over 
 * @param {Function} function Performing a calculation that will sum up the 
 * total number of elements.
 * @param {seed} Starting point
 * @return {}
 */
 
function reduce (collection, fn, start) {
    let prev;
    if (start !== undefined) {
        prev = start;
        
    _.each(collection, (element, i, col) => prev = fn(prev, element, i));
    }
    else {
        prev = collection[0];
        _.each(collection, (element, i, col) => {
            if (i === 0) return;
            prev = fn(prev, element, i);
        });
    }
    return prev;
}
module.exports.reduce = reduce;

/**
 * extend: Takes an unknown number of objects and it copies properties from each
 * object to the first one and then returns the updated object
 * 
 * @param {object1} Objects to copy properties to
 * @param {object2}
 */

function extend(objectTo){
    _.each(arguments, function(objectFrom){
        _.each(objectFrom, function(value, key){
           objectTo[key] = value; 
        });      
    });
    return objectTo;
}
module.exports.extend = extend;