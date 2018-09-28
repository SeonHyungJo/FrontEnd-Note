# Call By Value VS Call By Reference

```javascript
var value = '';
var ref = {};

// 2개를 비교하기 위한 함수
function callbyvalueReference(value, ref) {

    console.log(value); // ''

    value += 'value'; // 전역에 위치한 value에는 담기지 않는다.

    console.log(value); // value

    ref.name = 'reference'; // 전역에 있는 ref에 담긴다.
}

callbyvalueReference(value, ref);

console.log(value); // value
console.log(ref.name); // reference
```

값의 복사본인 함수 매개변수 value는 해당 수의 지역변수로 선언되고 정의되었다.
즉, 전역변수로 선언 및 정의된 value의 문자열과는 "+=" 연산자를 통해 합쳐 지지 않는다는 것을 말한다.

But 객체를 정의한 ref전역 변수는 함수의 매개변수로 "값" 과 "복사본"이 아닌 값에 의한 참조가 지역변수로 전달 되었기 때문에 내부에서 언제든 참조값 수정이 가능하게 되었습니다.(쉽게 참조가 전달되어서)

- 자바스크립트에서 객체는 참조만 전달이 된다.
- 다르게 말하면 위의 경우에 있어서 String은 값에 의한 참조여서, 매개변수 전달시 값에 복사본이 전달된다.

그러나 문자열의 길이는 임의적이기때문에 문자열을 바이트 단위로 복사하거나 전달, 비교하는 일은 매우 비효율적인 이기때문에 문자열은 참조 타입 형태로 구현되었다고 가정하는 것이 더 적절합니다.

간단한 실험 문자열 비교를 통해 값에 의해서 비교가 되는지 확인
만약 두 문자열이 값에 의해 비교되면 두 문자열은 동일할 것이고 참조에 의해 비교되면 동일하지 않을 것이다.

```javascript
var s1 = 'hello';
var s2 = 'hell' + 'o';

console.log(s1 === s2); //true

var obj1 = {
    str: 'hello'
}

var obj2 = {
    str: 'hell' + 'o'
}

console.log(obj1.str === obj2.str); //true
```

아래는 간단한 객체 상속 관계에서 참조값을 다루는 코드예제 입니다.

```javascript
function fn(){}
fn.prototype = {'arr': []};
new fn().arr.push(1);

console.log(new fn().arr); // 1
console.log(fn.prototype.arr); // 1
```

왜 [1]이 반환되는 걸까?

- 첫번째 반환 => 또 다시 자식을 new로 생성을 하여 arr값을 가져왔더니 이미 [1]이라는 것이 담겨있었다.

- 두번째 봔환 => 기존에 만들어 놨던 fn(){}에서 protptype.arr만 만들었는데 자식에서 추가를 했음에도 불구하고 fn.prototype.arr에 [1]이 담겨있다.

"자바스크립트" 에서 객체는 참조만 전달되기 때문이다. 즉, 자식( new fn() ) 객체 에서 속성 ({'arr': []})  값을 수정하면 부모 객체 속성 ({'arr': []}) 또한 수정되어 버립니다.

## 참고

- [무하프로젝트](http://mohwaproject.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-%EA%B0%92%EA%B3%BC-%EC%B0%B8%EC%A1%B0%EC%9D%98-%EC%B0%A8%EC%9D%B4)
- [자알쓰](https://blog.perfectacle.com/2017/10/30/js-014-call-by-value-vs-call-by-reference/)