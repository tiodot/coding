function LRUNode (key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
  this.pre = null;
}

class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.head = new LRUNode(0, 0);
    this.head.next = this.head;
    this.head.pre = this.head;
    this.keyMap = new Map();
  }

  get(key) {
    if (this.keyMap.has(key)) {
      const node = this.keyMap.get(key);
      this.remove(node);
      this.add(node);
      return node.value;
    }
    return -1;
  }
  put(key, value) {
    if (this.keyMap.has(key)) {
      const node = this.keyMap.get(key);
      node.value = value;
      this.remove(node);
      this.add(node);
    } else {
      const node = new LRUNode(key, value);
      this.add(node);
      this.keyMap.set(key, node);
      if (this.keyMap.size > this.capacity) {
        const lastNode = this.head.pre;
        this.remove(lastNode);
        this.keyMap.remove(lastNode);
      }
    }
  }

  remove(node) {
    node.pre.next = node.next;
    node.next.pre = node.pre;
  }

  add(node) {
    node.next = this.head.next;
    this.head.next.pre = node;
    this.head.next = node;
    node.pre = this.head;
  }
}