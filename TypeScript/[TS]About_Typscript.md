# [TS] TypeScript란?

> 최대한 내가 이해하는만큼 적도록 노력하겠습니다. 
> 같이 공부하는 입장에서 적겠습니다.

타입스크립트는 자바스크립트로 컴파일되는 자바스크립트의 타입이 있는 상위집합이라고 한다. 즉, 자바스크립트라는 원은 타입스크립트의 안에 있다고 생각하면 이해가 쉽다.

<p align="center">
  <img width="200" height="200" src="../assets/image/TypeScript_1.png">
</p>

타입스크립트를 설명하고자 한다면 간단하게 2가지로 말할 수 있을 것이다.

1. 타입이 있는
2. 상위집합

<br/>

## 타입이 있는 자바스크립트

기존의 자바스크립트는 동적타입언어(런타임에서 타입이 정해지므로)이다. 타입스크립트는 정적타입 시스템을 도입한 자바스크립트라고 생각하면 된다.

간단한 예제

```ts
// 타입을 만들어 준다.
type Language = 'TypeScript' | 'JavaScript' | 'Python' | 'Rust' | 'Haskell';

// 인터페이스를 사용해서 구현한다.
interface Person {
  favoriteLanguages: Array<Language>;
}

// 위에서 정의한 인터페이스와 Language를 사용한다.
function preferTypeScript(person: Person): boolean {
  return person.favoriteLanguages.includes('TypeScript');
}
```

<br/>

## 자바스크립트의 상위집합

**타입스크립트는 자바스크립트의 상위집합** 이다. 타입스크립트는 기존 자바스크립트에 전혀 없었던 개념을 제공함에도 불구하고 타입스크립트는 자바스크립트와 완전히 동떨어진 다른 언어가 아니다. 

프로그램의 타입을 분석하는 방식은 크게 둘로 나눌수 있다.

- 실제로 실행될 때에 타입 분석을 진행하는 동적타입언어
- 런타임 이전에는 타입을 확인하는 정적타입언어

정적타입분석이 제시하는 장점은 시스템의 평균적인 복잡도가 늘어남에 따라 더욱이 빛을 발한다.
<br/>

### 빠른 버그 발견

프로그램이 실제로 실행되기 전에 상당수의 오류를 잡아낼 수 있다.
<br/>

### Tooling

컴파일러 및 코드 에디터가 코드를 실행하지 않고도 프로그램에 대해 훨씬 더 많은 정보를 알 수 있다. 대표적인 예시가 자동 완성 기능이다. 이외 식별자의 정의 바로 이동기능 등이 가능해진다.
<br/>

### 주석으로서의 타입역할

타입이 주석같은 역할을 한다. 타입 검사기에 의해 검사 및 강제되므로 프로그램의 동작과 일정 수준 이상 괴리될 수 없기 때문이다.

```ts
  type IdentityFunction = (a: number) => number;
  const sum: IdentityFunction = (a: number, b: number) => {
      return a + b;
  }
    
  // error TS2322: Type '(a: number, b: number) => number' is not assignable to type 'IdentityFunction'.
  function concatString(a: string, b: string): string {
      return a - b;
  }
    
  // error TS2322: Type 'number' is not assignable to type 'string'.
  // error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number' or an enum type.
  // error TS2363: The right-hand side of an arithmetic operation must be of type 'any', 'number' or an enum type.
```

타입 정의와 다르게 동작하는 프로그램은 실행 자체가 불가능하다.
<br/>

### 자바스크립트와 정적 타입 분석

```ts
  const notString = { isString: false };

  console.log(notString.substr(0, 1)); // TypeError: notString.substr is not a function
```

<br/>

## 구성요소

### 언어명세

```ts
  const a: number = 32;
  const b: string = 3; // error
```

타입스크립트 언어 명세가 있다. `.ts` `.tsx` 확장자를 갖는 타입스크립트 코드가 어떤 의미를 가지는지에 대한 약속이다.
<br/>

### 컴파일러

타입스크립트 컴파일러는 타입스크립트 코드를 입력으로 받아, 명세에 맞게 해석한 후 대응되는 자바스크립트 코드를 출력으로 뽑아내준다.