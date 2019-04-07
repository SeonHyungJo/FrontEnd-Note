# Encapsulating Style and Structure with Shadow DOM

## shadow DOM?

기존에 말을 했듯이 shadow DOM이란 `<iframe>`과 같이 CSS와 JavaScript를 독립적으로 격리 시킬수 있다. shadow DOM 노드의 내부에 있는 선택자와 스타일은 shadow root외부로 누수가 일어나지 않는다. 내부적으로 재정의 될 수있는 글꼴이나 폰트 사이즈 같은 것들은 예외 대상이다.

그러나  `<iframe>`와 다르게 모든 shadow root가 동일한 문서에 남아 있어 모든 코드가 컨텍스트내에 작성되며, 다른 스타일이나 선택자와의 충돌은 걱정하지 않아도 된다.

## shadow DOM을 추가해보자

shadow root를 추가하기 위해 우리는 `attachShadow` 메소드를 호출해야한다.

    class OneDialog extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.close = this.close.bind(this);
      }
    }

위에 코드를 보게 되면 `{ mode: 'open' }` 인자를 넘기고 있는데 이렇게 호출을 하게되면 element에 shadow root에 대한 참조를 element.shadowRoot 속성에 저장하도록 해주는 것이다. attachShadow는 항상 shadow root에 대한 참조를 반환하지만 여기서는 필요가 없다.

우리가 `{ mode: 'close' }`를 호출하게 되면 element에 대한 참조가 저장되지 않으므로, WeakMap 이나 Object를 사용하여 스스로 저장, 검색 수단을 만들어 Node자체를 키로 설정하고 shadow root를 값으로 사용해야한다.

    const shadowRoots = new WeakMap();
    
    class ClosedRoot extends HTMLElement {
      constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoots.set(this, shadowRoot);
      }
    
      connectedCallback() {
        const shadowRoot = shadowRoots.get(this);
        shadowRoot.innerHTML = `<h1>Hello from a closed shadow root!</h1>`;
      }
    }

Symbol 또는 다른 키를 사용해서 shadow root를 비공개로 설정하려고 할 때 element 자체에 shadow root에 대한 참조를 저장할 수도 있다.

일반적으로 shadow root의 폐쇄 모드로 사용되는 원시요소(예 : <audio>, <video>)가 있다. 또한 우리의 element 단위 테스트 할 때 shadowRoots 객체에 접근 할 수 없기 때문에 라이브러리의 구조에 따라 element 내부의 대상을 지정할 수 없다.

사용자 지정 폐쇄 shadow root에 대한 적합한 사용 경우가 있을 수 있지만 그 수는 매우 적어서 대화상자의 open 모드 shadow root를 사용할 것이다.

새로운 open shadow root를 구현 한 후에는 element를 실행하려고 할 때 element가 완전히 깨져버린다.

### 예제

[https://codepen.io/seonhyungjo/pen/vMXYLz](https://codepen.io/seonhyungjo/pen/vMXYLz)

이렇게 된 이유는 흔히 우리가 Light DOM이라 불리는 전통적인 DOM에 우리가 이전에 가지고 있던 모든 내용이 추가가 되었기 때문이다. 이제는 element에 shadow DOM이 추가되었으므로 Light DOM이 렌더링할 결과물은 없다.

    class OneDialog extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.close = this.close.bind(this);
      }
      
      connectedCallback() {
        const { shadowRoot } = this;
        const template = document.getElementById('one-dialog');
        const node = document.importNode(template.content, true);
        shadowRoot.appendChild(node);
        
        shadowRoot.querySelector('button').addEventListener('click', this.close);
        shadowRoot.querySelector('.overlay').addEventListener('click', this.close);
        this.open = this.open;
      }
    
      disconnectedCallback() {
        this.shadowRoot.querySelector('button').removeEventListener('click', this.close);
        this.shadowRoot.querySelector('.overlay').removeEventListener('click', this.close);
      }
      
      set open(isOpen) {
        const { shadowRoot } = this;
        shadowRoot.querySelector('.wrapper').classList.toggle('open', isOpen);
        shadowRoot.querySelector('.wrapper').setAttribute('aria-hidden', !isOpen);
        if (isOpen) {
          this._wasFocused = document.activeElement;
          this.setAttribute('open', '');
          document.addEventListener('keydown', this._watchEscape);
          this.focus();
          shadowRoot.querySelector('button').focus();
        } else {
          this._wasFocused && this._wasFocused.focus && this._wasFocused.focus();
          this.removeAttribute('open');
          document.removeEventListener('keydown', this._watchEscape);
        }
      }
      
      close() {
        this.open = false;
      }
      
      _watchEscape(event) {
        if (event.key === 'Escape') {
            this.close();   
        }
      }
    }
    
    customElements.define('one-dialog', OneDialog);

대화 상자의 주요 변경사항은 실제로는 적지만, 많은 영향을 준다. 우선, 우리의 선택자(스타일 정의를 포함)는 모두 내부적으로 범위가 지정된다. 예를 들어, 대화 상자 Template은 내부적으로 하나의 버튼만 있으므로 CSS는 `button {...}`만이 대상이며, 해당 스타일은 Light DOM에 유출되지 않는다.

그러나 우리는 element의 외부에 있는 Template에 여전히 의존이 되어있다. Template에서 markup을 제거 하고 shadow root의 innerHTML에 놓아서 변경을 해보자

### 예제

[https://codepen.io/seonhyungjo/pen/NmRPPd](https://codepen.io/seonhyungjo/pen/NmRPPd)

## Including content from the light DOM

shadow DOM 사양에는 shadow root 외부의 내용을 사용자 정의 요소 내부에서 렌더링 할 수있는 수단이 있다. 앵귤러는 아는 사람들은 `ng-transclude`와 비슷하며 리액트에서는 `props.children`과 유사한 개념이다. 웹 컴포넌트에서는 `<slot>`을 사용한다.

    <div>
      <span>world <!-- this would be inserted into the slot element below --></span>
      <#shadow-root><!-- pseudo code -->
        <p>Hello <slot></slot></p>
      </#shadow-root>
    </div>

주어진 shadow root는 여러 개의 slot element를 가질 수 있으며, 이는 name 속성으로 구별이 된다. 이름이 없는 shadow root의 첫 번째 slot은 기본 slot이 되고, 아니면 할당되지 않은 모든 내용이 노드 내부로 들어온다. 대화 상자에는 표제와 일부 내용의 두 슬롯이 필요하다.

### 예제

[https://codepen.io/seonhyungjo/pen/OGRPMX](https://codepen.io/seonhyungjo/pen/OGRPMX)

대화 상장의 HTML 부분을 변경하고 결과를 확인해보자. Light DOM 내부의 모든 내용이 할당된 slot에 들어간다. slot화 된 내용은 shadow DOM안에 있는 것처럼 렌더링되지만 Light DOM에 남아있다. 즉, 이러한 element는 내용의 모양과 느낌은 사용자가 제어할 수 있다는 것을 의미한다.

shadow root의 작성자는 CSS `::slotted()` pseudo-selector를 사용해서 Light DOM 내부의 내용을 제한된 범위 내에서 스타일을 지정할 수 있다. 그러나 slotted된 내부의 DOM 트리는 축소되므로 간단한 선택자만 사용할 수 있다. 즉, 앞의 예제에서 평평한 DOM트리 내의 `<p>` element안에 `<string>` element의 스타일을 지정할 수는 없다.

## The best of both worlds

우리의 대화 상자는 캡슐화가 되고 의미론적 markup, 스타일 행동을 포함하는 양호한 상태에 있다. 그러나 대화 상자의 일부 사용자는 여전히 자신의 템플릿을 정의하고 싶어할 수 있다. 다행히 이미 배운 두 가지 기술을 결합하여 제작자가 선택적으로 외부 템플릿을 정의하도록 허용할 수 있다.

그렇게 하기 위해 우리는 컴포넌트의 각 인스턴스가 선택적 템플릿 ID를 참조할 수 있도록 할 것이다. 먼저 컴포넌트 `template`에 대한 getter 와 setter를 정의해야한다.

    get template() {
      return this.getAttribute('template');
    }
    
    set template(template) {
      if (template) {
        this.setAttribute('template', template);
      } else {
        this.removeAttribute('template');
      }
      this.render();
    }

여기서 우리는 `open` 속성을 사용하여 해당 속성에 직접 연결하여 동일한 작업을 수행하고 있다. 하지만 아래쪽에 우리의 컴포넌트에 새로운 메소드인 `reder`가 추가 되었다. 우리는 render 메소드를 사용하여 shadow DOM의 내용을 삽입하고 `connectedCallback`에서 해당 동작을 제거한다. 대신에 element가 연결될 때는 render를 호출한다.

    connectedCallback() {
      this.render();
    }
    
    render() {
      const { shadowRoot, template } = this;
      const templateNode = document.getElementById(template);
      shadowRoot.innerHTML = '';
      if (templateNode) {
        const content = document.importNode(templateNode.content, true);
        shadowRoot.appendChild(content);
      } else {
        shadowRoot.innerHTML = `<!-- template text -->`;
      }
      shadowRoot.querySelector('button').addEventListener('click', this.close);
      shadowRoot.querySelector('.overlay').addEventListener('click', this.close);
      this.open = this.open;
    }

이제 대화 상자에는 몇가지 기본 스타일이 있으면서, 사용자가 각각의 인스턴스에 대해서 새로운 template를 정의 할 수도 있다. 원한다면 `attributeChangedCallback` 을 사용하여 현재 가리키느느 template을 기반으로 컴포넌트를 업데이트 할 수도 있다. 

    static get observedAttributes() { return ['open', 'template']; }
    
    attributeChangedCallback(attrName, oldValue, newValue) {
      if (newValue !== oldValue) {
        switch (attrName) {
          /** Boolean attributes */
          case 'open':
            this[attrName] = this.hasAttribute(attrName);
            break;
          /** Value attributes */
          case 'template':
            this[attrName] = newValue;
            break;
        }
      }
    }

### 예제

[https://codepen.io/seonhyungjo/pen/jRMExz](https://codepen.io/seonhyungjo/pen/jRMExz)

## Strategies for styling the shadow DOM

{추후추가}

---

#### Reference

- [Encapsulating Style and Structure with Shadow DOM]([https://css-tricks.com/encapsulating-style-and-structure-with-shadow-dom/](https://css-tricks.com/encapsulating-style-and-structure-with-shadow-dom/))