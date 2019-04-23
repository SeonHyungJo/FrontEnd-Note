# 배열과 튜플(Array & Tuple)

순서가 있는 모음을 나타내는 배열과 튜플에 대해서 알아보자
<br/>

## Array 

배열은 자바스크립트의 Array와 동일하다. 그러나 타입으로 표시하는데 있어서 `[]` 를 적어서 표현을 하면된다.

```ts
const pibonacci: number[] = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
const myFavoriteBeers: string[] = ['Imperial Stout', 'India Pale Ale', 'Weizenbock']
```

위에서처럼 표현을 할 수 있지만 다른 방식의 표현도 있다.

```ts
const pibonacci: Array<number> = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
const myFavoriteBeers: Array<string> = ['Imperial Stout', 'India Pale Ale', 'Weizenbock'];
```

위와 같은 방법은 제네릭에서 좀 더 자세히 다뤄보자
<br/>

## Tuple

튜플은 자바스크립트를 하시던 분들은 생소한 타입이다.

튜플 타입을 이용해서 원소의 수와 각 원소의 타입이 정확히 지정된 배열의 타입을 정의할 수 있다.

```ts
const nameAndHeight: [string, number] = ['안희종', 27]
```

> 타입스크립트 2.6 이하 버전에서는 튜플 타입은 정확한 원소 개수를 보장하지 않게 변경이 되었다. 예를 들어 다음과 같은 코드가 허용되었다. `const nameAndHeight: [string, age] = ['조선형', 27, true];`

```ts
let tuple: [ boolean, number ] = [ true, 0 ];
tuple.concat([ false, 1 ]);
tuple.push('string'); // Error: Argument of type 'string' is not assignable to parameter of type 'number | boolean
```

`Tuple`의 기본적인 성격은 `Array`랑 동일하다. 차이점은 요소로 가질 수 있는 타입이 여러가지로 나뉠 수 있다는 것이다. 위의 `Tuple`은 `boolean, number`만 받을 수 있는 `Tuple`이다. 그러나 3번째 줄에서 `string` 타입을 추가하려고 하면서 에러가 생겼다.
<br/>

에러메시지를 보면 타입이 `number`나 `boolean`이 아니기에 할당할 수 없다고 한다. 
<br/>

**=> 처음에 변수에 할당하는 것들은 타입선언 순서에 맞게 들어가야하며 그 뒤에 들어가는 것은 타입에 맞기만 하면 순서가 상관없다는 것이다.**