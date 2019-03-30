# Creating a Custom element from Scratch

## Creating a Custom element

customElements API는 정의 클래스를 포함해서, 모든 곳에서 사용할 수있는 Custom element HTML 태그를 만드는 것을 제공한다. 

React, Angular에서의 컴포넌트(예 : `<MyCard />`)와 비슷하다고 생각할 수 있지만 React, Angular과는 직접 연관은 없다. 우리가 하려는 Custom element의 기본 모양은 이렇다. `<my-card> </ my-card>`

더욱 중요한 것은 React, Angular, Vue, [insert-framework-you-in-this-week] 응용 프로그램 가릴 것 없이 사용할 수있는 표준 요소라고 생각하면 된다.

기본적으로 Custom element는 **태그 이름과** 과 내장 `HTMLElement` **class** 를 확장하는 클래스의 두 부분으로 구성됩니다.

```javascript
  // Class를 확장하고 있다.
  class OneDialog extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<h1>Hello, World!</h1>`;
    }
  }
  
  // Tag Name을 정의한다.
  customElements.define('one-dialog', OneDialog);
```

> 참고 : Custom element에서의 This 값은 Custom element instance의 참조이다.

예제에서 우리는 새로운 표준 호환 HTML 요소인 `<one-dialog> </ one-dialog>`를 정의를 했다.

현재, 모든 HTML 문서에서 `<one-dialog>` 태그를 사용하게되면 `<h1>` 태그에 `"Hello, World!"` 라는 글자가 나오게 된다. 지난 내용에서 예제로 대화 상자의 Template를 만들어 보았다. 그때 사용한 소스를 Template에 적용해보자.

이 예제에서 대화 상자를 수행하기 위해 Script 태그를 추가했다. HTML Template에서 Custom element Class 내부로 로직을 옮길 것이다.

```javascript
  class OneDialog extends HTMLElement {
    connectedCallback() {
      // template를 가져온다.
      const template = document.getElementById('one-dialog');
      // template.content의 복사본을 만든다.
      const node = document.importNode(template.content, true);

      // this에 추가한다. 즉 Custom element instance에 추가를 한다.
      this.appendChild(node);
    }
  }
```

Custom element (`<one-dialog>`)가 정의되고 브라우저는 Custom element를 호출하고 HTML 템플릿에 포함된 content를 렌더링하도록 지시를 받게 된다.
<br/>

## Custom element 라이프 사이클 메소드

React, Angular와 비슷하게 Custom element도 Life Cycle을 가지고 있다. 위에서 element가 DOM에 추가될 때 호출되는 `connectedCallback`를 사용했다.

`connectedCallback`은 element 생성자와 별개이다. 생성자는 element 뼈대를 설정하는데 사용이 되며 `connectedCallback`은 일반적으로 element에 내용을 추가하거나, 이벤트 리스너를 설정하거나, 그렇지 않으면 구성 요소를 초기화하는 데 사용된다.

생성자는 디자인에 따라 요소의 속성을 수정하거나 조작하는 데 사용되지 않는다. `document.createElement`를 사용하여 대화 상자의 새 인스턴스를 만드는 경우 생성자가 호출된다. 사용자는 요소의 속성이나 내용이 삽입되지 않은 단순 노드를 생각하게 된다.

createElement 함수에는 리턴될 element를 구성하기 위한 옵션이 없다. 생성자가 생성한 element를 수정할 수있는 능력을 가져서는 안된다. 이로 인해 `connectedCallback`은 element를 수정해야하는 장소로 남는다.

표준 내장 요소의 경우 요소의 상태는 일반적으로 요소에있는 특성과 해당 특성의 값에 의해 반영됩니다. 예를 들어, `[open]` 속성 하나만 살펴보자. 수행하려면 해당 속성의 변경 사항을 살펴보고 수행하려면 `attributeChangedCallback`이 필요하다. 이 두 번째 Life Cycle 메소드는 요소 생성자의 `observedAttributes` 중 하나가 업데이트 될 때 불린다.

```javascript
  class OneDialog extends HTMLElement {
    // 감시할 attr
    static get observedAttributes() {
      return ['open'];
    }
    
    attributeChangedCallback(attrName, oldValue, newValue) {
      // 조건부 검사
      if (newValue !== oldValue) {
        // 동기화를 하는 부분
        this[attrName] = this.hasAttribute(attrName);
      }
    }
    
    connectedCallback() {
      // 만들어서 넣어주는 부분
      const template = document.getElementById('one-dialog');
      const node = document.importNode(template.content, true);

      this.appendChild(node);
    } 
  }
```

위의 경우 속성의 설정 여부만 신경쓰고 값에 대해서는 신경쓰지 않는다. (HTML5 input의 `required` 속성과 유사함). 속성이 업데이트되면 Element의 `open` 속성이 업데이트된다. HTMLElement에 속성이 JavaScript 객체 속성에도 있지만, Life Cycle 메서드는 두 Element를 동기화하는데 도움을 준다.

새로운 값과 이전 값이 같은지 확인하기 위해 조건부 검사에서 `attributeChangedCallback` 내부의 업데이터를 감싼다. 프로그램 내에서 무한 루프를 막기 위해 이렇게 한다. **왜냐하면 Element의 속성이 업데이트 됬을 때 Element의 속성을 설정하면서, 속성들을 동기화해주는 property getter와 setter를 만들기 ​때문이다**. 결국 `attributeChangedCallback` 은 속성이 변경될 때 속성을 업데이트한다.

```javascript
  class OneDialog extends HTMLElement {
    static get boundAttributes() {
      return ['open'];
    }
      
    attributeChangedCallback(attrName, oldValue, newValue) {
      this[attrName] = this.hasAttribute(attrName);
    }
    
    connectedCallback() {
      const template = document.getElementById('one-dialog');
      const node = document.importNode(template.content, true);

      this.appendChild(node);
    }
    
    get open() {
      return this.hasAttribute('open');
    }
    
    set open(isOpen) {
      if (isOpen) {
        this.setAttribute('open', true);
      } else {
        this.removeAttribute('open');
      }
    }
  }
```

Getter와 Setter는 HTML 요소의 `open` 속성과 DOM 객체의 속성을 동기화한다. `open` 속성을 추가하면 `element.open`이 true로 설정되고 `element.open`을 true로 설정하면 `open` 속성이 추가가 된다.

이러한 작업은 당연하게도 보일러플레이트로 이어지지만, 동기화 상태로 유지하는 추상 클래스를 생성하는 것은 observed 속성 목록을 반복하고 `Object.defineProperty` 를 사용하면 간소화 된다.

```javascript
  class AbstractClass extends HTMLElement {
    constructor() {
      super();
      // Check to see if observedAttributes are defined and has length
      if (this.constructor.observedAttributes && this.constructor.observedAttributes.length) {
        // Loop through the observed attributes
        this.constructor.observedAttributes.forEach(attribute => {
          // Dynamically define the property getter/setter
          Object.defineProperty(this, attribute, {
            get() { return this.getAttribute(attribute); },
            set(attrValue) {
              if (attrValue) {
                this.setAttribute(attribute, attrValue);
              } else {
                this.removeAttribute(attribute);
              }
            }
          }
        });
      }
    }
  }
    
  // Instead of extending HTMLElement directly, we can now extend our AbstractClass
  class SomeElement extends AbstractClass { /** Omitted */ }
    
  customElements.define('some-element', SomeElement);
```

위의 예제는 완벽하지는 않지만, open과 같은 속성에 값을 할당하지 않고 속성의 존재에만 의존하는 속성의 가능성은 고려하지 않았다. 이제 대화 상자가 열려 있는지 여부를 알았으므로 실제로 표시 및 숨기기를 수행 할 논리를 추가해보자.

```javascript
    class OneDialog extends HTMLElement {  
      /** Omitted */
      constructor() {
        super();
        this.close = this.close.bind(this);
      }
      
      set open(isOpen) {
        this.querySelector('.wrapper').classList.toggle('open', isOpen);
        this.querySelector('.wrapper').setAttribute('aria-hidden', !isOpen);

        if (isOpen) {
          this._wasFocused = document.activeElement;
          this.setAttribute('open', '');

          document.addEventListener('keydown', this._watchEscape);

          this.focus();
          this.querySelector('button').focus();
        } else {
          this._wasFocused && this._wasFocused.focus && this._wasFocused.focus();
          this.removeAttribute('open');

          document.removeEventListener('keydown', this._watchEscape);

          this.close();
        }
      }
      
      close() {
        if (this.open !== false) {
          this.open = false;
        }
        const closeEvent = new CustomEvent('dialog-closed');
        this.dispatchEvent(closeEvent);
      }
      
      _watchEscape(event) {
        if (event.key === 'Escape') {
            this.close();   
        }
      }
    }
```

```javascript
    class OneDialog extends HTMLElement {
      /** Omitted */
      connectedCallback() {    
        this.querySelector('button').addEventListener('click', this.close);
        this.querySelector('.overlay').addEventListener('click', this.close);
      }
      
      disconnectedCallback() {
        this.querySelector('button').removeEventListener('click', this.close);
        this.querySelector('.overlay').removeEventListener('click', this.close);
      }  
    }
```

이제는 잘 작동하고 대부분 작동하는 대화 상자 Element가 되었다. 요소에 적용되지 않는 lifecycle 메서드가 하나 더 있는데, `adoptedCallback`은 요소가 DOM의 다른 부분에 선택될 때 발생하게 된다. 다음 예제에서는 표준 `<one-dialog>` 요소에 의해 템플릿 요소가 사용중임을 알 수 있다.

:point_right: [간단한 예제 살펴보기](https://codepen.io/seonhyungjo/pen/LavXvY)

#### Reference

- [https://css-tricks.com/creating-a-custom-element-from-scratch/](https://css-tricks.com/creating-a-custom-element-from-scratch/)