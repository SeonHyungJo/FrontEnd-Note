# Object.create() & Object.assign()

`Object.create()`는 기준이 되는 Object를 prototype으로 **새로운 객체를 생성**한다.

```js
Object.create(prototype_object, propertiesObject)
```

`Object.create()`는 주로 객체를 상속하기 위해 사용하는 메소드이다. 첫번째 인자를 상속하며, 두번째 인자의 속성을 추가적으로 구성할 수 있다.
<br/>

### 2번째 인자로 구성요소

1. **`configurable`** 이 속성의 값을 변경할 수 있고, 대상 객체에서 삭제할 수도 있다면 `true`.기본값은 `false`.
2. **`enumerable`** 이 속성이 대상 객체의 속성 열거 시 노출된다면 `true`.기본값은 `false`.

데이터 서술자는 다음 키를 선택사항으로 가집니다.

1. **`value`** 속성에 연관된 값. 아무 유효한 JavaScript 값(숫자, 객체, 함수 등)이나 가능합니다.기본값은 `undefined`
2. **`writable`**[할당 연산자]로 속성의 값을 바꿀 수 있다면 `true`.기본값은 `false`.

접근자 서술자는 다음 키를 선택사항으로 가집니다.

1. **`get`**속성 접근자로 사용할 함수, 접근자가 없다면 `undefined`. 
   - 속성에 접근하면 이 함수를 매개변수 없이 호출하고, 그 반환값이 속성의 값이 됩니다. 이 때 `this` 값은 이 속성을 가진 객체(상속으로 인해 원래 정의한 객체가 아닐 수 있음)입니다. 기본값은 `undefined`.
2. **`set`**속성 설정자로 사용할 함수, 설정자가 없다면 `undefined`. 
   - 속성에 값을 할당하면 이 함수를 하나의 매개변수(할당하려는 값)로 호출합니다. 이 때 `this` 값은 이 속성을 가진 객체입니다.기본값은 `undefined`.


**`Object.create()`의 2번째 인자는 `Object.defineProperties()`를 따른다.**
<br/>

---

그 전에 `Object.defineProperties()`전에 `Object.defineProperty()`를 먼저 알아보자

### Object.defineProperty()

`Object.defineProperty()` 정적 메서드는 객체에 직접 새로운 속성을 정의하거나 이미 존재하는 속성을 수정한 후, **그 객체를 반환합니다.**

```js
Object.defineProperty(obj, prop, descriptor)
```

- **`obj`** : 속성을 정의할 객체.
- **`prop`** : 새로 정의하거나 수정하려는 속성의 이름 또는 `Symbol`.
- **`descriptor`** : 

새로 정의하거나 수정하려는 속성을 기술하는 객체.

아래의 예시는 `Object.create()`에서 2번째 인자에 들어가는 항목의 예시를 포함해서 보여주고 있다.

```js
const obj = {
  age: 27, 
  country : 'seoul'
}
let oldCountry = 'Yongin'

console.log('init str', obj) // init str {age: 27, country: "seoul"}

const descriptor = {
  enumerable: true,
  configurable: true,
  get: function(){
    return '???'
  },
  set: function(value){
    oldCountry = value
  }
}

const newObj = Object.defineProperty(obj, 'country', descriptor)
console.log('obj values => ',obj, obj.age, obj.country) // obj values =>  {age: 27} 27 ???
console.log('newObj values => ',newObj, newObj.age, newObj.country) // newObj values =>  {age: 27} 27 ???
console.log('oldCountry => ', oldCountry) // oldCountry =>  Yongin

newObj.age = 28
newObj.name = 'sNyung'
newObj.country = 'Re Seoul'
console.log('After newObj && obj values are => ', obj, obj.age, obj.country) // After newObj && obj values are =>  {age: 28, name: "sNyung"} 28 ???
console.log('oldCountry => ', oldCountry) // oldCountry =>  Re Seoul
```

### Object.defineProperties()

```js
Object.defineProperties(obj, props)
```

`Object.defineProperty()`의 복수 버전이다.

```js
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});
```
---

### `Object.create()` Sample

```js
prototypeObject = {
  fullName: function(){
    return this.firstName + " " + this.lastName		
  }
}
var person = Object.create(prototypeObject)

console.log(person) // Object with prototype object as prototypeObject and no properties

// Adding properties to the person object
person.firstName = "Virat";
person.lastName = "Kohli";

person.fullName() // Virat Kohli
```

### 2번째 인자 Sample

```js
const prototypeObject = {
  fullName: function(){
    return this.firstName + " " + this.lastName		
  }
}

const person = Object.create(prototypeObject, {
  'firstName': {
    value: "sNyung", 
    writable: true, 
    enumerable: true
  },
  'lastName': {
    value: "Kohli",
    writable: true,
    enumerable: true
  }
})
    
console.log(person) // {firstName: "sNyung", lastName: "Kohli"}
```

![image](https://user-images.githubusercontent.com/24274424/59957328-25384b00-94d2-11e9-8864-4b8268faf26f.png)


```js
function Dog(){
  this.pupper = 'Pupper';
};
Dog.prototype.pupperino = 'Pups.';

const maddie = new Dog();
const buddy = Object.create(Dog.prototype);

// Object.create()
console.log(buddy.pupper); // undefined
console.log(buddy.pupperino); // Pups.

// New
console.log(maddie.pupper); // Pupper
console.log(maddie.pupperino); // Pups.
```

### New VS Object.create()

`Object.create()`와 `new Constructor()` 는 꽤 비슷하지만, 다른 점이 있다. 다음은 이 둘의 차이를 보여주는 예제다.

```js
function Foo() {
  this.bar = 42;
}

Foo.prototype.method = function () {
  return this.bar
};

const newObj = new Foo(); // Foo constructor will not executed by Object.create
const createObj = Object.create(Foo.prototype);

console.log(newObj);
console.log(createObj);

console.log(newObj.method); // function
console.log(createObj.method); // function

console.log(newObj.bar); // 42
console.log(createObj.bar); // undefined
```

성능상으로 new 생성자를 사용하는 것이 좋다라고 한다. 확실히 성능 테스트를 해보면 알수 있다.

### 성능 테스트

[https://jsperf.com/snyung-new-vs-object-create](https://jsperf.com/snyung-new-vs-object-create)

```js
function Obj() {
  this.p = 1;
}

Obj.prototype.chageP = function(){
  this.p = 2
};

console.time('Object.create()');
var obj;
for (let i = 0; i < 10000; i++) {
  obj = Object.create(propObj);
}
console.timeEnd('Object.create()');
// Object.create(): 12.994140625ms

console.time('constructor function');
var obj2;
for (let i = 0; i < 10000; i++) {
  obj2 = new Obj();
}
console.timeEnd('constructor function');
// new: 2.379150390625ms
```

<br/>

### Polyfill

```js
Object.create = (function () {
  function obj() {};

  return function (prototype, propertiesObject) {
    // 첫 번째 인자를 상속하게 한다.
    obj.prototype = prototype || {};

    if (propertiesObject) {
      // 두 번째 인자를 통해 속성을 정의한다.
      Object.defineProperties(obj.prototype, propertiesObject);
    }

    return new obj();
  };
})();

//--------------TEST---------------

const Vehicle = function(){
  this.wheel = 4
}

Vehicle.prototype.getWheel = function() {
  return this.wheel
}

const Motorcycle = Object.create(Vehicle.prototype, {'wheel': {value: 3, writable: true}});
console.log(Motorcycle)
```

<br/>

### Compat Table

![image](https://user-images.githubusercontent.com/24274424/59957350-70525e00-94d2-11e9-97ea-a483763149d1.png)

<br/>

## Object.assign()(진행중)

`Object.assign()` 메소드는 열거할 수 있는 하나 이상의 출처 객체로부터 대상 객체로 속성을 복사할 때 사용합니다. 대상 객체를 반환합니다.

- **`target`** : 대상 객체.
- **`sources`** : 하나 이상의 출처 객체.

```js
const obj = { a: 1 };
const copy = Object.assign({}, obj);

console.log(copy); // { a: 1 }
```

깊은 클로닝에 대해서, Object.assign() 은 속성의 값을 복사하기때문에 다른 대안을 사용해야합니다. 출처 값이 객체에 대한 참조인 경우, 참조 값만을 복사합니다.

같은기능으로 ES6 문법의 Spread를 사용한다.

![image](https://user-images.githubusercontent.com/24274424/59957367-9ed03900-94d2-11e9-80af-cfcad4784f78.png)

<br/>

#### Reference

- [Object.create() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [Object.create in JavaScript](https://hackernoon.com/object-create-in-javascript-fa8674df6ed2)
- [Object.create(): the New Way to Create Objects in JavaScript](https://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html)
- [Basic Inheritance with Object.create](http://adripofjavascript.com/blog/drips/basic-inheritance-with-object-create.html)
- [Understanding the difference between Object.create() and the new operator.](https://medium.com/@jonathanvox01/understanding-the-difference-between-object-create-and-the-new-operator-b2a2f4749358)
- [JavaScript Object Creation: Patterns and Best Practices](https://www.sitepoint.com/javascript-object-creation-patterns-best-practises/)
- [object-create.md - wonism](https://github.com/wonism/TIL/blob/master/front-end/javascript/object-create.md)
- [Object.assign() = MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)