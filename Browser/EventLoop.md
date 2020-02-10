# EventLoop

## Single Thread(싱글 쓰레드)

**자바스크립트는 Single Thread 기반이다.** EventLoop가 Single Thread를 기반으로 한 구조이기 때문이다.

그럼 이 EventLoop은 무엇일까?

## 자료구조

간단하게 Stack은 `LIFO`이며 큐는 `FIFO`이다. Stack은 컵 모양의 공간에 넣고 빼는 것이며 Queue는 양쪽이 뚫려있는 튜브 모양을 생각하면 된다.

위의 2개의 자료구조는 자바스크립트에서 호출 **스택**(Call Stack)과 태스크 **큐**(Task Queue)로 사용된다.

> [호출 스택에 대해서 먼저 알아보기](https://seonhyungjo.github.io/Javascript-Book/basic/1-CallStack.html)

Stack은 여러 곳에서 사용되는 구조다. Stack을 쉽게 생각하면 `[main(), a(), b()]` 순서로 호출하면 `b -> a -> main` 순서로 빠져나오게 된다.

자바스크립트의 기본 내장되어있는 대표 비동기 동작 `setTimeout()`을 살펴보자.

```js
function foo() {
    console.log("b");
}

console.log("a");

setTimeout(foo, 0);

console.log("c");
```

위와 같은 코드를 실행하게 되면 출력 결과는 `a -> c -> b`가 된다. 의사 코드로 소스를 분석해보면.

1. a를 출력해라
2. 0초 뒤에 foo를 실행해라
3. c를 출력해라

위에서 언급한 호출 스택에 따르면 먼저 들어온 것을 끝내야 다음 것을 끝낼 수 있다. 그렇다면 순서는 `a -> b -> c`가 되어야 하지 않나? 라는 생각을 할 수 있다. 호출 스택에서는 앞의 내용이 맞지만, 자바스크립트에서 비동기 호출은 추가적으로 알아야 하는 것이 있다. 자바스크립트는 호출 스택만 사용하지 않기 때문이다.

![Event_Loop](https://user-images.githubusercontent.com/24274424/59566325-ab4f2e80-9099-11e9-86f8-4eda4add1318.png)

기본 구조는 위의 사진과 같다. 위와 같은 구조를 생각하면서 코드를 라인 단위로 살펴보면

1. `main()` 스택에 들어감
2. `log("a")` 도 스택에 들어간 뒤 실행
3. `setTimeout()`이 스택에 들어간 뒤 실행 - 백그라운드에서 0초 뒤에 foo를 "실행"시키라고 명령
4. 0초가 지나 "Task 큐"에 `foo()` 들어감
5. `log("c")` 가 스택에 들어간 뒤 실행
6. `main()` 종료
7. Task 큐에 있던 `foo()`를 호출 스택에 밀어 넣음 (이벤트 루프가 전역 컨텍스트의 main이 종료되면 큐 실행)
8. `foo()`가 호출 스택에 들어간 뒤 실행

위와 같은 순서로 실행이 되어 `a -> c -> b` 순서로 찍힌다.

## CallBack Function(콜백 함수)

자바스크립트의 싱글 쓰레드 구조에서 비동기의 이벤트 기반 실행이나 AJAX 요청이 필요하다면 콜백 함수를 이용해 백그라운드로 보내 큐를 통해 호출 스택으로 보낸다.

자바스크립트에서는 쓰레드를 통해 병렬처리가 안되기 때문에 콜백 함수를 사용한다.

## Queue & CallBack(큐와 콜백)

이벤트 루프의 가장 중요한 곳은 위 과정의 3번, 4번, 7번이다. 흔히 `setTimeout(foo, 3)` 함수를 실행하면 `foo()` 함수를 3초 뒤에 실행시켜라 라고 생각한다. 그러나 4번에서 보이듯이 foo는 일정 시간 뒤에 실행되는 게 아니라 **3초 뒤에 큐에 들어간다.**

큐에 들어간 foo는 호출 스택에 진행되는 내용이 없다면 3초 뒤에 바로 실행이 되겠지만 만일 다른 작업이 존재한다면, 3초가 넘어가서 실행되게 된다. `setTimeout()`이라는 함수는 n초 뒤에 콜백을 단순히 큐에 넣는 게 끝이다. 

**큐에 들어간 콜백 함수는 이벤트 루프가 스택으로 넣어 실행된다.** 코드를 간단히 보자면 아래와 같다.

```js
var eventLoop = [];
var event;

while(true) {
    // 틱!
    if (eventLoop.length > 0) {
        event = eventLoop.shift();
    }
    try {
        event(); // 호출스택으로 밀어넣는다
    }
    catch(err) {
        //...
    }
}
```

큐에 이미 대기번호가 100개가 있다면 foo는 101번째 대기표를 받게 되는 것이다. 따라서 `setTimeout()`은 지정한 시간동안은 실행되지 않는 것은 보장할 수 있지만 지정한 시간에 실행되는것은 보장할 수 없는 것이다.

## 자바스크립트 비동기 작업 3가지(크롬 기준)

자바스크립트는 본래 싱글쓰레드를 기반으로 작동을 했었다. 그러나 구글에서 비동기 호출이라는 것을 선보이면서 더 이상 웹에서는 라우터로 이동을 해야만 화면전환이 되는 등의 방식에서 비동기 작업이 가능해졌다. 

`Jquery` 로 보자면 `Ajax` 일 것이다. 그러만 구현부를 뜯어보지는 않았지만 `setTimeOut()` 이나 `xmlHttpRequest()` 로 구현이 되어있을 것으로 생각이 된다.

이후에도 자바스크립트의 발전과 브라우저의 발전으로 다양한 방법으로 비동기를 할 수 있는 수단이 생겼다. 

1. `setTimeOut(Task Queue)` : 가장 사람들이 잘 알고 있는 비동기 작업의 하나
2. `Promise(Micro Task Queue)` : ES8에 `Async Await`(Async Await도 결국 Promise이지만)
3. `AnimationFrame`

:point_right: 질문

- 위의 3가지의 우선순위는 어떻게 되나?

위에 보이듯이 우리가 잘 알고있는 `setTimeOut, setInterval`은 `Task Queue` 에 `Promise, async` 는 `Micro Task Queue` 에 들어가게 된다.

다른 한가지 `AnimationFrame` 는 그냥 `AnimationFrame` 이라고 하자 하나의 `Web API` 이니까(브라우저별로 다름). 먼저 그렇다면 어떤것이 먼저 실행되고 끝나는지 예제를 보고 해보자.

```js 
console.log('script start'); 

setTimeout(function() { 
  console.log('setTimeout'); 
}, 0); 
	
Promise.resolve()
  .then(function() { 
    console.log('promise1'); 
  })
  .then(function() { 
    console.log('promise2'); 
  }); 

console.log('script end');
```

---
**Task**

---
**Micro Task**

---
**jsStack**

---
**log**

---

### 참고 및 예제 문제

- [예제 문제](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules)

`setTimeOut` 하나의 `Run script` 가 마무리가 되어야 실행이될 수 있다. 프로미스는 하나의 `script`에서 실행된다. 

이부분에서 순서의 차이가 일어난다.위의 결과는 맞춰보자

다른 예제 2개도 풀어보기 [살펴보기]((https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules)) <= Event Click 문제 풀기

## AnimationFrame(RequestAnimationFrame) 크롬 기준

1. [`RequestAnimationFrame`와 `requestIdleCallback` 에 대해서](https://www.slideshare.net/deview/133-vsync)
2.  예제 파일로 돌려보기(애니메이션 효과 => 물론 js)

## MutationObserver, ResizeObserver, intersectionObserver

1. MutationObserver : https://codepen.io/seonhyungjo/pen/pQqOpv
2. InteractionObserver : https://codepen.io/seonhyungjo/pen/wQQYdz
3. ResizeObserver : https://codepen.io/seonhyungjo/pen/pQqOBy
   

### MutationObserver

돔 변형에 감지, 대응하기 위해 제공되는 `API`로 `Mutation Events`를 대체할 목적으로 설계됨

`MutationObserver`가 `MutationEvent`와 다른점

- 비동기
- 변형시마다 바로 실행 되는 것이 아니라 `Micro Task` 마지막에 배치로 DOM 변형들(Array 형태의 MutationRecord)을 콜백에 전달함

```js
let mo = new MutationObserver((mutations, thisMo) => {
  mutations.forEach(mutation => {
    // 개별 변형 대응
  });
});

let target = document.querySelector("body");
let options = {
 childList: true,
 attributes: true,
 subtree: true,
 characterData: true
};
 
mo.observe(target, options);
```

### MutationObserverInit

- childList : 타겟 노드의 자식 엘레멘트(텍스트 노드를 포함)들의 추가 혹은 제거를 관찰해야할 때 true
- attributes : 타겟 노드의 속성들의 변형들을 관찰해야할 때 true
- characterData : 타겟 노드의 데이터를 관찰해야할 때 true
- subtree : 타겟 노드부터 자손 노드들의 변형들까지 관찰해야할 때 true
- attributeOldValue : attributes이 true면서 타겟 노드의 변경된 속성들 이전 값을 기록해야할 때 true
- characterDataOldValue : characterData true면서 타겟 노드의 변경된 데이터 이전 값을 기록해야할 때 true
- attributeFilter : 모든 속성들을 관찰하고 싶지않을 때 관찰할 속성명의 Array