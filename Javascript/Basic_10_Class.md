# Class
 
 Class 문법은 ES6에 추가가 되었다. JavaScript에서의 Class는 특별한 것이 아니다. 기존에 존재하고 있던 상속과 생성자 함수를 기본으로 한 `Proptotype`의 **syntactic sugar**이다.
 
 Class문법이 나오기 전에도 사람들은 JavaScript를 OOP스럽게 사용하고 싶어했다. 그래서 다양한 방법을 사용해서 구현을 했다.

## Constructor Function

Class가 생기기 전에는 JavaScript에서는 모든 것을 Function으로 만들어서 사용했다. Class처럼 사용하기 위해서 Constructor function을 사용하였다.

```js
function Vehicle(make, model, color) {
    this.make = make,
    this.model = model,
    this.color = color,
    this.getName = function () {
        return this.make + " " + this.model;
    }
}
```

위와 같이 선언을 함으로써 Java에서 사용하는 Class에 좀 더 가까워졌다. 이제 우리는 `Vehicle`이라는 것을 선언했으니 인스턴스를 만들어보자

```js
const car = new Vehicle("Toyota", "Corolla", "Black");
const car2 = new Vehicle("Honda", "Civic", "White");
```

위와 같이 `new` 키워드를 사용해서 만들 수 있다. 

**그런데 문제가 있다.** 

우리가 새로운 `Vehicle()`을 만들 때 JavaScript 엔진은 두 객체의 각각에 대한 Vehicle Constructor function 사본을 만든다. 모든 속성과 메소드는 `Vehicle()`의 새로운 인스턴스에 복사가 된다. 

이게 왜 문제가 되는가라고 생각할 수 있다. Constructor function의 멤버함수(메서드)가 **모든 객체에서 반복된다.** 계속적으로 똑같은 멤버함수를 만드는 것은 불필요하다. 다른 문제는 아래와 같이 **기존의 만든 객체에 새로운 속성이나 메서드를 추가를 하지 못한다는 것** 이다.

```js
car2.year = "2012"
```

위와 같이 만들었다 하더라도 다른 인스턴스에는 새로운 속성이나 메서드는 추가를 못하고 생성자 함수에서 추가를 해야한다.

```js
function Vehicle(make, model, color, year) {
    this.make = make,
    this.model = model,
    this.color = color,
    this.year = year,
    this.getName = function () {
        return this.make + " " + this.model;
    }
}
```

<br/>

## Prototype

JavaScript 내부적으로 새로운 함수가 만들어지면 엔진은 기본적으로 `prototype` 이라는 속성을 추가한다.

사진

**__proto__** 속성은 `dunder proto` 라고 불리고, 우리의 생성자 함수의 prototype 속성을 가리킨다.

우리가 생성자 함수의 새로운 인스턴스를 만들어질 때 마다 이 속성은 다른 속성 및 메서드와 함께 인스터스에 복사가 된다.

사진

`prototype` 객체는 아래와 같이 작성을 하여 생성자 함수에 속성 및 메서드를 추가하는데 사용이 가능하며 생성자함수의 모든 인스턴스에서 사용할 수 있다.

[사진]

이 접근법에는 몇가지 주의 사항이 있는데 `Prototype` 속성과 메서드는 생성자 함수의 모든 인스턴스와 공유를 한다. 만약 생성자 함수의 인스턴스의 하나가 기본 속성에서 변경했다면 모든 인스턴스가 아닌 해당 인스턴스에만 반영이 된다.

또 다른 한가지는 참조 유형 속성이 모든 인스턴스간에 항상 공유된다. 생성자 함수의 한 인스턴스가 수정하면 모든 인스턴스에 대해 수정이 된다.

<br/>

## Class

이제 생성자 함수와 prototype에 대해 알아 봤으니 우리의 메인인 Class에 대해 알아보자. 위의 2개를 살펴봄으로써 좀 더 쉽게 알수 있을 것이다. 이전의 것들과 크게 차이가 나는 것이 없다. 

javascript 클래스는 prototype 의 기능을 활용하여 생성자 함수를 작성하는 새로운 방법일 뿐이다.

    class Vehicle {
        constructor(make, model, color) {
            this.make = make;
            this.model = model;
            this.color = color;
        }
    
        getName() {
            return this.make + " " + this.model;
        }
    }

생성하는 방법은 역시 위에서 했던 방법과 동일하게 사용해서 만들 수 있다.

    let car = new Vehicle("Toyota", "Corolla", "Black");

위에서 보면 알겠지만 생성자 함수에서 설명했던 비교해서 매우 유사하다는 것을 알 수 있다.

    function Vehicle(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }
    
    Vehicle.prototype.getName = function () {
        return this.make + " " + this.model;
    }
    
    let car = new Vehicle("Toyota", "Corolla", "Black");

이것은 class가 생성자 함수를 수행하는 새로운 방법이라는 것을 증명한다. 그렇지만 더욱 실제 Clas와 비슷하게 만들기 위해서 도입된 몇가지 규칙이 있다.

- 생성자가 작동하려면 new 키워드가 필요하다.

    let car = new Vehicle("Toyota", "Corolla", "Black");

new를 사용하지 않고 사용할 경우 아래와 같은 에러가 발생한다.

- class 메서드는 non-enumerable 하다 . JavaScript에서 객체의 각 속성에는 해당 속성에 대해 enumerable  flag가 있다. Class는 prototype에 정의 된 모든 메서드에 대해 이 flag를 false로 설정한다.
- Class에 생성자를 추가하지 않으면 기본 빈 생성자가 자동으로 추가 된다.

    constructor() {}

- Class 안의 코드는 항상 strict 모드이다. 이것은 오류가 없는 코드를 작성하거나, 잘못된 입력 또는 코드 작성 중에 작성된 구문 오류 또는 다른 곳에서 참도된 실수로 일부 코드를 제거하여 코드를 작성하는데 도움을 준다.
- Class는 호이스팅이 되지 않는다.

[호이스팅 에러 사진]

- Class는 생성자 함수나 객체 리터럴과 같은 속성 값 할당을 허용하지 않느다. 함수 또는 getter/setter만 가질 수 있다. `property:value`할당은 없다.

### Class Features

1. constructor

생성자는 Class자체를 나타내느 함수를 정ㅢ하는 클래스 선언의 특수 함수이다. Class인스턴스를 새로만들면 생성자가 자동으로 호출된다.

    let car = new Vehicle("Honda", "Accord", "Purple");

생성자는 super 키워드를 사용하여 확장된 Class의 생성자를 호출할 수 있다.

하나 이상의 생성자 함수를 가질 수 없다.

1. Static Methods

Static Methods prototype에 정의된 Calssd의 다른 메서드와는 다르게prototype이 아닌 Class 자체의 함수 이다.

Static Method는 static 키워드를 사용하여 선언되며 주로 유틸리티 함수를 만드는 데 사용된다. Calss의 인스터스를 만들지 않고 호출된다. 

    class Vehicle {
        constructor(make, model, color) {
            this.make = make;
            this.model = model;
            this.color = color;
        }
    
        getName() {
            return this.make + " " + this.model;
        }
    
        static getColor(v) {
            return v.color;
        }
    }
    
    let car = new Vehicle("Honda", "Accord", "Purple");
    
    Vehicle.getColor(car); // "purple"

정적 메서드는 클래스 인스턴스에서 호출할 수 없다.

1. Getter/Setter

Class에는 getter/setter 를 사용하여 속성 값을 가져오거나 속성 값을 설정할 수도 있다. 

    class Vehicle {
        constructor(model) {
            this.model = model;
        }
        
        get model() {
            return this._model;
        }
    
        set model(value) {
            this._model = value;
        }
    }

getter/setter는 Class prototype에 정의 된다.

1. Subclassing

Subclassing은 Javascript Class에서 상속을 구현할 수 있는 방법으로 키워드 확장은 클래스의 하위 클래스를 만드는 방법이다.

    class Vehicle {
        constructor(make, model, color) {
            this.make = make;
            this.model = model;
            this.color = color;
        }
    
        getName() {
            return this.make + " " + this.model;
        }
    }
    
    class Car extends Vehicle{
        getName(){
            return this.make + " " + this.model +" in child class.";
        }
    }
    
    let car = new Car("Honda", "Accord", "Purple");
    
    car.getName(); // "Honda Accord in child class."

getName()를 호출하면 자식클래스의 함수가 호출된다.

그러나 가끔은 무도의 함수를 사용해야 할 때가 있다. 그럴때는 super 키워드를 사용하면 된다.

    class Car extends Vehicle{
        getName(){
            return super.getName() +"  - called base class function from child class.";
        }
    }

옛날 방식인 prototype을 사용해서 상속 구현하기

[https://medium.com/@robertgrosse/how-es6-classes-really-work-and-how-to-build-your-own-fd6085eb326a](https://medium.com/@robertgrosse/how-es6-classes-really-work-and-how-to-build-your-own-fd6085eb326a)

    function Base() {}
    Base.prototype.foo = function() {return 'foo in Base';};
    Base.prototype.bar = function() {return 'bar in Base';};
    
    function Child() {}
    Object.setPrototypeOf(Child, Base);
    Object.setPrototypeOf(Child.prototype, Base.prototype);
    Child.prototype.foo = function() {return 'foo in Child';};
    Child.prototype.whiz = function() {return 'whiz in Child';};
    
    
    var b = new Base;
    var c = new Child;
    
    console.log(b.foo()); // foo in Base
    console.log(b.bar()); // bar in Base
    console.log(c.foo()); // foo in Child
    console.log(c.bar()); // bar in Base
    console.log(c.whiz()); // whiz in Child

## 팩토리 디자인 패턴

[https://medium.com/front-end-weekly/understand-the-factory-design-pattern-in-plain-javascript-20b348c832bd](https://medium.com/front-end-weekly/understand-the-factory-design-pattern-in-plain-javascript-20b348c832bd)

    const Animal = function(name){
        const animal = {};
        animal.name = name;
        animal.walk = function(){
            console.log(this.name + " walks");
        }
        return animal;
    };

    const poo = Animal("poo");
    const tommy = Animal("tommy");
    poo.walk() // poo walks
    tommy.walk() // tommy walks

위의 코드를 아래와 같이 변경을 함으로써 new 키워드를 사용하지 않고 매번 새로운 객체를 만들어서 전달 받는다. 그렇다면 여기에 추가적인 기능을 넣는 방법은 ?

### Mixins

    const canKill = {
      kill() {
        console.log("I can kill")
      }
    }

    k1 = Object.assign(Animal("k1"), canKill)

이렇게 함으로써 이제 죽일 수 있는 동물을 하나 만들었다.

이제 여러번 죽이는 동물을 필요로한다면 우리는 이것을 공장으로 만들 수 있다.

    const KillingAnimal = function(name) {
      const animal = Animal(name)
      const killingAnimal = Object.assign(animal, canKill)
      return killingAnimal;
    }

    k2 = KillingAnimal("k2")
    monty = KillingAnimal("monty")
    k2.kill()
    k2.walk()

여러 믹스인이 필요한 경우

    const canFly = {
      fly(h) {
        console.log("I can fly " + h "meters high")
      }
    }
    const canDance = {
      dance() {
        console.log("Look Maa !! I'm dancing")
      }
    }
    brian = Object.assign(Animal("brian"), canKill, canFly, canDance)
    brian.walk()
    brian.fly(200)
    brian.kill()
    brian.dance()

2개의 공장을 합쳐보자!!

아래와 같은 로봇 공장이 있다고 하자.

    const Robot = function(name) {
      const robot = {}
      robot.name = name;
      robot.speak = function(message) {
        console.log(robot.name + " speaks " + message)
      }
      return robot;
    }

    roboDog = Object.assign(Animal("roboDog"), Robot("roboDog"))

이제 우리가 죽일 수있는 로봇 개를 원한다면

    killingRoboDog = Object.assign({}, roboDog, canKill)
    killingRoboDog.walk()
    killingRoboDog.kill()
    killingRoboDog.speak("roboDog will kill you")

---

#### Reference

- [](https://www.digitalocean.com/community/tutorials/understanding-classes-in-javascript)
- [](https://medium.com/@robertgrosse/how-es6-classes-really-work-and-how-to-build-your-own-fd6085eb326a)
- [](https://medium.com/front-end-weekly/understand-the-factory-design-pattern-in-plain-javascript-20b348c832bd)
- [](https://medium.com/tech-tajawal/javascript-classes-under-the-hood-6b26d2667677)