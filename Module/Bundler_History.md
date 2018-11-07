# Bundler History :book:

## 모듈이란(What is Module)

우리가 구현한 세부사항을 **캡슐화** 를 하고 **필요한 API부분만 공개**하여 쉽게 로드하여 사용할 수 있도록 하는 코드 조각
</br>

> 다른 곳에서 가져온 것이지만 코드 조각이라는 표현은 오랫만에 본 듯하다.
</br>

**그렇다면 Module이 왜 필요한가?** :round_pushpin:
</br>

우리는 원래 기술적으로 우리는 모듈 없이도 코드를 작성할 수 있었다. 충분히 예전이나 지금이나 jquery를 사용해서 **Inline**으로 잘 구현하고 있지않나?
</br>

:maple_leaf: **Module** 은 60, 70년대 이후 개발자들이 다양한 형식과 프로그래밍 언어로 사용해온 패턴이다. :maple_leaf:
</br>

:point_right: 자바스크립트에서 **Module** 은 이론적으로 다음 사항을 허용해야 한다.
</br>

---

1. 추상화 : 특수한 라이브러리에 기능을 위임하여 실제 구현의 복잡도를 이해할 필요가 없다.
2. 캡슐화 : 코드를 변경하지 않으려면 Module 내부에 코드를 숨긴다.
3. 재사용 : 같은 코드를 반복해서 작성하는 것을 피한다.
4. 의존성 관리 : 코드를 다시 작성하지 않고도 쉽게 의존성을 변경한다.

---

</br>
</br>

## Inline Script

사람들이 지금도? 많이 사용하고 있는 `<script></script>` 사이에 코드를 작성하는 방법이다.
</br>

그러나 예전부터 사용하는 방법에는 당연하게도 문제점이 있다. :boom:

1. 재사용성 : 다시 사용하려면 코드를 복붙해야한다.
2. 의존성 : 의존성을 개발자가 잘 맞춰주어야한다.
3. 전역 네임스페이스의 오염 : 전역으로 선언을 하여 전역이 더러워진다. (흔히 대기업에서 프로젝트로 jquery를 사용할 경우)

</br>
</br>

## Script tag(Use External File)

외부의 script파일을 만들어서 `<script src="..."></script>`를 사용해서 외부파일을 가져오도록 하는 것이다.
</br>

기존의 사용하던 `Inline Script` 와는 다르게 **재사용성에는 좋아졌으나 의존성문제와 전역의 오염의 의지는 남아있게된다.** :boom:
</br>

1. 의존성 : 의존성을 개발자가 잘 맞춰주어야한다.
2. 전역 네임스페이스의 오염 : 전역으로 선언을 하여 전역이 더러워진다.

</br>
</br>

## Module Object and IIFE

`Module Object and IIFE`를 사용하게 됨으로써 전역의 오염이 줄어들게 되었다. 여러개를 전역에 선언을 해서 사용하는 것이 아닌 하나의 `Object`를 만들어서 그 안에 만들어 사용함에 따라 오염도가 줄어들게 되는 것이다.
</br>

아직까지 의존성의 문제와 전역네임스페이스의 완전한 오염이 없는 경우가 없다. :boom:
</br>

1. 의존성 : 의존성을 개발자가 잘 맞춰주어야한다.
2. 전역 네임스페이스의 오염 : 전역으로 선언을 하여 전역이 더러워진다.

</br>
</br>

## 모듈 패턴(Module Pattern) :clap:

`Module` 포맷은 `Module`을 정의하기 위해 사용할 수 있는 문법이다.
</br>

**EcmaScript6** 또는 **ES2015** 이전에 자바스크립트는 `Module` 을 정의하기 위한 공식적인 문법을 가지고 있지 않았다.
</br>

그 결과 영리한 개발자들은 자바스크립트에서 `Module`을 정의하기 위해 다양한 포맷을 고안해 냈다.
</br>

다음은 많이 채택되고 잘 알려진 포맷들이다. :exclamation:
</br>

- CommonJS(Nodejs가 채택한 패턴)
- 비동기 모듈 정의(AMD, Asynchronous Module Definition)
- 만능 모듈 정의(UMD, Universal Module Definition)
- System.register
- ES6 모듈 포맷

</br>
</br>

### Commonjs

```js
// add.js
module.exports = function add(a, b){
  return a+b;
}

var add = require('./add');
```

</br>

**CommonJS** 포맷은 **Node.js**에서 사용되고 `require`와 `module.exports`를 사용해서 **의존성과 모듈을 정의**한다.
</br>
</br>

### AMD, Asynchronous Module Definition

```js
//Calling define with a dependency array and a factory function
define(['dep1', 'dep2'], function (dep1, dep2) {

  //Define the module value by returning a value.
  return function () {};
});
```

</br>

**Commonjs** 패턴의 문제는 동기식이라는 것, 이에 비동기식으로 불러오자는 패턴이다.
</br>

AMD 포맷은 브라우저에서 사용되고 `define` 함수를 사용해서 모듈을 정의한다.
</br>
</br>

### UMD

**UMD** 포맷은 **브라우저와 Node.js**에서 둘 다 사용될 수 있다.
</br>

```js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['b'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('b'));
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(root.b);
  }
}(this, function (b) {
  //use b in some fashion.

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {};
}));
```

</br>
</br>

### System.register

**System.register** 포맷은 ES5에서 ES6 모듈 문법을 지원하기 위해 디자인되었다.

```js
import { p as q } from './dep';

var s = 'local';

export function func() {  
  return q;
}

export class C {  
}
```

</br>
</br>

### ES6 Module Formmat

ES6에서 자바스크립트는 내장된 모듈 포맷도 지원한다.
</br>

모듈의 공개 API로 내보내기 위해 `export` 토큰을 사용한다.
</br>

```js
// lib.js

// Export default function
export default function sayHello(){  
  console.log('Hello');
}

// Export non-default function
export function sayGoodbye(){  
  console.log('Goodbye');
}
```

그리고 `import` 토큰은 모듈이 내보내는 부분을 가져온다.

```js
import sayHello, { sayGoodbye } from './lib';

sayHello();  
// => Hello

sayGoodbye();  
// => Goodbye
```

</br>
</br>

## 모듈 로더

주요 모듈 포맷으로 작성된 모듈을 **런타임 때** 로드하고 해석한다.
</br>

1. 브라우저에서 모듈 로더를 로드한다.
2. 모듈 로더에게 어떤 메인 애플리케이션 파일을 로드할 것인지 려준다.
3. 모듈 로더는 메인 애플리케이션 파일을 다운로드하고 해석한다.
4. 필요한 경우 모듈 로더가 파일을 다운로드한다.

</br>

- RequireJS : AMD 포맷 모듈을 위한 로더
- SystemJS : AMD, CommonJS, UMD 또는 System.register 포맷 모듈을 위한 로더

</br>
</br>

## 모듈 번들러

모듈 번들러는 모듈 로더를 대체한다.
</br>

빌드타임에 사용되는 라이브러리로 모든 `Module` 을 의존성에 맞게 전역스페이스의 오염이 없도록 하나의 파일로 묶어주는 **라이브러리**
**모듈 로더를 대체하고 빌드 타임에 모든 코드의 번들을 생성한다.**

1. 빌드 타임에 번들 파일을 생성하기 위해 모듈 번들러를 실행한다. (예: bundle.js)
2. 브라우저에서 번들 파일을 로드한다.

</br>

- Browserify : CommonJS 모듈을 위한 번들러
- Webpack : AMD, CommonJS, ES6 모듈을 위한 번들러

</br>
</br>

## Webpack

자바스크립트 코드가 많아지면 하나의 파일로 관리하는데 한계가 있다. 여러개 파일을 브라우져에서 로딩하는 것은 그만큼 **네트워크 비용을 치뤄야하는 단점**이 있다.

뿐만 아니라 각 파일은 서로의 **스코프를 침범하지 않아야 하는데** 잘못 작성할 경우 **변수 충돌의 위험성**도 있다.

함수 스코프를 사용하는 자바스크립트는 **즉시호출함수(IIFE)** 를 사용해 **모듈**을 만들 수 있다. CommonJS나 AMD 스타일의 모듈 시스템을 사용하면 **파일별로 모듈을 관리**할 수도 있다.

여전히 브라우져에서는 파일 단위 모듈 시스템을 사용하는 것은 쉽지 않은 일이다.

:fire: **모듈을 IIFE 스타일로 변경해 주는 과정 뿐만 아니라 하나의 파일로 묶어(bundled) 네트웍 비용을 최소화 할수 있는 방법이 웹 프로트엔드 개발 과정에는 필요하다.** :fire:

### Webpack의 주요 4가지

1. 엔트리: 시작점
2. 아웃풋: 번들된 결과물 위치
3. 로더 : 웹팩은 기본적으로 js를 위해서 나온 번들러였다. 그러나 여러가지 기능을 넣을려고 해서 생긴것으로 비js를 읽고 해석을 하는데 필요한것들을 넣어주는 곳
4. 플러그인 : 번들이 완료가 되고나서 작업하는 것들은 넣어주는 곳(ex 난독화)

</br>
</br>

## 참고

- [웹팩의 기본 개념 - 김정환블로그](http://blog.jeonghwan.net/js/2017/05/15/webpack.html)
- [Brief history of JavaScript Modules](https://medium.com/sungthecoder/javascript-module-module-loader-module-bundler-es6-module-confused-yet-6343510e7bde)
- [자바스크립트 모듈, 모듈포맷,모듈로더와 모듈 번들러에 대한 10분 입문서](https://github.com/codepink/codepink.github.com/wiki/자바스크립트-모듈,-모듈-포맷,-모듈-로더와-모듈-번들러에-대한-10분-입문서)