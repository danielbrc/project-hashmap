import Node from './node.js'

class LinkedList {
  constructor() {
    this.main = null;
    this.length = 0;
  }

  // adds a new node containing value to the end of the list
  append(value) {
    const node = new Node(value);
    const keyIndex = this.find(value[0]);
    if(keyIndex != null) {
      return this.update(value, keyIndex);
    }

    if(this.main == null || this.main.value == null){
      this.main = node;

    } else {
      let last = this.main;

      while(last.next != null) {
        last = last.next;
      }
      last.next = node;
    }
    this.length += 1;
  }

  // adds a new node containing value to the start of the list
  prepend(value) {
    const node = new Node(value, this.main);
    this.main = node;
    this.length += 1;
  }

  // returns the total number of nodes in the list
  size() {
    return this.length;
  }

  // returns the first node in the list
  head() {
    return this.main;
  }

  // returns the last node in the list
  tail() {
    let tail = this.main;

    while (tail.next != null){
        tail = tail.next;
    }
    return tail;
  }

  // returns the node at the given index
  at(index) {
    let i = 0;
    let target = this.main;

    while(i <= index){
      if(i == index){
        return target;
      }
      target = target.next;
      i++;
    }
  }

  // removes the last element from the list
  pop() {
    let last = this.main;

    while(last.next.next != null) {
      last = last.next;
    }

    if(last.next != null) {
      last.next = null;
    } else if(this.length == 1) {
      last.value = null;
    }

    this.length -= 1;
  }

  // returns true if the passed in value is in the list and otherwise returns false
  contains(key, value) {
    let target = this.main;
    while(target && target.value != null){
      if(target.value[0] == key || target.value[1] == value){
        return true;
      }
      target = target.next;
    }
    return false;
  }

  // find the value
  find(key, value) {
    let i = 0;
    let target = this.main;

    while(target && target.value != null){
      if(target.value[0] == key || target.value[1] == value){
        return i;
      }
      target = target.next;
      i++;
    }
    return null;
  }

  // represents LinkedList objects as strings
  toString() {
    let listStr = '';
    let temp = this.main;

    while(temp != null){
      listStr += `[${temp.value}]`;
      temp = temp.next;
    }

    return listStr.split('][').join('], [');
  }

  allValues(pos = 0) {
    let valueArray = [];
    let temp = this.main;

    while(temp != null && temp.value){
      valueArray.push(temp.value[pos]);
      temp = temp.next;
    }

    return valueArray;
  }

  update(value, index) {
    if(index == 0){
      this.main.value = value;
      return;
    }

    let i = 0;
    let newInsert = this.main;

    while(i < index-1) {
      newInsert = newInsert.next;
      i++;
    }

    let node = new Node(value, newInsert.next.next);
    newInsert.next  = node;
  }

  // inserts a new node with the provided value at the given index
  insertAt(value, index) {
    let i = 0;
    let newInsert = this.main;

    while(i < index-1) {
      newInsert = newInsert.next;
      i++;
    }
    let node = new Node(value, newInsert.next);

    newInsert.next = node;
    this.length += 1;
  }

  // removes the node at the given index
  removeAt(index) {
    let i = 0;
    let toRemove = this.at(index);
    let update = this.main;

    if(this.length == 1) {
      update.value = null;
    } else {

      while(i < index-1){
        update = update.next;
        i++;
      }

      update.next = toRemove.next;
    }

    this.length -= 1;
  }
}

export default LinkedList;