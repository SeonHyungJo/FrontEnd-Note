# TabIndex에 대해서

우리가 잘 알지 못했던 **TabIndex**에 대해서 자세하게 알아보는 시간이 되려고 한다.
<br/>

기본적인 브라우저에 따라 작동이 다를 수 있다.
<br/>

지금 제가 하는 모든 기준은 **Chrome을 대상으로 합니다.**
<br/>

**TabIndex는 이름에서도 알 수 있듯이 Tab의 순서를 적어놓은 속성이다.**
<br/>

흔히 우리가 접근성에 대해서 할 때 Tab으로 이동할 수 있도록 지원하게 하는 기능이라고 생각하면 이해가 잘 될 것으로 생각이 된다.
<br/>

index는 크게 3개로 구분이 가능하다.
<br/>

## index > 0

우리가 순서를 정할때 많이 사용하는 방법으로 생각이 된다. 내가 선택한 것을 기준으로 다음의 숫자가 다음에 Focus가 가게된다.
<br/>

즉 1, 3, 2 를 속성으로 지정을 했다면 당연히 왼쪽, 오른쪽, 가운데 순서로 포커스가 가는 것이다.
<br/>

## index == 0

0이라 함은 결국 순서가 없다는 뜻이 될 수도 있지만 Native에서 브라우저는 0으로 지정이 된 Element들은 Dom 순서에 따라서 포커스가 간다. 만약 0보다 큰 Element가 있다면 그 순서를 모두 지나고 나서 0인 Element중에서 Dom상 제일 위에 있는 것에 포커스가 가고 순서대로 0인 Element를 지나게 된다.
<br/>

## index == -1

-1은 생각보다 간단하다. 포커스를 안준다는 것이다.
<br/>

# 예제

```html
    <html>
    	<body>
    		<input style="
    		    width: 100px;
    		    height: 100px;
    		    border: 1px solid black;
    		" tabindex="0">
    		<input style="
    		    width: 100px;
    		    height: 100px;
    		    border: 1px solid black;
    		" tabindex="2">
    		<input style="
    		    width: 100px;
    		    height: 100px;
    		    border: 1px solid black;
    		" tabindex="1">
    		<input style="
    		    width: 100px;
    		    height: 100px;
    		    border: 1px solid black;
    		" tabindex="-1">
    	</body>
    </html>
```

위에 예제가 있다면 순서는 어떻게 될까??
<br/>

정답은 **세번째, 두번째, 첫번째** 이다.
<br/>

풀이를 하자면 위에서 말했듯이 0보다 큰 거가 우선이 된다. 그렇다면 숫자에 따라 tabindex가 1인 것이 첫번째 이고 2가 두번째 이다. 그리고 0보다 큰 것이 끝났다면, 0인 것을 타게 되고 나머지는 -1임으로 타지 않고 끝나게 된다.