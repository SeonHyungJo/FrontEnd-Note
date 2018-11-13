# Functinonal Programming V2

> 작성한지 2달만에 새롭게 알게되고 잘못알고 있던 내용을 리마인드하는 차원에서 버전업 진행(version 2)

<div align=center>

![Main_pic](https://github.com/SeonHyungJo/FrontEnd-Dev/blob/master/assets/image/Functional_Programming_Main.png?raw=true)

</div>

</br>
</br>

## :speech_balloon: Contents

- [What is it?](#introduction)
- [Funtional Programming](#Funtional-Programming)
  - [Pure Function](#순수함수)
  - [Immutable Data](#immutable-data)
- [HOC & Currying :question:](#why-we-use-it-again)

</br>
</br>

## Introduction

많은 함수형 프로그래밍관련 책들이 나오고 있다. 그렇다고 최신 개념도 아니다. 나온 것은 오래되었다. 왜 사람들은 함수형에 집착을 하는가?
</br>

> 함수형 프로그래밍은 반응형 프로그래밍(즉, Reactive programming)에서 활용이 되어 더욱이 선행학습으로 좋다고 생각했다.

</br>
</br>

## Funtional Programming

### 함수형 프로그래밍(Functional Programming)

함수형 프로그래밍은 **순수한 함수를 작성**하고,
공유된 상태와 변경 가능한 데이터 및 부작용을 피하여 소프트웨어를 작성하는 프로세스이다.

- 먼저, 모든 것은 ***1급객체*** 이다.
- 4가지 특징
  - :star: 순수함수
  - :star::star: Immutable Data(불변하는 데이터)

> 콜백이나 옵저버 패턴이 스레드에 안전하지 않은 이유는 같은 자원에 여러 스레드가 Race condition(경쟁조건)에 빠지게 되었을 때 알 수 없는 결과가 나오기 때문이다

</br>
</br>

## 모든 것은 ***1급객체***

`String`, `Int`, `Char`, `Float`에 `Function`까지 객체인 것이다.

1. 객체를 변수나 데이터에 할당가능
2. 파라미터로 전달가능,
3. 결과 값으로 반환이 가능하다.

위와 같이 3가지를 만족하는 객체를 **1급객체**라고 한다.

</br>
</br>

## 순수함수

**먼저** 순수함수란:question:
</br>

함수형 프로그래밍에서 중요한 핵심은 함수는 **부작용(side effect)** 이 없어야 하며(항상 같은 값을 리턴한다.)
</br>

외부의 상태에 종속되지 않아야 한다.(외부의 상태를 변경하지 않는 함수)
</br>

1. 순수 함수는 같은 입력 값을 넣었을 때 항상 같은 출력 값을 반환한다.

```js

    function add(x){
        return 10 + x;
    }

```

2. 유용한 순수 함수는 최소 한 개의 매개변수를 가진다.

```js

    function(func){
        func();
    }

```

3. 유용한 순수 함수는 반드시 무엇인가를 반환한다.

```javascript

    return func(){};

```

**함수형 프로그래밍은 단순히 순수 함수를 작성하는 게 아니다.**

함수형 프로그래밍은 **부작용을 제거할 수 없다.** 단지 그 부작용을 제어할 수 있을 뿐이다.
</br>

목표는 비 순수한 코드를 최소한으로 줄이는 것이고, 그것들을 순수 함수로부터 구분을 하여 별도 공간에 분리시키는 것이다.

</br>
</br>

## Immutable Data

함수형 프로그래밍을 특징 중 하나는 바로 immutable data(불변의 데이터)

> 예를 들어 List를 만든다고하자, 그렇다면 우리는 당연히 List에 추가 / 삭제가 일어나게 되면 기존의 List에 추가를 하려고 한다.
</br>

그러나 이것은 기존의 List는 그대로 유지를 하되, 추가 또는 삭제가 일어나면 새로운 List를 만들어 return 한다. (이러한 자료구조를 Persistent Data Structure라고 한다.) 성능상에 문제가 있을 거라고 생각을 한다.
</br>

:fire: 프로그래머가 바꾸고자하는 변수 외에는 바뀌어서는 안된다는 뜻으로 **즉 원본 데이터는 불변해야한다.** :fire:
</br>

우리는 코딩을 하다보면 당연하게 아래의 3가지를 사용한다.
</br>

- 분기문(if ~ else ~)
- 반복문(for, while...)
- 변수(var)

</br>

함수 반복은 **변함(Mutability)** 을 요구한다. 그렇기 때문에 좋지 않다.
</br>

:point_right: 이에 반복문을 사용하는 것보다는 재귀를 사용해서 반복을 처리해야한다.
</br>

재귀에도 장점만 있는 것이 아니다. 재귀의 깊이가 길어지게 되면, 당연하게 `stack`이 많이 쌓이게 되어 `stack over flow`가 오게 된다.
</br>

:question: 그렇다면 다른 방법은 없는 것인가 :question:
</br>

:star2: :star2: 고차함수를 이용하자. :star2: :star2:
</br>
</br>

## 고차함수(HOF)

> 함수형 프로그래밍에서는 함수가 1급객체이다. 다른 말로 함수는 또 다른 값일 뿐이다.
</br>

`HOC(Higher Order Functions)`는 **다른 함수를 인자로 사용하거나 함수를 반환하는 함수, 또는 두 가지 특징을 모두 가진 함수**이다.
</br>

```js
const isEven = x => !(x % 2);

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter(isEven);

console.log(evenNumbers); // 2, 4, 6, 8, 10
```

`map`, `filter`, `reduce` 각각의 함수는 `boilerplate`,  `for-loop`의 반복 없이 일반적인 배열의 조작을 가능하게 한다. **중요한 점은 Return값으로 기존 데이터를 넘기는 것이 아닌 새로 만들어서 Return 해준다.**
</br>

> 고차함수는 함수를 매개변수로 받을 뿐만 아니라 함수를 반환하기도 한다.

</br>

[:point_right: map, reduce, filter에 대해 알아보기](https://seonhyungjo.github.io/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A0%95%EB%A6%AC-2/)

</br>

고차함수는 함수를 매개변수로 받을 수 있고, 반환도 한다. 이 개념은 흔히 볼 수 있는 **클로저** 개념과 같다.
</br>

> 클로저라는 것은 **함수에 대한 참조로 인해 계속 살아있는 함수의 스코프**다.
</br>

자바스크립트에서 클로저는 문제가 있다 변수가 변할 수 있기 때문이다. 즉 봔환된 함수가 호출되는 동안은 값이 변경이 가능하다는 것이다.

:point_right: **Closure Example**

```javascript

function grandParent(g1, g2) {
    var g3 = 3;
    return function parent(p1, p2) {
        var p3 = 33;
        return function child(c1, c2) {
            var c3 = 333;
            return g1 + g2 + g3 + p1 + p2 + p3 + c1 + c2 + c3;
        };
    };
}

```

</br>
</br>

## Currying

> 여러개의 인자를 가진 함수를 호출 할 경우, 파라미터의 수보다 적은 수의 파라미터를 인자로 받으면 누락된 파라미터를 인자로 받는 기법
</br>

커링이란 함수형 프로그래밍 기법 중 **하나로 함수를 재사용하는데 유용하게 쓰일 수 있는 기법**이다.
</br>

개발자라면 누구나 한 번짜놓은 코드가 있다면 다시 만들기 귀찮아한다. 이에 2개이상의 함수를 합성?을 하여 사용하면 정말 편하다고 생각할 것이다.
</br>

```javascript

function add(x, y){
    return x + y;
}

function mult5(x){
    return x * 5
}

var mult5AfterAdd10 = value => mult5(add(10));

```

위의 예시는 어떤 값을 넣어서 10을 더하고 5를 곱하는 합성함수이다.
그러나 내가 생각한대로 작동을 안한다. 이유는 당연히 `add()`에서는 2개의 인자를 받아야하는데 2개를 받아서 그런다.
</br>

> 커링 함수는 한 번에 오직 **1개의 매개변수만 받는 함수**다.
</br>

그런데 커링함수라 함은 1개의 매개변수만 받는 함수이다. 그렇다면 먼저 첫번째 매개변수를 받고, 나중에 나머지 한개를 받도록 하면되지 않을까?

```javascript

function add(x){
    return function(y){
        return x + y
    };
}

// arrow function으로 한다면 이런 형태일 것이다.
var add = x => y => x + y

add(10)(5)

```

위에처럼 `add(10)(5)`처럼 하나씩 분리해서 받는 기법이 `커링`이다.
</br>

이러한 기법은 여러 파라미터를 한번에 받지않고 부분적으로 받은 후 함수의 실행을 늦출 수 있다고 한다. (전체가 아닌 부분적으로 파라미터를 받는다고 해서 함수가 실행되지 않는다)

</br>
</br>

## Why we use it again

> 멀티코어가 기본이 되면서 ‘동시성' 처리에 함수형 프로그래밍이 강점을 보이기 때문이 아닐까.
</br>

멀티 쓰레드 프로그래밍이 불과 몇 년전까지도 가능한 피해야 할 문제였다면 이제는 반드시 고려해야 하는 기본이 되었다.
</br>

> 그러나 아직 보통의 많은 개발자들은 어려워한다. 준비가 덜 되어 있다.  
</br>

가장 본질적인 장점은 `side-effect`에 의존한 코드에 비해 유지보수가 용이하다는 점, 코드를 이해하기 수월하다는 점이 있을 것이다.

</br>
</br>

## 참고 사이트

> version 2

- [다시 볼만한](https://wonism.github.io/what-is-fp/)
- [medium](https://medium.com/@lazysoul/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%B4%EB%9E%80-d881230f2a5e)
- [1급객체란](https://medium.com/@lazysoul/functional-programming-%EC%97%90%EC%84%9C-1%EA%B8%89-%EA%B0%9D%EC%B2%B4%EB%9E%80-ba1aeb048059)

</br>
</br>

---
---

## :unlock: 번외

### :heavy_plus_sign: 모나드란?

[모나드 참고사이트](https://www.haruair.com/blog/2986)

모나드는 순서가 있는 연산을 처리하는데 사용하는 디자인패턴이다.
</br>
모나드는 타입으로 감싸 빈 값을 자동으로 전파하거나 또는 비동기 코드를 단순화하는 등의 행동을 추가하는 역할을 한다.

</br>
</br>

### :heavy_plus_sign: Immutable js

자바스크립트에서 Immutable하게 만들어주는 라이브러리

</br>
</br>

### :heavy_plus_sign: 반응형 프로그래밍(Reactive Programming)

- **명령형 프로그래밍의 반대말** 이다.
- **데이터의 흐름에서 시작** 된다.

