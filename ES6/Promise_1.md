# [ES6] Promise 1

## 콜백을 구하라

프로미스를 몇 번 사용해 보았다. 그러나 사실 이게 왜 대단한지 크게 알 수 가 없었다.
</br>

`Chaining` 이 되서 추적이 쉽다는것? `async / wait` 을 이용해서 **비동기/동기를 이동할 수 있다는 것?** 정도만 알고 있었다.
</br>
</br>

## 제어의 역전

콜백 지옥의 문제점은 **제어의 역전**이다. 믿음직하지 못한 어떤 비동기 프로그램에게 우리 프로그램의 **호출 제어권을 넘겨주어 어떤 일이 발생할 수 있다는 것이다.**
</br>

:point_right: 예를 다시 들어보자.
</br>

```javascript
solutionUtil.trackPurchase(purchaseData, function CBF() {
  // 결제데이터를 넘긴 뒤
  // 비동기적인 처리가 완료되면 콜백실행
  assignCredit(); // 결제
  goThanksPage(); // 페이지 이동
});
```

</br>

저 유틸의 `trackPurchase` 라는 함수는
</br>

- `purchaseData` 와 콜백함수 두 가지 인자를 받는다.
- 우리는 알 수 없는 어떤 로직 진행 후 완료가 되면 콜백함수를 실행한다.

</br>

이 과정의 문제점은 콜백의 실행 제어권이 저 함수에게 넘어간다는 점이다.
</br>

저 함수안에서 어떤 일이 잘못되어 콜백함수가 5 번 실행될 수 있다는 게 가장 큰 문제였다.
</br>
</br>

## 제어의 재역전

자 이제 저 제어권을 돌려받자.
</br>

콜백을 저 함수가 아니라 **우리가 실행할 수 있게 만들자는 개념이** `promise` 다.
</br>

먼저 예시를 들어보자.
</br>

1. 어떤 작업을 하려고 `foo()`라는 함수를 부른다.
2. `foo()`의 내용은 관심이 없지만 `foo()`가 끝나길 기다린다.
3. `foo()`가 끝나면 어떤 작업을 실행한다.

콜백 베이스의 코드라면 `foo()`를 실행할 때 콜백을 넘겨준다.
</br>

```javascript
foo(someData, bar(), barErr());
```

</br>

이렇게 하면 `foo()` 가 자신이 끝나면 `bar()` 를 **백그라운드**에서 실행한다. 하지만 자바스크립트에는 이벤트 방식도 존재한다.
</br>

```javascript
function foo(x) {
  // 어떤 일을 실행하고 이벤트를 반환
  return listner;
}

var evt = foo(42);

evt.on('completion', bar());
evt.on('failure', barErr());
```

이게 사실 프로미스가 실행되는 방식이다.
위의 코드를 잘 생각해보자.
</br>

`foo` 가 비동기적으로 실행되고 그 결과를 받아 `evt` 에 저장한다.
</br>

`foo(42)`가 완료되어 `evt` 에 할당되면 그걸 우리가 읽고 다음 단계를 실행한다.
</br>

콜백 패턴을 뒤집었다. 정확히 정반대이다.
**즉 제어권을 다시 역전시킨 것이다.**(제어권을 다시 나에게로)
</br>

조금 더 간단하게는

```javascript
var evt = foo(42);

bar(evt);
barErr(evt);
```

이렇게 바뀐다.
</br>
</br>

## 프로미스로

### 리스너를 프로미스로

이벤트 리스너가 아니라 프로미스로 조금만 바꿔보자.
</br>

```javascript
function foo(x) {
  // 어떤 일을 실행하고 프로미스를 반환

  return new Promise(function(resolve, reject) {});
}

var p = foo(42);

bar(p);
```

</br>

여기서 `bar` 의 내부를 보자면
</br>

```javascript
function bar(fooPromise) {
  fooPromise.then(
    function() {}, // resolve 시 작업
    function() {} // reject 시 작업
  );
}
```

</br>

이렇게 되어있을 것이다. 현대의 코드는 `then()`과 `catch()`를 많이 사용하지만 기본은 `resolve` 와 `reject` 다.
</br>

이러한 프로미스는 단 한번만 결과값이 귀결된다.
</br>

이 값은 불변성을 가져 변하지 않는다. 믿음을 준다.(믿음성)
</br>

단 한번만 결과값이 도출되기에 여러번 호출하지 않고, 값이 변하지 않기 때문에 그 결과로 다른 로직에 이용되도 같은 결과가 도출된다.
</br>

또한 **에러가 발생하더라도 프로그램의 흐름은 멈추지 않는다.** 그냥 예외가 되었기에 **버림콜백(reject)**로 진행한다.

그렇다면 프로미스가 과연 믿음직스러운건가?? 아직 조금 부족하다.
