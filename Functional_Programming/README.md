<div align=center>

![Main_pic](https://github.com/SeonHyungJo/FrontEnd-Dev/blob/functional/assets/image/Functional_Programming_Main.png?raw=true)

</div>

</br>
</br>

## :speech_balloon: Contents

- [Introduction](#introduction)
- [OOP vs Functional](#oop-vs-functional)
    - :boom: 간단한 차이점
- [What is Funtional Programming :question:](#what-is-funtional-programming)
    - [Immutable Data](#immutable-data)
    - [First-class Function](#first-class-function)
- [Why we use it again :question:](#why-we-use-it-again)

</br>
</br>

## Introduction

많은 함수형 프로그래밍관련 책들이 나오고 있다. 그렇다고 최신 개념도 아니다. 나온 것은 오래되었다. 그런데 왜 다시 주목을 받고 있을까?

</br>

> 함수형 프로그래밍은 반응형 프로그래밍(즉, Reactive programming)에서 활용이 되어 더욱이 선행학습으로 좋다고 생각했다.

</br>
</br>

## OOP vs Functional

Java를 했던 사람은 당연하게 `OOP`에 익숙할 것이다. 그러나 지금 정리하려고 하는 `Functional`하고는 다르다고 생각하면 된다.
</br>
객체지향은 말 그대로 모든 것을 객체를 기반으로 만들어지고 돌아간다. 그러나 함수형은 모든 것은 함수(순수함수)를 기반으로 돌아가게 된다.
</br>

### :warning: OOP(진행중_예제필요)

Interface or Absract를 생성 :arrow_right:
</br>
해당 추상객체를 바탕으로 기능 구현 :arrow_right:
</br>
객체를 상속 받아서 객체에 따라 추가 기능 구현
</br>
</br>

### :warning: Functional(진행중)

함수 생성 :arrow_right:
</br>
객체 생성 객체에서 함수를 받아서 해당 기능 사용 :arrow_right:
</br>
최상위 함수에 기능 추가
</br>
</br>

## What is Funtional Programming

### 함수형 프로그래밍(Functional Programming)

- 먼저, 모든 것은 ***객체*** 이다.
- 2가지 큰 특징
    - :star: Immutable Data(불변하는 데이터)
    - :star::star: First-Class Function(1급 객체 || 순수함수)

</br>

### Immutable Data

함수형 프로그래밍을 가능하게 하는 요소 중 하나가 바로 immutable data(불변의 데이터)

> 예를 들어 List를 만든다고하자, 그렇다면 우리는 당연히 List에 추가 / 삭제가 일어나게 되면 기존의 List에 추가를 하려고 한다. <br> 그러나 이것은 기존의 List는 그대로 유지를 하되, 추가 또는 삭제가 일어나면 새로운 List를 만들어 return 한다. (이러한 자료구조를 Persistent Data Structure라고 한다.) 성능상에 문제가 있을 거라고 생각을 한다. 그러나 그렇지 않다??

:fire: 프로그래머가 바꾸고자하는 변수 외에는 바뀌어서는 안된다는 뜻, **즉 원본 데이터는 불변해야한다.** :fire:

우리는 코딩을 하다보면 당연하게 아래의 3가지를 사용한다.

- 분기문(if ~ else ~)
- 반복문(for, while...)
- 변수(var)

</br>

그러나 함수 반복은 **변함(Mutability)** 을 요구한다. 그렇기 때문에 좋지 않다.

이에 반복문을 사용하는 것보다는 재귀를 사용해서 반복을 처리해야한다. 그러나 재귀에도 장점만 있는 것이 아니다. 재귀의 깊이가 길어지게 되면, 당연하게 `stack`이 많이 쌓이게 되어 `stack over flow`가 오게 된다.
</br>

:question:그렇다면 다른 방법은 없는 것인가:question:
</br>

:star2: :star2: 고차함수를 이용하자.

우리가 잘 알고있는 `map`, `reduce`, `filter`가 여기에 속한다. 이 내용까지는 담기에 내용이 많아 링크를 걸어두었습니다.

`map`, `filter`, `reduce` 각각의 함수는 `boilerplate`,  `for-loop`의 반복 없이 일반적인 배열의 조작을 가능하게 한다. **중요한 점은 Return값으로 기존 데이터를 넘기는 것이 아닌 새로 만들어서 Return 해준다.**
</br>

[:point_right: map, reduce, filter에 대해 알아보기](https://seonhyungjo.github.io/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A0%95%EB%A6%AC-2/)
</br>

</br>

### First Class Function

**먼저** 1급객체 함수란 무엇일까:question:

1. 변수나 데이터에 할당 할 수 있어야 한다.

```

    var user = function(){}

```

2. 객체의 인자로 넘길 수 있어야 한다.

```

    function(func){
        func();
    }

```

3. 객체를 객체의 리턴값으로 리턴 할 수 있어야 한다.

```

    return func(){};

```
</br>

#### 예제 :interrobang:

```

    // 1급객체
    var z = 10;
    function add(x, y) {
        return x + y;
    }

    // 매개변수가 없어 1급객체가 아니다.
    function justTen() {
        return 10;
    }

    // 아무것도 반환을 하지 않으면 1급객체가 아니다.
    function addNoReturn(x, y) {
        var z = x + y
    }

```

</br>
</br>

## Why we use it again

> 멀티코어가 기본이 되면서 ‘동시성' 처리에 함수형 프로그래밍이 강점을 보이기 때문이 아닐까.
멀티 쓰레드 프로그래밍이 불과 몇 년전까지도 가능한 피해야 할 문제였다면 이제는 반드시 고려해야 하는 기본이 되었다.
</br>
> 그러나 아직 보통의 많은 개발자들은 어려워한다. 준비가 덜 되어 있다.  

가장 본질적인 장점은 `side-effect`에 의존한 코드에 비해 유지보수가 용이하다는 점, 코드를 이해하기 수월하다는 점이 있을 것이다.

</br>
</br>

## 참고 사이트

- [jooyunghan_medium](https://medium.com/@jooyunghan/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%86%8C%EA%B0%9C-5998a3d66377)

- [JaeYeopHan_github](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/Development_common_sense#object-oriented-programming)

- [kakao tech](http://tech.kakao.com/2016/03/03/monad-programming-with-scala-future/)

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