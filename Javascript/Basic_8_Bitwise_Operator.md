# Bitwise Operator

우리가 흔히 AND를 표현할 때 `&&` 를 사용하며 OR을 표현할때 `||` 를 사용한다. 왜 두 개씩 사용해서 표현을 하는 것일까? 하나로는 표현이 안되는 것인가? 

이유는 한 개를 사용하는 `&`, `|`는 비트연산자에서 사용이 되고 있기 때문이다.
<br/>

## Bits(비트)란?

비트는 숫자나 문자 또는 문자열과 함께 작동하지 않으며 이진 숫자만 사용한다. 쉽게 말하면 모든 것이 이진 형식으로 저장된다. 저장된 이진형식은 컴퓨터에서 **UTF-8**과 같은 인코딩을 사용하여 저장된 비트 조합을 문자, 숫자 또는 다른 기호에 Mapping한다.

당연히 가지고 있는 비트가 많을수록 더 많은 순열과 더 많은 것을 표현할 수 있다.

자바스크립트에서 우리가 비트를 얻는 방법은 간단하다. 가령 숫자 하나가 있다면 `(Number).toString(2)` 를 하게 되면 얻어오게 된다. 자바스크립트에서 바이너리를 직접 입력 할 수 있는 방법이 없다 이진수를 10진수로 변환하려면 `parseInt(111,2)` 를 해야한다.

 > [parseInt - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

<br/>

## Bitwise Operator(비트연산자)란?

비트 수준에서 변수와 상호 작용하는 방법이다. 비트는 부동소수점, 정수로 변환되므로 정보를 쉽게 소화가능하다. 속도와 효율성을 중요시한다면 비트로 직접 처리, 변환하는 것이 유용하다.

비트 연산자(AND, OR, XOR)는 일반 논리연산자와 비슷하게 동작한다. 비트 수준에서는 일반적으로 논리를 해석하는 방식이 아니라 비트 수준에서 평가를 한다.

비트 연산자를 사용하면 어떤 이점이 있을까? 비트 수준에서의 평가는 일반적인 논리연산자보다 빠르기 때문에 큰 샘플에 대한 평가 또는 반복은 비트 연산이 더욱 효율적이다.
<br/>

## & (AND)

`&&` 논리 연산자와 매우 비슷하다. **비교되는 비트가 둘 다 1인 경우 1을 반환한다.** 가령 12와 15가 있다면 각각 `1100`과 `1111` 이다. 그것을 `&`연산자를 사용한다면 `1100`을 얻는다. 결과는 12가 나오게 된다.

하나의 **Trick(트릭)으로 숫자가 짝수인지 홀수인지를 알아낼 수 있다.** 숫자가 홀수인 경우 첫번째 비트는 항상 1이다. 따라서 `&`를 사용하여 1과 비교할 수 있다. 그러나 실제로는 사용하지 않는 것을 추천한다.
<br/>

## | (OR)

`||` 논리 연산자와 매우 비슷하다. **비교되는 비트가 모두 0이거나 0과 1이 하나씩 있을 경우 1을 반환한다.** 비트별로 이진수를 비교하는데 사용이 된다. 예제에 `|`연산자를 사용하면 15가 반환된다.

`1100 | 1111`는 비교를 하면 각각에 대해 1를 반환하여 15이 된다.
<br/>

## ~ (NOT)

모든 비트를 1은 0으로 0은 1로 바꾼다. 즉 무엇이든 반대로 되돌린다는 것이다. 그런데 `~15` 를 하게 되면 이상하게 결과가 `-16`이 나오게 된다. 이유는 **2의 보수연산**에서 숫자의 음수 표현을 얻으려면 먼저 비트를 뒤집어서 1을 더해야 하기 때문이다.
<br/>

## ^ (XOR)

이 연산자는 XOR 연산자 또는 배타적 OR연산자라고 불린다. `&`과 `|` 같은 연산자는 양측의 숫자를 가져와서 비교하는 방식으로 이 연산자와는 차별화된다. 해당 비트를 비교하여 하나의 1이 있을 때만 1을 반환한다. 즉, `1 ^ 0` 은 1을 반환하지만 `1 ^ 1`은 0을 반환한다.
<br/>

## Shifting operators

Shifting 비트(`<<`, `>>`)를 다루는 두 개의 연산자가 있다. 추측할 수 있듯이 차이점은 숫자의 비트를 이동시킨다는 것이다.

- `<<` : 숫자의 모든 비트를 왼쪽으로 n번 이동한다. **이동을 할 때 발생하는 빈 공간은 0으로 채워진다.**
- `>>` : 숫자의 모든 비트를 오른쪽으로 n번 이동한다. **이 연산자는 양수 비트를 0으로 채우고 음수 비트를 1로 채운다.**

보통 숫자의 첫 번째 비트가 기호를 나타내는데 사용이 된다. 1이면 음수 0이면 양수이다. 따라서 오른쪽 이동에서 위에 있는 추론은 우리가 이동하는 숫자의 부호를 유지하려고 저런식으로 작동하는 것이다.
<br/>

## Bit manipulation

이제 연산자가 하는 일을 알았으니 비트를 조작하기 위해 연산자를 활용하는 방법을 살펴보자.
<br/>

### 마스킹(Masking)

**마스킹이라는 것은 단순하게 간단한 문자열을 보내고 다른 숫자를 할당하여 플래그를 나타내는 방법이다.** 일련의 예 또는 아니오 질문을 신속하게 요청하는 방법이다. 

우리가 웹사이트를 가지고 있고 4개의 Flag가 있다고 가정을 해보자

1. A : 유저권한인가?
2. B : 올바른 지역에 있나?
3. C : 아이스크림을 먹을 수 있나?
4. D : 로봇인가?

이렇게 4개의 Flag가 있다고 생각하면 4자리의 이진문자열로 표현해서 보낼 수 있다.

`0000 = DCBA`

어떤 위치에 1을 넣으면 플래그를 변경할 수 있다.

- *1000 (binary) = Flag D = 8 (integer)*
- *0100 (binary) = Flag C = 4 (integer)*
- *0010 (binary) = Flag B = 2 (integer)*
- *0001 (binary) = Flag A = 1 (integer)*

이렇게 되면 한 번에 2가지 이상의 Flag의 변경이 가능하다.

- *1010 (binary) = Flag D and Flag B = 10 (integer)*
- *0111 (binary) = Flag C, B and A = 7 (integer)*

```javascript
function changeFlag(binary){
    const flagD = 8
    const flagC = 4
    const flagB = 2
    const flagA = 1
    let flags = []
    
    if(binary & flagD){
        flags.push("Change flagD")
    }
    if(binary & flagC){
        flags.push("Change flagC")
    }
    if(binary & flagB){
        flags.push("Change flagB")
    }
    if(binary & flagA){
        flags.push("Change flagA")
    }
    return flags
}

// 최대는 15
changeFlag(8)
changeFlag(11)
changeFlag(1)
changeFlag(15)
```

<br/>

## Cheat Sheet

> [이미지로 확인하기](https://cdn-images-1.medium.com/max/1600/1*6jimeIdYjNXn8oGKW0TMew.png)

| Operator | Usage | Description |
|----------|-------|-------------|
| Bitwise AND | a & b | 왼쪽 피연산자와 오른쪽 피연산자의 비트가 모두 1 인 경우 1을 반환한다.|
| Bitwise OR | a \| b | 왼쪽 또는 오른쪽 피연산자의 비트가 하나인 경우 각 비트에서 하나를 반환한다.|
| Bitwise XOR | a ^ b | 왼쪽 피연산자와 오른쪽 피연산자 둘 다 아닌 경우 비트 위치의 1을 반환한다.|
| Bitwise NOT | ~a | 피연산자의 비트를 뒤집는다. |
| Left shift | a << b | a를 이진수 표현 b 비트를 왼쪽으로 shift하고 오른쪽에 0을 shift한다.|
| Sign-propagating right shift | a >> b | a를 이진수로 b 비트를 오른쪽으로 shift하고, 오른쪽으로 나온 비트를 제거한다.|
| Zero-fill right shift | a >>> b | a를 이진수로 b 비트를 오른쪽으로 shift하고, shift off 한 비트를 버리고, 왼쪽에서 0을 shift한다.|

<br/>

#### Reference

- [Programming with JS: Bitwise Operations](https://hackernoon.com/programming-with-js-bitwise-operations-393eb0745dc4)
- [JavaScript: Bitwise Operators](https://www.w3resource.com/javascript/operators/bitwise-operator.php)
- [Using JavaScript’s Bitwise Operators in Real Life](https://codeburst.io/using-javascript-bitwise-operators-in-real-life-f551a731ff5)
- [Bitwise Operators in Javascript](https://medium.com/bother7-blog/bitwise-operators-in-javascript-65c4c69be0d3)
- [A Comprehensive Primer on Binary Computation and Bitwise Operators in Javascript](https://medium.com/techtrument/a-comprehensive-primer-on-binary-computation-and-bitwise-operators-in-javascript-81acf8341f04)