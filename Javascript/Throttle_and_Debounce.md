# Throttle and Debounce

## 공통점

간단하게 함수를 호출할 때 호출이 너무 많이되어 과부화가 되는 것을 방지하기 위한 방법다. :boom:
</br>

함수 호출이 잦은 것으로 예는  :point_right: 브라우저의 이벤트가 있다.
</br>

`onScroll` 이나 `onChange` 와 같은 이벤트의 콜백으로 함수를 호출하는 경우 굉장히 많은 호출이 발생할 수 있다.
</br>
</br>

## :triumph:

`infinite scroll` 이나 `자동완성` 기능의 경우 사용자의 특정 이벤트에 따라 비동기 콜백을 호출하는 방식이다.
</br>

Scroll의 경우 미세하게 움직는 것조차 여러번의 이벤트가 발생하며, 더욱이 계속해서 움직이게 되면 몇번의 이벤트가 가는지 셀 수 조차 없다.
</br>

자동완성 역시 글자를 입력할 때마다 비동기로 리스트를 가져오게 되면 엄청난 이벤트가 발생하게 된다.
</br>

많은 호출을 제어하지 않으면 브라우저가 버티지 못할 것이다. 이때 사용하는것이 `Throttle`과 `Debounce`이다.
</br>
</br>

## 차이점

### **Throttle**

`Throttle` 은 정해진 시간동안 특정 행위를 한번만 호출할 수 있도록 하는 것이다.
</br>

예를 들어 스크롤 행위가 1 초에 500 번이 발생한다면 이를 0.2 초에 한번만 실행하게 만들 수 있다.
</br>

`Throttle` 처리가 되지 않은 경우 콜백이 500 번 발생한다. 하지만 `Throttle` 처리가 된다면 5 번만 실행되게 만드는 기술이다.
</br>

생각보다 스크롤 이벤트의 경우 작은 움직임에도 엄청나게 많은 이벤트가 발생한다.
</br>

따라서 **1 초 미만으로 쓰로틀링을 하여 같은 동작의 여러번 호출을 1 번으로 제어하는 것이 좋겠다.**

```js
debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArguments(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
};
```

</br>
</br>

### **Debounce**

`Debounce` 는 한 행위를 여러번 반복하는 경우 **마지막 행위 이후 일정시간이 흐른 뒤 콜백을 호출하는 방식이다.**
</br>

자동완성 즉 `autocomplete` 를 떠올리면 편하다.
</br>

자동완성을 구현해본다고 생각하자.
</br>

`input` 의 `onChange`가 일어나면 `callback` 으로 `AJAX` 를 이용해 관련 데이터를 긁어온다. 그런데 사용자의 모든 입력에 `AJAX` 호출을 한다면 브라우저가 견디지 못할 것이다.
</br>

일정시간동안 `Timer` 를 만듭니다. 이 타이머의 시간동안 입력이 반복되면 `Timer` 를 초기화합니다. 입력이 멈추어 `Timer` 가 다 되면 `AJAX` 를 호출합니다.
</br>

이를 가장 쉽게 눈으로 볼 수 있게 만든 곳이 아래입니다.
[CSS-Tricks 의 Throttling 과 Debouncing](https://css-tricks.com/debouncing-throttling-explained-examples/)
</br>

`Throttling` 과 `Debouncing` 은 실제로 개발 시 자주 사용되는 기술입니다. 따라서 좋은 라이브러리가 만들어져 있습니다. [Lodash](https://lodash.com/) 와 [Underscore](https://underscorejs.org/) 입니다.

```js
throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
};
```

</br>
</br>

## 참고

- [CSS-Tricks 의 Throttling 과 Debouncing](https://css-tricks.com/debouncing-throttling-explained-examples/)
- [Lodash](https://lodash.com/)
- [Underscore](https://underscorejs.org/)
