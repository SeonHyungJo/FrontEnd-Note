# [ES3]ECMA-262-3 ScopeChain

## 소개

- 실행 컨텍스트의 데이터(**변수, 함수 선언 그리고 함수의 매개변수**)는 변수 객체의 프로퍼티( **VO** )로 저장된다.
  - 깨알 유용한 정보 : `Context = VO|AO + this + SC`
- 컨텍스트로 **진입** 할 때 매번 초기값을 갖는 변수 객체를 생성하며(선언 + 초기화)(==호이스팅), 코드 **실행** 할 때 값을 갱신(할당)한다.

이번에는 스코프 체인에 대해서 정리를 해보자.
<br/>

## 정의

스코프체인은 대게 중첩 함수와 관련이 있다.

> 중첩함수 란 함수안에 함수가 있는 것 <= 당연한 말인 듯하다.

**심지어 부모 함수가 이러한 중첩 함수를 결과 값으로 반환이 가능하다.**

```js
var x = 10;

function foo() {
 var y = 20;

 function bar() {
   alert(x + y);
 }
 return bar;
}

foo()(); // 30
```

소개에서도 나오고 `This` 편에서도 나왔지만 모든 컨텍스트는 자신의 고유 변수 객체를 가진다.
전역 컨텍스트는 자기 자신을 변수 객체(`VO_global`)로 가지며, 함수 컨텍스트는 활성화 객체(`AO`)를 가진다.

- 전역 컨텍스트 = `VO + SC + this`
- 함수 컨텍스트 = `AO + SC + this`

스코프 체인은 내부 컨텍스트가 이용하는 모든(부모) 변수 객체의 **리스트다**. 
변수를 검색할 때 이 체인을 이용한다.
<br/>

위의 경우에서는 `bar` 컨텍스트의 스코프 체인은 `AO(bar)`, `AO(foo)`, `VO(global)`를 갖는다.
순서 또한 위와 같이 가진다. 즉 처음에 위치한 것은 자기자신이라는 것이다.
<br/>

> `SC` 는 내부 컨텍스트가 이용하는 모든 변수 객체의 리스트

스코프체인은 실행 컨텍스트와 관련 있으며, **식별자 해석시** 변수 검색에 이용하는 변수 객체의 체인이다.
<br/>

- 스코프 체인은 함수를 호출할 때 생성되고
- 활성화 객체와 함수의 내부 `[[scope]]` 프로퍼티를 가진다.

<br/>

### 내부의 모습

```js
activeExecutionContext = {
   VO: {...}, // or AO
   this: thisValue,
   Scope: [ // 스코프 체인(scope chain)
     // 식별자 검색에 이용할 모든 변수 객체의 리스트
   ]
};
```

**스코프의 정의**

```js
Scope = AO + [[scope]]
```

예를 들기 위해서 스코프와 `[[Scope]]` 를 `ECMAScript` 의 일반 배열로 나타낼 수 있다.

```js
var Scope = [VO1, VO2, ..., VOn]; // 스코프 체인
```

```js
var VO1 = {__parent__: null, ... other data};
var VO2 = {__parent__: VO1, ... other data};
...
```

## 함수 라이프 사이클(Function life cycle)

함수의 라이프 사이클은 **생성 단계**, **활성화 단계(call)** 의 2가지로 나뉜다. 

### 함수 생성

모두가 아시다시피 컨텍스트 단계로 들어갈 때 **변수/활성화 객체(VO/AO)가 함수 선언으로 들어간다.**

```js
var x = 10;

function foo() {
  var y = 20;
  alert(x + y);
}

foo(); // 30
```

함수가 활성화가 되면 함수는 `30` 을 출력한다.
<br/>

여기에서 변수 `y` 는 함수 `foo` 에서 정의되어있지만, 변수 `x` 는 `foo` 의 컨텍스트에 정의되어 있지않다. 그러므로 `foo` 의 `AO` 에 추가가 되지 않는다. 그렇다면 `x` 는 `foo` 에 존재하지 않는 것인가?
<br/>

```js 
fooContext.AO = {
  y: undefined // undefined – 컨텍스트 접근시, 20 – 활성화시
};
```

`foo` 컨텍스트의 활성화 객체는 `y` 프로퍼티 만을 가진다.
그렇다면 어떻게 해서 함수 `foo` 가 변수 `x` 에 접근할 수 있을까?
<br/>

`[[Scope]]` 는 현재 함수 컨텍스트의 상위에 있는 **모든 부모 변수 객체의 계층 체인** 이다. 이 체인은 **함수가 생성될 때 함수에 저장**된다.
<br/>

함수를 생성할 때 `[[Scope]]` 프로퍼티가 함수에 저장되는데, 일단 한 번 저장되고 나면 함수가 사라질 때까지 **정적으로 변하지 않는다** 는 사실을 주목하자. 함수를 결코 **호출할 수 없어도**, 함수 객체는 이미 `[[Scope]]` 프로퍼티를 가지고 있다.
<br/>

```js
foo.[[Scope]] = [
  globalContext.VO // === Global
];
```

## 함수 활성화

컨텍스트로 진입하고 `AO/VO` 가 만들어진 후에, 컨텍스트의 `scope` 프로퍼티는 다음과 같이 정의된다.

```js
Scope = AO|VO + [[Scope]]
```

여기서 중요한 것은 활성화 객체가 `Scope` 배열의 첫번째 원소로 제일 앞으로 온다는 것이다.

```js
Scope = [AO].concat([[Scope]]);
```

식별자 해석은 변수(또는 함수 선언)가 스코프 체인의 어떤 변수 객체에 속하는지를 결정하는 과정이다.
<br/>

식별자 해석 과정은 변수의 이름에 해당하는 프로퍼티를 검색하는 과정을 포함하며, 스코프 체인 가장 깊은 곳에 있는 컨텍스트의 변수 객체부터 시작해서 가장 위에 있는 변수 객체까지 연속적으로 검사하는 과정이다.
<br/>

그 결과 **현재 컨텍스트의 지역 변수는 부모 컨텍스트에 있는 변수보다 검색 우선 순위를 가지며**, 이름이 같지만 서로 다른 컨텍스트에 존재하는 두 변수의 경우, **더 깊은 컨텍스트에 있는 변수가 우선**한다. 즉 가까운 곳에 위치한 변수가 우선순위가 높다는 것이다.
<br/>

```js
var x = 10;

function foo() {
 var y = 20;

 function bar() {
   var z = 30;
   alert(x +  y + z);
 }

 bar();
}

foo(); // 60
```

전역 컨텍스트의 변수 객체 :

```js
globalContext.VO === Global = {
 x: 10
 foo: <reference to function>
};
```

`foo` 생성 시점에 `foo` 의 `[[Scope]]` 프로퍼티 :

```js
foo.[[Scope]] = [
 globalContext.VO
];
```

`foo` 함수의 활성화 시점(컨텍스트로 진입하는 단계)에 `foo` 컨텍스트의 활성화 객체 :

```js
fooContext.AO = {
 y: 20,
 bar: <reference to function>
};
```

`foo` 컨텍스트의 스코프 체인 :

```js
fooContext.Scope = fooContext.AO + foo.[[Scope]] 

fooContext.Scope = [
  fooContext.AO,
  globalContext.VO
];
```

중첩된 `bar` 함수가 생성되는 시점에 `bar` 함수의 `[[Scope]]` :

```js
bar.[[Scope]] = [
  fooContext.AO,
  globalContext.VO
];
```

`bar` 활성화 시점에 `bar` 컨텍스트의 활성화 객체 :

```js
barContext.AO = {
  z: 30
};
```

`bar` 컨텍스트의 스코프 체인 :

```js
barContext.Scope = barContext.AO + bar.[[Scope]] // i.e.:

barContext.Scope = [
  barContext.AO,
  fooContext.AO,
  globalContext.VO
];
```

## 스코프의 특징(Scope features)

## 클로저

`ECMAScript` 의 클로저는 `[[Scope]]` 프로퍼티와 직접적으로 관련이 있다. `[[Scope]]` 는 함수를 생성할 때 함수에 저장되어서, 함수 객체가 사라질 때까지 존재한다. 실제로, 클로저는 정확하게 함수 코드와 `[[Scope]]` 프로퍼티의 조합이다

```js
var x = 10;

function foo() {
    alert(x);
}

(function () {
    var x = 20;
    foo(); // 10, but not 20
})();
```

변수 `x`는 foo 함수의 `[[Scope]]` 에 있는 것을 알 수 있다. 변수를 검색할 때, 함수 호출 시점의 동적인 체인(이 경우 변수 `x`의 값은 20이 될 것이다)이 아닌, 함수 생성 순간에 정의된 어휘적인 체인을 이용하였다.

```js
function foo() {
  var x = 10;
  var y = 20;

  return function () {
    alert([x, y]);
  };
}

var x = 30;
var bar = foo(); // 익명 함수를 반환한다.

bar(); // [10, 20]
```

위이 예제에서도 역시 식별자 해석에 함수 생성 시점에 정의된 어휘적 스코프 체인을 이용하였다. 변수 `x`를 30이 아닌 10으로 해석했다. 게다가, 이 예제는 함수의 `[[Scope]]` (함수 `foo`가 반환한 익명 함수의 경우에)가 심지어 생성된 함수의 컨텍스트가 이미 종료되고 난 이후에도 존재하고 있음을 명확하게 보여준다.
<br/>

### Function 생성자로 생성한 함수의 `[[Scope]]`

위의 예제에서 함수 생성시에 [[Scope]] 프로퍼티를 가져오고 이 프로퍼티를 통해서 모든 부모 컨텍스트의 변수에 접근한다는 것을 보았다. 그러나, 이 규칙에는 한가지 중요한 예외가 있는데, Function 생성자를 이용해서 함수를 생성하는 경우는 다르다

```js
var x = 10;

function foo() {
  var y = 20;

  function barFD() { // FunctionDeclaration
    alert(x);
    alert(y);
  }

  var barFE = function () { // FunctionExpression
    alert(x);
    alert(y);
  };

  var barFn = Function('alert(x); alert(y);');
  barFD(); // 10, 20
  barFE(); // 10, 20
  barFn(); // 10, "y" is not defined
}

foo();
```

위에 보이듯이 생성자로 만든 함수는 `Scope`가 다르다. 그러나 `y` 에는 접근을 한다 이것은 `[[Scope]]` 로 `global`은 가진다는 것이다.

### 2차원 스코프 체인 검색

스코프 체인 검색의 중요한 포인트는 `ECMAScript` 의 프로토타입적인 성격 때문에 변수 객체의 프토토타입 또한 고려해야 한다는 점이다. 객체 내에서 직접적으로 프로퍼티를 찾지 못한다면, **프로토타입 체인까지 검색을 수행** 한다. 즉, 일종의 2차원 체인 검색인 셈이다. **(1) 스코프 체인 연결, (2) 그리고 깊은 프로토타입 체인 연결에 있는 모든 스코프 체인 연결을 검색** 한다.

```js
function foo() {
  alert(x);
}

Object.prototype.x = 10;
foo(); // 10
```

쉽게 말하면 역시 `scope` 를 검색했는데 없다 그러면 `protptype chain` 까지 검색을 한다는 것이다. 그래서 2차원이다.
<br/>

### 전역 컨텍스트와 `eval` 컨텍스트의 스코프 체인

전역 컨텍스트의 스코프 체인은 오직 전역 객체만을 갖는다. 그리고 `eval` 코드의 컨텍스트는 호출 컨텍스트와 같은 스코프 체인을 갖는다.

**무조건 글로벌이라고 생각하면 된다.**

```js
globalContext.Scope = [
    Global
];
evalContext.Scope === callingContext.Scope;
```

<br/>

### 코드 실행 중 스코프 체인에 영향을 미치기

`ECMAScript` 에는 코드 실행 런타임에 스코프 체인을 변경할 수 있는 두 가지 구문이 있다. 
<br/>

`with`문과 `catch`절이다. 
<br/>

둘 다 이들 구문 내에 나타나는 식별자를 찾기 위한 객체를 **스코프 체인의 가장 앞에 추가한다.** 이 중에 하나를 코드에 적용하면, 스코프 체인은 아래와 같이 변경된다.

```js
Scope = withObject|catchObject + AO|VO + [[Scope]]
```

`with` 문의 경우에는 파라미터로 넘겨 받은 객체를 추가한다(그 결과, 이 객체의 프로퍼티에 접두사를 붙이지 않고 접근할 수 있다)

```js
var foo = {x: 10, y: 20};

with (foo) {
  alert(x); // 10
  alert(y); // 20
}
```

```js
Scope = foo + AO|VO + [[Scope]]
```

```js
var x = 10, y = 10;

with ({x: 20}) {
  var x = 30, y = 30;

  alert(x); // 30
  alert(y); // 30
}

alert(x); // 10
alert(y); // 30
```

**중요**

1. `x = 10, y = 10`
2. 객체 { `x : 20` }을 스코프 체인의 앞에 추가한다.
3. 컨텍스트 진입 단계에서 모든 변수를 해석하고 추가했기 때문에 `with` 내에서 `var` 구문을 만났을 때 아무 것도 만들지 않는다.
4. 오직 `x` 의 값을 수정하는데, 정확하게는 두번째 단계에서 스코프 체인의 앞에 추가된 객체 내에서 해석되는 `x`를 말한다. 20이었던 `x` 의 값이 10이 된다.
5. 또한 위의 변수 객체 내에서 해석되는 `y`도 변경한다. 결과적으로 10이었던 `y`의 값이 30이 된다.
6. 다음으로 `with` 문이 종료된 후에, 스페셜 객체는 스코프 체인에서 제거된다( `x` 의 값이 변경되고, 30 또한 객체에서 제거된다). 즉, 스코프 체인 구조가 `with` 문에 의해서 확장되기 이전 상태로 돌아온다.
7. 마지막에 있는 두 번의 `alert` 호출을 통해서 알 수 있듯이, 현재 변수 객체 내에 있는 `x`의 값은 같은 상태로 남아있고, `y`의 값은 `with` 문 내에서 변경한 상태 그대로 30이다.

`catch` 절 또한 `exception` 파라미터에 접근하기 위해서 `exception` 파라미터의 이름을 유일한 프로퍼티로 갖는 중간 스코프 객체를 만들며, 이 객체를 스코프 체인의 앞에 추가한다. 개략적으로 아래와 같이 나타낼 수 있다.

```js
try {
  ...
} catch (ex) {
  alert(ex);
}
```

```js
var catchObject = {
  ex: <exception object>
}
Scope = catchObject + AO|VO + [[Scope]]
```

`catch`절 내의 작업이 종료된 후에, 스코프 체인은 이전 상태로 돌아온다.

---

#### Reference

- [scope-chain](http://dmitrysoshnikov.com/ecmascript/chapter-4-scope-chain/)