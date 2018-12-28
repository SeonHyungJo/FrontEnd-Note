# [ES6] Classes

이번에는 간단하게 `ES6` 에 새로 생긴 `Class` 에 대해서 간단하게 알아볼려고 한다.
<br/>

기존에는 `prototype` 으로 구현을 했었다면 `ES6` 에서는 `OOP` 의 하나중인 `Java` 와 매우 비슷하다 `Java` 의 클래스와 비슷하면서 인터페이스는 없지만 상속의 개념은 존재한다.
<br/>

`ES2015` 클래스는 프로토 타입 기반 `OO` 패턴에 비해 엄청나게 간단하다.(`Syntactic sugar`)
<br/>

> `Syntactic sugar` => 문법적으로 간단하게 해주는 역할
<br/>

하나의 편리한 선언적 형식을 사용하면 클래스 패턴을보다 쉽게 사용할 수 있으며 상호 운용성이 향상이 된다.
<br/>

클래스는 **프로토 타입 기반 상속, 슈퍼 호출, 인스턴스, 정적 메서드 및 생성자** 를 지원한다.
<br/>

## 5가지 특성

- 프로토 타입 기반 상속(`extends`)
- 슈퍼 호출(`super`)
- 인스턴스(`instance`)
- 정적 메서드(`static method`)
- 생성자(`constructor`)

```js
class SkinnedMesh extends THREE.Mesh {

    //Constuctor
    constructor(geometry, materials) {
        //Super
        super(geometry, materials);

        this.idMatrix = SkinnedMesh.defaultMatrix();
        this.bones = [];
        this.boneMatrices = [];
        //...
    }

    //Method
    update(camera) {
        //...
        super.update();
    }

    //static Method
    static defaultMatrix() {
        // return Instance
        return new THREE.Matrix4();
    }
}
```

## 프로토 타입 기반 상속

```js
class SkinnedMesh extends THREE.Mesh {}
```

## 슈퍼 호출

```js
super.update();
```

## 인스턴스

```js
new THREE.Matrix4();
```

## 정적 메서드

```js
static defaultMatrix() {
   return new THREE.Matrix4();
}
```

## 생성자

```js
constructor(geometry, materials) {}
```

---

#### Reference

- [devhints](https://devhints.io/es6)
- [babel](https://babeljs.io/docs/en/learn/#classes)