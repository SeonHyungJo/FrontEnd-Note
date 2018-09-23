# Reflow & Repaint

> 참조 : http://donggov.tistory.com/56

기존의 웹 브라우저 작동원리를 보게 되면 

> [웹 브라우저 작동 원리 다시보기](https://github.com/SeonHyungJo/FrontEnd-Dev/blob/master/Browser/%EC%9B%B9_%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80_%EC%9E%91%EB%8F%99_%EC%9B%90%EB%A6%AC.md)

웹 브라우저가 화면을 그리는데(Rendering) 거치는 주요한 과정은

1. HTML데이터를 파싱하고 DOM Tree를 빌드.
2. 파싱 중 CSS링크를 만나면, CSSOM(CSS Object Model) Tree를 빌드.
3. DOM Tree와 CSSOM Tree를 이용해 Render Tree 생성.
4. Render Tree의 노드들의 위치를 계산(Layout)
5. 화면에 웹 페이지를 그린다.

간단하게 위의 5가지의 단계라고 적혀있다. 추가적으로 여기서 

1. 페이지 따라 **Reflow, Repaint** 가 발생

6단계가 존재할 수 있다.

<br>
<br>

## Reflow

생성된 DOM 노드의 레이아웃 예를 들어서 width, height, 위치같은 상호아이 변경시, 영향을 받은 모든 노드(자식, 부모 등)의 수치를 다시 계산하여서 다시 렌더 트리르 재생성하는 작업_즉 4단계를 다시 진행

```javascript
function reflow() {
    document.getElementById('test').style.width = '100px';
    return false;
}
```

<br>
<br>

## Repaint

기본적으로 작동은 Reflow의 과정이 지나고 다시 만들어진 렌더 트리를 다시 그리는 작업으로 5단계에 해당이 된다. 

그러나 :exclamation:

**수치와 상관이 없는** background-color, visiblillty, outline 등의 스타일 변경 시에는 Reflow과정이 생략된 Repaint작업만을 수행한다.

```javascript
function repaint() {
    document.getElementById('test').style.backgroundColor = 'red';
    return false;
}
```

<br>
<br>

## Reflow 최적화

위의 2개의 단계가 너무나도 많이 일어나게 되면 당연하게 성능저하로 이어지게 된다. 이에 최적화는 당연하게 이루어져야한다. 특히 Reflow의 경우에는 모든 노드를 다시 계산을 하기에 더욱이 필요하다.

1. 클래스 변화에 따른 스타일 변경 시, 최대한 DOM 구조 상 끝단에 위치한 노드에 주어라.
2. 인라인 스타일을 최대한 배제하라.
3. 애니메이션이 들어간 노드는 가급적 position:fixed 또는 position:absolute로 지정하여 전체 노드에서 분리 시킨다.

보통 (JS(Javascript) + CSS)를 활용한 에니메이션 효과는 해당 프레임에 따라 무수히 많은 Reflow 비용이 발생하게 됩니다.

하지만 position 속성을 "fixed" 또는 "absoute"로 값을 주면 지정된 노드는 전체 노드에서 분리됩니다.

즉,  전체 노드에 걸쳐 Reflow 비용이 들지 않으며, 해당 노드의 Repaint 비용만 들어가게 됩니다.

또한, 노드의 position 값을 초기에 적용하지 않았더라도 에니메이션 시작 시 값을 변경(fixed, absolute)하고 종료 시 다시 원복 시키는 방법을 사용해도 무관 합니다.

4. 퀄리티와 퍼포먼스 사이에서 타협하라.
5. 테이블 레이아웃을 피하라.
   
테이블로 구성된 페이지 레이아웃은 점진적(progressive) 페이지 렌더링이 적용되지 않으며, 모두 로드되고 계산(Recalculate)된 후에야 화면에 뿌려지게 된다. 

하지만 해당 테이블에 table-layout:fixed 속성을 주는 것이 디폴트값인 auto에 비해 성능면에서 더 좋다고 한다.

6. IE의 경우, CSS에서의 JS표현식을 피하라.
7. CSS 하위선택자는 필요한 만큼만 정리하라.
8. position:relative 사용 시 주의하자.
9. cssText 및 클래스를 활용해 Reflow or Repaint 최소화.

<br>

```javascript
function collect() {
    var elem = document.getElementById('container');
   
    elem.style.cssText = 'background:red;width:200px;height:200px;';
 
    return false;
}
```

<br>

```javascript
function collect() {
    var elem = document.getElementById('container');
 
    elem.className = 'collect';
 
    return false;
}
```

<br>

10. 캐쉬를 활용한 Reflow 최소화.
11. DOM 사용을 최소화하여 Reflow 비용 줄이기.

<br>
<br>

## 참고

- [Reflow 원인과 마크업 최적화 Tip](https://lists.w3.org/Archives/Public/public-html-ig-ko/2011Sep/att-0031/Reflow_____________________________Tip.pdf)
- [Reflow(Layout) 과 Repaint 과정 및 최적화](http://mohwaproject.tistory.com/entry/ReflowLayout-%EA%B3%BC-Repaint-%EA%B3%BC%EC%A0%95-%EB%B0%8F-%EC%B5%9C%EC%A0%81%ED%99%94)
- [브라우저 렌더링 : reflow & repaint](http://donggov.tistory.com/56)