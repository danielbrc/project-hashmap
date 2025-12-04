import LinkedList from "./linked-list.js";

class HashMap {
  constructor(loadFact = 0.75, capacity = 16) {
    this.loadFact = loadFact;
    this.capacity = capacity;
    this.map = new Array(capacity).fill(null);
  };

  // limits the bucket size
  testLength(index) {
    if (index < 0 || index >= this.map.length) {
      throw new Error(`Trying to access ${index} out of bounds`);
    }
  };

  // creates hash code
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  };

  // return the bucket position
  // extra option to custom capacity
  bucket(key, capacity = this.capacity) {
    const bucket = this.hash(key) % capacity;
    return bucket;
  };

  // save key with his value
  set(key, value) {
    const length = this.length();

    if(length / this.capacity >= this.loadFact && !this.has(key)){
      this.doubleMapCapacity();
      this.relocateEntries();
    }
    
    let bucketPos = this.bucket(key);

    if(this.map[bucketPos] === null){
      this.map[bucketPos] = new LinkedList();
    }

    this.map[bucketPos].append([key,value]);
  };

  // returns the value that is assigned to this key
  // returns null if there is no key
  get(key) {
    const bucket = this.map[this.bucket(key)];
    let keyIndex = null;

    if(bucket !== null){
      keyIndex = bucket.find(key);

      if(keyIndex >= 0) {
        const value = bucket.at(keyIndex).value[1];
        return value;
      }
    }

    return keyIndex;
  };

  // returns true or false based on whether or not the key is in the hash map
  has(key) {
    const bucket = this.map[this.bucket(key)];

    return bucket?.contains(key) || false;
  };

  // remove the entry with that key and return true.
  // if the key isn’t in the hash map, it should return false
  remove(key, bucketPos = this.bucket(key)) {
    const bucket = this.map[bucketPos];

    if(bucket !== null) {
      const keyIndex = bucket.find(key);
      if(keyIndex >= 0) {
        bucket.removeAt(keyIndex);
      }
    }
  };

  // returns the number of stored keys in the hash map
  length() {
    return this.keys().length;
  }

  // removes all entries in the hash map
  clear() {
    this.map = new Array(this.capacity).fill(null);
  };

  // returns an array containing all the keys inside the hash map
  keys() {
    let allKeys = [];
    let i = 0;

    while(i < this.map.length){
      if(this.map[i] && this.map[i].size() > 0) {
        allKeys.push(...this.map[i].allValues(0));
      }
      i++;
    }

    return allKeys;
  };

  // returns an array containing all the values
  values() {
    let allValues = [];
    let i = 0;

    while(i < this.map.length){
      if(this.map[i] && this.map[i].size() > 0) {
        allValues.push(...this.map[i].allValues(1));
      }
      i++;
    }

    return allValues;
  };

  // returns an array that contains each key, value pair
  entries() {
    let result = '';
    let i = 0;

    while(i < this.map.length){
      if(this.map[i] && this.map[i].size() > 0) {
       result += `[${this.map[i].toString()}]`;
      }
      i++;
    }

    return result.split('][').join('],\n [');
  };

  // expand the hashmap capacity
  doubleMapCapacity() {
    const moreCapacity = new Array(this.capacity).fill(null);
    this.map.push(...moreCapacity);
    this.capacity *= 2;
  }

  // change key and values to new positions after capacity expansion
  relocateEntries() {
    const keys = this.keys();
    const values = this.values();

    for(let i = 0; i < keys.length; i++) {
      const oldPos = this.bucket(keys[i], this.capacity / 2);
      const newPos = this.bucket(keys[i]);

      if(oldPos != newPos){
        this.remove(keys[i], oldPos);
        this.set(keys[i], values[i]);
      }
    };
  }

}

export default HashMap;