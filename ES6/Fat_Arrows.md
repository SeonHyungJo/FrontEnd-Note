# [ES6] Fat Arrows

## Arrows and Lexical This

부제는 `babel` 에서 따왔다. 이 부제목은 정말 맘에 든다. 
<br/>

제목 그대로 화살표 그리고 렉시컬 `this` 이다.
<br/>

화살표 함수의 장점은 화살표로 표현해서 짧아진다는 장점 이외에 제일 좋은건 **렉시컬 스코프** 를 따른다는게 최애가 아닐까라고 생각한다. 
<br/>

기존의 `ES3` 에서의 `this` 가 동적으로 정해진다. 이것은 실행컨텍스트를 읽으면서 알게 되었는데 최악이다.

>[동적으로 this 바인딩 읽기]()

화살표는 `=>` 구문을 사용하는 **단축형** 이다. 이들은 `C#, Java 8` 및 `CoffeeScript` 의 관련 기능과 구문론적으로 유사하다.
<br/>

함수와 달리 화살표는 주변 코드와 동일한 어휘를 공유한다. 화살표가 다른 함수 안에 있으면 부모 함수의 `arguments` 변수를 공유하게된다. 공유라는 표현이 맞는지는 모르겠다.
<br/>

## 기본 표현

```js
// Expression bodies
const odds = evens.map(v => v + 1);
const nums = evens.map((v, i) => v + i);
```

`function`을 쓰지 않는다. 당연하게 화살표로 대신한다. 
<br/>

화살표를 기준으로 왼쪽은 `arguments` 오른쪽은 **표현구문** 이 된다. 
<br/>

위의 예제에서는 `return` 을 적지 않았는데 한 줄일 경우에는 `return` 이 생략된다.
<br/>

또한 `arguments` 의 경우 1개일 경우 괄호가 생략이 가능하며 2개 이상일 경우에만 괄호를 적으면 된다.
<br/>

## 기본 표현 2

```js
// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});
```

**표현구문** 이 한 줄이 아니다. 이 경우에는 `return` 을 명시적으로 적어주어야 한다. 
<br/>

또한 `Multi Line` 의 경우 `{}` 중괄호를 해야한다.
<br/>

## Lexical this

```js
// Lexical this
const bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
};
```

이 부분이 가장 중요한 것 같다. `Lexical(정적)` 이라는 것이다. 
<br/>

`this` 가 동적으로 바인드가 되는 것이 아닌 정적으로 선언된 지점을 기준으로 `this` 가 바인드가 이루어진다. 
<br/>

그렇다면 위에서는 `this` 가 `null`,  즉 `global` 이 아닌 `bob` 이 되는 것이다.
<br/>

## Lexical arguments

```js
// Lexical arguments
function square() {
  let example = () => {
    let numbers = [];
    for (let number of arguments) {
      numbers.push(number * number);
    }

    return numbers;
  };

  return example();
}

square(2, 4, 7.5, 8, 11.5, 21); // returns: [4, 16, 56.25, 64, 132.25, 441]
```

`arguments` 도 당연하겠지만 화살표 함수내에 없으니 `scope chain`에 의해 상위 함수 `scope` 를 찾을 것이다. 그렇게 상위의 `arguments` 를 참조하여 가져오게 될 것이다. 

---

#### Reference

- [devhints](https://devhints.io/es6)
- [babel](https://babeljs.io/docs/en/learn/#arrows-and-lexical-this)