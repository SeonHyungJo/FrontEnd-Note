# Strict Mode란?

한국말로 하면 엄격모드이다. 
그렇다면 당연하게 일반적으로 실행을 하는 것은 비-엄격하게 코드를 실행한다는 말처럼 들린다.
<br/>

**비-엄격하게라고 하면 어떤 것이고 엄격하다는 것은 어떤 것일까?** 
<br/>

**그리고 왜 이런모드가 생기게 된 것일까?**

> 엄격하지 않는 기본값을 느슨한 모드라고 부르며 영어로는 `sloppy mode`라고 한다고 한다. (아는사람은 많지 않겠지)


엄격모드로 실행을 하게 되면 몇가지 변경이 일어난다고 한다.

	1. 기본에는 조용히 무시되던 에러들을 `throwing` 한다.
	2. JS엔진의 최적화 작업을 어렵게 만드는 실수들을 바로 잡는다.(간헐적으로 엄격모드의 코드는 비-엄격모드의 도일한 코드보다 더빨리 작동한도록 만든다고한다.)
	3. 엄격모드는 `ECMAScript` 의 차기버전들에서 정의될 문법들을 금지한다고 한다.

<br/>

변형이 제한된 환경에서 동작하도록 하고 싶다면, 엄격 모드로의 변환([transitioning to strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode))을 참고하세요.
<br/>

엄격모드를 적용하는 방법은 정말로 간단하다. 상단에 `"use strict"`를 적으면 적용을 한 것이다. `'strict mode'`는 전체 스크립트 또는 부분 함수에 적용이 가능하다. 단 `{}`괄호로 묶여진 블럭문에는 적용이 되지 않는다. `{}`괄호 안에 `'strict mode'`를 넣어도 동작하지 않는다. `eval`코드, `function`코드, 이벤트 핸들러속성, `windowTimters.setTimeout()`에 넘겨진 문자열 들이 전체 스크립트에서 `'strict mode'` 를 사용할 수 있다.
<br/>

## Strict 모드

먼저 전체스크립트에 적용하기 위해, 정확한 구문 `"use strict"(또는 'use strct')` 를 다른 구문 작성 전에 삽입을 한다.
<br/>

```js
// Whole-script strict mode syntax
'use strict';
var v = "Hi!  I'm a strict mode script!";
```

엄격 모드의 스크립트와 비-엄격 모드의 스크립트의 연결은 심사숙고 하시기를 바란다. 앞에처럼 하게되면 전체 연결은 엄격으로 보인다. 비-엄격과 엄격의 결합은 비-엄격으로 보인다. 엄격 모드에 다른 엄격모드 들을 결합하는 것은 괜찮고 비-엄격 스크립트 사이의 결합도 괜찮다. 다만, 엄격과 비-엄격의 결합은 문제가 발생한다. 그때문에  함수에 의한 함수 기준의 엄격 모드를 쓰는 것을 추천합니다.
<br/>

유명한 이슈로 아마존에서 이걸로 문제가 발생한 적이 있다고 한다.
<br/>

## 함수에 Strict 모드 적용하기

마찬가지로, 함수에 `strict mode`를 적용하기 위해, 함수 본문 처음에 다음의 구문을 넣습니다. `"use strict";` (or `'use strict';`).

```js
function strict() {
  // 함수-레벨 strict mode 문법
  'use strict';
  function nested() { return "And so am I!"; }
  return "Hi!  I'm a strict mode function!  " + nested();}function notStrict() { return "I'm not strict."; }
```

<br/>

## 엄격모드로 전환

자세하게 보려면 `MDN` 을 살펴보는 것이 좋을 듯하다.
<br/>

## 다시 도입부

`"use strict"` 는 ES5에서 새롭게 나온 `directive` 이다. 실제 수행 문장이 아니라 `literal expression` 이기 때문에 이전 버전의 `JavaScript` 에서는 무시됩니다.
일반적으로 `JavaScript` 코드 최 상단에 이 `"use strict"`가 위치하는데 이 의미에 대해서 간단하게 정리해 봤습니다.
<br/>

### "use strict" 를 써야하는 이유

`"use strict"` 의 목적은 우리의 코드가 `strict mode` 로 실행되게 지시하는 것입니다. 여기서 말하는 `strict mode` 란 프로그램 실행 시 예외를 발생시킬 만한 몇가지 특이한 동작을 수행할 수 없도록 엄격한 제한이 걸려있는 실행 `context` 를 지칭한다. 즉, 일반적으로 동작하는 코드를 `"use strict"` 를 이용하면 에러가 발생할 수 있다.
<br/>

그 외의 예로는 함수의 매개변수의 리스트에서 중복된 부분이 있을 때 오류를 발생시키고 동일한 라이브러리를 중복해서 로딩하는 경우 에러를 발생시킵니다. (예를 들면, `jQuerylibrary` 중복로딩 )
<br/>

결론적으로 잠재적인 오류가 발생할 수 있는 여지를 막아주도록 코드에 대한 문법 사항을 엄걱하게 지키도록 하는 `directive` 정도로 인식하시면 될 듯 하다.
<br/>

## Strict 모드의 제한 요약 

1. 선언하지 않고 변수를 사용
2. 변수, 함수, 매개변수를 삭제
3. 동일한 프로퍼티를 한 번 이상 선언
4. 매개변수 이름이 동일
5. 8진법의 숫자 리터럴과 특수문자를 할당
6. 읽기전용에 할당하려 할 때
7. 얻기전용(get)에 할당하려 할 때
8. 삭제 불가능한 프로퍼티를 삭제하려고 할 때
9. `with` 키워드를 사용
10. `eval()` 을 사용하려 할 때

---

#### Reference

- [자바스크립트에서 strict mode를 사용해야 하는 이유](https://blog.aliencube.org/ko/2014/01/02/reasons-behind-using-strict-mode-while-coding-javascript/)
- [strict mode란 무엇인가?](http://jundol.kr/5)
- [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode)


