# Singleton

전체 시스템에서 하나의 인스턴스를 가지는 것을 보장하는 객체 생성패턴이다.
</br>

:point_right: 따라서 js에서 객체 리터럴도 **싱글톤 패턴**이다.
</br>

```js
var singletonObj = { a : '값', b : function () { } }
```

</br>

이렇게 만들어지는 싱글톤은 비공개 상태, 함수를 정의할 수 없다.
</br>

흔히 우리가 사용하는 라이브리에는 외부에서 쉽게 접근할 수 있는 **비공개 멤버**를 가지고 있다. 이럴때 우리는 자바스크립트에서 **클로져를 사용하여** 비공개 멤버를 구현한다.
</br>

```js
var Singleton = (function () {
    //  싱글톤 패턴 구현 코드
    // 비공개 변수, 메서드 정의

    var instantiaed;
    function init() {
        // 싱글톤 객체 정의
        return {
            // 공개 메서드 정의
            publicMethod : function () { 
                return 'hello Singleton Pattern!!!';
            },

            // 공개 프로퍼티 정의
            publicProp : 'single value'
        }
    }
    // 공개 메서드인 getInstance() 를 정의한 객체.
    // 렉시컬 특성으로 인해 비공개 변수, 메서드에 접근 가능(클로저)
    return {
        getInstance : function () {
            if (!instantiaed) {
                instantiaed = init();
            }
            return instantiaed;
        }
    }
})();

// 싱글톤 객체 생성하여 publicMethod 호출 가능해짐
var first = Singleton.getInstance();
first.publicMethod();
console.log(first.publicMethod());
// hello Singleton Pattern!!!
var second = Singleton.getInstance();
second.publicMethod();
console.log(second.publicMethod());
// hello Singleton Pattern!!!
console.log(first === second); // true
```

위 코드에서는 변수의 렉시컬한 특성으로 인해 내부의 `getInstance` 함수에서 비공개 변수인 `instantiaed` 에 접근할 수 있다는 것과 `getInstane()` 호출이 끝나더라도 `instantiaed` 값은 계속 유지되는 특성(클로저)을 이용해 `publicMethod()`, `publicProp`이 포함된 객체를 유일하게 생성하게 됩니다.