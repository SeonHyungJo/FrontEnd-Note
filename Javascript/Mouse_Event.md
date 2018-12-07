# Mouse Event

오늘은 약간 심플하면서도 약간 헷갈릴만한 주제로 해보려고한다.

바로 마우스 이벤트

오늘 작업을 하다보니 내가 평소에 알고 있던 마우스 이벤트들인데 왜 이렇게 어렵지라고 생각되는 것이 있어서 정리를 하면서 다시 학습해보려고 한다.

기본적으로 우리가 알고 있는 이벤트의 종류는 이렇다

- mousedown : 마우스 누른 상태
- mousemove : 해당 Element 위에서 움직이는 상태
- mouseup : 마우스 떼는 상태
- click : mousedown와 mouseup이 한번 일어난 상태

위의 4가지의 상태는 우리가 흔히 사용하는 마우스 이벤트이다.

간단한 예제를 만들어 보자면

```html
<html>
    <head></head>
    <body>
        <div style="
            width:  100px;
            height:  100px;
            background-color: black;
        ">
        black
        </div>
    </body>
</html>
```

간단한 검은색 Div를 만들어서 이 Element에 이벤트를 입힌다.

```js
var div = document.getElementsByTagName("div")

// MouseDown
div[0].addEventListener("mousedown", function(){
    console.log("mousedown")
})

// MouseMove
div[0].addEventListener("mousemove", function(){
    console.log("mousemove")
})

// MouseUp
div[0].addEventListener("mouseup", function(){
    console.log("mouseup")
})

// Click
div[0].addEventListener("click", function(){
    console.log("click")
})
```

예제를 만들어보고 한번 움직이고, 클릭하고 해보자 그러면 더욱 이해가 잘 될 것이다.

자 이제 제일 기본이 되는 이벤트를 알아 보았다. 이제는 헷갈렸던 작업으로 가보자

## MouseOver MouseOut

- mouseover : 마우스를 Element위에 올린 상태
- mouseout : 마우스를 Element위에 올린 상태에서 벗어난 상태

쉽게 보자면 내가 이벤트를 선언한 Element위에 마우스를 위치하나 빼냐에 대한 이벤트이다.

이번에는 다른 이벤트를 보자

## MouseEnter MouseLeave

- mouseleave : 마우스를 Element위에 올린 상태
- mouseenter : 마우스를 Element위에 올린 상태에서 벗어난 상태

이상하다. 2개의 이벤트가 똑같은데? 왜 때문에 같은 기능을 가진 이벤트가 2개씩 있는 것일까?

> 이거 때문에 한동안 헤맸다.

## MouseOver MouseOut VS MouseEnter MouseLeave

2종류의 이벤트는 같은 기능을 하는 것처럼 보이지만 약간의 다른 차이점이 존재한다.

먼저 예제를 보자 => [예제보기](https://codepen.io/seonhyungjo/pen/wRwWXO)

2겹의 Div가 존재한다. 그리고 Outer div에 각각 MouseOver와 MouseEnter 이벤트를 추가했다. 그리고 Inner Div에는 이벤트를 추가하지 않았다.

결과는 신기하게도 MouseOver 이벤트는 자식 Element까지 이벤트가 적용이 되었다.

결과적으로 MouseOver MouseOut 이 2개는 Bubble과 Capture 일어나며 MouseEnter MouseLeave 2개는 일어나지 않는 것이다.

관련글을 읽는 것도 도움이 된다. [Event Delegation](https://github.com/SeonHyungJo/FrontEnd-Dev/blob/master/Javascript/Event%20Delegation.md)

