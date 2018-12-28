# [ES6] Object

## shorthand syntax

말그대로 짧게 사용한다는 것이다.
기존을 보자면, `key` 와 `value`를 명시적으로 적어주어야 했으나 이제는 만약에 key를 value의 변수명으로 사용하고 싶다면 축약형으로 사용할 수 있다.

```js
module.exports = { hello, bye }
// Same as: module.exports = { hello: hello, bye: bye }
```

## Getter and Setter

기존의 object에 있어서 getter, setter는 직접 구현을 해서 사용해야 했다.
그러나 이제 이런것들이 기본 문법으로 생성해준다.

```js
const App = {
 get closed () {
   return this.status === 'closed'
 },
 set closed (value) {
   this.status = value ? 'closed' : 'open'
 }}

App.closed
App.closed = 'closed'
App.closed
```

위에서 처럼 get과 set을 할 수 있게 된다.

## Extract Values
Object의 값을 가져오는 방법은 간단하다.

```js
const fatherJS = { age: 57, name: "Brendan Eich" }

Object.values(fatherJS)// [57, "Brendan Eich"]
Object.keys(fatherJS)// ['age', 'name']
Object.entries(fatherJS)// [["age", 57], ["name", "Brendan Eich"]]
```

위에서 부터 value들만 가져오는 부분
key들만 가져오는 부분
각각을 array로 가져오는 부분

### Method
메소드를 작성하는 방법에 있어서도 간편해졌다.
기존에 obj안에 function을 만든다고 하면

```js
var obj = {
    func : function(){
    }
}
```

위와 같은 식으로 만들었다고 한다면

```js
const obj = {
   func(){
   }
}
```

function이라는 부분이 사라지고 더욱 간편하게 작성할 수 있도록 바뀌었다.

## computed property names
동적으로 property 이름을 넣어줄 수 있다.

```js
let event = 'click'let handlers = {
 [`on${event}`]: true
}
// Same as: handlers = { 'onclick': true }
```

위와 같이 key 명이 동적으로 들어가게 만들 수 있다. 
위의 경우는
`.`으로 `property` 를 가져오는 경우와 `[]` 로 프로퍼티를 가져오는 경우의 차이점을 알면 도움이 될 거 같다.

#### Reference

- [devhints](https://devhints.io/es6)
- [babel](https://babeljs.io/docs/en/learn/#arrows-and-lexical-this)
