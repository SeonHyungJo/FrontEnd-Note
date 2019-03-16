# 함수형 프로그래밍과 ES6+

1.1 평가와 일급

평가 : 코드가 계산 되어 값을 만드는 것

일급

- 값으로 다룰 수 있다.
- 변수에 담을 수 있다.
- 함수의 인자로 사용될 수 있다.
- 함수의 결과로 사용될 수 있다.

1.2 일급 함수

일급 함수

- 함수를 값으로 다룰 수 있다.
- 조합성과 추상화를 도구

- 함수가 값으로 다루어 질 수 있다.

고차함수

- 함수를 값으로 다루는 함수

1. 함수를 인자로 받아서 실행하는 함수

    const apply1 = f => f(1);
    const add1 = a => a(1);
    
    log(apply1(add2));
    log(apply1(a => a -1));
    
    const times = (f, n) => {
    	let i = -1;
    	while ( ++i < n) f(i);
    };
    
    times(log, 3)

  2. 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하는 함수)

- addMaker

    const addMaker = a => b => a + b;
    const add10 = addMaker(10);
    
    log(add10(5));
    lof(add10(10));

2.1 기존과 달라진 ES6에서의 리스트 순회

- for i++
- for of

2.2 Array, Set, Map

모두다 for of를 순회할 수 있다.

Array를 통해 알아보기

    const arr = [1,2,3]
    arr[Symbol.iterator]
    for (const a of arr) console.log(a)

Set을 통해 알아보기

    const set= new Set([1,2,3])
    set[Symbol.iterator]
    for (const a of set) console.log(a)

Map을 통해 알아보기

    const map = new Map([['a', 1], ['b', 2], ['c',3]])
    map[Symbol.iterator]
    for (const a of map) console.log(a)
    for (const a of map.keys()) console.log(a)
    for (const a of map.values()) console.log(a)
    for (const a of map.entries()) console.log(a)

이터러블/이터레이터 프로토콜

- 이터러블 : 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값
- 이터레이터 :  { value, done } 객체를 리턴하는 next() 를 가진 값
- 이터러블/이터레이터 프로토콜 : 이터러블을 for ...of, 전개 연산자 등과 함께 동작하도록 한 규약

사용자 정의 이터러블을 통해 알아보기

    const iterable = {
    	[Symbol.iterator]() {
    		let i = 3;
    		
    		return {
    			next(){
    				return i == 0 ? { done: true } : { value: i--, done: false }
    			},
    			[Symbol.iterator]() {
    				return this;
    			}
    		}
    	}
    }
    
    let iterator = iterable[Symbol.iterator]();
    
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    
    for(const a of iterable) console.log(a)
    
    const arr2 = [1,2,3]
    
    let iter2 = arr2[Symbol.iterator]()
    iter2.next();
    for (const a of arr2) console.log(a)

전개 연산자

    const a = [1,2]
    console.log([...a, ...[3,4]])

# 2일차

### 제너레이터/이터레이터
- 제너레이터 : 이터레이터이자 이터러블을 생성하는 함수

    function *gen() {
    
    	yield 1;
    	yield 2;
    	yield 3;
    	return 100; // done이 true일 때의 value값
    }
    
    	let iter = gen()
    	console.log(iter[Symbol.iterator]() == iter);
    	console.log(iter.next());
    	console.log(iter.next());
    	console.log(iter.next());
    	console.log(iter.next());

무엇이든 순회할 수 있는 값을 만들어 주는 제어레이터

제너레이터를 통해서 다양한 값을 순회하는 것을 만들 수 있음

### odds

    function *infinity(i=0){
    	while(true) yield i++;
    }
    
    function *limit(l, iter) {
    	for (const a of iter){
    		yield a;
    		if(a == l) return
    	}
    }
    
    function *odds(l) {
    	for( const a of limit(l, infinity(1))){
    		if(a% 2) yield a;
    	}
    }
    
    let iter2 = odds(10);
    
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    
    for(const a of odds(40) console.log(a)

### for of, 전개 연산자, 구조 분해, 나머지 연산자

    console.log(...odds(10));
    console.log([...odds(10), ...odds(20)]);
    
    const [a, b, ...tail] = odds(5);
    console.log(a)
    console.log(b)
    console.log(tail)

## 8.7 yield *, L.deepFlat

### yield *

    L.flatten = function *(iter) {
      for (const a of iter) {
        if (isIterable(a)) for (const b of a) yield b
        else yield a;
      }
    };

`yield *` 을 활용하면 위 코드를 아래와 같이 변경할 수 있습니다. `yield *iterable`은 `for (const val of iterable) yield val;` 과 같다

    L.flatten = function *(iter) {
      for (const a of iter) {
        if (isIterable(a)) yield *a; // <=요부분을 축소 시킬 수 있다.
        else yield a;
      }
    };

### L.deepFlat

만일 깊은 Iterable을 모두 펼치고 싶다면 아래와 같이 L.deepFlat을 구현하여 사용할 수 있습니다. L.deepFlat은 깊은 Iterable을 펼쳐줍니다.

ES9에 추가가 되니 flat과 같은 기능을 하는 듯 polyfill느낌이 난다.

    L.deepFlat = function *f(iter) {
      for (const a of iter) {
        if (isIterable(a)) yield *f(a);
        else yield a;
      }
    };
    log([...L.deepFlat([1, [2, [3, 4], [[5]]]])]);

## 8.8 L.flatMap, flatMap

말그대로 javascript의 flat과 map을 동시에 작업을 하는 것이다.

map을 하고 flatten을 하게 되면 map의 단계가 지나면 array의 array가 나오게 되어 비효율이다.

그러나 시간복잡도는 동일하다.

    console.log([1, 2], [3, 4], [5,6,7,]).flatMap(a => a))
    console.log([1, 2], [3, 4], [5,6,7,]).flatMap(a => a * a))
    console.log(flatten([1, 2], [3, 4], [5,6,7,]).map(a => a.map(a => a * a))
    console.log(flatten([1, 2], [3, 4], [5,6,7,]).map(a => a.map(a => a * a))

    L.flatMap = currypipe((L.map, L.flatten));
    
    var it = L.flatMap(a => a, [[1, 2], [3, 4], [5,6,7,]]);

## 8.9 2차원 배열 다루기

2차원배열은 당연하게 flat으로 펼칠수 있구나

    const arr = [
    	[1, 2],
    	[3, 4, 5],
    	[6, 7, 8],
    	[9, 10]
    ];
    
    go(arr,
    	L.flatten,
    	L.filter(a => a % 2)
    	take(3),
    	console.log
    );

## 8.10 이터러블 중심 프로그래밍 실무적인 코드

지연성을 사용하여 실무적인 코드를 만들어서 사용한다.