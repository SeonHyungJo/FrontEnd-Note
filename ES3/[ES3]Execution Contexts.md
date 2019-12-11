# [ES3] Execution Contexts

## 도입

오늘은 ECMAScript의 실행 컨텍스트와 이와 관련된 코드 유형에 대해 알아보자.

## 정의

Control이 ECMAScript 실행 코드로 이동될 때마다, Control은 실행 컨텍스트으로 들어가게 된다.

> 실행 컨텍스트(EC)는 ECMA-262 specification(사양)에서 실행 코드의 유형화와 차별화를 위해 사용하는 추상적인 개념이다.

이러한 표준은 기술적인 구현 관점에서 정확한 EC의 구조와 종류를 정의하지 않았다. 이는 결국 표준을 규현하는 ECMAScript 엔진의 달렸다.

논리적으로, 활성 실행 컨텍스트 집합은 stack으로 형성된다. 이 stack의 맨 아래에는 항상 *global context*가 있고, 가장 위에는 현재(활성) 실행 컨텍스트가 있다. 다양한 종류의 EC가 드나드는동안 stack이 수정된다.(pulled/poped)

## 실행 코드의 종류

실행 컨텍스트의 추상 개념으로 *실행 코드 유형*의 개념과 관련있다. 코드 유형에 대해 말하면 특정 순간의 실행 컨텍스트를 의미할 수 있다.

예를 들어, 실행 컨텍스트 stack을 배열로 정의해보자.

```js
ECStack = [];
```

함수가 재귀적 또는 생성자로 호출되더라도 함수안으로 들어갈 때마다 stack에 push한다. 내장 `eval` 함수 작업에서도 그렇다.

## Global code

이 유형의 코드는 `Program` 수준에서 처리된다. 즉, 로드된 외부 `.js` 파일 또는 로컬 인라인 코드(`<script></script>` 태그 내부)이다. Global code는 함수 본문에 있는 코드 부분은 포함되어 있지 않다.

초기화(프로그램 시작)시 `ECStack`은 다음과 같다.

```js
ECStack = [
  globalContext
];
```

## Function code

Function code (모든 종류의 함수)안으로 들어가게 되면, `ECStack`에 새로운 요소가 추가된다. concrete Function의 Code에는 내부 Function Code가 포함되어 있지 않다.

예를 들어, 한 번 재귀적으로 호출하는 함수를 보자.

```js
(function foo(flag) {
  if (flag) {
    return;
  }
  foo(true);
})(false);
```

그러면 다음 ECStack이 다음과 같이 수정된다.

```js
// first activation of foo
ECStack = [
  <foo> functionContext
  globalContext
];
  
// recursive activation of foo
ECStack = [
  <foo> functionContext – recursively 
  <foo> functionContext
  globalContext
];
```

함수에서 모든 리턴은 현재 실행 컨텍스트를 종료하고 이에 따라 `ECStack`은 stack의 자연스러운 구현에 따라 연속적으로 거꾸로 꺼내진다. 해당 코드의 작업이 완료되면, `ECStack`은 프로그램이 종료될 때까지 `globalContext`만 가지고 있는다.

Throw 되었지만 catch 되지 않은 예외는 하나 이상의 실행 컨텍스트를 종료할 수 있다.

```js
(function foo() {
  (function bar() {
    throw 'Exit from bar and foo contexts';
  })();
})();
```

## Eval code

`eval` 코드는 매우 흥미롭다. 이 경우 *calling context*의 개념, 즉 `eval` 함수가 호출된 컨텍스트가 있다.

변수 또는 함수 정의와 같이 `eval`에 의해 수핸된 작업은 *calling context*에 영향을 준다. 

```js
// influence global context
eval('var x = 10');
 
(function foo() {
  // and here, variable "y" is
  // created in the local context
  // of "foo" function
  eval('var y = 20');
})();
  
alert(x); // 10
alert(y); // "y" is not defined
```

> Note: ES5의 strict-mode에서 `eval`은 이미 호출 컨텍스트에 영향을 미치지 않지만 대신 로컬 *sandbox*의 코드를 평가한다.

위의 예에서는 다음과 같은 `ECStack` 수정 사항이 있다.

```js
ECStack = [
  globalContext
];
  
// eval('var x = 10');
ECStack.push({
  context: evalContext,
  callingContext: globalContext
});
 
// eval exited context
ECStack.pop();
 
// foo funciton call
ECStack.push(<foo> functionContext);
 
// eval('var y = 20');
ECStack.push({
  context: evalContext,
  callingContext: <foo> functionContext
});
 
// return from eval 
ECStack.pop();
 
// return from foo
ECStack.pop();
```

즉 아주 캐주얼하고 논리적인 *call-stack*이다.

> Note: 예전 SpiderMonkey(Firefox)에서 버전 1.7까지는 `eval` 함수의 두 번째 인수로 전달할 수 있었다. 따라서 컨텍스트가 여전히 존재하면 개인 변수에 영향을 줄 수 있었다.

```js
function foo() {
  var x = 1;
  return function () { alert(x); };
};
 
var bar = foo();
 
bar(); // 1
 
eval('x = 2', bar); // pass context, influence internal var "x"
```

> 하지만 최신 엔진에서는 보안상의 이유로 수정되어 더 이상 중요하지 않다.

---

#### Reference

- (ECMA-262-3 in detail. Chapter 1. Execution Contexts)[http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/)
