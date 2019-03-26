# HTML templates

**Web Components** 중 가장 덜 인식되었지만 가장 강력한 기능 중 하나는 `<template>` 요소이다. 

이전 글에서 **템플릿 요소는 HTML에서 사용자 정의 템플릿으로 호출 될 때까지 렌더링되지 않는다.**

Template은 브라우저가 다른 지시할 때까지 무시하는 HTML인 것이다. Template은 전달되고 재사용 할 수 있다.
<br/>

## Template 정의해보기

`<template>`은 HTML 요소이므로 내용이 있는 템플릿의 기본적인 형태는 아래와 같이 간단하다.

```html
  <template>
    <h1>Hello world</h1>
  </template>
```

이전 자바스크립트로 HTML을 작성하는 방법과 달리 콘텐츠를 정의하고 나중에 저장하기 때문에 훨씬 강력하다고 한다.

위에서 정의한 템플릿을 사용하기 위해서는 자바스크립트가 필요하다.

```javascript
  const template = document.querySelector('template');
  const node = document.importNode(template.content, true);
    
  document.body.appendChild(node);
```

정말 신기한 것은 `document.importNode` 메소드를 사용하면서 발생하게 되는데, 이 함수는 Template내용의 복사본을 만들어 다른 문서에 삽입 할 수 있도록 준비를 해준다.

이 함수의 첫 번째 인수는 템플릿의 내용을 가져오고, 두 번째 인수는 요소의 DOM 하위 트리의 전체 복사본을 할 것인지 정하는 것이다.

> MDN - [https://developer.mozilla.org/ko/docs/Web/API/Document/importNode](https://developer.mozilla.org/ko/docs/Web/API/Document/importNode)

굳이 `importNode`를 사용하지 않고 `template.content`를 직접 사용할 수도 있지만 그렇게하면 Template 요소에서 내용을 제거하고 문서의 본문에 추가를 하게 된다. 모든 DOM 노드는 한 위치에서만 연결할 수 있으므로 이전에 내용을 지우고 넣었기 때문에 내용을 다시 사용하면 빈 문서(기본적으로 Null 값)이 된다.

`document.importNode` 를 사용하면 여러 위치에 동일한 템플릿 콘텐츠의 인스턴스를 재사용 할 수 있어서 복사본을 만들어서 한다. 그런 다음 노드는 `document.body` 에 추가되고 사용자에게 렌더링이 된다.
<br/>

## Template의 다양성

Template에 대한 흥미로운 점 중 하나는 HTML을 포함 할 수 있다는 것이다. 여기에는 스크립트 및 스타일 요소도 포함이 될 수 있다. 아주 간단한 예제로 클릭할 때 알려주는 버튼을 추가한다고 하면

```html
  <button id="click-me">Log click event</button>
```

```css
  button {
    all: unset;
    background: tomato;
    border: 0;
    border-radius: 4px;
    color: white;
    font-family: Helvetica;
    font-size: 1.5rem;
    padding: .5rem 1rem;
  }
```

```javascript
  const button = document.getElementById('click-me');
  
  button.addEventListener('click', event => alert(event));
```

물론 우리는 HTML의 `<style>`과 `<script>` 태그를 별도의 파일이 아닌 직접 템플릿에 사용하여 하나로 묶을 수 있다.

```html
  <template id="template">
    <script>
      const button = document.getElementById('click-me');
      button.addEventListener('click', event => alert(event));
    </script>
    <style>
      #click-me {
        all: unset;
        background: tomato;
        border: 0;
        border-radius: 4px;
        color: white;
        font-family: Helvetica;
        font-size: 1.5rem;
        padding: .5rem 1rem;
      }
    </style>
    <button id="click-me">Log click event</button>
  </template>
```
 
### 예제

[https://codepen.io/seonhyungjo/pen/RdOqEa](https://codepen.io/seonhyungjo/pen/RdOqEa)

<br/>

## 대화 상자 예제

```html
  <template id="one-dialog">
    <script>
      document.getElementById('launch-dialog').addEventListener('click', () => {
        const wrapper = document.querySelector('.wrapper');
        const closeButton = document.querySelector('button.close');
        const wasFocused = document.activeElement;

        wrapper.classList.add('open');

        closeButton.focus();
        closeButton.addEventListener('click', () => {
          wrapper.classList.remove('open');
          wasFocused.focus();
        });
      });
    </script>

    <style>
      .wrapper {
        opacity: 0;
        transition: visibility 0s, opacity 0.25s ease-in;
      }
      .wrapper:not(.open) {
        visibility: hidden;
      }
      .wrapper.open {
        align-items: center;
        display: flex;
        justify-content: center;
        height: 100vh;
        position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        opacity: 1;
        visibility: visible;
      }
      .overlay {
        background: rgba(0, 0, 0, 0.8);
        height: 100%;
        position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        width: 100%;
      }
      .dialog {
        background: #ffffff;
        max-width: 600px;
        padding: 1rem;
        position: fixed;
      }
      button {
        all: unset;
        cursor: pointer;
        font-size: 1.25rem;
        position: absolute;
          top: 1rem;
          right: 1rem;
      }
      button:focus {
        border: 2px solid blue;
      }
    </style>

    <div class="wrapper">
    
    <div class="overlay"></div>
      <div class="dialog" role="dialog" aria-labelledby="title" aria-describedby="content">
        <button class="close" aria-label="Close">&#x2716;&#xfe0f;</button>
        <h1 id="title">Hello world</h1>
        <div id="content" class="content">
          <p>This is content in the body of our modal</p>
        </div>
      </div>
    </div>
  </template>
```

게속 보면서 느끼는 것은 정말로 **Vue**와 많이 닮았다는 것이었다. **Vue**가 이것을 사용해서 만들었다는 말을 들었던거 같은데

<br/>

#### reference

- [https://css-tricks.com/crafting-reusable-html-templates/](https://css-tricks.com/crafting-reusable-html-templates/)