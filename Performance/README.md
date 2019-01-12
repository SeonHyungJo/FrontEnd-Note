# Performance

간략하게 오늘 다른 곳에서 읽었던 것을 정리해보고자 한다.
<br/>

생각해보면 당연하면서 생각하지 못했을 수 도 있을 것 같아서 정리를 해두려고 한다.

<br/>
<br/>

## 5 Tips to Write Better Conditionals in JavaScript

자바스크립트를 더 좋은 상태로 작성하는 5가지 방법이 있다.

<br/>
<br/>

### 1. Array.includes 사용하기 => IE 지원이 안됨

```javascript
// conditionfunction test(fruit)
if (fruit == 'apple' || fruit == 'strawberry') {console.log('red');}

```

<br/>

우리가 흔히? 사용하는 것으로는 `||`이 있다. 또는(or) 이라고 부르는 것을 `Array.includes`를 사용하면 좀 더 간편하게 구현이 가능하다.

<br/>

```javascript
function test(fruit) {
    // extract conditions to array
    const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
    if (redFruits.includes(fruit)) { console.log('red');
    }
}
```

<br/>

직역을 하자면 `포함을 하고 있냐?` 로 만약 해당 리스트에 내가 확인하려는 값이 있다면 `true`를 `return`하는 것이다.

<br/>
<br/>

## 2. Less Nesting, Return Early (덜 겹치기, 빨리 반환하기)

```javascript

function test(fruit, quantity) {
    const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

    // condition 1: throw error early 에러를 일찍 반환함으로써 아래에 있는 Lines을 수행하지 않는다.
    if (!fruit) throw('No fruit!');

    // condition 2: must be red
    if (redFruits.includes(fruit)) { console.log('red');

    // condition 3: must be big quantity
    if (quantity > 10) {console.log('big quantity');}
    }
}
```

<br/>

기존처럼 작성을 한다고 하면, `if`문으로 감싸서 fruit가 있다면으로 분기를 처리하고 `else`로 분기를 처리했다면, 여기서는 애초에 필요없는 부분을 거르고 시작을 한다.

<br/>

```javascript
    /_ return early when invalid conditions found _/
function test(fruit, quantity) {
    const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

    if (!fruit) throw('No fruit!');

    // condition 1: throw error early
    if (!redFruits.includes(fruit))
    return;

    // condition 2: stop when fruit is not red
    console.log('red');

    // condition 3: must be big quantity
    if (quantity > 10) {
        console.log('big quantity');
    }
}
```

<br/>

위의 경우는 한발짝 더 나아가 error 마져 먼저 처리를 한다.

<br/>
<br/>

## 3. Default 함수 매개변수를 사용한다.

```javascript
function test(fruit, quantity = 1) { 
    // quantity 매개변수로 Default 1을 넣어서 값이 없다면 1이 기본값이 된다.

    if (!fruit) return;
    console.log(`We have ${quantity} ${fruit}!`);}
    //test results
    test('banana');
    // We have 1 banana!
    test('apple', 2);
    // We have 2 apple!
```

<br/>

```javascript
    // destructing - get name property only
    // assign default empty object {}
    function test({name} = {}) {
        console.log (name || 'unknown');
    }
    //test results
    test(undefined);

    // unknown
    test({ });
    // unknown
    test({ name: 'apple', color: 'red' });
    // apple
```

<br/>

위의 경우는 매개변수를 Object로 보냈지만 함수 내부에서 Object안에 특정 값만을 가져와서 사용하는 방법이다.

<br/>
<br/>

## 4. Map, Object literal을 switch보다 선호하다.

```javascript
function test(color) {
    // use object literal to find fruits in color
    const fruitColor = {red: ['apple', 'strawberry'],yellow: ['banana', 'pineapple'],purple: ['grape', 'plum']};

    return fruitColor[color] || [];}
```

<br/>

위의 경우를 보게 되면 결과 return으로써 Map or Object를 사용함으로써 여러개로 나뉘는 분기문을 사용하지 않게 되는 것이다.

<br/>
<br/>

### Array.filter를 사용한 구문 리팩토링

```javascript
function test(color) {
    // use Array filter to find fruits in color
    const fruits = [{ name: 'apple', color: 'red' },{ name: 'strawberry', color: 'red' },{ name: 'banana', color: 'yellow' },{ name: 'pineapple', color: 'yellow' },{ name: 'grape', color: 'purple' },{ name: 'plum', color: 'purple' } ];

    return fruits.filter(f => f.color == color);}
```

<br/>
<br/>

## 5. Array.every & Array.some 사용하기 (전체확인, 부분확인을 위해서) => 모든 브라우저 호환가능

일단 위에 2개의 function은 매개변수로 function을 받는다. 위에서 언급한 includes는 literal을 받는다.

<br/>
<br/>

### every

```javascript
function test(fruits) {
    const fruits = [{ name: 'apple', color: 'red' },{ name: 'banana', color: 'yellow' },{ name: 'grape', color: 'purple' }];
    // condition: short way, all fruits must be red
    const isAllRed = fruits.every(f => f.color == 'red');
    console.log(isAllRed); // false
}
```

<br/>
<br/>

### some

```javascript
function test(fruits) {
    const fruits = [{ name: 'apple', color: 'red' },{ name: 'banana', color: 'yellow' },{ name: 'grape', color: 'purple' }];
    // condition: if any fruit is red

    const isAnyRed = fruits.some(f => f.color == 'red');
    console.log(isAnyRed); // true
}
```

<br/>
<br/>
<br/>

## 좋은 코드를 위한 7가지 간단한 코딩 규칙

1. 함수 하나가 한 페이지가 넘어가면 함수 분리
    - 12” 노트북 기준, 일반적으로 주석 포함 25줄 이하.

2. 들여쓰기가 두 단계 이상 넘어가면 함수 분리
    - for 문, if 문이 발생하면 일단 한 번 생각해본다.

3. 주석을 적어야 하면 함수로 분리
    - 의미가 분리되는 시점으로, 주석을 함수 이름으로 표현해본다.

4. 다루는 데이터의 종류가 추가되면 모듈(파일) 또는 클래스로 분리
    - 프로그램이란 기본적으로, 데이터와 그 데이터를 다루는 알고리즘을 결합한 것.

5. lint, format 도구 반드시 사용
    - 권장하는 lint 와 format 규칙엔 Best practice 가 거의 다 들어있다.

6. 기능 추가/수정하기 전에 리팩토링을 한 줄이라도 하고 시작
    - 뇌세포를 워밍업 시키기에도 좋다.

7. 테스트 케이스 딱 한 개라도 만들어놓고 시작
    - 당장은 못하더라도, 기능 추가/수정하거나 리팩토링할 때 테스트를 추가하기 쉽다.

<br/>
<br/>

## 참고

- [스위치문을 Object Literal로 대체하자!!](https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/)
- [5 Tips to Write Better Conditionals in JavaScript](https://scotch.io/tutorials/5-tips-to-write-better-conditionals-in-javascript#toc-3-use-default-function-parameters-and-destructuring)

<br/>
<br/>

### 번외

Switch 구문을 Object literals로 바꾸자!!!

각각의 분기문을 Object내부함수로 구현을 하고 return으로 하여금 매개변수를 사용해서 특정 function이 이루어지게 만든다. 또한
default값의 처리는 if ~ else나 Array['deafult']로 하여 Object 내부에 default function을 실행하도록 진행한다.