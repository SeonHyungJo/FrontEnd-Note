# [ES3]ECMA-262-3 Closure

프로그래밍 패터다임중에 하나로 함수형 프로그래밍이 있다. 
<br/>

흔히 함수형 언어에서 함수는 데이터다. 
<br/>

초기 `js`가 만들어질 때 함수형의 영향을 어느정도 받았다고 한다. 그래서 함수형과 비슷한점이 존재한다. 
<br/>

즉 함수를 변수에 할당할 수 있고, 다른 함수에 인자로 전달할 수 있으며, 함수의 결과로 반환할 수 있다.
<br/>

## 정의 

> 함수 전달인자(Funarg)는 값이 함수인 전달인자다.
<br/>

```js
function exampleFunc(funArg) {
    funArg();
}

// 인자로 함수를 넘기고 있음
exampleFunc(function () {
    alert('funArg');
});
```

전달인자로 다른 함수를 받는 함수를 **고차함수**(`HOF`, `High Order Function`)라고 한다.
<br/>

리액트를 하다보면 `HOF`로 구현을 하는 방법론이 나온다. 그 이야기의 시작은 여기라고 생각한다.
<br/>

고차함수(`HOF, High Order Function`)는 기능적, 수학적으로 연산자로 볼 수 있다. 
<br/>

위 예제의 `exampleFunc` 함수는 **고차 함수** 이다.
함수를 전달인자로 넘길 수 있을 뿐만 아니라, 다른 함수의 결과 값으로 함수를 반환할 수도 있다.

```js
(function functionValued() {
  return function () {
    alert('returned function is called');
  };
})()();// 함수로 반환한 것을 실행시키고 있다.
```

함수를 일반적인 데이터로 취급을 하고 있다.
<br/>

함수를 전달하고 함수를 전달자로 받을수 있으며, 함수 값을 반환할 수 있는 함수를 일급객체라 한다.
<br/>

## 일급객체(First Class)
 
`ECMAScript` 의 모든 함수는 **일급 객체**다. 자기 자신을 전달인자로 받는 함수를 **자기 응용 함수**라고 부른다..

```js
(function selfApplicative(funArg) {

  if (funArg && funArg === selfApplicative) {
    alert('self-applicative');
    return;
  }

  // 자기 자신을 반환한다.
  // 전에도 말했지만 자신안에서 자신을 부를 수 있다.
  selfApplicative(selfApplicative);
})();
```

자기 자신을 반환하는 함수를 **자기 복제 함수**라고 한다. 어느곳에서는 **자가 증식**이라고 말하기도 한다고 한다.

```js
(function selfReplicative() {
    return selfReplicative;
})();
```

자기 복제 함수를 호출할 때는 인자로 콜렉션 전체가 아닌 각각의 **원소를 하나씩 전달한다.**
<br/>

```js
// 콜렉션 자체를 매개변수로 받아서 처리하는 함수
function registerModes(modes) {
    // 인자로 전달받은 배열 modes를 순회하면서 각각의 모드를 등록한다.
    modes.forEach(registerMode, modes);
}

// 사용법
registerModes(['roster', 'accounts', 'groups']);

// 자기 복제 함수
function modes(mode) {
  registerMode(mode); // 하나의 모드를 등록한다.
  return modes; // 함수 자신을 반환한다.
}
// 사용법: 인자로 콜렉션 전체가 아닌 각각의 원소를 하나씩 전달한다.
modes
  ('roster')
  ('accounts')
  ('groups')
```

이렇게 함수를 호출할 수 있지만, 콜렉션 전체를 전달하는 방식이 더 효율적이고 직관적일 수 있다.
<br/>

물론 함수 실행 시점에 전달인자로 넘기는 함수의 지역 변수에 접근할 수 있다. 콘텍스트에 진입할 때마다 콘텍스트 내부의 데이터 보관용 변수 객체를 만들기 때문이다.
<br/>

```js
function testFn(funArg) {
    // funarg 실행 시점에,
    // 지역 변수 "localVar"를 이용할 수 있다.
    funArg(10); // 20
    funArg(20); // 30
}

testFn(function (arg) {
    var localVar = 10;

    alert(arg + localVar);
});
```

하지만 `Chapter 4. Scope Chain.` 에서 봤듯이, `ECMAScript` 의 함수는 부모 함수에 속해 **부모 콘텍스트의 변수**를 사용할 수 있다. 
<br/>

이유는 당연히 `SC`에 의해서지 !!!
<br/>

이러한 특징으로 인해서 **함수 전달인자 문제(funarg problem)** 가 발생하게 된다.
<br/>

## 함수 전달인자 문제(Funarg problem)

`Stack` 지향 프로그래밍 언어는 함수를 호출할 때마다 함수의 지역 변수와 전달인자를 `Stack`에 넣는다. 그리고 함수를 종료할 때 `Stack`에서 변수를 제거한다. 
<br/>

이 모델을 적용하면 함수를 값(예를 들어, 부모 함수가 반환하는 값으로서의 함수)으로 사용하기 어렵다. – `Stack`에서 제거되면 사라지기 때문 -. 대게 함수가 자유 변수를 사용할 때 이런 문제가 발생한다.
<br/>

자유 변수는 함수가 사용하는 변수 중, 파라미터와 함수의 지역 변수를 제외한 변수를 말한다. 
<br/>

```js
function testFn() {
 var localVar = 10;

 function innerFn(innerParam) {
   alert(innerParam + localVar);
 }
 return innerFn;
}
var someFn = testFn();
someFn(20); // 30
```

이 예제의 `localVar`는 `innerFn` 함수가 사용하는 자유 변수다. `Stack` 지향 모델이라고 가정해보면
<br/>

`testFn` 함수를 종료하면서 모든 지역 변수를 스택에서 제거할 것이고, 때문에 외부에서 `innerFn` 함수를 실행하려고 할 때(즉 `someFn`을 사용하려고 하면 `localvar`는 이미 사라졌으므로) 에러가 발생할 것이다.
<br/>

또한 위의 예처럼 `innerFn`함수를 반환하는 것이 아예 불가능하다. `innerFn` 함수가 `testFn`의 지역에 있기 때문에 `testFn` 함수가 종료되면서 `innerFn` 함수도 사라진다는 것이다.
<br/>

동적 스코프를 이용하는 시스템에서 함수를 전달인자로 넘길 때 함수 객체가 갖고 있는 다른 문제가 일어난다.
<br/>

```js
var z = 10;

function foo() {
 alert(z);
}

foo(); // 10 - 정적 스코프와 동적 스코프를 둘다 사용

(function () {
 var z = 20;
 foo(); // 10 – 정적 스코프, 20 – 동적 스코프
})();

// 전달인자로 foo를 넘기는 것과 같다.
(function (funArg) {
 var z = 30;
 funArg(); // 10 – 정적 스코프, 30 – 동적 스코프
})(foo);
```

동적 스코프인 경우에는 동적(활동적) 스택을 이용해 변수를 처리한다. 결국 함수를 생성할 때 함수에 저장한 정적(어휘적) 스코프 체인이 아닌, 현재 실행중인 함수의 동적 스코프 체인에서 자유 변수를 찾는다. 이는 모호한 상황을 만든다. 
<br/>

예를 들어 지역 변수를 스택에서 제거하는 이전 예제와는 달리  `z`가 계속해서 살아있는 경우, 콘텍스트의 `z`를 사용해야할지 아니면 스코프의 `z`를 사용해야할지 알 수 없다.
<br/>

지금까지 함수가 함수를 값으로 반환하거나(`upward funarg`), 함수를 다른 함수에 전달인자로 전달할 때(`downward funarg`) 생기는 2가지 유형의 함수 전달인자 문제(`funarg problem`)를 알아봤다. 
<br/>

클로저는 이러한 문제(및 서브타입)를 해결하기 위해 나온 개념이다.
<br/>

## 클로저(Closure)

> 클로저는 코드 블럭과 이 코드 블럭을 생성한 콘텍스트가 갖고 있는 데이터의 조합이다.

```js
var x = 20;

function foo() {
 alert(x); // 자유 변수 "x" == 20
}
// foo의 클로저
fooClosure = {
 call: foo // 함수를 참조
 lexicalEnvironment: {x: 20} // 자유 변수 검색을 위한 콘텍스트
};
```

위의 예제의 `fooClosure`는 물론 의사 코드다. `ECMAScript` 코드라면 `foo` 함수는 자신을 생성한 콘텍스트의 스코프 체인을 내부 속성으로 가질 것이다.
<br/>

종종 어휘적이라는 단어를 생략하기도 하지만, 위 예제의 경우 클로저가 자기 부모의 변수를 소스 코드 내의 어휘적 위치에서 저장한다는 사실에 관심을 집중하자.  
<br/>

다음에 함수를 실행하면 저장한 콘텍스트 내에서 자유 변수를 검색한다. 위의 예제를 통해 `ECMAScript`에서는 변수 `z`가 항상 `10`인 것을 알 수 있다.
<br/>

위에서 클로저를 정의할 때  코드 블록이라는 일반화 한 개념을 사용했지만, 보통 함수라는 용어를 사용한다. 
<br/>

하지만 오로지 함수만 클로저와 관련있는 것은 아니다. 
<br/>

구현에 대해서 이야기를 해보자면, 콘텍스트가 종료된 후에도 지역 변수를 보존하고 싶다면 스택 기반의 아키텍처는 더이상 적합하지 않다. 따라서 이 경우에는 **부모 콘텍스트의 데이터를 가비지 콜렉터(`GC`)와 참조 카운팅을 이용하는 동적 메모리 할당 방식으로 저장해야 한다(힙 기반 구현)**. 이 방식은 스택 기반 보다 느리다. 하지만 함수 안에서 자유 변수를 사용할지 판단하고 이 결정에 따라 스택이나 힙에 데이터를 배치하는 과정을 스크립트 엔진이 해석 시점에 최적화 할 수 있다.
<br/>

## ECMAScript의 클로저 구현(ECMAScript closures implementation)

앞에서 이론적인 이야기를 하면서 마지막에 `ECMAScript`의 클로저를 언급했다. `ECMAScript`는 오직 정적(어휘적) 스코프만 사용한다는 사실을 명심하자(Perl 같은 일부 언어는 변수를 정적, 동적 스코프 두 가지 방식으로 선언할 수 있음).
<br/>

```js
var x = 10;

function foo() {
 alert(x);
}

(function (funArg) {
 var x = 20;
 // funArg는 변수 x를 자신이 선언된 어휘적 콘텍스트에
 // 정적으로 저장한다.
 // 따라서,
 funArg(); // 10, but not 20
})(foo);
```

기술적으로, 부모 콘텍스트의 변수는 함수 내부의 `[[Scope]]` 프로퍼티에 저장된다. `Chapter 4`에서 이야기했던 `[[Scope]]`와 스코프 체인을 완벽하게 이해했다면 `ECMAScript`의 클로저를 쉽게 이해할 수 있다.
<br/>

함수 생성 알고리즘에 나와있듯이 `ECMAScript`의 함수는 부모 콘텍스트의 스코프 체인을 가지고 있기 때문에 모든 함수는 클로저다. 함수의 이후  실행 여부와는 상관없이 함수 생성 시점에 부모의 스코프를 함수의 내부 속성에 저장한다.
<br/>

```js
var x = 10;

function foo() {
 alert(x);
}

// foo는 클로저다.
foo: <FunctionObject> = {
 [[Call]]: <code block of foo>,
 [[Scope]]: [
   global: {
     x: 10
   }
 ],
 ... // 다른 프로퍼티들
};
```

앞에서 언급했듯이, 함수가 자유 변수를 사용하지 않는 경우에는 성능 최적화를 위해 `JavaScript` 엔진이 부모 스코프 체인을 함수 내부에 저장하지 않을 수도 있다. 

그러나 `ECMA-262-3` 스펙은 이에 대해서 언급하고 있지 않다. 따라서 공식적으로(그리고 기술적 알고리즘에 따라) 모든 함수는 생성 시점에 `[[Scope]]` 프로퍼티에 스코프 체인을 저장한다.

일부 엔진은 사용자가 클로저 스코프에 직접 접근하는 것을 허용한다.

## `[[Scope]]` 공유(One [[Scope]] value for “them all”)

`ECMAScript`에서 같은 부모 콘텍스트에서 만들어진 여러 중첩 함수는 같은 클로저 `[[Scope]]` 객체를 사용한다. 이는 어떤 클로저가 클로저 변수를 수정하면, 변경한 내용을 다른 클로저가 읽을 수 있다는 의미다.
<br/>

즉, 모든 중첩 함수는 같은 부모의 스코프를 공유한다.
<br/>

```js
var firstClosure;
var secondClosure;

function foo() {
 var x = 1;
 firstClosure = function () { return ++x; };
 secondClosure = function () { return --x; };
 x = 2; // 두 클로저의 [[Scope]] 안에 있는 AO["x"]에 영향을 준다.
 alert(firstClosure()); // 3. firstClosure.[[Scope]]
}

foo();

alert(firstClosure()); // 4
alert(secondClosure()); // 3
```

이와 관련해서 많은 사람들이 자주하는 실수가 있다.  모든 함수가 고유의 루프 카운터 값을 갖게 만들기 위해 루프 안에서 함수를 생성할 때, 의도하지 않은 결과를 얻는 경우가 종종 있다.
<br/>

```js
var data = [];

for (var k = 0; k < 3; k++) {
 data[k] = function () {
   alert(k);
 };
}

data[0](); // 3, 0이 아니다.
data[1](); // 3, 1이 아니다.
data[2](); // 3, 2가 아니다.
```

이전 예제에서 이 동작을 설명했다. 세 함수 모두 같은 콘텍스트의 스코프를 갖는다. 이 세 함수는 모두 `[[Scope]]` 프로퍼티를 통해 변수를 참조하여 부모 스코프에 존재하는 변수 `k`를 쉽게 변경할 수 있다.

```js
activeContext.Scope = [
 ... // 상위의 변수 객체
 {data: [...], k: 3} // 활성화 객체
];
data[0].[[Scope]] === Scope;
data[1].[[Scope]] === Scope;
data[2].[[Scope]] === Scope;
```

따라서 세 함수는 실행 시점에 변수 k에 마지막으로 할당한 값인 3을 사용한다.

## 클로저의 실제적 사용(Practical usage of closures)

실제로 클로저를 이용하면 다양한 계산을 사용자가 함수 전달인자로 정의할 수 있게 하는 우아한 설계를 할 수 있다. 예를 들어 정렬 조건를 함수 전달인자로 받는 배열 정렬 메소드가 있다.

```js
[1, 2, 3].sort(function (a, b) {
 ... // 정렬 조건
});
```

그리고 인자로 전달받은 함수를 배열의 각 원소에 적용한 결과를 갖는 새로운 배열을 만들어 돌려주는 `map` 메소드와 같은, 맵핑 고차함수(`mapping functionals`)가 있다.

```js
[1, 2, 3].map(function (element) {
 return element * 2;
}); // [2, 4, 6]
```

검색 함수를 만들 때 함수를 전달인자로 받아 거의 무제한적인 검색 조건을 정의할 수 있게 구현해 놓으면 편리하다.

```js
someCollection.find(function (element) {
 return element.someProperty == 'searchCondition';
})
```

또한, 배열을 순회하면서 각각의 원소에 함수를 적용하는 `forEach` 메소드와 같은 함수 적용 고차함수(`applying functional`)도 있다.

```js
[1, 2, 3].forEach(function (element) {
 if (element % 2 != 0) {
   alert(element);
 }
}); // 1, 3
```

함수 객체의 `apply, call` 메소드는 함수형 프로그래밍의 함수 적용 고차함수(`applying functional`)에서 유래했다.
이미 이 메소드에 대해서는 `Chapter 3. this` 에서 이야기 했으므로, 이번에는 함수를 매개변수에 전달하는 방식을 살펴본다(`apply` 는 전달인자 목록을 받고, `call` 은 전달인자를 차례로 나열한다).

```js
(function () {
 alert([].join.call(arguments, ';')); // 1;2;3
}).apply(this, [1, 2, 3]);
```

프로그래밍에서 `apply`는 데이터에 임의의 함수를 적용한다는 의미를 가진다. 만약 함수의 이름과 기능이 확정되어 있고, 그것을 알 수 있다면 함수의 이름과 파라미터 형식에 맞춰서 함수를 호출할 수 있다. 그런데 함수형 언어의 함수는 일급 객체로서 데이터로 취급할 수 있기 때문에 함수를 변수에 저장할 수 있고, 다른 함수의 인자로 전달할 수  있으며, 결과 값으로 반환할 수 있다.
<br/>

간단히 말해서 함수를 다른 곳으로 넘길 수 있다는 이야기다. 이렇게 함수를 다른 곳으로 넘겼을 때 함수를 받은 쪽에서 받은 함수를  호출할 수 있는 장치가 필요한데, 이 장치를 사용하는 것을 `apply`라고 한다. `JavaScript` 역시 함수를 일급 객체로 취급하기 때문에 함수를 `apply` 하기 위한 `call`, `apply` 메소드를 가지고 있다.
<br/>

그리고 함수들의 집합을 정의역으로 갖는 함수를 수학 용어로는 범함수(`functional`)라고 한다.
<br/>

지연 호출은 클로저의 또 다른 중요한 응용 사례다.
<br/>

```js
var a = 10;
setTimeout(function () {
 alert(a); // 10, 1초 후 실행
}, 1000);
```

```js
var x = 10;
// 예제용
xmlHttpRequestObject.onreadystatechange = function () {
 // 데이터가 준비 되었을 때, 지연 호출하는 콜백.
 // 콜백을 생성한 콘텍스트가 이미 사라졌는지와는 상관없이
 // 여기에서 변수 x에 접근할 수 있다.
 alert(x); // 10
};
```

또는 보조 객체를 감추기 위해 캡슐화 한 스코프를 만들 수 있다.

```js
var foo = {};
// 초기화
(function (object) {
 var x = 10;
 object.getX = function _getX() {
   return x;
 };
})(foo);
alert(foo.getX()); // 클로저 변수 "x"의 값은 10
```

---

#### Reference

- [chapter-6-closure](http://dmitrysoshnikov.com/ecmascript/chapter-6-Closure/)