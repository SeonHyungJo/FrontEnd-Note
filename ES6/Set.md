# [ES6] Set

`ES6`가 나오면서 새로 나온 타입이다.
<br/>

`Set`은 데이터 타입 중에 하나인데, **중복되는 값을 가지지 않는 리스트** 라고 생각하면 된다. 이때 순서는 중요치 않다. 
<br/>

## 생성

새로운 `set`을 만들기 위해서는 `new Set()`을 한다. 당연하게 구성자에 들어갈 값을 직접 넣는 것도 가능하다.
<br/>

```js
    const foo = new Set();
    console.log(foo) // Set {}
    
    const bar = new Set([ 1, 2, 3 ]);
    console.log(bar) // Set { 1, 2, 3 }
```

만약 구성자에 반복되는 값이 있다면 당연하게 반복되는 부분은 무시를 한다.(맨앞의 값만 남기고 무시를 한다.)

```js
    const foo = new Set([ 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5 ]);
    console.log(foo);
    // Set { 1, 2, 3, 4, 5 }
```

## add 메소드와 size 속성

`Set` 은 `add` 메소드를 통해 한 개의 값을 `set` 에 추가할 수 있습니다. 또, `size` 속성을 통해 `set` 이 가지고 있는 항목의 수를 가져올 수 있다.

```js
    const foo = new Set();
    console.log(foo.size) // 0
    
    foo.add(1) // foo에 1을 추가
    console.log(foo.size) // 1
```

`set` 은 중복된 값을 가지지 않는다는 특성이 있어서, `add` 를 통해 값을 추가할 때, 추가하는 값이 이미 존재한다면 다시 들어가지 않는다.

```js
    const foo = new Set(['하이큐', '쿠로코의 농구', '겁쟁이 패달']);
    foo.add('하이큐');
    
    console.log(foo) // Set { '하이큐', '쿠로코의 농구', '겁쟁이 패달' }
```

## 객체 set을 진짜 Set으로!

`Set` 이 존재하기 이전에는 일반 객체를 활용해서 `set` 을 구현했다.
<br/>

하지만 문자열만이 객체의 속성으로 쓰일 수 있기 때문에 몇가지 문제점이 나타나게 된다.
<br/>

**5** 는 **"5"** 로 형 강제 변환이 일어나고, `{}` 는 `[object Object]` 가 되는 것이다. 하지만 `Set` 은 값의 타입을 강제로 변환하지 않는다.
<br/>

**5 와 "5" 는 두 개의 다른 값으로 알고 있다.**

```js
    const foo = new Set();

    foo.add({}); // 빈 객체 추가
    foo.add({}); // 또 다른 빈 객체 추가
    console.log(foo.size); // 2
    console.log(foo) // Set { {}, {} }

    foo.add(10); // 숫자 10 추가
    foo.add('10'); // 문자열 "10" 추가
    foo.add(10); // 이미 10이 있기때문에 무시됩니다
    console.log(foo.size); // 4
    console.log(set); // Set { {}, {}, 10, '10' }
```

이 때 `Set` 은 값을 추가할 때, **Object.is()** 메소드를 사용해서 두 값을 비교를 하게 되어 타입이 다르면 다르게 판단을 한다.

```js
    Object.is(10, 10) // true
    Object.is(10, '10') // false
    Object.is({}, {}) // false
```

## has, delete, clear 메소드

`Set` 을 다루는 데 있어 또 다른 유용한 메소드로 `has` , `delete` 그리고 `clear` 가 있다.

- `has(값)`  :  `set` 에 값이 존재하는지 확인합니다. `true` 또는 `false` 를 반환하죠.
- `delete(값)`  : ` set` 에서 값을 제거합니다.
- `clear()` :  `set` 에서 모든 값을 제거합니다.

```js
    const foo = new Set([ '트와이스', '레드벨벳', '모모랜드' ]);
    console.log(foo.size); // 3
    
    foo.delete('모모랜드');
    console.log(foo.size); // 2
    
    foo.clear();
    console.log(foo.size); // 0
```

## 반복하기

`Set` 을 반복할 때에는 `forEach()` 메소드를 사용하면 된다.일반 배열에서 `forEach()` 를 사용할 때와는 조금 다르다고 한다.
<br/>

일단 `forEach()` 의 인자인 콜백 함수는 **세 가지 인자**를 받게되는데

- 값 자체
- 키(인덱스)
- 반복하고 있는 배열

그런데 `Set` 에서는 앞의 두 가지 인자가 같은 값을 가지는데, 생각한면 당연하게 `Set` 에는 키가 없기 때문에 키도 값으로 나오는 것이다.

```js
    const foo = new Set(['안녕', '하이', '샬롬' ]);
    foo.forEach((value, key, s) => {
      console.log(value, key, s);
    });
    // 안녕 안녕 Set(3) {"안녕", "하이", "샬롬"}
    // 하이 하이 Set(3) {"안녕", "하이", "샬롬"}
    // 샬롬 샬롬 Set(3) {"안녕", "하이", "샬롬"}
```

## Set을 배열로 바꾸기

배열을 `Set` 으로 바꾸는 방법은 쉽다. `Set` 구성자에 배열을 넘기기만 하면 된다. 반대로 `set` 을 배열로도 바꿀 수 있는데, 바로 **전개 연산자** 를 활용하면 된다.

```js
    const foo = new Set([ '아이폰XR', '갤노트9' ]);
    const fooInArray = [ ...foo ];
    console.log(fooInArray) // [ '아이폰XR', '갤노트9' ];
```

## Set. 그리고 WeakSet.

지금까지 살펴본 `Set` 은 강한 `Set`(strong set)이라고 불린다. 
`Set` 인스턴스가 존재하는 한, 메모리를 비우기 위해 가비지 콜렉션되지 않는다.
<br/>

> [가비지 컬렉션 관련 글](https://github.com/SeonHyungJo/FrontEnd-Dev/blob/master/Javascript/Javascript_%EB%A9%94%EB%AA%A8%EB%A6%AC%EA%B4%80%EB%A6%AC.md)

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

위와 같이 `Set` 이 객체를 참조하고 있기 때문에 `{ coffee: '룽고' }` 객체는 사라지지 않는다.
<br/>

그런데 `Set` 이 참조하고 있는 객체에 대한 다른 참조가 전부 사라졌을 때, `Set` 의 참조도 없애고 싶을 때가 있을 수 있다. 
<br/>

이와 같은 경우를 위해 `ES6` 에서는 `WeakSet` 을 제공한다. `WeakSet` 은 약한 객체 참조를 가지는 것이다.
<br/>

즉, `WeakSet` 이 참조하는 객체에 다른 참조가 없으면 가비지 컬렉션 대상이 된다. 또, `WeakSet` 은 원시 자료형를 가질 수 없다. `string` 이나 `integer` 를 `set` 에 추가할 수 없는 것이다.

```js
    const foo = new WeakSet();
    foo.add(10) // TypeError
    let object = { coffee: '아메리카노' };

    foo.add(object); // foo에 object 객체에 대한 참조 값을 추가
    foo.has(object); // true

    object = null; // 객체에 대한 참조를 object에서 해제. 동시에 foo에서도 해제됨.
    set.has(object); // false
```

`WeakSet` 의 특성.

- 객체가 아닌 값을 `add()` , `has()` , `delete()` 메소드들에 인자로 넘기면 `TypeError` 가 발생함.
- 반복할 수 없음(non-iterable). 즉, `forEach()` 를 사용할 수 없음
- `size` 속성이 존재하지 않음.


---

#### Reference

- [자바스크립트 ES6 - Set에 대해 알아보자 🎉 - Hyeokwoo Alex Kwon - Medium](https://medium.com/@khwsc1/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-es6-set%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-9b7294dfba99)