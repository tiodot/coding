function HeapNode(value) {
  this.value = value;
} 

class MinHeap {
  constructor(value) {
    this.heap = value !== undefined ? [new HeapNode(value)] : [];
  }

  push(value) {
    this.heap.push(new HeapNode(value));
    this.shitUp();
  }

  pop() {
    if (!this.heap.length) {
      return null;
    }
    const first = this.heap[0];
    const last = this.heap.pop();
    if (first !== last) {
      this.heap[0] = last;
      this.shitDown();
    }
    return first;
  }

  peek() {
    return this.heap.length ? this.heap[0] : null;
  }

  shitUp() {
    let index = this.heap.length - 1;
    const heap = this.heap;
    while (index > 0) {
      // parent 对应 左右两个节点，例如[0, 1, 2] 2 的 parent 为 0, 故需要 index - 1
      const parentIndex = (index - 1) >>> 1;
      // 如果父节点更大，就调整一下
      if (this.isGreater(heap[parentIndex], heap[index])) {
        const temp = heap[parentIndex];
        heap[parentIndex] = heap[index];
        heap[index] = temp;
        index = parentIndex;
      } else {
        return;
      }
    }
  }

  shitDown() {
    const length = this.heap.length;
    const halfLength = length >>> 1;
    let index = 0;
    const heap = this.heap;
    while(index < halfLength) {
      const leftIndex = (index + 1) * 2 - 1;
      const leftNode = heap[leftIndex];
      const rightIndex = leftIndex + 1;
      const rightNode = heap[rightIndex];
      const parentNode = heap[index];
      // parent 比左边大
      if (this.isGreater(parentNode, leftNode)) {
        // 左边比右边的大
        if (rightNode && this.isGreater(leftNode, rightNode)) {
           heap[index] = rightNode;
           heap[rightIndex] = parentNode;
           index = rightIndex;
        } else {
          heap[index] = leftNode;
          heap[leftIndex] = parentNode;
          index = leftIndex;
        }
      } else if (rightNode && this.isGreater(parentNode, rightNode)) {
        heap[index] = rightNode;
        heap[rightIndex] = parentNode;
        index = rightIndex;
      } else {
        return;
      }
    }
  }

  isGreater(target, source) {
    return target.value > source.value;
  }
}
// test case
// const heap = new MinHeap();

// const arr = [5, 2, 1, 9, 6, 7, 3, 4, 0, 8]

// for (let i of arr) {
//   heap.push(i);
// }
// console.log(heap.heap.map(i => i.value).join(','));
// heap.pop();
// console.log(heap.heap.map(i => i.value).join(','));

