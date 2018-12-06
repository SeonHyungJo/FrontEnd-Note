# Don't use **delete**

어디선가 주워들었다. `delete`를 사용하는 것은 속도에 악영향을 미친다고 그래서 간단하게 찾아 보았다. 왜 안좋은가? 

오히려 객체와의 매핑을 끊게 되면 가비지 컬렉션 대상이 되어 좋은 것이 아닌가??

> 가비지 컬렉션 관련 글은 추후에 올릴 예정


객체 속성을 지울 때는 `Delete`가 아니라 `undefined`나 `null`이 낫다

```markdown
Operator delete is unexpectedly slow!

Delete is the only true way to remove object’s properties without any leftovers, **but it works ~ 100 times slower**, compared to it’s “alternative”, setting object[key] = undefined. Use setting to undefined, when you care about performance. It can give a serious boost to your code. The key remains on its place in the hashmap, only the value is replaced with undefined. Understand, that for..in loop will still iterate over that key. There is no way to force garbage collection in JavaScript, and you don’t really need to. x.y = null; and delete x.y; both eliminate x’s reference to the former value of y. The value will be garbage collected when necessary. The only time I can think of where you would prefer delete is if you were going to enumerate over the properties of x. If you null out a property, it is still considered ‘set’ on the object and will be enumerated.
```
<br/>
<br/>

## 요약

객체의 속성을 지울때 사용한다.
<br/>

- `delete` 는 단순히 객체와 속성과의 연결을 끊을 뿐 실제로 메모리에서 제거하는 것은 아니다
- `delete` 하고 싶은 `delete` 연산자를 사용하기보다 값을 `null` 이나 `undefined` 로 설정하는것을 추천한다
- 단, 이 경우 `hashmap` 에서 `key` 가 삭제되는 것은 아니라서 `for-in loop` 을 사용하거나, `hasOwnProperty()` 같이 `key` 의 존재를 체크하는 경우에는 `key` 가 드러나긴 할거다. 하지만 `value === undefined` 같은 식으로 체크하는 경우는 문제없을거다.
- 자바스크립트에서 `gc` 를 강제로 트리거 할 방법은 없고 브라우저가 필요한 `tick` 에 알아서 한다.

<br/>
<br/>

## 참고

- https://medium.com/@laziel/javascript-%EA%B0%9D%EC%B2%B4%EC%9D%98-%EC%86%8D%EC%84%B1%EC%9D%84-%EC%A0%9C%EA%B1%B0%ED%95%A0-%EB%95%8C-delete-%EC%97%B0%EC%82%B0%EC%9E%90%EB%B3%B4%EB%8B%A4-undefined-%EB%82%98-null-%EA%B0%92%EC%9C%BC%EB%A1%9C-%EB%A7%8C%EB%93%9C%EB%8A%94-%EA%B2%83%EC%9D%B4-%EB%82%AB%EB%8B%A4-2db597f64514
- http://stackoverflow.com/a/21735614
- http://stackoverflow.com/questions/1947995
- http://bertanguven.com/preventing-memory-leaks-in-javascript-null-vs-delete/
- http://perfectionkills.com/understanding-delete/
