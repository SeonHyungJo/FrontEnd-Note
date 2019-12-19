# Map Filter Reduce

함수형 프로그래밍의 주요 기능 중 하나는 리스트와 리스트 연산자의 사용이다.

Javascript에는 초기 리스트에서 제공하는 모든 함수를 map, filter, reduce를 사용하여 원본 리스트는 그대로 유지하면서 다른 것으로 변환가능하다.

## Map

### 구문

```js
arr.map(callback(currentValue[, index[, array]])[, thisArg])
```

`map()` 메서드는 콜백함수를 적용하고 나오는 결과물을 가지고 새로운 배열로 반환한다.

객체 리스트에서 우리가 원하는 속성을 추가, 수정하는데 사용한다.

map은 callback을 인자로 받는다. 이 calllback은 iteration의 현재 값을 받으며 인덱스와 원본 배열도 같이 불린다.

optional하게 두 번째 인자로는 callback 내부에서 사용될 this를 바인딩한다.

> [V8 엔진](https://github.com/v8/v8/blob/288aaef9ae15605383eb49f38b1df6e1f5d50ffb/src/builtins/array-map.tq#L79) 내부적으로 두번째 인자를 가지고 `fn.call(secondArg, ...)`를 사용하여 바인딩하고 있다.

### Example

```js
const numbers = [2, 4, 8, 10];
const halves = numbers.map(x => x / 2);
// halves is [1, 2, 4, 5]
```

### pollyfill 만들어보기

```js
Array.prototype.map = function (fn) {
  var args

  if(this == null){
    return new TypeError("this is null or not defined")
  }

  var o = Object(this)
  var len = o.length >>> 0;

  if(typeof fn !== 'function'){
    return new TypeError(fn, " is not a functions")
  }

  var arr = new Array(len)

  /* 추가적으로 들어오는 argument 처리 */
  if (arguments.length > 1) {
    args = arguments[1];
  }
  var n = 0;

  while (n < len){
    if (n in o) {
      arr[n] = fn.call(args, o[n], n, o)
      n++
    }
  }

  return arr
}
```

![Map](https://user-images.githubusercontent.com/24274424/71173584-79b45b80-22a6-11ea-813b-ace66fa11bc7.png)

## Filter

```js
arr.filter(callback(element[, index[, array]])[, thisArg])
```

주어진 함수에 대해서 조건을 통과한 요소들을 가지고 새로운 배열을 만들어서 반환하는 메서드.

filter는 map과 같은 arguments를 받는다. filter에서는 return 값으로 `true`나 `false`를 반환하면 된다. `true`를 반환하면 배열에 추가하며, `false`를 반환하면 추가하지 않는다. 

결국, 새로운 배열이 나오되 `true`로 반환된 요소만 담겨서 나오게 된다.

```js
const words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

const longWords = words.filter(word => word.length > 6);
// longWords is ["exuberant", "destruction", "present"]
```

### pollyfill 만들어보기

```js
Array.prototype.filter = function (fn) {
  var args

  if(this == null){
    return new TypeError("this is null or not defined")
  }

  var o = Object(this)
  var len = o.length >>> 0;

  if(typeof fn !== 'function'){
    return new TypeError(fn, " is not a functions")
  }

  var arr = new Array(len)

  if (arguments.length > 1) {
    args = arguments[1];
  }

  var n = 0;
  var i = -1;

  while (++i !== len){
    if (n in o) {
      if(fn.call(args, o[i], i, o)){
        arr[n++] = o[i]
      }
    }
  }

  arr.length = n
  return arr
}
```

![Filter](https://user-images.githubusercontent.com/24274424/71173596-820c9680-22a6-11ea-93af-46b528439e9f.png)

## Reduce

```js
arr.reduce(callback[, initialValue])
```

`reduce()` 메서드는 accumulator와 배열의 각 요소(왼쪽에서 오른쪽으로)에 대해 함수를 적용하여 단일 값으로 반환한다.

map, filter와 비슷하지만, callback argument가 다르다. callback은 accumulator를 받는다. 이 값은 이전에 누적된 반환값으로 현재 값, 현재 인덱스, 원본 배열을 같이 받는다.

```js
const total = [0, 1, 2, 3].reduce((sum, value) => sum + value, 1);
// total is 7
```

### pollyfill 만들어보기

```js
Array.prototype.reduce = function (fn) {
  var args;

  if(this == null){
    return new TypeError("this is null or not defined");
  }

  var o = Object(this);
  var len = o.length >>> 0; 

  if(typeof fn !== 'function'){
    return new TypeError(fn, " is not a functions");
  }

  var n = 0;
  var value;

  /* 추가적으로 들어오는 argument 처리 */
  if (arguments.length > 1) {
    value = arguments[1];
  }else{
    while (n < len && !(n in o)) {
      n++; 
    }

    if (n >= len) {
      throw new TypeError( 'Reduce of empty array with no initial value' );
    }

    value = o[n++];
  }
  
  while (n < len){
    if (n in o) {
      value = fn(value, o[n], n, o);
    }
    n++;    
  }

  return value
}
```

![Reduce](https://user-images.githubusercontent.com/24274424/71173608-8769e100-22a6-11ea-964b-eb9a113761d6.png)

---

#### Reference

- [JavaScript Functional Programming](https://medium.com/jsguru/javascript-functional-programming-map-filter-and-reduce-846ff9ba492d)
- [Learn map, filter and reduce in Javascript](https://medium.com/@joomiguelcunha/learn-map-filter-and-reduce-in-javascript-ea59009593c4)
- [V8.array-map](https://github.com/v8/v8/blob/master/src/builtins/array-map.tq#L79)