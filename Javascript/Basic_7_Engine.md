# JavaScript Engine

## 목차

- [x] 자바스크립트 엔진 파이프라인
- [x] V8
    - [x] 이그니션
    - [x] 터보팬
    - [x] 이전의 엔진
- [x] 히든 클래스
- [x] 인라인 캐싱
- [x] 최적화

## JavaScript Engine이란?

JS코드를 실행하는 **프로그램(가령 브라우저) 또는 인터프리터** 를 말한다.
<br/>

### V8

제일 유명하고 사람들이 많이 사용하는 크롬에 들어가있는 `V8` 이 있다. 현재 `Electron, Nodejs` 에서도 사용이 되고 있고 CEF의 안에도 들어있다.
<br/>

### SpiderMonkey

**최초의 자바스크립트 엔진** 으로, JS의 창시자인 브랜던 아이크가 넷스케이프 브라우저를 위해 개발이 되었다. 지금은 `Mozilla` 재단에서 관리하며, `FireFox` 에서 사용되는 엔진이다.
<br/>

### Chakra

**마이크로소프트가 개발한 엔진** 이며, `Edge` 브라우저에 사용되고 있고 앞으로는 V8로 바꾼다는 말이 있다.
<br/>

`Chakra` 엔진의 중요 부분은 `Chakra Core` 라는 오픈 소스로 구성되어있다.
<br/>

### Javascript Core

애플에서 개발한 JavaScriptCore는 처음에 **WebKit 프레임워크** 를 위해 개발. 최근에는 `Safari와 React Native App`에서 사용된다고 한다.
<br/>

## 자바스크립트 엔진 파이프라인

소스코드를 기계어로 만드는 과정에 대해서 알아보려고 한다. 
<br/>

1.  자바스크립트 **소스를 파싱해서 AST로 만든다.**
2. **AST를 토대로 인터프리터는 바이트코드로 만들어준다.**

코드를 더 빨리 실행하기 위해서, 바이트코드는 프로파일링 된 데이터와 함께 `optimizing compiler` 로 보내지고 여기서는 **프로파일된 데이터를 기반으로 하여 최적의 기계어를 생성** 하게 된다.

> 바이트 코드  + 프로파일된 데이터 => 최적의 기계어

그러나 정확하지 않은 결과가 나왔다면 다시 `deoptimizes`하여 바이트코드로 되돌린다.

![B_Engine_1.png](/assets/image/B_Engine_1.png)

위의 파이프라인 작동하는 방식은 Chrome 및 Node.js에서 사용되는 JavaScript 엔진이 작동하는 방식과 거의 동일하다.

![B_Engine_2.png](/assets/image/B_Engine_2.png)

V8의 인터프린터 **Ignition** 이라고 불리며, **bytecode** 를 생성하고 실행하는 역할을 한다. **Bytecode** 를 실행하는 동안, 실행 속도를 높이기 위해서 **profiling data** 를 수집한다. 예를 들어, 종종 실행되는 기능에 부하가 걸리면, 생성된 **bytecode** 와 **profiling data** 는 **TurboFan**(최적화된 컴파일러)으로 전달되어 **profiling data** 를 기반으로 최적화 머신 코드( **optimized code** )를 생성합니다.

## V8 살펴보기

### V8.5.9 이전

내용이 많아 자세히 설명해주신 블로그 링크를 넣었습니다.

> [https://engineering.huiseoul.com/자바스크립트는-어떻게-작동하는가-v8-엔진의-내부-최적화된-코드를-작성을-위한-다섯-가지-팁-6c6f9832c1d9](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-v8-%EC%97%94%EC%A7%84%EC%9D%98-%EB%82%B4%EB%B6%80-%EC%B5%9C%EC%A0%81%ED%99%94%EB%90%9C-%EC%BD%94%EB%93%9C%EB%A5%BC-%EC%9E%91%EC%84%B1%EC%9D%84-%EC%9C%84%ED%95%9C-%EB%8B%A4%EC%84%AF-%EA%B0%80%EC%A7%80-%ED%8C%81-6c6f9832c1d9)

<br/>

## JavaScript Engine이 객체 모델을 구현하는 방법

객체는 JavaScript 명세에 따르면 String으로 된 키와 이것으로 접근할 수 있는 값들을 가지고 있는 딕셔너리(Key-Value)이다. 키는 단순히 `[[value]]` 에 맵핑되는 것 뿐만 아니라 속성 값(property attributes) 이라고 하는 스펙에도 매핑이된다.

![B_Engine_3.png](/assets/image/B_Engine_3.png)

객체는 기본적인 속성 값으로 `[[Writable]]`, `[[Enumerable]]`, `[[Configurable]]` 상태가 있다.

- **Writable** : 할당연산자를 통해 값을 **바꿀** 수 있는지
- **Enumerable** : 해당 객체의 키가 **열거** 가능한지
- **Configurable** : 이 속성 기술자는 해당 객체로부터 그 속성을 **제거** 할 수 있는지

어떤 객체나 속성이든 `Object.getOwnPropertyDescriptor` API를 이용해 이 값들에 접근할 수 있습니다.

```javascript
const object = { foo: 42 };
    Object.getOwnPropertyDescriptor(object, 'foo');
    // => {value: 42, writable: true, enumerable: true, configurable: true}
```

<br/>

## JavaScript 배열

배열은 조금 다르게 처리하는 특별한 객체라고 생각하면 됩니다.객체와 다른 배열만의 특징은 다음과 같습니다.

1. **인덱스(index)가 존재한다.** 

인덱스는 제한된 범위가 있는 정수로. JavaScript 명세에 따르면, 배열은 `2³²−1` 개 까지의 아이템을 가질 수 있다. 따라서 배열 인덱스는 `0` 부터 `2³²−2` 까지의 범위에서만 인덱스로 유요한 정수라는 것이다.

2. **길이(length) 정보를 가집니다.**

`length property` 는 배열에 추가하면 `length property` 는 저절로 늘어난다. 사실 엔진에서 자동으로 해주는 것이다.

```javascript
const array = ['a', 'b'];
    array.length; // 2
    array[2] = 'c';
    array.length; // 3
```

<br/>

### JavaScript 엔진에서 배열을 다루기

객체와 비슷하다. 배열은 인덱스를 포함하여 모두 `string` 키를 가진다. 아래 그림을 보면 인덱스인 `0` 은 `a` 라는 값을 가지며, 값을 바꿀 수 있고(Writable), 열거 가능하고(Enumerable), 삭제 가능(Configurable) 하다. 또 다른 프로퍼티인 `length` 의 값은 1이며, 값을 바꿀 수 있지만 열거와 삭제가 불가능 하다.

![B_Engine_4.png](/assets/image/B_Engine_4.png)

배열에 Item을 추가하게 되면, JavaScript 엔진은 `length`의 속성 값 중 `[[value]]`를 자동으로 증가시킨다.

![B_Engine_5.png](/assets/image/B_Engine_5.png)

<br/>

## Hidden Class(Shape)

```javascript
function logX(obj){
        console.log(obj.x);
}

const obj1 = { x:1, y:2 };
const obj2 = { x:3, y:4 };

logX(obj1);
logX(obj2);
```

동일한 프로퍼티 `x`와 `y`를 `string` 키로 가지는 두 객체가 있다면. 이 두 객체의 `모양(shapes)`은 똑같다.

함수 `logX`를 통해 두 객체 각각에서 같은 프로퍼티 `x` 에 접근한다. JavaScript 엔진은 프로퍼티 접근 시에 모양이 같은 점을 이용하여 최적화를 한다.

![B_Engine_6.png](/assets/image/B_Engine_6.png)

객체의 키 `x`, `y`는 각각의 속성 값(property attributes)을 가리킨다. 예를 들어 `x` 프로퍼티에 접근하게 되면 엔진은 `Object` 에서 `x` 키를 찾은 다음, 해당하는 속성 값을 불러오고 `[[Value]]` 값을 반환한다.

여기서 5와 6 같은 데이터는 어디에 저장되나?

모든 객체 별로 정보를 저장하게 되면 낭비가 된다. 비슷한 모양의 객체가 더 많이 생긴다면, 그만큼의 중복할 발생할 것이고 필요없는 메모리 사용이 늘어나게 되는 것이다.

그래서 엔진은 직접 값을 저장하는 방법 아래와 같은 방법을 사용하게 된다.

![B_Engine_7.png](/assets/image/B_Engine_7.png)

우선 엔진은 따로 `Shape` 라는 곳에 프로퍼티 이름과 속성 값들을 저장한다. 여기에 `[[value]]` 값 대신 `JSObject` 의 어디에 값이 저장되어 있는지에 대한 정보인 `Offset` 을 `Property information`으로 가지고 있는다.

![B_Engine_8.png](/assets/image/B_Engine_8.png)

즉, 같은 모양을 가진 모든 JSObject는 동일한 `Shape` 인스턴스를 가리키게 되고, 각 객체에는 고유한 값만 저장되므로, 더 이상 중복되지 않는 것이다. 같은 모양으로 생긴 더 많은 오브젝트가 있다 하더라도 오로지 하나의 `Shape` 만 존재하게 된다.

<br/>

### Shape에 새로운 객체를 추가하기 (Transition chains)

이런 Shape가 있다고 합시다.

```javascript
const o = {};
o.x = 5;
o.y = 6;
```

새로운 프로퍼티를 추가할 때, 엔진은 어떻게 새로운 Shape를 찾을수 있는 것일까? 엔진은 내부에 `transition chains`라고 하는 Shape를 만든다.

먼저, 비어있는 객체인 `o`가 있으며, 이는 비어있는 Shape를 가리킨다.

![B_Engine_9.png](/assets/image/B_Engine_9.png)

여기에 5라는 값을 가진 `x` 라는 프로퍼티를 추가하게 되면, 비어있던 Shape에서 `x` 를 프로퍼티로 가지고 있는 새로운 Shape로 **이동**(transition)하게 된다. 다음과 같이 `JSObject` 의 값이 추가되고, `offset` 은 0이다.

![B_Engine_10.png](/assets/image/B_Engine_10.png)

새로운 프로퍼티 y를 추가해도 똑같이 작동하게 된다. `Shape(x,y)` 로 이동한 다음 값을 추가한다.

![B_Engine_11.png](/assets/image/B_Engine_11.png)

하지만 이런 방법을 모든 테이블에 항상 적용했다가는 많은 메모리 낭비를 일으키겠지요. 그래서 실제로 엔진은 이렇게 동작하지 않습니다.

<br/>

### 실제로 엔진에서 동작하는 방법

엔진은 추가되는 새로운 프로퍼티 정보를 저장하고, 이전 Shape로 가는 **링크**를 제공한다. 만약 `o.x`를 찾을 때 값이 `Shape(x,y)` 에 없다면 이전의 `Shape(x)`에 가서 찾는 것이다.

![B_Engine_12.png](/assets/image/B_Engine_12.png)

<br/>

### 두 객체에서 동일한 Shape를 사용하는 경우 (Transition Tree)

만약에 두 객체에서 동일한 Shape를 사용한다면 어떻게 될까? 먼저 하나의 객체 `a` 에 `x = 5` 라는 값을 가진 프로퍼티가 있다고 하면

![B_Engine_13.png](/assets/image/B_Engine_13.png)

이번엔 객체 `b` 에서 `y` 라는 프로퍼티를 추가할 경우 `Shape(empty)`에서 가지를 뻗어 새로운 `Shape(y)`를 만든다. 결국 2개의 체인에 3개의 Shape를 가진 트리 체인이 생성되는 것이다.

![B_Engine_14.png](/assets/image/B_Engine_14.png)

java의 Object처럼 모든 객체의 트리를 거슬러 올라가면 무조건 `Shape(empty)`에 도달하게 되는 것은 아니다.

```javascript
const obj1 = {};
obj1.x = 6;

const ob2 = {x: 6};
```

`ojb2` 와 같이, JS에서는 **Object Literal** 을 사용하여 시작부터 프로퍼티를 가지고 생성하도록 할 수 있기 때문이다. 따라서 `Shape(empty)`가 아닌, 서로 다른 **Root Shape**가 생성된다.

![B_Engine_15.png](/assets/image/B_Engine_15.png)

이 방법은 **transition chain** 을 짧게 하고, 객체를 리터럴로부터 생성하여 더욱 효율적이다. point는 `x,y,z` 를 3차원 공간의 좌표로 가지는 객체이다.

```javascript
const point = {};

point.x = 4;
point.y = 5;
point.z = 6;
```

앞서 배운 것에 따르면, 총 3개의 Shape가 메모리에 생성 될 것입니다. (empty Shape 제외)

![B_Engine_16.png](/assets/image/B_Engine_16.png)

만약 이걸 사용하는 프로그램에서 `x` 프로퍼티에 접근한다고 하면, 엔진은 가장 마지막에 생성된 `Shape(x,y,z)` 부터 링크드 리스트를 따라올라가 맨 위에 있을 `x` 를 찾는다.

객체의 프로퍼티가 더 많을수록, 그리고 이 과정을 자주 반복한다면 프로그램은 상당히 느려질 것이다.

그래서 엔진은 탐색 속도를 높이기 위해 내부적으로 `ShapeTable` 이라는 자료구조를 추가한다. 이는 딕셔너리 형태로, 각각의 Shape를 가리키는 프로퍼티 키를 저장하고 있다.

![B_Engine_17.png](/assets/image/B_Engine_17.png)

그렇다면 기껏 Shape가 나온 이유가 없어지는 것인가? 사실 엔진은 최적화를 위해 또 다른 방법인 `Inline Cache`(IC) 라는 것을 Shape에 적용한다. 

> Chrome dev_tool Memory Tab에서 예제를 확인해보자!!!

:point_right: 예제

```javascript
function Person(name) {
    this.name = name;
}

var foo = new Person("yonehara");
var bar = new Person("suzuki");
```

:point_right: 예제2

```javascript
function Person(name) {
    this.name = name;
}

var foo = new Person("yonehara");
var bar = new Person("suzuki");
foo.job = "frontend";
```

<br/>

## Inline Cache(ICs)

Shape를 사용하는 주된 이유는 **Inline Caches(ICs)** 때문이다. ICs 는 JavaScript를 신속하게 실행할 수 있게하는 핵심 요소이다. JavaScript 엔진은 ICs를 사용하여 object에서 property를 찾을 수 있는 위치에 대한 정보를 암기하여, 높은 cost를 가지는 조회 횟수를 줄인다.

```javascript
function getX(o) {	
    return o.x;
}
```

위의 함수를 `JSC` 에서 실행한다면, 아래의 그림과 같은 `bytecode` 를 생성할 것이다.

![B_Engine_18.png](/assets/image/B_Engine_18.png)

첫 번째 명령문 `get_by_id`는 첫 번째 `argument (arg1)` 에서 `property 'x'` 를 로드하여 결과를 `loc0` 에 저장한다. 

두 번째 명령문은 `loc0` 에 저장한 것을 반환한다.

또한 `JSC` 는 `get_by_id` 명령문에 초기화되지 않은 두 개의 슬롯으로 구성된 `Inline Cache` 를 포함한다.

![B_Engine_19.png](/assets/image/B_Engine_19.png)

이제 위의 그림과 같이 `{x: 'a'} object` 가 `getX` 함수에서 실행될 때를 보게 되면, `object` 는 `property 'x'` 가 있는 shape를 가지며, 이 Shape는 `property x` 에 대한 `offset` 과 `attribute` 들을 가집니다. 이 함수를 처음 실행하면, `get_by_id 함수` 는 `property 'x'` 를 검색하고 value는 `offset 0` 에 저장되어 있다는 것도 찾게된다.

![B_Engine_20.png](/assets/image/B_Engine_20.png)

위의 그림에서 처럼 `get_by_id` 명령문에 포함된 IC는 `property` 가 발견된 shape와 offset을 기억하게 된다.

![B_Engine_21.png](/assets/image/B_Engine_21.png)

위의 그림을 보게되면, 다음 명령문을 실행할 때, IC는 shape만 비교하면 되며, 이전과 같다면 저장되어있는 offset을 보고 value를 가져오면 된다. 구체적으로 말하면, 엔진이 IC가 이전에 기록한 shape의 object를 볼 경우, 더 이상 property 정보에 접근할 필요가 없다. 그리고 비용이 많이 들어가는 property 정보 조회를 완전히 생략하게 된다. 이 방법은 매번 property를 조회하는 것 보다 훨씬 더 빠르다.

<br/>

## **어떻게 최적화된 자바스크립트 코드를 작성할 것인가**

1. **객체 속성의 순서** : 객체 속성을 항상 같은 순서로 초기화해서 히든클래스 및 이후에 생성되는 최적화 코드가 공유될 수 있도록 한다.
2. **동적 속성**: 객체 생성 이후에 속성을 추가하는 것은 히든 클래스가 변하도록 강제하고 이전의 히든클래스를 대상으로 최적화되었던 모든 메소드를 느리게 만든다. 대신에 모든 객체의 속성을 생성자에서 할당한다.
3. **메소드** : 동일한 메소드를 반복적으로 수행하는 코드가 서로 다른 메소드를 한 번씩만 수행하는 코드 보다 더 빠르게 동작합니다(인라인 캐싱 때문)
4. **배열** : 값이 띄엄띄엄 있어서 키가 계속해서 증가하는 숫자가 되지 않는 배열은 피하는게 좋다. 모든 요소를 가지지는 않는 배열은 **해시테이블**이다. 이와 같은 배열의 요소들은 접근하기에 많은 비용이 든다. 또한 커다란 배열을 미리 할당하지 않도록 하는 것이 좋다. 사용하면서 크기가 커지도록 하는 게 좋다. 마지막으로 배열의 요소를 삭제하지 말아야한다. 그 배열의 키가 띄엄띄엄 배치된다.
5. **태깅된 값** : V8은 객체와 숫자를 32비트로 표현한다. 어떤 값이 오브젝트(flag = 1)인지 혹은 정수(flag = 0)인지는 `SMI(Small Integer)` 라는 하나의 비트에 저장하고 이 때문에 31비트가 남는다. 따라서 어떤 숫자가 31비트 보다 크면 V8은 이 숫자를 분리해서 더블 타입으로 전환한 다음 이 숫자를 넣을 새로운 객체를 생성한다. 이러한 동작은 비용이 높으므로 가능한한 31비트의 숫자를 사용하자.

---

#### Reference

- [JavaScript essentials: why you should know how the engine works](https://medium.freecodecamp.org/javascript-essentials-why-you-should-know-how-the-engine-works-c2cc0d321553)
- [자바스크립트는 어떻게 작동하는가: V8 엔진의 내부 + 최적화된 코드를 작성을 위한 다섯 가지 팁](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-v8-%EC%97%94%EC%A7%84%EC%9D%98-%EB%82%B4%EB%B6%80-%EC%B5%9C%EC%A0%81%ED%99%94%EB%90%9C-%EC%BD%94%EB%93%9C%EB%A5%BC-%EC%9E%91%EC%84%B1%EC%9D%84-%EC%9C%84%ED%95%9C-%EB%8B%A4%EC%84%AF-%EA%B0%80%EC%A7%80-%ED%8C%81-6c6f9832c1d9)
- [Understanding V8’s Bytecode](https://medium.com/dailyjs/understanding-v8s-bytecode-317d46c94775)
- [Understanding How the Chrome V8 Engine Translates JavaScript into Machine Code](https://medium.freecodecamp.org/understanding-the-core-of-nodejs-the-powerful-chrome-v8-engine-79e7eb8af964))
- [V8의 히든 클래스 이야기](https://engineering.linecorp.com/ko/blog/v8-hidden-class/)
- [https://shlrur.github.io//javascripts/javascript-engine-fundamentals-shapes-and-Inline-caches/](https://shlrur.github.io//javascripts/javascript-engine-fundamentals-shapes-and-Inline-caches/)