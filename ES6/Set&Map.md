# Set, WeakSet, Map, WeakMap

`ES6`의 새로 나온 타입들이 있다.

그 중 `Set`, `Map`에 대해서 알아보자. 이 두 개를 굳이 사용하는 이유를 모르겠다고 생각하는 분이 계실 수 있지만, 오늘 보고 나서 다시 한번 더 고려해 볼 수 있는 시간이 있기를 바란다.

## Set

Set을 쉽게 생각하면 **중복된 값을 가지지 않는 리스트**라고 생각하면 된다.

```js
const set = new Set()
const list = []

console.log(set) // Set(0) {}
console.log(list) // []
```

새로운 Set을 만들기 위해서는 생성자 함수(`new Set()`)를 사용하여 만들어 준다. 당연하게도 구성자에 들어갈 값을 직접 넣는 것도 가능하다.

```js
const foo = new Set();
console.log(foo) // Set {}

const bar = new Set([1, 2, 3])
console.log(bar) // Set {1, 2, 3}
```

위에서 설명했던 바와 같이 Set은 중복된 값을 가지지 않기 때문에 중복되는 값이 구성자에 있다면 중복된 값을 제거한다. (맨 앞의 값을 남기고 무시한다.)

```js
const foo = new Set([ 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5 ]);
console.log(foo); // Set { 1, 2, 3, 4, 5 }
```

### add 메소드와 Size 속성

Set은 `add()` 메소드를 통해 한 개의 값을 Set에 추가한다. size 속성을 통해 Set이 가지고 있는 항목의 개수를 가져올 수 있다.

```js
const foo = new Set();
console.log(foo.size) // 0
    
foo.add(1) // foo에 1을 추가
console.log(foo.size) // 1

foo.add(2) // foo에 2를 추가
console.log(foo.size) // 2
```

Set은 중복된 값을 가지지 않음으로, add를 통해 값을 추가할 때 추가하는 값이 이미 있다면 추가되지 않는다.

```js
const foo = new Set(['키싱부스', '키싱부스2', '도깨비']);
foo.add('도깨비');
    
console.log(foo) // Set { '키싱부스', '키싱부스2', '도깨비' }
```

```js
const foo = new Set(['키싱부스', '도깨비', '키싱부스2', '도깨비']);
    
console.log(foo) // Set { '키싱부스', '도깨비', '키싱부스2' }
```

위에서 언급했던 바와 같이 먼저 나온 값이 들어가게 되고 추가로 중복되는 값이 들어가게 되면 무시된다.

## 객체 Set을 진짜 Set으로

Set이 존재하기 이전에는 일반 객체를 활용해서 Set을 구현해서 사용했다.

하지만 문자열만이 객체의 속성으로 쓰일 수 있기 때문에 몇 가지 문제점이 있었다.

5는 "5"로 형 강제 변환이 일어나고, `{}`는 `[object Object]`가 되는 것이다. 하지만 Set은 값의 타입을 강제로 변환하지 않는다. 

```js
const foo = new Set();

foo.add({}); // 빈 객체 추가
foo.add({}); // 또 다른 빈 객체 추가
console.log(foo.size); // 2
console.log(foo) // Set { {}, {} }

foo.add(10); // 숫자 10 추가
foo.add('10'); // 문자열 "10" 추가
foo.add(10); // 이미 10이 있기 때문에 무시됩니다
console.log(foo.size); // 4
console.log(set); // Set { {}, {}, 10, '10' }
```

이때 Set은 값을 추가할 때, [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 메소드를 사용하면 두 값을 비교하여, 타입이 다르면 다르게 판단한다.

`Object.is()`는 얕은 비교를 한다. 흔히 React, Vue에서 비교를 할 때 쓰인다.

```js
Object.is(10, 10) // true
Object.is(10, '10') // false
Object.is({}, {}) // false
```

### 반복하기()

Set을 반복할 때에는 `forEach()` 메소드를 사용하면 된다. 일반 배열에서 `forEach()`를 사용할 때와는 조금 다르다.

일단 `forEach()`의 인자인 콜백 함수는 세 가지 인자를 받는데

- 값 자체
- 키(인덱스)
- 반복하고 있는 배열

그런데 `Set` 에서는 앞의 두 가지 인자가 같은 값을 가지는데, 생각하면 당연하게 `Set` 에는 키가 없기 때문에 키도 값으로 나온다.

```js
const foo = new Set(['안녕', '하이', '샬롬' ]);
foo.forEach((value, key, s) => {
  console.log(value, key, s);
});
// 안녕 안녕 Set(3) {"안녕", "하이", "샬롬"}
// 하이 하이 Set(3) {"안녕", "하이", "샬롬"}
// 샬롬 샬롬 Set(3) {"안녕", "하이", "샬롬"}
```

### 배열로 변환하기

배열을 Set으로 바꾸는 방법은 쉽다. Set 구성자에 배열을 넘기면 된다. 반대로 Set을 배열로도 바꿀 수 있는데, 바로 Spread Operator를 사용하면 된다.

```js
const foo = new Set([ '아이폰XR', '갤노트9' ]);
const fooInArray = [ ...foo ];
console.log(fooInArray) // [ '아이폰XR', '갤노트9' ];
```

## WeakMap

지금까지 살펴본 `Set` 은 강한 `Set`(strong set)이라고 불린다. `Set` 인스턴스가 존재하는 한, 메모리를 비우는 가비지 콜렉션 대상이 되지 않는다.

> [가비지 컬렉션 관련 글](https://github.com/SeonHyungJo/FE-Dev-Note/blob/master/Javascript/Javascript_%EB%A9%94%EB%AA%A8%EB%A6%AC%EA%B4%80%EB%A6%AC.md)

```js
const foo = new Set();
let object = { coffee: '룽고' };

foo.add(object); // foo에 object 객체에 대한 참조 값을 추가
console.log(foo.size) // 1

object = null; // 객체에 대한 참조를 object에서는 해제
console.log(foo.size) // 1

object = [...foo][0]; // foo 가 참조하고 있던 객체를 다시 object에 할당
console.log(object); // { coffee: '룽고' }
```

위와 같이 Set이 객체를 참조하고 있기 때문에 `{ coffee: '룽고' }` 객체는 사라지지 않는다.

그런데 Set이 참조하고 있는 객체에 대한 다른 참조가 전부 사라졌을 때, Set의 참조도 없애고 싶을 때가 있을 수 있다.

이의 경우를 위해 `ES6` 에서는 `WeakSet`을 제공한다. `WeakSet`은 약한 객체 참조를 가지는 것이다.

즉, `WeakSet`이 참조하는 객체에 다른 참조가 없으면 가비지 컬렉션 대상이 된다. 또, `WeakSet` 은 원시 자료형을 가질 수 없다. 즉 `string` 이나 `integer` 를 `set` 에 추가할 수 없는 것이다.

```js
const foo = new WeakSet();
foo.add(10) // TypeError
let object = { coffee: '아메리카노' };

foo.add(object); // foo에 object 객체에 대한 참조 값을 추가
foo.has(object); // true

object = null; // 객체에 대한 참조를 object에서 해제. 동시에 foo에서도 해제됨.
set.has(object); // false
```

### `WeakSet`의 특성

- 객체가 아닌 값을 `add()` , `has()` , `delete()` 메소드들에 인자로 넘기면 `TypeError` 가 발생한다.
- 반복할 수 없다(non-iterable). 즉, `forEach()` 를 사용할 수 없다.
- `size` 속성이 존재하지 않는다.

## Map

Object와 매우 유사하다고 생각하면 쉽다. 안에 들어가는 내용은 key, value형식으로 들어가게 된다. 기존의 Object와 다른 점이 있다면, Object의 키는 String 타입이여야 한다면, Map은 어떤 타입이든 가능하다. 하물며 참조 타입도 가능하다.

### Object와 차이점

- 의도치 않은 키 : Object는 프로토타입을 가지므로 기본으로 제공되는 키가 있다. 주의하지 않는다면 override가 되어 사용할 수 없게 된다.
- 키 자료형 : Map은 모든 타입의 값이 가능하나, Object는 String 또는 Symbol이 들어가야 한다.
- 키 순서 : Map은  들어가는 순서대로 정렬이 되나, Object는 그렇지 않다.
- 크기 : Map은 제공하는 속성 중 size가 있어서 바로 구할 수 있으나, Object를 사용하면 우리가 잘 알고 있듯이 리스트로 변환을 하고 lenght를 구해야한다.
- 순회 : Map은 순회 가능하다. Object를 순회하려면 모든 키를 알아낸 뒤 그 키의 배열로 순회를 해야한다.
- 성능 : Map은 잦은 키-값 쌍의 추가와 제거에서 더 좋은 성능을 보인다.

## WeakMap

WeakMap의 키는 오직 `Object`형 뿐이다. 키로 [원시 데이터형](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)은 허용되지 않습니다(가령 [Symbol](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol)은 `WeakMap` 키가 될 수 없다).

WeakMap내 키는 약하게 유지된다. 이 말은 다른 강한 키 참조가 없는 경우, 모든 항목은 가비지 컬렉터에 의해 WeakMap에서 제거된다.

숙련된 JavaScript 프로그래머는 이 API는 네 API 메소드에 의해 공유되는 두 배열(키에 하나, 값에 하나)로 JavaScript에서 구현될 수 있음을 알 수 있습니다. 이렇게 구현하게 되면 불편함 점이 있다. 첫 번째는 `O(n)` 검색(n은 map 내 키 개수)이다. 두 번째는 메모리 누수 문제이다. 
수동으로 작성된 map이면, 키 배열은 키 객체 참조를 유지한다. 원래 WeakMap에서는 키 객체 참조는 "약하게" 유지된다. 즉 다른 객체 참조가 없는 경우 가비지 컬렉션 대상이 된다.

---

#### Reference

- [자바스크립트 ES6 - Set에 대해 알아보자 🎉 - Hyeokwoo Alex Kwon - Medium](https://medium.com/@khwsc1/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-es6-set%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-9b7294dfba99)