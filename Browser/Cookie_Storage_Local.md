# Cookie Session Local

브라우저에는 크게는 2개, 작게는 3개의 저장소가 존재한다.

<p align="center">
  <img src="https://user-images.githubusercontent.com/24274424/58260975-698cda00-7db2-11e9-90d9-1cfabfe6a94a.png" alt="Storage">
</p>

:point_right: (참고 사진 : Chrome Debugger)

위의 사진은 Chrome Debugger에 들어가게 되면 Application Tab에 들어가 되면 왼쪽 메뉴에 보이는 저장소의 모습이다.

현재 여기에는 **총 5개의 Storage**가 보이는데 이 글에서 보려는 것은 3개이다. 나머지는 2개는 다음에 알아보도록 하자.
<br/>

## Storage

Storage는 `HTML5`에 새롭게 추가된 저장소이다. 예전에는 Cookie만 존재했으나 현재는 많은 상황에 맞는 저장소를 사용할 수 있는 방법이 생겼다.

**Storage는 크게 2가지로 구분이 된다.**

`Session` 다른 하나는 `Local`이다.
<br/>

### Session vs Local

두 Storage의 차이점은 간단하게 브라우저를 종료하게 되면 알 수 있다. **Session은 브라우저를 종료하면 소멸을 하게 되고, Local은 별도의 지우는 행위를 하지 않으면 남아있게 된다.** 흔히 Local은 자동 로그인, 설정값으로 사용한다.
<br/>

## Cookie

**Key-Value 형태의 저장소**이다.

Cookie는 기본적으로 **만료 기한 존재**한다. 서버에 요청 시 Cookie가 같이 날아가며, 이는 사용자를 구분할 때 사용이 되기도 한다.

Cookie를 사용하기 위해서는 따로 함수를 만들어서 사용해야 한다.
<br/>

### 단점

- 용량 : **4kb**로 매우 작은 용량이다.
- 속도 : 매 요청마다 같이 포함되어간다. 작은 용량이라고 하지만 필요없는 데이터가 전달되는 낭비가 발생한다.
- 보안 : 위험성이 크다.

## Storage vs Cookie

- Storage는 Cookie에 비해 용량이 크며 **한 사이트당 5MB이하를 권장**하고 있다.
- 자동으로 서버로 같이 전송되지 않는다.
- 쿠키의 경우는 서버로 같이 넘어간다.
- 쿠키와는 다르게 구현되어있는 함수로 조작이 가능하다.