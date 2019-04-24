# 함수(Function)

자바스크립트에서 함수는 제일 핵심적인 역할을 한다.
<br/>

## 함수의 타입

함수의 타입을 결정하는 2가지 정보

- 매개변수 타입
- 반환타입

<br/>

### 매개변수

변수의 타입을 표기할때와 같이 `:` 콜론을 붙이고 타입을 적는다. (`param1 : string`)
<br/>

### 반환타입

매개변수 목록을 닫는 괄호(`)`)와 함수 본문을 여는 중괄호(`{`) 사이에 콜론을 붙이고 표기한다.
(`function test(): boolean { ... }`)
<br/>

**예시**

```ts
function sum(a: number, b: number): number {
  return (a + b);
}
```

--- 

**기본적으로 자바스크립트에서 함수는 무조건!! 반환값이 있어야 한다.** 

:point_right: Chrome Devtool에서 함수에 return을 만들지 않으면 undefined가 나온다.

---

함수를 사용하는데 `return` 이 없을 경우가 있다. 아무런 값도 반환하지 않고 종료한다면 `void` 타입을 적는다.
<br/>

## 함수 값의 타입 표기

함수 타입의 값에 타입 표기를 붙이기 위해서는 화살표 함수 정의 문법과 비슷한 문법을 사용한다. 

```text
(...매개변수 나열) => 반환 타입
```

매개변수가 없는 경우

```text
() => 반환 타입
```

**예시**

```ts
const Plus: () => number = () => 2; // number가 반환 타입
const arrowSum: (a: number, b: number) => number = (a, b) => (a + b);
```

여기에 추가적으로 별칭이 가능하다.

```ts
type DefineFunc = (a: number, b: number) => number;
const definitelySum: DefineFunc = (a, b) => (a + b);
```

<br/>

## 기본 매개변수

ES6와 마찬가지로 타입스크립트에서도 기본 매개변수 문법을 사용할 수 있다.

```
매개변수명: 타입 = 기본값
```

`=` 키워드를 사용해서 기본값을 설정할 수 있다. 이것은 ES6 기본 문법이다.

```ts
function hello(name: string = 'stranger'): void {
  console.log(`Hello, ${name}`);
}
hello('SSEON'); // Hello, SSEON
```

<br/>

## 선택 매개변수

많은 프로그래밍 언어들은 함수 정의에 명시된 매개변수의 갯수보다 많거나 적은 경우 에러는 출력한다. 그러나 자바스크립트는 유연하게 부족한 것은 `undefined`처리를 하며 더 들어온 것은 버린다. 

이러한 기존의 자바스크립트의 문법적 유연성?에 있어 안정성을 확보하려고 **선택 매개변수**가 있다. 

함수의 매개변수 이름 뒤에 `?` 물음표를 붙여서 생략이 될 수 있음을 명시하는 것이다. 만약 `age?:number` 라고 작성을 한다고 하면 `age` 가 안들어올 수 있지만 들어온다면 `number` 타입인지를 검사한다.

```ts
function fetchVideo(url: string, subtitleLanguage?: string) {
  const option = { url };
  if (subtitleLanguage) {
    option.subtitleLanguage = true;
  }
  /* ... */
}
fetchVideo('https://google.com', 'ko'); // okay
fetchVideo('https://naver.com'); // also okay
```

타입스크립트 역시 정의한 매개변수 이상이 들어올 경우에는 에러를 출력하게 된다. 

```ts
function invalidFetchVideo(subtitleUrl?: string, url: string) {
  /* ... */
}
//error TS1016: A required parameter cannot follow an optional parameter.
```

<br/>

## 함수 오버로딩

자바스크립트에서는 한 함수가 여러 쌍의 매개변수-반환 타입 쌍을 가지는 경우가 흔하다. 이런 함수의 타입을 정의할 수 있도록 하는 것이 함수 **오버로딩** 이다.

타입스크립트의 오버로딩 특징

- 함수는 하나 이상의 타입 시그니처를 가질 수 있다.
- 함수는 단 하나의 구현을 가질 수 있다.

```ts
function doubleString(str: string): string {
    return `${str}${str}`;
}
function doubleNumber(num: number): number {
    return (num * 2);
}
function doubleBooleanArray(arr: boolean[]): boolean[] {
    return arr.concat(arr);
}
```

먼저 각 경우의 타입 시그니처를 정의하고 그에 맞는 구현을 한다.

```ts
function double(str: string): string;
function double(num: number): number;
function double(arr: boolean[]): boolean[];
```

실제 컴파일을 하게 되면 결과는 

```ts
function double(arg) {
    if (typeof arg === 'string') {
        return `${arg}${arg}`;
    } else if (typeof arg === 'number') {
        return arg * 2;
    } else if (Array.isArray(arg)) {
        return arg.concat(arg);
    }
}
```

<br/>

## This 타입

자바스크립트 함수 내부에서의 `this` 는 함수가 정의되는 시점이 아닌 실행되는 시점에 결정이 된다. 이렇게 `this` 타입을 추론하는 일은 매우 어렵다. 이러한 어려움을 해결하기 위해 함수 내에서 `this`를 명시하도록 했다.

```ts
interface HTMLElement {
  tagName: string;
  /* ... */
}
interface Handler {
  (this: HTMLElement, event: Event, callback: () => void): void;
}
let cb: any;
// 실제 함수 매개변수에는 this가 나타나지 않음
const onClick: Handler = function(event, cb) {
  // this는 HTMLElement 타입
  console.log(this.tagName);
  cb();
}
```

위에서 처럼 `this: 타입` 식으로 시그니쳐에서 매개변수 가장 앞에 `this`를 추가한다.

만약 `this` 의 타입을 `void` 로 명시한다면 함수 내부에서 `this` 에 접근하는 일 자체를 막을 수 있다.

```ts
interface NoThis {
  (this: void): void;
}
const noThis: NoThis = function() {
  console.log(this.a); // Property 'a' does not exist on type 'void'.
}
```