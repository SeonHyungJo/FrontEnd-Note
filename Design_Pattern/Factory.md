
# Factory Pattern

**우리가 많이 사용하는 패턴 중 하나 알고 가기**
<br/>

현재 회사에서 `SWT` 를 사용함에 있어 가장 많이 사용하고 있는 패턴이 `Factory Pattern` 이다. 
<br/>
<br/>

## 자바스크립트 관점으로

- 비슷한 객체를 **공장에서 찍어내듯이 반복적으로 생성**할 수 있게 하는 패턴
-  **컴파일 시점에 구체적인 타입(클래스)을 몰라도 객체 생성**이 가능하다
- 팩토리 패턴의 가장 흔한 사례는 `Object()` 를 이용한 객체 생성시, 주어지는 값의 타입에 따라 `String, Boolean, Number` 등으로 객체가 생성되는 것이다.

<br/>

:point_right: Object() 예제

```js
var num = new Object(12112) // Number로 생성하기
var str = new Object("12112") // Number로 생성하기
num instanceof Number // true
str instanceof String // true
//요런 느낌의 객체를 생성
```

아래의 예제는 [캡틴판교](https://joshua1988.github.io/web_dev/javascript-pattern-design/#%ED%8C%A9%ED%86%A0%EB%A6%AC-%ED%8C%A8%ED%84%B4) 님의 예제입니다.
<br/>

살짝 순서만 수정을 했습니다. 
<br/>

```js
// 팩토리 패턴 구현 예제
function CarMaker() {}

//공장에서 만들수 있는 것들을? 정의하는 부분
CarMaker.Compact = function () {
  this.doors = 4;
};
CarMaker.Convertible = function () {
  this.doors = 2;
};
CarMaker.SUV = function () {
  this.doors = 24;
};

// 그 공장에서 공통으로 할 수 있는 메소드를 만들자
CarMaker.prototype.drive = function () {
  return "Vroom, I have " + this.doors + "doors";
};

//공장을 만들자
CarMaker.factory = function (type) {
  var constr = type, newcar;

  // 생성자 존재하지 않으면 에러발생
  if (typeof CarMaker[constr] !== "function") {
    throw {
      name: "Error",
      message: constr + "doesn't exist"
    };
  }

  // 생성자 존재 확인 후 부모 상속
  if (typeof CarMaker[constr].prototype.drive !== "function") {
    CarMaker[constr].prototype = new CarMaker();
  }

  newcar = new CarMaker[constr]();

  return newcar;
};

// 위 패턴을 이용한 결과
// 공장에서 만들수 있는 3가지 중에서 아래의 2가지를 만들거야
var corolla = CarMaker.factory("Compact");
var solstice = CarMaker.factory("Convertible");

// 위와 같이 공장을 만들고 공장에서 만들수 있는 것을 정의를 해서 공장에서 만들때 어떤것을 만들지 선택을 하면
corolla.drive();  // "Vroom, I have 4 doors"
solstice.drive(); // "Vroom, I have 2 doors"
```

<br/>

```java
//위에서 CarMaker부분만 간단하게 Java로 만들어보았다.

public abstract class CarMaker(){
    abstract int doors; 

    public String drive(){
        return "Vroom, I have " + this.doors + "doors";
    }
}

public class Compact extends CarMaker(){
    int doors = 4;
}

public class Convertible extends CarMaker(){
    int doors = 2;
}

public class SUVextends extends CarMaker(){
    int doors = 24;
}

// 위와 같은 형태가 이루어 질 것이다.
// 공장을 만들고 공장으로 하여금 타입을 보고 인스턴스를 만들어 주면 된다.
```

<br/>
<br/>

## Java

슈퍼클래스와 여러개의 `sub class`가 있는 상황에서 `input`이 발생하면 하나의 `sub class`를 반환해야 할때 
<br/>

자바에서 흔히 사용하는 `interface, abstract class` 또는 `java class`를 들 수 있다. 
<br/>

### 슈퍼클래스

```java
public abstract class Product {
    public abstract String getName();
    public abstract int getPrice();

    @Override
    public String toString() {
        return "product name : " + getName() + ", price :" + getPrice();
    }
    // 공통으로 사용할 수 있도록 미리 override를 해놓음
}
```

## 서브클래스

`Product class` 를 상속받은 `Computer` 와 `Ticket class` 를 구현한다. 아래의 클래스들은 `super class` 하위의 `sub class` 를 정의 한 것이다.
<br/>

```java
public class Computer extends Product {
    private String name;
    private int price;

    public Computer (String name, int price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public String getName() {
        return this.name;
    }
    @Override
    public int getPrice() {
        return this.price;
    }

    public void toStrig () {
        System.out.println("항목 :: " + this.name + ", 가격 :: "+ this.price);
    }
}
```

<br/>

```java
public class Ticket extends Product {
    private String name;
    private int price;

    public Ticket (String name, int price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public String getName() {
        return this.name;
    }
    @Override
    public int getPrice () {
        return this.price;
    }

    public void toStrig () {
        System.out.println("항목 :: " + this.name + ", 가격 :: "+ this.price);
    }

}
```

<br/>

이제 우리는 `super class`와 `sub class`를 사용할 준비가 되었다. `factory class`를 작성해보자
<br/>

```java
public class ProductFactory {
    public static Product getProduct(String type, String name, int price) {
        if ( "ticket".equals(type) )
            return new Ticket(name, price);
        else if ( "computer".equals(type) )
            return new Computer(name, price);
        return null;
    }
}
```

- `factory class` 를 `static` 으로 선언함으로써 `singleton` 을 유지할 수가 있다.
- `input` 파라메터에 의해 `sub class` 가 생성되어 리턴된다.

```java
public class main {
    public static void main(String[] args) {

        Product t1 = ProductFactory.getProduct("ticket", "한국여행", 300000);
        Product c1 = ProductFactory.getProduct("computer", "pc", 1500000);

        System.out.println(t1.toString());
        System.out.println(c1.toString());
    }
}
```

- `Factory pattern` 은 구현체 보다는 인터페이스 코드 접근에 좀더 용의하게 해준다.
- `Factory pattern` 은 클라이언트 클래스로부터 인스턴스를 구현하는 코드를 떼어내서, 코드를 더욱 탄탄하게 하고 결합도를 낮춘다.
- `Factory pattern` 은 구현과 클라이언트 클래스들의 상속을 통해 추상적인 개념을 제공한다.