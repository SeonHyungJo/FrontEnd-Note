# DOM이란 :question:

</br>

## Document Object Model :+1:

웹 서버를 통해서 받은 html코드를 브라우저가 해석을 한 후에 Javascript객체를 통해 **계층화한 구조체** 를 의미한다.
</br>

## DOM은 Javscript Node개체의 계층화된 트리

:collision:즉 Console로 찍어보면 Document는 Node의 하위에 있는 객체다. :collision:
</br>

또한 document(Document와는 완전히 다름)는 Object로 HTMLDocument의 하위 인스턴스로 우리가 실제로 아는 조작을 하는 트리이다.

</br>

- 문서의 구조화된 표현을 제공하며 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공한다.
- 문서 구조, 스타일, 내용 등을 변경할 수 있게 돕는다.

</br>

우리가 위와같이 조작을 할 수 있는 이유는 DOM API를 제공하기 때문이다.
아래의 사진은 Node하위 구조를 보여주고 있다.

</br>

![DOM 계층](https://web.stanford.edu/class/cs98si/img/dom_types.png)
츨처: [http://www.stanford.edu/class/cs98si/slides/the-document-object-model.html](http://www.stanford.edu/class/cs98si/slides/the-document-object-model.html)

</br>

프로토타입 기반으로 본다면 아래와 같은 구조를 가지고 있다.

```javascript
Object < EventTarget < Node < DocumentType < <!DOCTYPE html>(ElementNode)

Object < EventTarget < Node < Element < HtmlElement < HtmlhtmlElement < html(ElementNode)
```

</br>

- 결국 아래 코드와 같이 html ElementNode는 상속(Object, EventTarget, Node, Element, HtmlElement, HTMLhtmlElement) 받은 모든 객체의 속성 및 메서드들을 사용할 수 있게되는 것이다. :bulb:

```javascript
var html = document.querySelector('html');

console.log(html); // html
console.log(html.__proto__); // HTMLhtmlElement
console.log(html.__proto__.__proto__); // HtmlElement
console.log(html.__proto__.__proto__.__proto__); // Elemenet
console.log(html.__proto__.__proto__.__proto__.__proto__); // Node
console.log(html.__proto__.__proto__.__proto__.__proto__.__proto__); // EventTarget
console.log(html.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); // Object
```

</br>

:key: 정리를 하자면

- JavaScript는 브라우저가 읽고 사용하는 언어입니다.
- 사실은 JavaScript의 것라고 생각하는 것들이 정확히는 :star: ***DOM API*** :star: 이다.
- 예를 들면, element에 있는 mouseenter event를 확인하기 위해 JavaScript를 사용한다.
- element는 사실 DOM node이다. DOM node의 DOM 속성을 통해 해당 event listener를 연결합니다.
- event가 발생할때 DOM node는 event를 내보낸다(발생시킨다).
- Node란 어떤 객체의 구성 요소를 의미한다

## 결론 :end:

- JavaScript는 문법, 언어이며 DOM API가 없는 브라우저 밖에서 완전히 사용이 가능하다.(Node.js)
- DOM은 브라우저내에서 작동하고 존재한다.
- DOM은 파싱 된 HTML이라고 말할 수 있습니다.
- 웹페이지가 로드되면 브라우저는 DOM 페이지을 만든다.

## 참고

- [무하프로젝트](http://mohwaproject.tistory.com/)
- [힘내서 공부해보자](https://shldhee.github.io/2018/04/08/DOM/)
