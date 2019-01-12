# Cookie Session Local

브라우저에는 크게는 2개, 작게는 3개로 나뉘는 저장소가 존재 한다.
<br/>

![Storage](https://github.com/SeonHyungJo/FrontEnd-Dev/tree/browser/assets/image/Storage.png?raw=true)

:point_right: (참고 사진 : Chrome Debugger)
<br/>

위의 사진은 **Chrome Debugger** 에 들어가게 되면 **Application** 이라는 메뉴란에 보이는 스토리지 모습이다.
<br/>

현재 여기에는 총 5개의 `Storage`가 보이는데 이 중 지금 보려고하는 것은 3개이다. 나머지는 2개는 다음에 알아보도록 하자.
<br/>
<br/>

## Storage

먼저 `Storage`는 `HTML5`에서 새롭게 추가된 저장소이다. 기존에는 쿠키만 존재를 했으나 이제는 더욱 상황에 맞는 저장소를 사용할 수 있는 길이 생긴 것이다.
<br/>

`Storage`는 크게 2가지로 구분이 된다.
<br/>

하나는 `Session` 다른 하나는 `Local`이다.
<br/>
<br/>

### Session VS Local

두 `Storage`의 차이는 간단하게 브라우저를 끄게 되면 알 수 있다. 세션은 브라우저를 끄게 되면 자동으로 소멸을 하게 되고, 로컬은 따로 지우지 않는 이상 남아있게 된다. 흔히 `Local`은 자동로그인, 설정값에 사용이 된다.
<br/>

- `Storage`는 쿠키에 비해 용량이 크며 **한 사이트당 5MB이하를 권장**하고 있다.
- 자동으로 서버로 같이 전송되지 않는다.
- 쿠키의 경우는 서버로 같이 넘어간다.
- 쿠키와는 다르게 구현되어있는 함수로 조작이 가능하다.

<br/>
<br/>

## Cookie

`Key-Value` 형태의 저장소이다.
<br/>

`Cookie`는 기본적으로 만료기한 존재한다. 서버에 요청시 `Cookie`가 같이 날라가며, 이는 사용자를 구분할 때 사용이 되기도 한다.
<br/>

`Cookie`를 사용하기 위해서는 따로 함수를 만들어서 사용해야한다.
<br/>
<br/>

### 단점

- 용량 : 4kb로 매우 작은용량이다.
- 속도 : 매 요청마다 같이 포함이 되어서 간다. 작은 용량이라고 하지만 필요없는 데이터가 전달되는 낭비가 발생한다.
- 보안 : 위험성이 크다.