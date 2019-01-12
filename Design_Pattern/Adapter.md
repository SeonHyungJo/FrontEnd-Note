# Adapter Pattern

적응자 패턴에 대해서 빠르게 진행하자 생각보다 간단하다.
<br/>

이 역시 회사에서 소스를 보다보면 `Legacy`들이 있습니다.
<br/>

여기에 기존에 있는 기능을 토대로 새로운 요구조건을 충족시킬 수 있도록 해야한다.
<br/>

## 자바관점으로

한 클래스의 인터페이스를 클라이언트에서 사용하고자하는 다른 인터페이스로 변환한다.(이게 궁극적 목표)
<br/>

어댑터를 이용하면 인터페이스 호환성 문제 때문에 같이 쓸 수 없는 클래스들을 연결해서 쓸 수 있다.
<br/>

전기 콘센트를 보면 이해가 쉽다. 한국의 표준 플러그를 일본에 전원 소켓에 바로끼워줄수 없어 동그랑 모양을 일자로 바꿔주는 어댑터를 끼워주어야 한다.
<br/>

이와같이 어댑터는 소켓의 인터페이스를 플러그에서 필요로 하는 인터페이스로 바꿔준다고 할 수 있다.
<br/>

적응자 패턴은 추상 팩토리나 빌더 패턴처럼 객체를 생성하는 패턴이 아닙니다. 기존에 있던 구조를 새 구조로 유연하게 전환하거나 새 구조에서 기존의 구조로 전환하는 데 사용하는 패턴입니다.
<br/>

```java
public interface Duck {
         public void quack();
         public void fly();
}

public class MallardDuck implements Duck {
    @Override
    public void quack() {
        System.out.println("Quack");
    }
         
    @Override
    public void fly() {
        System.out.println("I'm flying");
    }
}

public interface Turkey {
    public void gobble();
    public void fly();
}

public class WildTurkey implements Turkey{
    @Override
    public void gobble() {
        System.out.println("Gobble gobble");
    }
         
    @Override
    public void fly() {
        System.out.println("I'm flying a short distance");
    }
}

public class TurkeyAdapter implements Duck {
    Turkey turkey;

    public TurkeyAdapter(Turkey turkey) {
        this.turkey = turkey;
    }

    @Override
    public void quack(){
        turkey.gobble();
    }

    @Override
    public void fly() {
        turkey.fly();
    }
}
```

기존의 오리라는 객체가 있다고 하자 그런데 새로운 터키라는 객체를 추가해서 똑같이 사용하려고 한다. 그렇다면 터키를 바로 사용할 수 없으므로 터키 어댑터라는 것을 만들고 오리처럼 사용할 수 있도록 만들어 주는 것이다.
<br/>
<br/>

## 자바스크립트 관점으로

```js
var Duck = {
   quack: function() {
       console.log('Quack');
   },

   fly: function() {
       console.log('Im flying');
   }
};

var Turkey = {
   gobble: function() {
       console.log('Gobble gobble');
   },

   fly: function() {
       console.log("I'm flying a short distance");
   }
};

var TurkeyAdapter = (function() {

   function TurkeyAdapter(adapter) {
       this.adapter = adapter;
   }

   TurkeyAdapter.prototype.quack = function() {
       this.adapter.gobble();
   };

   TurkeyAdapter.prototype.fly = function() {
       this.adapter.fly();
   };

   return TurkeyAdapter;
   }
)();

senateSystem = new TurkeyAdapter(Turkey);
senateSystem.quack();
```

<br/>
<br/>

## 참고

- [jusungpark_티스토리](http://jusungpark.tistory.com/22)
- [제로초_adapter](https://www.zerocho.com/category/JavaScript/post/57babe9f5abe0c17006fe230)



