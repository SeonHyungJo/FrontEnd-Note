# JSConf2019

JSConf는 처음이라 설레는 마음으로 모든 부스를 가보고 모든 세션을 들으려고 노력했다.

들어갔을 때는 정말 큰 컨퍼런스라는 것이 느껴졌다. 부스가 외부에만 있는 줄 알았으나, 내부에도 많은 부스가 있었다. 또한 세션 역시 알차게 꽉꽉 채워져 있었으며, 휴식시간에도 들을 수 있는 내용들이 존재하였다.

나의 일정은 아래와 같이 되었다.

> 참고 : [JSConf2019 공식 홈페이지](https://2019.jsconfkorea.com/schedule)

![1](https://user-images.githubusercontent.com/24274424/64167177-a1acba00-ce83-11e9-8492-75fa77403fb8.png)
![2](https://user-images.githubusercontent.com/24274424/64167176-a1acba00-ce83-11e9-8752-3da1d9141737.png)
![3](https://user-images.githubusercontent.com/24274424/64167175-a1142380-ce83-11e9-991f-494d57b68b5c.png)
![4](https://user-images.githubusercontent.com/24274424/64167174-a1142380-ce83-11e9-8c62-f58ec936a26b.png)
![5](https://user-images.githubusercontent.com/24274424/64167173-a1142380-ce83-11e9-9a10-bc0195aafe47.png)
![6](https://user-images.githubusercontent.com/24274424/64167172-a1142380-ce83-11e9-9b68-ca1b935d5c81.png)
![7](https://user-images.githubusercontent.com/24274424/64167170-a07b8d00-ce83-11e9-9f09-c35ffe2c9a47.png)

한 가지 아쉬웠던 점은 라이트닝 토크를 듣는 장소에 바로 옆 부스가 있다보니 잘 들리지 않으며, 나 역시 다른 사람과 마찬가지로 부스로 가서 이벤트 참여하기에 바쁘게 만들었다. 

아래의 내용은 간단하게 내가 들었던 세션에 대해서 나의 생각을 적어서 보관하려고 한다.

전체적인 발표의 내용을 적기에는 내용이 많기도 하며, 가장 핵심은 **현재의 내가 무엇을 하면 좋을 것 인가?** 와 **다른 사람들은 어떤 것을 중심으로 개발을 하고 있나?** 라고 생각했다.

## 다마고치로 배우는 제너레이터

![tamagochi](https://user-images.githubusercontent.com/24274424/64169145-0a963100-ce88-11e9-9906-6c93dac14f3c.gif)

위의 GIF파일(짤)은 개선 대상이 되는 다마고치 게임이다. 소스는 아래의 주소를 가면 받아서 볼 수 있다.

> [tamagotchi](https://github.com/jcreighton/tamagotchi)

기본적으로 다마고치는 Canvas로 만들어졌으며, 각각의 애니메시션은 이미지를 이어서 보여주는 형태이다. 발표자인 젠은 처음에 애니메이션을 진행하는데 있어서 Callback 지옥을 만나게 되어 그것을 어떻게 해결했는가를 말해주었다.

기본적으로 Callback 지옥은 Promise로 해결을 했으나 Promise 역시 양이 많아지다보면 Callback과는 다르게 then 지옥이 발생한다.

위의 then 지옥을 해결하기 위한 제너레이터를 사용했다. 제너레이터를 사용함으로써 While Loop 중간에 멈출 수 있다는 장점이 생기게 되었다.
제너레이터 내부에서 또다른 제너레이터 호출이 가능하다.

그러나 제너레이터를 완전히 중단을 하고 다시 외부에서 이어가기란 쉽지 않다. 이제 나온 개념이 코루틴이었다.

>코루틴이란? </br>
> caller가 함수를 call하고, 함수가 caller에게 값을 return하면서 종료하는 것에 더해 return하는 대신 suspend(혹은 yield)하면 caller가 나중에 resume하여 중단된 지점부터 실행을 이어갈 수 있다는 개념이다.

결국 프로미스 + 제너레이터 + 코루틴을 통해서 비동기를 동기로 다루면서 중간에 멈췄다가 다시 시작하는 것이 가능해진 것이다.

## 매끄러운 경험을 위한 자바스크립트 비동기 처리

![image](https://user-images.githubusercontent.com/24274424/64170504-3ebf2100-ce8b-11e9-9eee-2ca3dc6cc918.png)

위의 사진은 Input 박스안에 단어를 입력하게 되면 단어수가 늘어나게 되면 뒤의 사각형 수가 기하급수적으로 늘어나는 기능이다.

이러한 기능은 중간에 급격히 느려져서 UX적으로 좋지 않다.

그렇다면 어떤 것이 느려진다면 어떤것이 그것을 못하도록 막는 것이 아닌가?

이를 먼저 알아보기 전에 우리는 Call stack, WebAPI, Event Loop에 대해서 잘 알고있어야 한다.

추가적으로 Event Loop을 깊이 보게 되면 Task, Micro Task의 차이점에 대해서 알아야한다.

프로미스의 고비용 작업으로 인해서 setTimeout callback이 멈추는 Block 상태가 될 수 있다.

실행 시간이 오래 걸리는 고비용 연산이 실행되고 있다면 UI Event가 멈추는 현상이 일어나고 사용자 경험을 방해할 수 있다.

### 해결방안

1. 단일 콜스택으로 작업하던 것을 별로의 스레드로 분리해서 실행하기
    1. 워커를 사용해서 처리한다. 통신을 통해서 처리하는 Web worker를 사용하여 무거운 작업을 넘겨서 작업을 하고 받는다.
    2. 메시지 기반으로만 통신이 가능하다.
2. task가 너무 크다면 쪼개서 실행한다.
    1. 무거운 task를 쪼개서 task들 사이에 위치한다.
    2. DOM 갱신에 쓰로틀링을 사용해서 최소화하는 방식으로 접근을 한다. 

[jaeseokk/ui-block-demo](https://github.com/jaeseokk/ui-block-demo)

## 오픈소스 프로젝트 mocha에서 배운 것들

다른 세션과는 다르게 기술적인 내용이 아닌 오픈소스활동에 있어 전반적인 자신의 경험을 말씀해주셨다.

내가 오픈소스 프로젝트를 참여를 하게 된다면 어떤 마음가짐을 가지며, 어떤 생각을 하고 참여를 하여야 하는지 알게 해주었다.

### MCVE

**minimal, complete and, verifiable, example**

### 생각해보기

- 내가 기여할 수 있는 부분에 기여하자
- 다른 프로젝트와 공생한다. (ex. jest와 경쟁하는 것이 아니다.)
- 어떤 성격의 프레임워크가 되어야 하는가?
  - 전체 기능에 대한 이해
  - 한 기능 변경의 사이드 이펙트
  - 프로젝트의 성격과 로드맵

> [Im-D](https://github.com/im-d)

## p5.js 맛보기: 함께 만들어보는 인터랙티브 뮤직비디오(체험)

먼저 컨퍼런스에 이런 세션이 있다는 것이 신기했다. 보통은 강연을 듣기만 한다면 이 세션은 오히려 참여를 한다는 점에서 색다르게 다가왔다.

p5라는 도구를 처음 봤는데 캔버스에 그림을 쉽게 그리도록 도와주는 도구라는 생각이 들었다. 생각보다 쉽게 구현이 되며 애니메이션을 만드는데 특화되어있다.

- [체험관련 Docs](https://docs.google.com/document/d/1OT_IX79IGCDn-3gYkrkEdPL-PUiCP93N6QAuFlJOcjY/edit)
- [직접 만들어 본 결과물(얼굴)](https://editor.p5js.org/SeonHyungJo/full/2q0tOT9Xx)
- [직접 만들어 본 결과물(얼굴 + 비트)](https://editor.p5js.org/SeonHyungJo/full/YpVA-Vb55)

## 함수형, Redux와 Canvas에 적용하면서 배워나가기

Lunit에서 사용되는 Skill인 Typescript, React, Redux에 대해서 간단한 설명이 이루어졌다. 여기에 추가적으로 Redux에서 Functional Programming에 대해서 설명이 이루어졌다.

- React에 대한 간단한 설명
- Redux에 대한 간단한 설명
- functional에 대한 간단한 설명서

이후에 본론으로 돌아가면 결국 Lunit에서 적용한 Redux + Functional에 대한 적용방법 설명이 이루어졌다. 이렇게 요즘에는 React단에서 Functional이 적용되는 경우와 Redux에서 Functional이 사용되는 경우가 많이 보이고 있다.

추가적으로 React에서는 useReducer를 자체적으로 지원을 하면서 함수형의 행보는 앞으로도 많이 기대가 된다.

## Typescript로 디자인 시스템에 날개 달기

디자인 시스템이란?

- 제품의 코드와 관련된 엄격한 규칙을 적용해준다.
- 개발 가이드라인
- 디자인 코드 그 이상의 것이다.

트위치는 React, TypeScript를 사용해서 관리를 하고 있다.

Typescript이란?

- js 컴파일링이 될 수 있는 상위 자바스크립트
- 클래스, 인터페이스등을 지원.
- 특정 파이프라인을 제공

IDEs

- 선언을 해놓으면 IDE에서 인식을 해서 자동완성이 될 수 있다.
- 인터페이스는 어떻게 작동해야하는지는 작성되지 않는다.

타입스크립트를 사용하게 되면서 개발자와 디자이너 사이에 신뢰가 생기게 된다.

## JS Bundle 사이즈 최적화를 통한 성능개선

해당 라이트닝 토크는 블로그로 읽었던 기억이 있어 링크로 대체합니다.

> [JavaScript Bundle Size 최적화 ](https://hyperconnect.github.io/2019/07/29/Optimize-webview-bundle-size-1.html)

## 적어도 캡 70개 어치는 하는 웹어셈블리 지침서

2013년 asm.js를 통해서 웹어셈블리에 대한 관심이 생기게 되고 2015년에는 공식적으로 WA가 나오게 되면서 많은 관심을 받고 있다.

기본적인 웹어셈블리가 왜 나오게 되었으며, 왜 사용이 되어야하나? 라는 주제로 이어가서 앞으로의 웹어셈블리의 행보와 사용하는 것을 추천하는 듯한 느낌을 받았다.

기존적으로 WA는 기존의 것들을 없애는 것이 아니라 보강하는 용도의 WA이다.

앞으로의 큰 성능을 내야하는 기능에 있어서 많이 사용될 것으로 보인다.

최근 Go Lang으로 만들어서 해보는 테스트를 해보기도 했다.

> [Go로 WebAssembly 경험해보기](https://github.com/SeonHyungJo/Dont_Waste_Your_Time/issues/37)