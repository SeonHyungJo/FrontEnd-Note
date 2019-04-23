# 타입 별칭(Alias)

개발자분들 중 alias 기능을 자주 애용하시는 분들이 계신다. 바로 이미 존재하는 타입에 이름을 붙여서 표현을 하여 명확한 의도를 나타낼 때 사용할 수 있다.
<br/>

## 정의

```ts
type NewType = Type;
```

별칭이 되는 타입앞에는 `type`이라는 키워드를 붙여주었다.

```ts
type UUID = string;
type age = number;
type ParentUUID = UUID;
type Person = Person[];
type User = {
  name: string;
  height: number;
};
```

위에서처럼 작업을 하게 되면 단순하게 새로운 이름을 붙이게 되는 것으로 실제로 새로운 타입이 생성이 되는 것은 아니다.

```ts
type UUID = string;
function getUser(uuid: UUID) {
  /* 함수 본문 */
}
getUser(7); // error TS2345: Argument of type '7' is not assignable to parameter of type 'string'.
```
