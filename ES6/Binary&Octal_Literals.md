# Binary & Octal Literals

기존의 자바스크립트는

> parseInt(string, radix);

- `string`
    - 분석할 값. 만약 `string`이 문자열이 아니면 문자열로 변환(`ToString` 추상 연산을 사용)합니다. 문자열 내에서 맨 앞에 있는 공백은 무시됩니다.
- `radix`
    - `string`이 표현하는 정수를 나타내는 **`2`와 `36` 사이의 진수** (수의 진법 체계에 기준이 되는 값).

```js
parseInt("0xF", 16); // 15
parseInt("F", 16); // 15
parseInt("17", 8); // 15
parseInt(021, 8); // 15
parseInt("015", 10); // 15
parseInt("FXX123", 16); // 15
parseInt("1111", 2); // 15
parseInt("15*3", 10); // 15
parseInt("15e2", 10); // 15
parseInt("15px", 10); // 15
parseInt("12", 13); // 15
```

```js
parseInt("Hello", 8); // 전부 숫자가 아님.
parseInt("546", 2);   // 숫자는 2진법 표현이 불가능함.
```

```js
var hex = 0x11; // 17
var dec = 11; // 11
```

## 추가된 리터럴 방식

새로운 리터럴 방식이 추가가 되었다. 기존에는 10진수와 16진수만 되었으나 **2진수와 8진수가 추가**되었다.

```js
let bin = 0b1010010 // 82
let oct = 0o755 // 493
```