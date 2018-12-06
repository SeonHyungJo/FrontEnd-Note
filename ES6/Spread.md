# [ES6] Spread

`Spread`는 정말 유용하다.
사용 용도도 많고 `Destructuring`과 같이 사용하면 더욱 시너지 효과가 난다.
<br/>

단순하게 생각하면 `iterable`한 배열이나 객체를 풀어서 나타내는 것이라고 생각하면 된다. 
<br/>

`const arr = ['a', 'b', 'c']` 같은 `Array`가 있다고 한다면 `...arr`를 하게 됨으로써 `'a', 'b', 'c'` 식의 모양처럼 리스트에서 빠져 나온다고 생각하는 것이 좋을 듯 하다.
<br/>

:point_right: 예를 들어

```js
const arr = ['a', 'b', 'c']
const arr2 = [...arr, 'd']

console.log(arr2) // ['a', 'b', 'c', 'd']
```

위에서 처럼 `arr2`에서 `arr`는 풀어져 나와서 리스트에 담기게 되고 추가적으로 `d`로 넣었음으로 총 **4** 개의 `String` 이 들어가게 되는 것이다.
<br/>
<br/>

## Object spread

```js
const defaults = {
    a : "a",
    b : "b"
}

const options = {
  ...defaults,
  visible: true
}

console.log(options) //{a: "a", b: "b", visible: true}
```

`polyfill`의 형태로도 보면 더더욱이 도움이 될 것이다.
<br/>

```js
const defaults = {
    a : "a",
    b : "b"
}

const options = Object.assign(
  {}, defaults,
  { visible: true }
)

console.log(options) //{a: "a", b: "b", visible: true}
```

`Object.assign()` 메서드는 열거할 수 있는 하나 이상의 출처 객체로부터 대상 객체로 속성을 복사할 때 사용합니다. 대상 객체를 반환합니다.
<br/>
<br/>

## Array spread

```js
const admins = ["jo", "26"]

const editors = ["test"]

const users = [
  ...admins,
  ...editors,
  'rstacruz']

console.log(users) //["jo", "26", "test", "rstacruz"]
```

`polyfill`의 형태로도 보면 더더욱이 도움이 될 것이다.
<br/>

```js
const admins = ["jo", "26"]

const editors = ["test"]

const users = admins
  .concat(editors)
  .concat([ 'rstacruz' ])

console.log(users) //["jo", "26", "test", "rstacruz"]
```

`concat()` 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환합니다.
<br/>

spread 연산자는 역시 다른 것들과 섞여질때가 더욱 빛을 보는 듯하다. 
Default + Spread + Destructing
<br/>
<br/>

## 참조 
- [Devhints](https://devhints.io/es6)
- [MDN-구조 분해 할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)