# 객체 생성자의 함정

정확히 하자면 `new Object()` 를 사용하는 것을 지양하는 것이다.
</br>

많은 개발자 분들이 리터럴로 객체를 선언하는 것으로 알고 있다. 리터럴로 선언을 하단면 굳이 `new Object()` 생성자를 사용할 이유가 없다.
</br>

그러나 `Legacy`라는 것이 존재하듯 다른 사람에게 받은 소스가 있을 수 있는 경우가 있다.
</br>

:star: `Object()` 생성자가 인자를 받을 수 있다. :star:
</br>

인자의 값에 따라서 생성자 함수가 다른 내장 생성자에 객체 생성을 위임할 수 있고, 이에 따라 기대하는 것과는 다른 객체가 반환될 수 있다.
</br>

```js
// 경고 : 모두 안티 패턴이다.
// 빈 객체
var obj = new Object();
console.log(obj.constructor === Object);
// true 가 기록

// 숫자 객체
var obj = new Object(10);
console.log(obj.constructor === Number);
// true 가 기록
obj.toFixed(2);
// 1.00 이 기록

// 문자열 객체 
var obj = new Object('I am a string');
console.log(obj.constructor === String);
// true 가 기록
// 일반적인 객체에는 substring() 이라는 메서드가 없지만 문자열 객체에는 있다.
console.log(typeof obj.substring);
// function 이 기록

// 불린 객체 
var obj = new Object(true);
console.log(obj.constructor === Boolean);
// true 가 기록
```

:whale: 만약에 **런타임에 결정하는 동적인 값이 있다면 반환되는 값의 확실성이 떨어지게 된다.**

객체 리터럴을 사용하는 것이 좋다. 속도면에서 더 좋을 수 있다.
</br>
</br>

## 참조

- [Web Club](http://webclub.tistory.com/513?category=501048)