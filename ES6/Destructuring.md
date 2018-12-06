# [ES6] Destructuring

간략하게 말하면 `분해문법` 이다.
<br/>

`iterable` 한 배열이나 객체를 분해를 해서 선언한 변수에 각각 넣어주는 것이라고 생각하면 쉬울 것이다.
<br/>

> 구조 분해 할당(destructuring assignment) 구문은 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 자바스크립트 표현식(expression)입니다.
> *출처 : MDN
<br/>

:point_right: 크게 구조 분해 할당은 **배열의 분해**와 **객체의 분해**로 볼 수 있다.
<br/>
<br/>

## 배열의 구조 분해 할당 

### Destructuring assignmentconst 

```js
[first, last] = ['Nikola', 'Tesla']

console.log(first); // "Nikola"
console.log(last); // "Tesla"

var foo = ["one", "two", "three"];
var [one, two, three] = foo;

console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
```
<br/>
<br/>

### Default values

```js
var foo = ["one", "two"];
var [one = 1, two = 2, three = 3] = foo;

console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "3"

```
<br/>
<br/>

### Loops

```js
var people = [  
    {    
        name: "Mike Smith",    
        family: {      
            mother: "Jane Smith",      
            father: "Harry Smith",      
            sister: "Samantha Smith"    
        },    
        age: 35  
    },  
    {    
        name: "Tom Jones",    
        family: {      
            mother: "Norah Jones",      
                father: "Richard Jones",      
            brother: "Howard Jones"    
        },    
        age: 25  
    }
];

for (var {name: n, family: { father: f } } of people) {
  console.log("Name: " + n + ", Father: " + f);}

// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"
```   
<br/>
<br/>

### 함수에서 반환된 배열 파싱

```js
function f() {
  return [1, 2];}

var a, b;
[a, b] = f();

console.log(a); // 1
console.log(b); // 2
```
<br/>
<br/>

### 일부반환값 무시하기

```js
function f() {
  return [1, 2, 3];}

var [a, , b] = f();

console.log(a); // 1
console.log(b); // 3
```
<br/>
<br/>

### 변수에 배열의 나머지를 반환 하기

추가적으로 들어갈 내용으로 `Spread`를 사용해서 `rest`를 구분하는 것이다. 기존에는 1개를 할당했다면 이것은 `list`로 할당을 한다.

```js
var [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]
```
<br/>
<br/>

## 객체의 구조 분해 할당 

객체도 똑같다 객체도 결국 `Iterable`함으로 이렇게 할 수있다.

```js
var o = {p: 42, q: true};
var {p, q} = o;

console.log(p); // 42
console.log(q); // true
```
<br/>
<br/>

### 선언 없는 할당

```js
var a, b;

({a, b} = {a: 1, b: 2});
```
<br/>
<br/>

### Reassigning keys

```js
var o = {p: 42, q: true};
var {p: foo, q: bar} = o;

console.log(foo); // 42
console.log(bar); // true
```
<br/>
<br/>

### Default values

```js
var {a = 10, b = 5} = {a: 3};

console.log(a); // 3
console.log(b); // 5
```
<br/>
<br/>

### Reassigning keys + Default values 

```js
var {a:aa = 10, b:bb = 5} = {a: 3};

console.log(aa); // 3
console.log(bb); // 5
```
<br/>
<br/>

### Object destructuring

```js
function drawES2015Chart({size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {}) {
  console.log(size, cords, radius);
  // 차트 그리기 수행
}

drawES2015Chart({
  cords: { x: 18, y: 30 },
  radius: 30});
//big {x: 18, y: 30} 30
```