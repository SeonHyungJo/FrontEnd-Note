# An Introduction to Web Components

## 웹 컴포넌트란 무엇인가?

컴포넌트의 개념은 3가지가 있다고 한다.

1. **Custom Elements**

간단하게 이건 사용자 정의 템플릿, 동작 및 태그 이름을 가진 완전히 HTML 요소이다. 자바 스크립트 API로 만들어졌으며, 사용자 정의 요소는 **HTML Living Standard** 사양에 정의되어있다.
1. **Shadow DOM**

`<iframe>` 과 거의 비슷하다. **CSS와 JavaScript를 분리** 할 수 ​있는 것이 특징이다. 이것은 **Living Standard DOM** 사양에 정의되어있다.

3. **HTML template**

호출 될 때까지 렌더링되지 않는 HTML의 사용자 정의 템플릿. `<template>` 태그는 **HTML Living Standard** 사양에 정의되어있다.

## **Custom Elements**

이름에서 알 수 있다시피 HTML elements이다. `<div>` `<section>` `<article>` 과 같이 브라우저 API를 통해 정의되는 이름을 지정할 수 있다. 

사용자 정의 요소는 `<news-slider>` 또는 `<bacon-cheeseburger>` 와 같이 대시가 항상있는 것을 제외하고는 `<>` 괄호 안에있는 표준 HTML 요소와 같다. 앞으로 브라우저 업체는 충돌을 방지하기 위해 이름에 대시가 포함된 새로운 기본 제공 요소를 만들지 않기로 했다.

사용자 정의 요소는 고유한 의미, 동작, 마크 업을 포함하며 프레임 워크와 브라우저에서 공유가 가능하다.

### 예제(CodePen)

[https://codepen.io/seonhyungjo/pen/jJJZLr](https://codepen.io/seonhyungjo/pen/jJJZLr)

## **Shadow DOM**

Shadow DOM은 캡슐화 된 DOM 버전이다.

이를 통해 CSS 선택자와 관련된 스타일과 DOM 조각을 서로 격리할 수 ​​있다.

일반적으로 document’s scope 안의 모든 내용을 **light DOM**이라고하며 shadowRoot 안의 모든 것을 **shadow DOM**하고 한다..

### **Light DOM**

Light DOM을 사용할 때 `document.querySelector('selector')` 를 사용하거나 `element.querySelector ( 'selector')`를 사용하여 요소의 자식을 대상으로 요소를 선택하게 된다.

### **shadow DOM**

shadowRoot의 자식은 `shadowRoot.querySelector` 를 호출하여 대상을 지정할 수 있다. 여기서 shadowRoot는 문서 조각에 대한 참조입니다. 차이점은 shadowRoot의 자식은 light DOM에서 선택할 수 없다.

예를 들어 그림자 루트가 `<button>` 안에있는 경우 `shadowRoot.querySelector('button')` 을 호출하면 버튼이 반환되지만 문서의 쿼리 선택기를 호출해도 다른 `DocumentOrShadowRoot` 인스턴스에 속하기 때문에 요소를 반환하지 않는다. Style selectors도 같은 방식으로 작동한다. 당연하게 스타일도 격리시킨다고 했기 때문에

이러한 점에 있어서, Shadow DOM은 내용이 문서의 나머지 부분과 잘린 `<iframe>` 같이 작동을 한다. 그러나 shadowRoot를 만들 때 페이지의 해당 부분을 완전히 제어 할 수 있지만 상황에 따라 범위가 지정된다. 이를 캡슐화라고 부른다?

동일한 ID를 재사용하거나 CSS-in-JS도구 또는 BEM과 같은 CSS 명명 전략에 의존하는 구성요소를 작성한 적이 있다면 Shadow DOM이 개발자의 경험을 향상 시켜줄 것이다.

```javascript
    <div>
      <div id="example">
        <!-- Pseudo-code used to designate a shadow root -->
        <#shadow-root>
          <style>
          button {
            background: tomato;
            color: white;
          }
          </style>
          <button id="button">This will use the CSS background tomato</button>
        </#shadow-root>
      </div>
      <button id="button">Not tomato</button>
    </div>
```

`<shadow-root>` 의사 코드 (HTML 요소가없는 그림자 경계를 구분하기 위해 여기에 사용됨)를 제외하고 HTML은 완전히 유효다. 위의 노드에 shadowRoot를 첨부하려면 다음과 같이 실행을 하면 된다.

```javascript
    const shadowRoot = document.getElementById('example').attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `<style>
    button {
      color: tomato;
    }
    </style>
    <button id="button">This will use the CSS color tomato <slot></slot></button>`;
```

shadowRoot는 `<slot>` 요소를 사용하여 포함 된 문서의 내용을 포함 할 수도 있다. 슬롯을 사용하면 그림자 루트의 지정된 위치에서 외부 문서의 사용자 컨텐트가 삭제된다.

### 예제

[https://codepen.io/seonhyungjo/pen/zbbWyg](https://codepen.io/seonhyungjo/pen/zbbWyg)

## **HTML template**

적절히 명명 된 HTML `<template>` 요소를 사용하면 즉시 렌더링되지는 않지만 나중에 사용할 수있는 정상적인 HTML 흐름 내에서 재사용 가능한 코드 템플릿을 스탬프 처리할 수 ​​있다.

```javascript
    <template id="book-template">
      <li><span class="title"></span> &mdash; <span class="author"></span></li>
    </template>
    
    <ul id="books"></ul>
```

위의 예제는 스크립트가 템플릿을 사용하고 코드를 인스턴스화하고 브라우저에 수행 할 작업을 알릴 때까지는 아무 내용도 렌더링하지 않는다.

```javascript
    const fragment = document.getElementById('book-template');

    const books = [
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
      { title: 'A Farewell to Arms', author: 'Ernest Hemingway' },
      { title: 'Catch 22', author: 'Joseph Heller' }
    ];
    
    books.forEach(book => {
      // Create an instance of the template content
      const instance = document.importNode(fragment.content, true);
      // Add relevant content to the template
      instance.querySelector('.title').innerHTML = book.title;
      instance.querySelector('.author').innerHTML = book.author;
      // Append the instance ot the DOM
      document.getElementById('books').appendChild(instance);
    });
```

> 이 예제는 다른 웹 구성 요소 기술없이 템플릿 (`<template id = "book-template">`)을 생성하여 스택의 세 가지 기술을 독립적으로 또는 집합 적으로 사용할 수 있음을 보여준다.

표면 상으로는 템플릿 API를 사용하는 서비스 사용자는 나중에 만들 수있는 모든 모양이나 구조의 템플릿을 작성할 수 있다. 사이트의 다른 페이지에서 동일한 서비스를 사용할 수도 있지만 이 방법으로 템플릿을 구성 할 수 있다

### 예제

[https://codepen.io/seonhyungjo/pen/NJJMyJ](https://codepen.io/seonhyungjo/pen/NJJMyJ)