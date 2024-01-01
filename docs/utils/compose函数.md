---
lang: zh-CN
title: 实现 compose 函数
description: 类似 Koa 的中间件洋葱模型
---

## 问题描述
```js
// 题目需求
let middleware = []
middleware.push((next) => {
    console.log(1)
    next()
    console.log(1.1)
})
middleware.push((next) => {
    console.log(2)
    next()
    console.log(2.1)
})
middleware.push((next) => {
    console.log(3)
    next()
    console.log(3.1)
})

let fn = compose(middleware)
fn()


/*
1
2
3
3.1
2.1
1.1
*/

//实现compose函数
function compose(middlewares) {

}
```

## 思路解析
1. 如果是同步方法，关键就是 next 函数的实现，next需要调用想下一个中间件，如果为空则不执行；
2. 如果需要支持异步方法，需要支持返回一个 Promise

## 代码实现
1. 同步执行方式，只需要递归执行
```js
function compose(middlewares) {
  let count = 0;
  const next = () => {
    if (count >= middlewares.length) {
      return;
    }
    middlewares[count++](next);
  }
  return next;
}
```
2. 异步方法
```js
function compose(middlewares) {
  return function (context = null) {
    const next = (count) => {
      const fn = middlewares[count];
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn.call(context, next.bind(null, count+1)));
    }
    return next(0);
  }
}
```
