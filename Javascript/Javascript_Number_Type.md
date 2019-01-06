# 왜 Number Type 하나 인가?

자바스크립트에 있어서 숫자타입은 `Number`타입 하나이다.이 하나의 타입으로 소수점이 있는 숫자와 없는 숫자를 같이 사용할 수 있다. 
<br/>

아래와 같은 형태도 가능하다.

```js
var x = 123e5;    // 12300000
var y = 123e-5;   // 0.00123
```

## `JavaScript` 숫자는 항상 `64-bit` 부동 소수점(`Floating Point`)

많은 다른 프로그래밍 언어와는 달리, `JavaScript`는 `integers`, `short`, `long`, `floating-point` 등 과 같은 숫자의 다른 형식을 정의하지 않는다.
<br/>

`JavaScript` 숫자는 항상 국제 `IEEE 754` 표준에 따라 두배 정확도(`double precision`)의 부동 소수점 숫자(`floating point numbers`)로 저장이 된다.
<br/>

이 형식은 숫자를 `64 bits`로 저장하며, 숫자 값(`the fraction`)은 `bits 0` 부터 `bits 51` 에, 지수(`the exponent`)는 `bits 52` 부터 `62` 에, 부호(`the sign`)는 `bit 63` 에 저장한다. :
<br/>

아래와 같은 표로 나타낼 수 있을 것이다.

|Value (aka Fraction/Mantissa)|Exponent|Sign|
|--|--|--|
|52 bits (0 - 51)|11 bits (52 - 62)|1 bit (63)|

<br/>

## 정확도(Precision)

정수(`Integers`)(소수점과 지수 표기가 없는 번호)는 **15자리까지 정확한 것으로 간주됩니다.**

```js
var x = 999999999999999;   // x will be 999999999999999
var y = 9999999999999999; // y will be 10000000000000000
```

소수의 **최대 수는 17이지만**, 부동 소수점 연산(`floating point arithmetic`)은 **항상 100% 정확하지 않다.** 

그래서 항상 숫자를 사용할 때는 유의해서 작업을 해야한다.

```js
var x = 0.2 + 0.1;         // x will be 0.30000000000000004
```

위의 문제를 해결하기 위해, 곱샘과 나눗샘을 사용할 수 있습니다:

```js
var x = (0.2 * 10 + 0.1 * 10) / 10;       // x will be 0.3
```

---

#### Reference 

- [jun.hansung.ac.kr](http://jun.hansung.ac.kr/CWP/Javascript/JavaScript%20Numbers.html)