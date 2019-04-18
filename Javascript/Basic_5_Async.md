## setInterval

자바스크립트는 브라우저 내에서 작동하며 setInterval은 지연이 발생하며 시간에 따라 증가한다.

그 이유는 3가지로 들 수 있다.

- 앱을 실행하는 기기의 하드웨어 제한사항
- 브라우저의 비활성탭에서 실행되도록 앱남기기
- 최적화되지 않은 전체 코드베이스

[](https://www.notion.so/a4317bde62d34bda9a301a8acd32908e#f6513b5e2b9642a3add819ae22f3c8fe)

위의 사진을 간단하게 보면 dummyMethod1()이 오래 걸리면 자바스크립트의 이벤트 루프는 본연의 특징으로 인해서 스택에 걸려버렸다. 이런 상황이 되면 실행하기 위해서 기다리는 방법밖에 없다. 

이렇게 우리가 조작을 할 수 없는 3번의 특정순간에 보낸다. 타이머라는게 이상적인 상황일 때는 우리가 생각하는 그시간에 갈 수 있지만 브라우저와 자바스크립트는 그렇게 이상적이지 않다.

## setTimeout

setTimeout은 setInterval을 한 번 실행하는 것과 동일하다.

[](https://www.notion.so/a4317bde62d34bda9a301a8acd32908e#ad2fce717cb04048bbae863ab0315fd9)

위에서 했던 내용을 이번에는 setTimeout의 재귀적 호출로 해보자 그렇게 된다면 결국 setTimeout의  callback function에 setTimeout이 다시 불리는 구조가 될 것이다. 이렇게 만들어서 실행을 한다면 우리가 생각했던 것과 더욱이 달라 질 것이다. setInterval은 내가 정한 시간에 맞춰서 callback을 실행 하려고 큐에 담았을 것이다. 그러나 setTimeout은 callback function이 불려야 다음 setTimeout이 실행이 될 수 있는 조건이 되어 interval보다 지연이 더 심해 질 수 있다.

### 지연예시

    var counter = 0;
    
    var fakeTimeIntensiveOperation = function() {
    
        for(var i =0; i< 50000000; i++) {
            document.getElementById('random');
        }
    
        let insideTimeTakingFunction  = new Date().toLocaleTimeString();
    
        console.log('insideTimeTakingFunction', insideTimeTakingFunction);
    }
    
    
    
    var timer = setInterval(function(){ 
    
        let insideSetInterval = new Date().toLocaleTimeString();
    
        console.log('insideSetInterval', insideSetInterval);
    
        counter++;
        if(counter == 1){
            fakeTimeIntensiveOperation();
        }
    
        if (counter >= 5) {
           clearInterval(timer);
        }
    }, 1000);
    
    //insideSetInterval 13:50:53
    //insideTimeTakingFunction 13:50:55
    //insideSetInterval 13:50:55 <---- not called after 1s
    //insideSetInterval 13:50:56
    //insideSetInterval 13:50:57
    //insideSetInterval 13:50:58 

## requestAnimationFrame

기본적으로 브라우저는 60FPS이다 그래서 1초에 60번을 실행하게 되면 애니메이션이 깔끔하게 보인다. 그렇다면 위에서 알게 된 setInterval을 사용해서 표현을 하면

    setInterval(function() {
      // animiate something
    }, 1000/60);

이런식으로 표현이 가능하다. 

그러나 위에서 언급을 했지만 문제가 있다.

2017년 requestAnimationFrame이라는 기능이 Paul Irish에 의해서 추가가 되었다.

Paul의 설명에 의하면

- 브라우저가 애니메이션을 최적화 할 수 있으므로 애니메이션이 부드럽게 처리될 수 있다.
- 비활성 탭의 애니메이션이 중지되어 CPU가 시원해진다.
- 더욱이 배터리 친화적이다.

가장 간단한 예제를 보면

    function repeatOften() {
      // Do whatever
      requestAnimationFrame(repeatOften);
    }
    requestAnimationFrame(repeatOften);

한번 실행하면 재귀적으로 호출한다.

requestAnimationFrame 역시 취소하기 위햇 setTimeout setInterval과 마찬가지로 ID를 반환한다.

    globalID = requestAnimationFrame(repeatOften);
    cancelAnimationFrame(globalID);

그러나 아래의 링크를 보면 알게되지만 모든 브라우저가 지원하는 것은 아니다.

지원여부 확인하기(https://caniuse.com/#feat=requestanimationframe)

### 예제

[https://codepen.io/seonhyungjo/pen/MRVPxL](https://codepen.io/seonhyungjo/pen/MRVPxL)

## requestIdleCallback

## Observer들

- mutation
- resize
- intersection
- performance

#### Reference

- [https://javascript.info/settimeout-setinterval](https://javascript.info/settimeout-setinterval)
- [https://dev.to/akanksha_9560/why-not-to-use-setinterval--2na9](https://dev.to/akanksha_9560/why-not-to-use-setinterval--2na9)
- [https://develoger.com/settimeout-vs-setinterval-cff85142555b](https://develoger.com/settimeout-vs-setinterval-cff85142555b)
- [https://www.amitmerchant.com/Handling-Time-Intervals-In-Javascript/](https://www.amitmerchant.com/Handling-Time-Intervals-In-Javascript/)
- [https://css-tricks.com/using-requestanimationframe/](https://css-tricks.com/using-requestanimationframe/)
- [http://www.javascriptkit.com/javatutors/requestanimationframe.shtml](http://www.javascriptkit.com/javatutors/requestanimationframe.shtml)
- [https://yoiyoy.wordpress.com/](https://yoiyoy.wordpress.com/)