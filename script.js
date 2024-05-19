// from https://github.com/ilathem/linked-list-top
class LinkedList {
  constructor() {
    this.root = null;
  }

  toString() {
    if (!this.root) return "";
    let string = `[ ${this.root?.key}, ${this.root?.value} ]`;
    let node = this.root.next;
    while (node) {
      string += `, [ ${this.root?.key}, ${this.root?.value} ]`;
      node = node.next;
    }
    return string;
  }

  getPairs = () => {
    if (!this.root) return [];
    let node = this.root;
    const pairArray = [];
    while (node) {
      node.value
        ? pairArray.push([node.key, node.value])
        : pairArray.push([node.key]);
      node = node.next;
    }
    return pairArray;
  };

  getValues = () => {
    if (!this.root) return [];
    let node = this.root;
    const valueArray = [];
    while (node) {
      valueArray.push(node.value);
      node = node.next;
    }
    return valueArray;
  };

  getKeys = () => {
    if (!this.root) return [];
    let node = this.root;
    const keyArray = [];
    while (node) {
      keyArray.push(node.key);
      node = node.next;
    }
    return keyArray;
  };

  append(key, value) {
    if (this.root === null) {
      this.root = new Node(key, value);
    } else {
      let node = this.root;
      while (node) {
        if (node.next) node = node.next;
        else {
          node.next = new Node(key, value);
          return;
        }
      }
    }
  }

  // prepend(value) {
  //   if (this.root === null) {
  //     this.root = new Node(value);
  //   } else {
  //     let node = this.root;
  //     this.root = new Node(value);
  //     this.root.next = node;
  //   }
  // }

  // size() {
  //   if (this.root === null) return 0;
  //   else {
  //     let size = 0;
  //     let node = this.root;
  //     while (node) {
  //       size++;
  //       node = node.next;
  //     }
  //     return size;
  //   }
  // }

  head() {
    return this.root;
  }

  // tail() {
  //   let node = this.root;
  //   if (!node) return null;
  //   while (node.next) {
  //     node = node.next;
  //   }
  //   return node;
  // }

  at(index) {
    if (index < 0) return null;
    let i = 0;
    let node = this.root;
    while (node) {
      if (index === i) {
        return node;
      }
      node = node.next;
      i++;
    }
    return node;
  }

  // remove last element and returns it
  // pop() {
  //   if (!this.root) return null;
  //   if (this.size() === 1) {
  //     const node = this.root;
  //     this.root = null;
  //     return node;
  //   }
  //   let node = this.root;
  //   while (node.next.next) {
  //     node = node.next;
  //   }
  //   const nodeToPop = node.next;
  //   node.next = null;
  //   return nodeToPop;
  // }

  // return true if value in list, otherwise return false
  // contains(value) {
  //   if (!this.root) return false;
  //   let node = this.root;
  //   while (node) {
  //     if (node.value === value) return true;
  //     node = node.next;
  //   }
  // }

  findIndex = (key) => {
    if (!this.root) return false;
    let node = this.root;
    let i = 0;
    while (node) {
      if (node.key === key) return i;
      i++;
      node = node.next;
    }
    return null;
  };

  // returns the node of the node containing key, or null if not found
  find(key) {
    if (!this.root) return false;
    let node = this.root;
    while (node) {
      if (node.key === key) return node;
      node = node.next;
    }
    return null;
  }

  // insertAt(value, index) that inserts a new node with the
  // provided value at the given index.
  // insertAt(value, index) {
  //   if (index < 0) {
  //     console.error('Cannot insert at negative indices');
  //     return false;
  //   }
  //   if (index === 0) {
  //     this.prepend(value);
  //     return true;
  //   }
  //   let i = 1;
  //   let node = this.root;
  //   while (node.next) {
  //     if (index === i) {
  //       const oldNode = node.next;
  //       const newNode = new Node(value);
  //       node.next = newNode;
  //       newNode.next = oldNode;
  //       return true;
  //     }
  //     node = node.next;
  //     i++;
  //   }
  //   if (index === i) {
  //     this.append(value);
  //     return true;
  //   } else {
  //     console.error('Cannot insert past list bounds');
  //     return false;
  //   }
  // }

  remove(key) {
    if (!this.root) return null;
    if (this.root.key === key) {
      const removedNode = this.root;
      this.root = this.root.next;
      return removedNode;
    }
    let node = this.root;
    while (node.next) {
      if (node.key === key) {
        const removedNode = node.next;
        node.next = removedNode.next;
        return removedNode;
      }
      node = node.next;
      i++;
    }
    return null;
  }
}

class Node {
  constructor(key = "", value = "") {
    this.key = key;
    if (value) this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor(length = 16, loadFactor = 0.75) {
    this.map = new Array(length);
    this.loadFactor = loadFactor;
    this.keyLength = 0;
    for (let i = 0; i < this.map.length; i++) {
      this.map[i] = new LinkedList();
    }
  }

  hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.map.length;
    }
    return hashCode;
  };

  // check load factor, grow and rehash if needed
  checkLoadFactor = () => {
    console.log(
      `\n\nchecking load...${this.keyLength}/${
        this.map.length
      } (${this.keyLength / this.map.length}) >= ${this.loadFactor}?`,
    );
    if (this.keyLength / this.map.length >= this.loadFactor) {
      console.log("yes, rehashing...");
      const oldPairs = this.entries();
      const newLength = this.map.length * 2;
      this.map = new Array(newLength);
      for (let i = 0; i < newLength; i++) {
        this.map[i] = new LinkedList();
      }
      this.keyLength = 0;
      oldPairs.forEach((pair) => {
        this.set(pair[0], pair[1] || "", "noCheck");
      });
    } else {
      console.log("no...");
    }
  };

  // update key with value, create if non-existent
  set = (key, value, checkLoad = "check") => {
    const bucket = this.map[this.hash(key)];
    if (bucket.head()) {
      const node = bucket.find(key);
      if (node) node.value = value;
      else {
        bucket.append(key, value);
        this.keyLength++;
        if (checkLoad === "check") this.checkLoadFactor();
      }
    } else {
      bucket.append(key, value);
      this.keyLength++;
      if (checkLoad === "check") this.checkLoadFactor();
    }
  };

  // return value associated with key, or null if none
  get = (key) => {
    const bucket = this.map[this.hash(key)];
    const node = bucket.find(key);
    if (node) return node.value;
    return null;
  };

  // return true if key is in hash map, false if not
  has = (key) => (this.get(key) ? true : false);

  // remove key in hash map, return true if success, false if fail
  remove = (key) => {
    if (this.map[this.hash(key)].remove(key)) {
      this.keyLength--;
      return true;
    }
    return false;
  };

  // print everything, even if it's empty
  debugEntries = () => {
    let pairArray = [];
    this.map.forEach((bucket) => {
      pairArray.push(bucket.getPairs());
    });
    return pairArray;
  };

  // return array containing all [key, value] pairs
  entries = () => {
    let pairArray = [];
    this.map.forEach((bucket) => {
      const bucketPairs = bucket.getPairs();
      if (bucketPairs.length) pairArray.push(...bucketPairs);
    });
    return pairArray;
  };

  // return number of stored keys
  length = () => this.keyLength;

  // remove all entries in hashmap
  clear = () => {
    this.keyLength = 0;
    for (let i = 0; i < this.map.length; i++) {
      this.map[i] = new LinkedList();
    }
  };

  // return array containing all keys
  keys = () => {
    let keyArray = [];
    this.map.forEach((bucket) => {
      keyArray.push(...bucket.getKeys());
    });
    return keyArray;
  };

  // return aray containing all values
  values = () => {
    let valueArray = [];
    this.map.forEach((bucket) => {
      valueArray.push(...bucket.getValues());
    });
    return valueArray;
  };
}

class HashSet extends HashMap {
  set(key, check) {
    super.set(key, null, check)
  }
}

