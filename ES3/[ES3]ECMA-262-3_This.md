# [ES3]ECMA-262-3 This

> 실행콘텍스트가 선행되어야 합니다.

이번 주제는 `this` 키워드다. 
<br/>

사례에서 보듯이, 이 주제는 상당히 어려워서 종종 다른 실행 콘텍스트의 `this` 값을 처리할 때 이슈를 만들곤 한다.
<br/>

## 정의

`this`는 **실행 콘텍스트의 프로퍼티**다.

```js
activeExecutionContext = {
  VO: {...},
  this: thisValue // 다른 하나가 더 있다. scope, 총 3개이다.
};
```

여기의 `VO` 는 **변수 객체(Variable object)를 의미** 한다.
<br/>

`this` 는 콘텍스트의 실행 코드 타입과 직접적인 관련이 있다. 
이 값은 콘텍스트로 진입하는 과정에서 정해지며, 콘텍스트 안의 코드가 실행 중에는 변하지 않는다.
<br/>

좀 더 자세하게 들여다보자.
<br/>

전역 코드 안의 `this(This value in the global code)` 이건 정말 단순하다. 전역이니까 당연히 `this` 는 전역객체 **자신** 이 될 것이다.

```js
// 명시적인 전역 객체 프로퍼티 정의
this.a = 10; // global.a = 10
alert(a); // 10

// 규정되지 않은 식별자 할당을 이용한 암묵적 정의
b = 20;
alert(this.b); // 20

// 전역 콘텍스트의 변수 객체는 전역 객체 자신이기 때문에
// 또한 변수 선언을 이용한 암묵적 정의도 가능하다.
var c = 30;
alert(this.c); // 30
```

함수 코드 안의 `this(This value in the function code)` 이제부터가 진짜라고 할 수 있다. 함수타입의 코드의 `this` 는 함수에 정적으로 바인딩이 되지 않는다는 것이다.
<br/>

콘텍스트로 들어갈때 정해지며, 함수코드의 `this` 는 매번 바뀔 수 있다. 
<br/>

그러나 코드나 코드가 실행이 되고 `this` 는 변경이 이루어질수 없다(이 얘기는 아래에서 또 나올 것이다.) 
<br/>

즉 `this` 를 재할당하는 것이 불가능 하다는 것이다.

```js
var foo = {x: 10};
var bar = {x: 20,test: function () {   
  alert(this === bar); 
  // true   
  alert(this.x); // 20   
  this = foo; // 에러, this 값을 변경할 수 없다.   
  alert(this.x); // 
  // 만약 위에서 에러가 나지 않았다면 20이 아닌 10이 출력될 것이다.
  }
};
// 콘텍스트로 들어올 때 this가 가리키는 대상이 bar 객체로 결정된다.
// 왜 그러한지는 아래에서 자세하게 설명하겠다.
bar.test(); // true, 20
foo.test = bar.test;
// 그러나 여기의 this는 이제 foo를 참조할 것이다.  
// 심지어 같은 함수를 호출하는 데도 말이다.
foo.test(); // false, 10
```

그렇다면 어떻게 해야 this가 바뀌는 것일까??
<br/>

콘텍스트의 코드를 활성화시킨 **호출자(caller)에 의해** 제공된다. 
<br/>

즉 함수를 호출한 부모 콘텍스트가 존재한다는 것이다. 어떤 콘텍스트의 this가 참조하는 값을 어려움없이 알아내기를 원한다면 중요한 이 부분을 이해하고 기억해야 한다. 
<br/>

정확하게 호출 표현식의 형태, **즉 다른 무엇이 아닌 함수를 호출한 방법이 호출된 콘텍스트**의 `this` 값에 영향을 준다.
<br/>

> `this` 값은 함수가 어떻게 정의되었는가에 따라 정해진다. 전역 함수라면 `this` 는 전역 객체를 값으로 갖게 되고, 객체의 메서드라면 `this` 는 항상 이 객체를 값으로 갖는다.
<br/>

이건 정말 나도 많이보고 이렇게 생각했다. 그러나 아니다...(많이 당했다 크게 당했다...심지어 보통의 전역 함수도 다른 형태의 호출 표현식으로 활성화되면 `this` 값이 달라진다.

```js
function foo() {
  console.log(this);
}

foo(); // global

console.log(foo === foo.prototype.constructor); // true

foo.prototype.constructor(); // foo.prototype
```

위의 의미가 처음에는 무슨 의미인지 몰랐다. 
<br/>

그러나 `foo === foo.prototype.constructor` 이 부분을 먼저 보자면 전역함수인 `foo` 가 `foo.prototype.constructor` 가 같으므로 둘 다 전역이라고 생각할 수 있다. 
<br/>

그렇다면 `foo.prototype.constructor` 를 실행하게 되면?? 당연히 `this` 는 `global` 이 되는 것이 맞다는 것이다. 
<br/>

그런데 실질적인 결과는 다르다!! 이것과 유사하게 어떤 객체의 메서드로 정의된 함수를 호출하는 경우에 있어서도 `this` 가 달라질 수 있다.

```js
var foo = {
  bar: function () {   
    console.log(this);   
    console.log(this === foo);
  }
};

foo.bar(); // foo, true

var exampleFunc = foo.bar;
console.log(exampleFunc === foo.bar); // true

exampleFunc(); // global, false
```

이 경우도 똑같다고 생각하면 된다. `exampleFunc === foo.bar` 의 결과가 같다면 `this` 는 같은 것이 나올거라 일반적으로 생각을 할 것이다. 
<br/>

그런데!! 결과를 보게 되면 놀랍다. 
`global` 이 되는 것이다.
<br/>

그렇다면 **호출 표현식의 형태**가 어떻게 `this` 에 영향을 미칠까? 
<br/>

`this` 가 갖는 값을 결정하는 과정을 완벽하게 이해하기 위해서, 내부 타입 중에 하나인 **레퍼런스 타입(Reference type)** 에 대해서 자세하게 알 필요가 있다.
<br/>

## 레퍼런스 타입

레퍼런스 타입은 수도 코드를 이용해서 `base` (프로퍼티가 속해 있는 객체)와 이 `base` 안에 있는 `propertyName` s이라는 2개의 프로퍼티를 갖고 있는 객체로 나타낼 수 있다.
<br/>

```js
var valueOfReferenceType = {
  base: <base object>,
  propertyName: <property name>
};
```

레퍼런스 타입의 값은 오직 아래의 2가지 경우에만 있을 수 있다.내가 볼 때 아래에 2가지 경우가 `this` 를 이해하는데 핵심이다.

	1. 식별자(identifier)를 다룰 때
	2. 프로퍼티 접근자(property accessor)를 다룰 때.

식별자는 알고리즘이 항상 레퍼런스 타입 값(this와 관련해서 중요하다)을 결과로 돌려준다는 것만 명심하자.
<br/>

**식별자는 변수 이름, 함수 이름, 함수 전달인자의 이름 그리고 전역 객체의 비정규화 프로퍼티의 이름을 뜻한다.**
<br/>

```js
var foo = 10; // 변수이름
function bar() {} // 함수이름
```

중간결과는 아래와 같이 될 것이다.

```js
var fooReference = {
  base: global,
  propertyName: 'foo'
};

var barReference = {
  base: global,
  propertyName: 'bar'
};
```

레퍼런스 타입 값으로부터 객체가 갖고 있는 실제 값을 얻기 위해 쓰이는 `GetValue` 메소드가 있는데 이 메소드를 수도 코드로 아래와 같이 나타낼 수 있다.

```js
function GetValue(value) {
  if (Type(value) != Reference) {   
    return value;    // 레퍼런스 타입이 아니면 값을 그대로 돌려준다.
  }
  
  var base = GetBase(value);
  
  if (base === null) {   
    throw new ReferenceError;
  }
  
  return base.[[Get]](GetPropertyName(value))
}
```

위에서 내부 `[[Get]]` 메소드는 프로토타입 체인으로부터 상속된 프로퍼티까지 분석해서 **객체 프로퍼티의 실제 값** 을 돌려준다.

```js
GetValue(fooReference); // 10
GetValue(barReference); // function object "bar"
```

**(중요)프로퍼티 접근자는 점 표기법(프로퍼티 이름이 정확한 식별자이고 미리 알 수 있을 때)이나 대괄호 표기법의 2가지 방법으로 표기할 수 있다.**

```js
foo.bar();
foo['bar']();
```

이번에도 중간 계산의 결과로 레퍼런스 타입의 값을 갖게 된다.

```js
var fooBarReference = { 
  base: foo, 
  propertyName: 'bar'
};

GetValue(fooBarReference); // function object "bar"
```

그렇다면, 레퍼런스 타입의 값과 함수 콘텍스트의 `this` 값은 어떤 관계일까? **이 부분이 가장 중요하며, 이 글의 메인이다**. 
<br/>

함수 콘텍스트의 `this` 값을 결정하는 일반적인 규칙은 다음과 같이 말할 수 있다.
<br/>

함수 콘텍스트의 `this` 값은 **호출자가 제공** 하며 **호출 표현식의 현재 형태에 의해서 그 값이 결정** 된다(함수 호출이 문법적으로 어떻게 이뤄졌는지에 따라서).
<br/>

호출 괄호(…)의 왼편에 **레퍼런스 타입의 값이 존재하면**, `this` 는 레퍼런스 타입의 `this` 값인 `base` 객체를 값으로 갖는다.
<br/>

다른 모든 경우에는(레퍼런스 타입이 없는 다른 모든 값의 경우), `this` 값은 항상 `null` 로 설정된다. 그러나 `null` 은 `this` 의 값으로 의미가 없기 때문에 암묵적으로 전역 객체로 변환된다.

예제

```js
function foo() {
 return this;
}
foo(); // global
```

호출괄호 왼쪽에 레퍼런스 타입 값이 있다.(`foo` 는 함수이름으로 식별자이다)

```js
var fooReference = {
 base: global,
 propertyName: 'foo'
};
```

따라서, `this` 값은 레퍼런스 타입 값의 `base` 객체인 전역 객체로 설정된다.

```js
var foo = {
 bar: function () {
   return this;
 }
};
foo.bar(); // foo
```

여기에서 다시 `base` 가 `foo` 객체인 레퍼런스 타입의 값을 갖게 되고, 이것은 `bar` 함수 활성화 시에 `this` 값으로 이용된다.

```js
var fooBarReference = {
 base: foo,
 propertyName: 'bar'
};
```

그러나, 또 다른 형태의 호출 표현식으로 함수를 활성화시키면 this 값은 달라진다.

```js
var test = foo.bar;
test(); // global
```

`test` 가 식별자가 되면서 다른 레퍼런스 타입 값을 만들기 때문에, 이 레퍼런스 타입의 `base` (전역 객체)가 `this` 값으로 사용된다.

```js
var testReference = {
 base: global,
 propertyName: 'test'
};
```

이제는 다른 형태의 호출 표현식으로 활성화된 같은 함수가, 또한 다른 `this` 값을 갖는지를 정확하게 이야기할 수 있다
=> **레퍼런스 타입의 중간 값이 달라서 일어나는 현상**

```js
function foo() {
 alert(this);
}
foo(); // 전역이기 때문에

var fooReference = {
 base: global,
 propertyName: 'foo'
};

alert(foo === foo.prototype.constructor); // true

// 호출 표현식의 또 다른 형태
foo.prototype.constructor(); // foo.prototype이기 때문에

var fooPrototypeConstructorReference = {
 base: foo.prototype,
 propertyName: 'constructor'
};
```

호출 표현식 형태에 따라 `this` 값이 동적으로 결정되는 또 다른 에제가 있다.

```js
function foo() {
 alert(this.bar);
}

var x = {bar: 10};
var y = {bar: 20};

x.test = foo;
y.test = foo;

x.test(); // 10
y.test(); // 20
```

## 함수 호출과 비-레퍼런스 타입(Function call and non-Reference type)

호출 괄호의 왼편에 레퍼런스 타입이 아닌 다른 값이 오는 경우 this값은 자동으로 `null` 값을 가지게 된다. 그리고 이것을 엔진은 자동으로 전역객체로 출력한다.

```js
(function () {
 alert(this); // null => global
})();
```

딱 위의 경우가 좋은 에시이다. 이것은 레퍼런스타입(식별자, 프로퍼티 접근자)가 아니다. 따라서 레퍼런스타입이 존재하지 않는다. 즉 `null` 이다 그럼으로 전역객체를 출력한다.

```js
var foo = {
 bar: function () {
   alert(this);
 }
};

foo.bar(); // Reference, OK => foo
(foo.bar)(); // Reference, OK => foo

(foo.bar = foo.bar)(); // global?
(false || foo.bar)(); // global?
(foo.bar, foo.bar)(); // global?
```

이 경우가 정말 어렵다. 왜 아래의 **3개의 경우에는 왜 전역객체가 나오는 것일까?**
<br/>

즉 아래의 3개는 레퍼런스 타입 값이 `null`이라는 것이다.
<br/>

두번째 경우에는 **그룹핑 연산자**가 레퍼런스 타입의 값으로부터 객체의 실제 값을 얻기 위한 메소드인 `GetValue` 에 적용되지 않는다. 그래서 그룹핑 연산자가 평가 결과를 반환할 때도 여전히 레퍼런스 타입의 값이 존재 하게 되는데, 이것이 this 값이 다시 `base` 객체로 설정되는 이유다.
<br/>

세번째의 경우는, **그룹핑 연산자와 다르게 할당 연산자는 GetValue 메소드를 호출한다.** 반환의 결과로 `this` 가 `null`로 설정되었음을 의미하는 함수 객체(레퍼런스 타입 값은 아닌)가 반환되기 때문에, 이는 결국 전역 객체가 된다.
<br/>

네번째와 다섯번째의 경우도 유사하다. **콤마 연산자와 논리적 OR 표현식**은 `GetValue` 메소드를 호출하고, 따라서 레퍼런스 타입의 값을 잃어버리고 함수 타입의 값을 갖게 되어 `this` 의 값은 전역 객체로 설정된다.
<br/>

레퍼런스 타입과 값이 `null` 인 **this(Reference type and null this value)** 위에도 말은 했지만 레퍼런스타입의 값이 **null이 되면 this는 전역객체가 된다고 했다.** 이것은 레퍼런스 타입 값의 base 객체가 활성화 객체인 경우와 관련이 있다.

```js
function foo() {
 function bar() {
   alert(this); // global
 }
 bar(); // AO.bar()와 같다.
}
```

**활성화 객체는 항상 this 값으로 null을 반환한다.**

## 예외의 with함수

`with` 객체가 함수 이름 프로퍼티를 갖는 경우, `with` 문의 블럭 안에서 함수를 호출 할 때는 예외일 수 있다. `with` 문은 자신의 스코프 체인의 가장 앞, 즉 활성화 객체 앞에 그 객체를 추가한다. 
<br/>

따라서 레퍼런스 타입 값을 얻으려 할 때(식별자나 프로퍼티 접근자를 이용해서) 활성화 객체가 아닌 `with` 문의 객체를 `base` 객체로 갖게 된다.
<br/>

그런데, 이는 `with` 객체가 스코프 체인에서 더 상위에 있는(전역 객체 또는 활성화 객체) 객체까지 가려버리기 때문에 중첩함수 뿐만 아니라 전역 함수와도 관련이 있다.

```js
var x = 10;
with ({
 foo: function () {
   alert(this.x);
 },
 x: 20
}) {
 foo(); // 20
}
// because
var  fooReference = {
 base: __withObject,
 propertyName: 'foo'
};
```

`catch` 절의 실제 파라미터인 함수를 호출할 것도 이와 유사하다. 
<br/>

이 경우에 항상 스코프 체인의 가장 앞, 즉 활성화 객체나 전역 객체 앞에 `catch` 객체가 추가된다. 
<br/>

그러나 이 동작은 `ECMA-262-3` 의 버그로 인정되어 새로운 버전인 `ECMA-262-5`에서는 수정 된다. `ECMA-262-5`는 이러한 경우 `this` 값이 `catch` **객체가 아닌 전역 객체로 설정된다.**

```js
try {
 throw function () {
   alert(this);
 };
} catch (e) {
 e(); // __catchObject - ES3, global - ES5에서는 수정
}
// on idea
var eReference = {
 base: __catchObject,
 propertyName: 'e'
};
// 그러나, 이것은 버그이기 때문에
// this는 강제로 전역 객체를 참조하게 된다.
// null => global
var eReference = {
   base : global,
   propertyName: 'e'
}
```
<br/>

## 생성자로 호출된 함수 안의 this(This value in function called as the constructor)

```js
function A() {
 alert(this); // 새롭게 만들어진 객체, 아래에서 a 객체
 this.x = 10;
}

var a = new A();
alert(a.x); // 10
```

이 경우는, `new` 연산자가 A함수의 내부 [[Construct]] 메소드를 호출하고 차례로, 객체가 만들어진 후에 A와 모두 같은 함수인 내부의 [[Call]] 메소드를 호출하여 `this` 값으로 새롭게 만들어진 객체를 갖게 된다.
<br/>

## 함수 호출시 `this` 를 수동으로 지정하기(Manual setting of this value for a function call)

함수 호출 시에 this 값을 수동적으로 지정할 수 있게 해주는 두 가지 방법이 `Function.prototype` 에 정의되어 있다(`prototype` 에 정의되어 있으므로 모든 함수가 이용 가능). 바로 `apply` 와  `call` 메소드다.

```js
var b = 10;

function a(c) {
  alert(this.b);
  alert(c);
}

a(20); // this === global, this.b == 10, c == 20

a.call({b: 20}, 30); // this === {b: 20}, this.b == 20, c == 30
a.apply({b: 30}, [40]) // this === {b: 30}, this.b == 30, c == 40
```
<br/>

#### Reference

- [Dmitry Soshnikov  in ECMAScript](http://dmitrysoshnikov.com/ecmascript/chapter-3-this/)
- [김코딩님이 코딩 잘하고 싶어서 만든 블로그](http://huns.me/development/258)