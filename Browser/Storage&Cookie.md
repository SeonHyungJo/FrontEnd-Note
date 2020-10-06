# Storage & Cookie

브라우저에는 우리가 알게 모르게 다양한 저장소가 존재한다.

<p align="center">
  <img src="https://user-images.githubusercontent.com/24274424/58260975-698cda00-7db2-11e9-90d9-1cfabfe6a94a.png" alt="Storage">
</p>

> [참고] Chrome 개발자 도구 - Application Tab

위의 사진은 Chrome 개발자 도구에 들어가서 Application Tab을 누르게 되면 왼쪽 메뉴에 보이는 Storage들이다.

현재 여기에는 **총 5개의 Storage**가 보이는데 이 글에서는 세 가지만 다룬다. 

나머지 두 가지는 아래의 링크로 확인할 수 있다.

> [IndexedDB와 WebSQL](https://github.com/SeonHyungJo/FrontEnd-Note/blob/master/Browser/IndexedDB_WebSQL.md)

## Storage

Storage는 `HTML5`에 새롭게 추가된 저장소다. 이전에는 Cookie만 존재했으나 현재는 다양한 상황에 맞는 저장소를 사용할 수 있는 방법으로 생기게 되었다.

Storage는 크게 2가지로 구분이 된다.

`Session`과 `Local`이다.

### Session vs Local

Storage의 차이점은 간단하게 브라우저 종료를 하게 되면 알 수 있다.

**Session은 브라우저를 종료하면 소멸을 하게 되며, Local은 별도의 지우는 행위를 하지 않으면 지속해서 남아있다.** 

흔히 Local은 자동 로그인, 설정값으로 사용한다.

```js
// sesstion storage
sessionStorage.setItem('myCat', 'Tom');
sessionStorage.getItem('myCat') // Tom

// local storage
localStorage.setItem('myCat', 'Tom');
localStorage.getItem('myCat') // Tom
```

사용하는 문법은 두 개가 동일하다. 단순하기 탭을 닫고 다시 열었을 경우에는 둘 다 데이터가 유지되지만 브라우저를 닫고 열었을 경우에는 session storage의 값은 지워지게 된다.

## Cookie

Key-Value 형태의 저장소이다.

Cookie는 기본적으로 **만료 기한 존재**한다. 만료 기한이 지나게 되면 자동으로 Cookie에서 삭제된다. 서버에 요청 시 Cookie가 같이 날아가며, 사용자를 구분할 때 사용된다.

Cookie를 사용하기 위해서는 따로 함수를 만들어서 사용해야 한다.

### 단점

- 용량 : **4kb**로 매우 작은 용량이다.
- 속도 : 요청 때마다 포함되어서 간다. 작은 용량이라고 하지만 필요없는 데이터가 전달되는 낭비가 발생한다.
- 보안 : 위험성이 크다.

## Storage vs Cookie

- Storage는 Cookie보다 용량이 크며 **한 사이트당 5MB 이하를 권장**하고 있다.
- 자동으로 서버로 같이 전송되지 않는다.
- Cookie의 경우는 서버로 같이 넘어간다.
- Cookie와는 다르게 구현되어있는 함수로 조작이 가능하다.