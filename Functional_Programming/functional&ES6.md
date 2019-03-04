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