# 객체(Object)

우리가 가장 많이보고 사용하는 타입인 객체에 대해서 살펴보자
<br/>

## 정의

우리가 자바스크립트에서 할당을 했던 방법과 동일하게 중괄호`{}`를 사용해서 표현할 수 있다.

```ts
const user: { name: string; age: number; } = { name: '조선형', age: 27 };
```

위에서의 객체타입 정의를 살펴보자

- `:` 을 기준으로 해당 속성의 타입이 우측에 들어간다.
- 구분자로는 `,`를 사용하지 않고 `;` 세미콜론을 사용한다.

<br/>

## 선택 속성

함수의 선택 매개변수와 비슷하게 속성명 뒤에 물음표`?`를 붙여서 해당 속성이 존재하지 않을 수 있음을 표현할 수 있다.

```ts
const userWithUnknownHeight: { name: string; age?: number; } = { name: 'sseon' };
```

<br/>

## 읽기 전용 속성

속성명 앞에 `readonly`라는 키워드를 붙여주게 되면 해당 속성이 재할당되는 것을 막을 수 있다. ES6에서의 `const`로 정의하는 것과 동일하다고 생각하면 쉬울 것이다.

```ts
const user: { 
  readonly name: string; 
  age: numer; 
} = { name: '조선형', age: 27 };
user.name = 'sseon'; // error TS2540: Cannot assign to 'name' because it is a constant or a read-only property.
```