# Currying 만드는 법 :computer:

함수형 프로그래밍을 간단하게 정리를 하면서 언급이 되었던 **커링** 이다. 함수형 프로그래밍에서 순수함수로 작성된 함수를 여러개를 한번에 사용하기 위해서는 커링을 만들어서 사용한다고 했다.

</br>

이번에는 커링을 만드는 방법이라는 블로그가 있어서 읽어보면서 간단하게 정리를 하였다.

</br>
</br>

## 커링이란 :question:

> 다중 인수를 갖는 함수를 **단일 인수를 갖는 함수들의 함수열로 바꾸는 것을 말한다.** 모지즈 쇤핑클에 의해 도입 되었고, 이후 하스켈 커리에 의해 발전하였다. <- 무슨말을 이렇게 거창하게 할 수 있나?

</br>

쉬운 말로하자면, 우리가 기본적으로 함수를 만들면 여러개의 인자를 가지는 함수를 만들게 된다. 그러나 여기서 **커링은 단일인자를 가지는 함수들로 연결을 하자는 것이다.** 여기서 제일 중요한 것은 **연결!!**

```typescript

let sum = function (x, y) {
    return x + y;
};
console.log(sum(5, 7)); // 12
```

</br>

```typescript
let sum = function (x) {
    return function (y) {
        return x + y; // use Closure
    }
};

console.log(sum(5)(7)); // result : 12
```

위의 코드를 아래쪽으로 변경을 했다. 아래를 보게 되면 우리가 흔히 많이 알고 있는 Closure를 사용해서 인자를 하나씩 2번 받도록하는 기능을 추가 했다.

</br>

위의 예제처럼 사용함으로써

- 클로저
- 1급 객체 함수
- 익명 함수

가 쓰였다.

</br>

```typescript
let sum = x => y => x+y;
let sum5 = sum(5);
let sum12 = sum5(7);

console.log(sum12, sum(5)(7)); // 12 12
```

</br>

커링을 왜 해야하는것이며, **함수의 인자를 나눠서 얻는 이득이란?**

:star2: ***역시 재사용성에 좋다*** :star2:

</br>
</br>

```typescript
let printInfo = function(group, name){
    console.log(group + ', ' + name);
};

printInfo('developer', 'haegul'); // developer, haegul
```

</br>

```typescript
// print
printInfo('developer', 'haegul'); // developer, haegul
printInfo('developer', 'jiwon'); // developer, jiwon
printInfo('developer', 'sungcheon'); // developer, sungcheon
```

</br>
</br>

### 위의 코드를 재사용성을 높인다면:question:

```typescript
// currying
let printInfo = group => name => console.log(group + ', ' + name);
let devGroup = printInfo('developer'); // 이전의 1개의 항목을 넣어 놓는다.

devGroup('haegul'); // developer, haegul
devGroup('jiwon'); // developer, jiwon
devGroup('sungcheon'); // developer, sungcheon
```

</br>

```typescript
let greetDeeplyCurried = greeting => separator => emphasis => name => console.log(greeting + separator + name + emphasis); // 커링 구현

//위를 바탕으로 직접 사용을 해본다. 
let greetAwkwardly = greetDeeplyCurried("Hello")("...")("?");

greetAwkwardly("haegul"); // Hello...haegul?

let sayHello = greetDeeplyCurried("Hello")(", ");

sayHello(".")("haegul"); // Hello, haegul.

let askHello = sayHello("?");

askHello("haegul"); // Hello, haegul?
```

</br>
</br>

## call, apply

기본적으로 자바스크립트에서는 커리함수를 지원하지 않는다. 그렇다면 전통적인 방법으로 사용을 한다고 하면 `call, apply`를 사용하는 것이다.

```typescript
var curry = function(uncurried) {
    var parameters = Array.prototype.slice.call(arguments, 1);
    return function() {
        return uncurried.apply(this, parameters.concat(
            Array.prototype.slice.call(arguments, 0)
        ));
    };
};
```

</br>
</br>

## Usage

### Function.prototype.bind

```typescript
function add(x, y) {
 return x+y;
}

let increment = add.bind(undefined, 1);

console.log(increment(4) === 5); // true
```

</br>
</br>

### Redux

react-redux에서 사용하는 `connect()` 함수가 순수 커리 함수로 구현되어 있다.

```javascript
// connect
export default connect()(TodoApp)

// connect with action creators
import * as actionCreators from './actionCreators'
export default connect(null, actionCreators)(TodoApp)

// connect with state
export default connect(state => state)(TodoApp)
```

</br>
</br>

### Vuex

Vuex에서 사용하는 getters에서 인자로 넘겨받을때 currying를 이용한다.

```javascript
getters: {
// ...
getTodoById: (state, getters) => (id) => {
    return state.todos.find(todo => todo.id === id) }}
    store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

</br>
</br>

### Event Handler

event handler에서 이런식으로 커링을 사용할 수도 있다.

```javascript
// reactconst handleChange = (fieldName) => (event) => {aveField(fieldName, event.target.value)}<input type="text" onChange={handleChange('email')} ... />
Rendering HTML
Rendering 함수를 만들때 다음과 같이 재사용할수도 있다.

renderHtmlTag = tagName => content => `<${tagName}>${content}</${tagName}>`
renderDiv = renderHtmlTag('div')
renderH1 = renderHtmlTag('h1')
console.log(
renderDiv('this is a really cool div'),
renderH1('and this is an even cooler h1')
)
```

</br>
</br>

### Rendering HTML

Rendering 함수를 만들때 다음과 같이 재사용할수도 있다.

```javascript
renderHtmlTag = tagName => content => `<${tagName}>${content}</${tagName}>`
renderDiv = renderHtmlTag('div')
renderH1 = renderHtmlTag('h1')

console.log(
  renderDiv('this is a really cool div'),
  renderH1('and this is an even cooler h1')
)
```
</br>
</br>

## 참고

- [함수형 프로그래밍](https://github.com/SeonHyungJo/FrontEnd-Dev/tree/master/Functional_Programming)
- [커링을 만드는 방법](https://medium.com/@la.place/currying-hello-world-ce452b988f2b)