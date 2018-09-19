# Prototype

<div align=center>

![Main](https://github.com/SeonHyungJo/FrontEnd-Dev/blob/master/assets/image/prototypeLogo.png?raw=true)

</div>

Javascript는 Proptotype기반의 언어라고 한다.
</br>
그렇다면 js를 공부한다면 알아야한다.
</br>

Javascript의 기본을 익힐때 Object, Function 이렇게 2가지를 먼저 생각하고 알고 있으면 된다.

</br>
</br>

## 새로운 function 생성

먼저 새로운 function을 생성한다고 가정하자.
</br>

![prototype](https://github.com/SeonHyungJo/FrontEnd-Dev/blob/master/assets/image/prototype_1.png?raw=true)

```javascript

// 기본 function 생성
function Animal(){
    this.name = "동물";
}

```

프로토타입에 있어서 크게 2가지로 나누게 된다면

1. function(생성자)
2. prototype Object

prototype object는 말그대로 object이면서 인자로 가지고 있는 constructor는 object function을 가르킨다.
여기서 가르키는 functions이 1번의 function이다.
function의 prototype은 prototype object를 가르키고 있다.
즉 서로를 바라보고 있다.

</br>
</br>

### Function(생성자)

위에서 생성된 function은 생성자의 역할을 한다. 우리가 만약
</br>

![prototype](https://github.com/SeonHyungJo/FrontEnd-Dev/blob/master/assets/image/prototype_2.png?raw=true)

```javascript

// cat 생성
var cat = new Animal();

```

위와 같이 고양이를 생성하게 된다면 function Animal인 생성자를 실행하는 것이다.
</br>
또한 function Animal안을 보게 되면 prototype이라는 인자가 있다. 이것은 Animal.prototype하고 연결이 되있는 것이다.
</br>
</br>

### Prototype Object

그렇다면 이녀석?은 무엇일까?
</br>
기본적인 Animal의 prototype을 추가하게 되면 들어가는 객체이다.
</br>
추가적으로 constructor 역시 이 곳으로 들어가게 되고 function Animal하고 연결이 되어있어 생성을 한다면 여기의 생성자를 타게 된다.

```javascript

Animal.prototype.constuctor / Animal(){this.name = "동물";}

```

이렇게 function Animal과 Animal.prototype(Object)를 서로 연결이 되어있다.

## Prototype Link

`[[Prototype]]]`, `__proto__` 2개는 의미가 똑같다 그거 표기법이 다른 것이다.
</br>
그렇다면 위의 2개는 무엇일까:question:
</br>
먼저 위에서 생성한 `cat`을 살펴보면

![prototype](https://github.com/SeonHyungJo/FrontEnd-Dev/blob/master/assets/image/prototype_3.png?raw=true)

```javascript

cat
//result
//animal {name: "test"}
//  name: "test"
//  __proto__: Object

```

`cat`의 내역에는 당연하게 생성자로 생성된 name이 있다.
</br>
그런데 그 아래는?? 들어보지 못한 것이 하나 더 생겼다.
</br>
이것이 바로 Javascript에서 중요한 역할을 하게 된다.

```javascript

cat.hasOwnProperty("name") //true

```

위의 예제를 보게 되면 나는 `hasOwnPropert`이런 함수를 생성한 적이 없다. 이 함수는 어디서 오게된 것일까:question:
</br>
</br>

**바로 최상의 Object인 Object.prototype에서 온 것이다.**
</br>
</br>

어떻게 해서 그것까지 갈 수가 있던걸까:question: 라고 생각할 수 있다.
</br>
바로 그역할을 하는 것이 `__proto__`이다.
</br>
</br>

`__proto__`안을 보게 되면 `constructor : Animal()`이 있는 것을 볼 수 있다. 즉, `cat`을 생성한 `function`의 `prototype`이 `__proto__`에 연결이 되어 있다는 것을 알게 되는 것이다.
</br>

![prototype](https://github.com/SeonHyungJo/FrontEnd-Dev/blob/master/assets/image/prototype_4.png?raw=true)

또한 Animal.prototype.__proto__에는 Object.prototype에 연결이 되어있다. 그리고 그 안에는 우리가 사용한 `hasOwnPropert`이 있어서 사용을 하는 것이다.
</br>
</br>

그렇다면 `Object.prototype.__proto__`는 무엇일까:question: 아무것도 없다. 그냥 `null`이 나온다. 모든 마지막은 `Object.prototype`에서 끝이 나는 것이다.

```javascript

Object.prototype.__proto__ // null

```

</br>
</br>

## 참고

- [poiemaweb](https://poiemaweb.com/js-prototype)
- [kenneth-kin-lum.blogs](http://kenneth-kin-lum.blogspot.com/2012/10/javascripts-pseudo-classical.html)

</br>
</br>

## 간단한 심화

심화적으로 최종적으로 Object로 모든것이 연결이 되는 것도 있지만 Object function.__proto__가  f(){}에 연결이 되어있다. f(){}의 constructor는 Function function이다.
</br>

![prototype](https://github.com/SeonHyungJo/FrontEnd-Dev/blob/master/assets/image/prototype_5.png?raw=true)

또한
</br>

Function.prototype Object의 __proto__는 Object.prototype Object에 연결이 되어있다.
</br>

즉,</br>
이런걸로 봐서는 Function.prototype.__proto__는 당연히 객체임으로 최상위 Object.prototype에 연결이 되는 것이고, 추가적으론 Object function의 __proro__는 함수라고 생각을 하여 Function.prototype에 연결이 되는 것이다.