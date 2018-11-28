# Template String(Back Tick)

**Babel7**에 나와있는 설명을 간단히 보자면
<br/>

> Template strings provide **syntactic sugar** for constructing strings.
<br/>

:point_right: **String**을 만드는데 있어서 쉽게 해주는 문법? (너무 직역인가...)
<br/>

```js
// 기존에는 흔히 말하는 큰따옴표 작은따옴표를 사용해서 String을 만들었다. 
var str1 = "String";
var str2 = 'String';
```

```js
// 백틱도 같은 역할을 한다.
var backtickStr = `String`;
```

위에서 보면 결국에는 같은 역할을 하는데 왜 새로운 `(백틱)이 생기게 되었나
이번에는 변수에 담겨있는 내용을 String과 합쳐서 만들어보자
<br/>

```js
var str1 = "String";
var check = "It is " + str1;

check //"It isString"
```

```js
var str1 = "String";
var backtickStr = `It is ${str1}`;

backtickStr //"It isString"
```

무엇인가 다르지 않나요? 기존에 우리가 `String`을 합쳐서 표현을 하려고 한다면 `+` 연산자를 사용해서 2개를 합쳐주는 작업을 했다면,
<br/>

이제는 백틱안에 변수를 표현할 수 있는 **`${}` 표현자**를 사용했다. 이렇게 됨으로써 좀 더 쉽고 명확하게 볼 수 있다.
<br/>
<br/>

## 추가적으로 멀티라인

```js
// ES6 문법인 const
const str = `
hello
world
`

/*
    "
    hello
    world
    "
*/
```

와.... 정말 눈에 보이는데로 표현이 가능하는구나... 예전에 `String`을 연결연결해서 표현하거나 `innerHTML`을 했던 것들이 생각나네요