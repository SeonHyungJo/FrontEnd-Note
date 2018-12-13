# [ES6] Modules

이제는 `ES6` 에서는 `import export`가 가능해졌다. 
이것은 정말 간단하면서 파워풀하다.
<br/>

기존의 자바스크립트의 모듈패턴에 있어서 날개를 달아주는 엄청난 것이다.
<br/>
<br/>

## Imports

전체파일을 읽어오기

```js
// new
import 'helpers' 
// 기존
require('···') 
```

Default 값을 불러와서 선언하기

```js
// new
import Express from 'express'
// 기존
const Express = require('···').default || require('···')
```

사용할 값만 가져와서 선언하기(Destructing과 같은 모양새)

```js
// new
import { indent } from 'helpers'
// 기존
const indent = require('···').indent
```

가져온 값을 `Alias` 하기

```js
// new
import { indentSpaces as indent } from 'helpers'
// 기존
const indent = require('···').indentSpaces
```

전체 값을 `Alias`하기

```js
// new
import * as Helpers from 'helpers'
// 기존
const Helpers = require('···')
```

## Exports

위에서 보여준 `deafult`값 설정하기

```js
// new
export default function () { ··· }
// 기존
module.exports.default = ···
```

Method export하기

```js
// new
export function mymethod () { ··· }
// 기존
module.exports.mymethod = ···
```

Variable export하기

```js
// new
export const pi = 3.14159
// 기존
module.exports.pi = ·
```