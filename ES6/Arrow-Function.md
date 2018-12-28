# Arrow Function

**ECMA2015** 즉, ES6에 추가된 `Arrow Function` 말그대로 화살표 함수이다. 간단하게 기존의 함수와 비교를 해보자

</br>

```js
// Quiz1
var foo = {
    a: function() {
        console.log(this);
    }
}
foo.a() // What's the output?

// Quiz2
var bar = {
    b: () => {
        console.log(this);
    }
}
bar.b() // What's the output?
```

</br>

위의 결과는 `foo.a()`는 `function()` 안쪽이 나오게 되고 `bar.b()`는 `window`가 나오게 된다.
</br>

위에서는 왜 이런 결과가 나오게 된 걸까?
</br>
</br>

## 기본 문법

:point_right: 간단한 `Arrow Function` 예시
</br>

```js
var names = () => 'Harry';
var square = x => x * x;
var nothing = (x, y) => {x + y}
var printAll = (x, y, z) => {
    console.log(x);
    console.log(y);
    console.log(z);
}

names() // "Harry"
square(5) // 25
nothing(1, 2) // undefined
printAll('a', 'b', 'c') // logs a, b, c
```

</br>

`Arrow function`의 기본형태는  `() => {};` 이다.
</br>

여기서 매개변수가 1개라면 2번째처럼 소괄호를 생략 가능하다.
</br>

또한 중괄호가 없는 것들이 있는데 이러한 것들은 따로 `return`을 적어주지 않더라도 `return`하는 것들이다.
</br>

그래서 중괄호가 있을 경우에 `return`을 하려면 꼭 `return`을 써줘야 한다.
그렇지 않을 경우 3번째 처럼 `undefined`가 나온다.
</br>
</br>

## :star: Arrow Function의 없는 3가지 :star:

### **함수이름**

Arrow function의 기본 모양은 위에서처럼 `() => {}`형태이다.
</br>

기본적으로 우리가 함수를 만들때 사용하는 모양인
</br>

```js
function foo(){
    console.log("foo");
}

var foo = () => {
    console.log("foo");
}
```

위의 같은 형태를 가진다.
</br>

> **항상 익명함수로 만들어 진다.**
</br>

그러면 어떻게 사용하나?
</br>

우리가 흔히 사용하는 방법중에 하나인 변수에 담아서 사용하는 것이다.
</br>
</br>

### **This**

함수라 함은 기본적으로 자신은 `scope`를 가지고 그에 따라 자신이 담겨있는 `this`를 가진다.
</br>

그런데 얘는 `this`가 존재하지 않는다.
</br>

다른말로 하자면 자신만의 `scope`가 존재하지 않는다는 의미가 될 수 있다.
</br>

그렇기 때문에 `bind, call, apply`가 불가능하다.
</br>

```js
var foo = {
    bar: function() {
        setTimeout(() => {
            console.log(this);
        }, 100);
    }
}


foo.bar() // logs foo
```

</br>

이제 `Arrow Function`안에서의 `this`는 없다 :exclamation:
</br>

그렇다면 당연하게 상위의 함수의 변수명이 같은 `this`를 가져와서 사용한다.
</br>

그렇다면 또 상위의 `this`가 없다면 당연히 상위로 이동을 하여 최종적으로 `window`까지 갈 수 있다.
</br>

```js
var foo = () => {
    bar : "bar"
}

var bar = new foo(); //foo is not a constructor
```

위를 보게 되면 `foo`를 `new`로 만들수가 없다. 이 역시 `this`가 없어서 **생성자로 사용할 수 없다.**
</br>

그렇다면 당연하게 `prototype`도 존재하지 않는 것이다.
</br>
</br>

### **arguments**

```js
function foo(){
    console.log(arguments);
}
foo(1,2,3,4) //Arguments(4) [1, 2, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

> 여기서 iterator를 보게 되다니
</br>

`arguments`는 가변인자로 `argument`를 따로 선언하지 않더라도 사용할 수 있다.
</br>

```js
var foo = () => {
    console.log(arguments);
}
foo(1,2,3,4); //arguments is not defined
```

</br>

그러나 `Arrow Function`에서는 사용이 불가하다.
</br>

대신에 다른 방법이 있다. 바로 `spread operator`(전개 연산자)
</br>

```js
var foo = (...args) => {
    console.log(args);
}

foo(1,2,3,4); //arguments is not defined
```

</br>
</br>

## 결론

이제는 `this`가 어떤 아이인지 명확히 알 수 있는 기회가 생기고 간단하게? 함수를 만들 수있는 기회가 생겼다. 모두들 즐겁게 코딩을 해보자 그러나 상황에 맞게 잘 사용하자.
