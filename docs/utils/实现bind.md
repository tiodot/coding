---
lang: zh-CN
title: 实现 Bind 方法
description: 基于 apply 实现和不用apply模拟实现
---

## 模拟实现 bind 方法

1. bind 需要返回一个 function，该 function 执行的 context 为 bind 的第一个参数；
2. bind 之后的函数无法再次改变 context

## 代码实现
1. 基于 apply 的实现
```js
function mockBind(fn, context, ...args) {
  return function (...moreArgs) {
    return fn.apply(context, [...args, ...moreArgs]);
  }
}

// 绑定到Function 上面
Function.prototype.mockBind = function(context, ...args) {
  return mockBind(this, context, ...args);
}

```

2. 不基于 apply， 基于 Function 方式
```js
function mockBind(fn, context, ...args) {
  return function (...mockArgs) {
    const key = Symbol('fn');
    const ctx = context || window;
    ctx[key] = fn;
    // 利用 object 的特性，this 默认之乡调用的对象
    const res = ctx[key](...[...args, ...mockArgs]);
    delete ctx[key];
    return res;
  }
}
```