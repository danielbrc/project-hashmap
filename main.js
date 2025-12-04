import HashMap from "./hashmap.js";

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log('Entries: \n', test.entries());

console.log('got banana?', test.get('banana'));
console.log('got potato?', test.get('potato'));

console.log('has elephant?', test.has('elephant'));
console.log('has cat?', test.has('cat'));

console.log('which keys?', test.keys());
console.log('which values?', test.values());

test.remove('jacket');
console.log('removed one key?', test.length());
console.log('has jacket?', test.has('jacket'));

// test.clear();
// console.log('Clear hashmap...');
// console.log('Size: \n', test.length());

// test.set('bird', 'sparrow')
test.set('fish', 'tuna');
test.set('kite', 'purple');
test.set('dog', 'caramel');

let updatedLoadFact = test.length() / test.capacity;
console.log('capacity?', updatedLoadFact, updatedLoadFact == test.loadFact);

test.set('moon', 'silver');

console.log('Updated entries: \n', test.entries());

updatedLoadFact = test.length() / test.capacity;
console.log('capacity?', updatedLoadFact, updatedLoadFact == test.loadFact);
