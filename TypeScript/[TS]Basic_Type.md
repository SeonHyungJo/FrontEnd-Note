# [TS] 기본 타입에 대해서

자바스크립트를 하게 되면 당연하게 마주하는 문제는 타입에 관한 이슈와 좀 더 oop스럽게 짤 수 없을까 하는 생각일 것이다. 그런 단계를 이르게 되면 당연하게 한번쯤은 `TypeScript` 라는 아이를 생각하게 된다. 
<br/>

저도 이번 기회에 한번 훑어보려고 합니다.(모든 내용의 기준은 `TypeScript` 공식 사이트 `HandBook` 기준입니다.)
<br/>

`TypeScript` 의 기능들은 크게 보면 **정적 타이핑과 ECMAScript** 구현으로 나뉠 수 있다.
<br/>

- `Type annotation` & 정적 타입 체크
- 타입 추론
- `Interfaces`
- `ES2015 Features`
  - `let & const`
  - `Block scope`
  - `Arrow functions`
  - `Classes`
  - `Promise`
  - `Etc…`
- `Namespaces & Modules`(`CommonJS, ES2015, AMD`)
- `Generic`
- `Mixin`

`TypeScript` 에서 제공하는 기본적인 타입에 대해서 정리를 시작해보자
<br/>

## 타입 선언

```ts
let isDone: boolean = false;
```

기본적으로 타입 선언은 콜론`(:)` 를 쓰고 뒤에 타입을 선언하면 된다.
<br/>

생각보다 타입을 선언하는 방법은 간단하게 되어있다.
<br/>

함수를 사용할 때도 콜론`(:)` 을 사용해서 나타내면 그런데 모양새를 어째 이상하다.(처음보는 내 기준인 것 같다)

```ts
function echo(param: string): string {
 return param;
}
```

## 왜 Wrapper 객체를 사용하면 안되나?

`JavaScript` 에서는 `JavaScript primitive type`들에 대해 `Wrapper` 객체를 제공한다. TypeScript에서도 사용이 가능하다.

```ts
const isLiar: boolean = true; // OK
const isTruth: Boolean = false; // OK
```

가급적이면 `boolean` 을 사용하는 것이 권장된다. `new Boolean()` 으로 생성한 값을 `boolean` 타입에 할당할 수는 있으나 **그 반대는 안되기 때문이다.**

```ts
const isLiar: boolean = new Boolean(true); // OK
const isTruth: Boolean = false; // Error: Type 'Boolean' is not assignable to type 'boolean'.
// 'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
```

리터럴 문법 대신 저렇게 `Wrapper` 객체를 이용하여 생성자를 호출하는 것이 `JavaScript` 에서도 권장하지 않는 방법이다.
<br/>

`Number & number`, `String & string` 등에서도 타입을 명시할 때 사용하지 말자
<br/>

## Basic Type

### Boolean

```ts
let isDone: boolean = false;
```

모두가 알고 있는 `true || false` 타입이다. 너무 나도 심플해서 적을 것이 없다.
<br/>

### Number

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

우리가 알고 있듯이 숫자를 나타내는 `Number`타입이다. 마찬가지로 2진수 8진수가 된다. 이는 `ECMA2015` 를 지원한다는 말과 동일하다.(모두가 알고 있겠지만 `ES6`에서 추가됨)
<br/>

### String

모두가 잘알고 있는 문자열타입이다.

```ts
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;
```

<br/>

### Array

자바처럼 `<>` 제네릭이 생겼다 신기방기하다. (하나하나에 놀라는중...)

```ts
let list: number[] = [1, 2, 3]; // 방법 1
let list: Array<number> = [1, 2, 3]; // 방법 2 
```
나라면 아래처럼 사용할 듯 하다.
<br/>

### Object

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

희안하다 `Object`타입인데 `Number String Blooean`이 안된다. 
<br/>

:star: 기존의 `Java` 에서는 당연하게 상위 타입인 Object로 선언을 했다면 `String`, `Int`등으로 변환이 가능했는데 말이다.
<br/>

### Null and Undefined

```ts
let onlyNull: null = null;
onlyNull = undefined; // OK
onlyNull = false; // error: Type 'boolean' is not assignable to type 'null'.
```

공식 문서에 있다고 한다. 그런데 `Null`, `Undefined`로 선언을 하면 어디서 사용을 하는 것일까? 아직까지 경험이 없어서 모르겠다.
<br/>

## TypeScript 추가된 타입

### Tuple

```ts
let tuple: [ boolean, number ] = [ true, 0 ];
tuple.concat([ false, 1 ]);
tuple.push('string'); // Error: Argument of type 'string' is not assignable to parameter of type 'number | boolean
```

`Tuple`의 기본적인 성격은 `Array`랑 동일하다. 차이점은 요소로 가질 수 있는 타입이 여러가지로 나뉠 수 있다는 것이다. 위의 `Tuple`은 `boolean, number`만 받을 수 있는 `Tuple`이다. 그러나 3번째 줄에서 `string` 타입을 추가하려고 하면서 에러가 생겼다.
<br/>

에러메시지를 보면 타입이 `number`나 `boolean`이 아니기에 할당할 수 없다고 한다. 
<br/>

순서에 관계없이 선언된 두 종류의 타입 중 하나면 요소가 될 수 있는 건가? 라는 생각을 할 수 있다. 맞다 선언된 타입중에 하나이면 된다. 
<br/>

그렇다면 순서는 상관이 없을까? 아래는 똑같은 코드를 선언 순서만 바꿨다.

```ts
let tuple: [ boolean, number ] = [ 0, true ]; //Error

let tupleAdd: [ boolean, number ] = [ true, 0 ];
tupleAdd.concat([ 1, false ]);
```

첫번째의 경우에서는 에러가 발생하게 되고, 두번째 변수에서는 어떤 에러도 발생하지 않는다. 그렇다면 이렇게 정리를 할 수 있을 듯하다.
<br/>

**=> 처음에 변수에 할당하는 것들은 타입선언 순서에 맞게 들어가야하며 그 뒤에 들어가는 것은 타입에 맞기만 하면 순서가 상관없다는 것이다.**

### Any

타입명 그대로 어느것이든 들어갈 수 있다.
그런데 `TypeScript` 를 사용하는데 이건 최대한 안사용하는게 좋을 듯 하다.

```ts
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

### Void

클래스에서 리턴타입으로 많이 사용하던 것이 아닌가? 기존의 자바스크립트에서는 `a`태그에서 다른 페이지로 이동하지 않기 위해서 `javascript: void 0` 이런식으로만 사용을 하고 있었다. 그런데 이제는 타입스크립트에서는 본래의 형태로 사용이 되고있다.

```ts
function log(arr): void {
 console.log(arr.join(', '));
}
```

정말 오랜만에 보는 광경인가? `script` 언어에서 사용하게 될 줄이야
<br/>

### Enum

```ts
enum Fruit { Apple, Banana, Melon };
let fruit: Fruit = Fruit.Apple;
```

`Enum` 은 어떤 변수에 값으로 할당할 수 있는 요소들의 집합이다. 타 언어에서 보던 `Enumertaion`과 흡사한 개념이다. 다음과 같은 문법을 가진다.

### Never

이것 또한 어디에서 사용해야 할지
어떤 타입도 들어갈 수 없다.

```ts
let neverVar: never = null; // Error: Type 'null' is not assignable to type 'never
```

## Type Assertions

간단하게 `Type Cast` 이다. 타입을 다른 타입으로 변경을 하는 것이다.

```ts
// 방법 1
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

```ts
// 방법 2
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

위와 같이 하게 되면 타입을 변경해서 해당타입의 메소드를 사용할 수 있다.
<br/>

다음에는 `Interface`에 대해서 보려고 한다.

---

#### Reference 

- [TypeScript: 소개](https://hyunseob.github.io/2016/09/25/typescript-introduction/)
- [hackr.io](https://hackr.io/tutorials/learn-typescript)
- [공식사이트](https://www.typescriptlang.org/docs/handbook/basic-types.html)