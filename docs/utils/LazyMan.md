---
lang: zh-CN
title: Lazyman
description: 支持延迟输出
---
## 题目描述
实现一个LazyMan，可以按照以下方式调用:
```js
LazyMan("Hank")
//输出:
//Hi! This is Hank!
 
LazyMan("Hank").sleep(10).eat("dinner")
//输出
//Hi! This is Hank!
//等待10秒..
//Wake up after 10
//Eat dinner~
 
LazyMan("Hank").eat("dinner").eat("supper")
//输出
//Hi This is Hank!
//Eat dinner~
//Eat supper~
 
LazyMan("Hank").sleepFirst(5).eat("supper")
//输出
//等待5秒
//Wake up after 5
//Hi This is Hank!
//Eat supper
```

## 思路解析
1. 需要支持链式调用，一般是类才有链式调用，所以LazyMan需要是一个工厂函数
2. 需要支持sleep和sleepFirst逻辑，这两个都是一个异步执行，简单理解就是类似await逻辑，但因为是链式调用，使用迭代器模式也可以；

## 代码实现
基于迭代器模式，每一个task执行完之后调度下一个
```js
class LazyManIml {
  constructor(name) {
    // 储存每次执行的任务
    // 每一个task中都包含有 next 的执行，也就是执行下一个task
    this.taskQueue = [];
    this.timer = null;
    this.sayHi(name);
  }
  sayHi (name) {
    this.taskQueue.push(() => {
      console.log('Hi! This is ' + name);
      this.next();
    });
    return this.next();
  }
  next () {
    // 这块的重点，需要借助setTimeout实现sleepFirst的逻辑，
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.taskQueue.length) {
        return;
      }
      const task = this.taskQueue.shift();
      task();
    }, 0)
    return this;
  }
  eat (food) {
    this.taskQueue.push(() => {
      console.log('Eat ' + food);
      this.next();
    });
    return this;
  }
  sleep (time) {
    this.taskQueue.push(() => {
      setTimeout(() => {
        console.log('wake up after ' + time);
        this.next();
      }, time);
    })
    return this;
  }
  sleepFirst (time) {
    this.taskQueue.unshift(() => {
      setTimeout(() => {
        console.log('wake up after ' + time);
        this.next();
      }, time);
    })
    return this;
  }
}

// 工厂函数
function LazyMan(name) {
  return new LazyManIml(name);
}
```

另存一个思路基于 Promise的链式调用方式/或者async await；
```js
class LazyManIml {
  constructor(name) {
    // 储存每次执行的任务
    // 包含sync 和 async 两种task
    this.taskQueue = [];
    this.timer = null;
    this.sayHi(name);
  }
  sayHi(name) {
    this.taskQueue.push(() => {
      console.log('Hi! This is ' + name);
    });
    return this.run();
  }

  run() {
    clearTimeout(this.timer);
    // async/await
    // this.timer = setTimeout(async () => {
    //   for (let task of this.taskQueue) {
    //     await task();
    //   }
    // })
    this.timer = setTimeout(() => {
      let promise = Promise.resolve();
      while(this.taskQueue.length) {
        const task = this.taskQueue.shift();
        promise = promise.then(task);
      }
    }, 0)
    return this;
  }
  eat(food) {
    this.taskQueue.push(() => {
      console.log('Eat ' + food);
    });
    return this.run();
  }
  asyncTask(time) {
    return () => new Promise(resolve => {
      setTimeout(() => {
        console.log('wake up after ' + time);
        resolve();
      }, time)
    })
  }
  sleep(time) {
    this.taskQueue.push(this.asyncTask(time))
    return this.run();
  }
  sleepFirst(time) {
    this.taskQueue.unshift(this.asyncTask(time));
    return this.run();
  }
}

function LazyMan(name) {
  return new LazyManIml(name);
}

```

## 测试用例
```js
LazyMan('Herry').sleepFirst(2000).eat('dinner').sleep(3000).eat('check');
// 输出
//wake up after 2000
//Hi! This is Herry
//Eat dinner
//wake up after 3000
//Eat check
```