# Stream

## 스트림이란 무엇인가?

스트림은 배열이나 문자열과 같은 데이터 컬렉션이다. 스트림이 어려운 것은 한 번에 모든 데이터를 얻을 수 없다는 점이다. 스트림의 이러한 점은 엄청 큰 데이터를 다룰 때나, 외부 소스로부터 데이터를 한 번에 한 청크(chunk)씩 가져올 때 힘을 발휘한다.

스트림은 큰 데이터만 다루는 것이 아니다. 코드를 조합할 수 있도록 해준다. 

리눅스 명령어를 다른 작은 명령어들과 파이핑(piping)을 하여 구성할 수 있는 것처럼, 노드 스트림에서도 똑같이 할 수 있다.

```bash
grep -R exports * | wc -l
```

```js
const grep = ... // grep 출력을 위한 스트림
const wc = ... // wc 입력을 위한 스트림
    
grep.pipe(wc)
```

스트림은 Node.js에서 데이터 스트리밍 작업을 위한 추상적인 인터페이스이다. 스트림 모듈은 스트림 인터페이스를 구현하는 객체를 쉽게 만들 수 있는 기본 API를 제공한다.

Node.js에서는 많은 스트림 객체를 지원한다.

스트림은 읽거나 쓸 수 있으며, 모든 스트림 객체는 EventEmitter의 인스턴스이다.

![image](https://user-images.githubusercontent.com/24274424/63164865-bf48e980-c064-11e9-8c42-41b7e083d035.png)

위의 있는 목록은 읽기 가능하거나 쓰기 가능한 스트림인 네이티브 노드 객체들이다. 

## Node Stream

Node.js에서 스트림의 타입은 총 4가지가 있다.

- Writable : 데이터를 작성할 수 있는 스트림. ex) `fs.createWriteStream()`
- Readable : 데이터를 읽어들일 수 있는 스트림. ex) `fs.createReadStream()`
- Duplex : 데이터의 읽기(Readable)과 쓰기(Writable) 모두 가능한 스트림. (ex `net.Socket`)
- Transform : Duplex 스트림은 수정하거나 변환이 가능. ex) `zlib.createDeflate()`

## Writeable Stream

### Event

- **close** : 스트림이 닫힌 경우 발생하는 이벤트. 그 후의 이벤트는 발생하지 않는다.
- **drain** : writable stream이 추가로 데이터 쓰기 작업이 가능한 경우 발생하는 이벤트.
- **error** : 쓰기 작업이나 파이핑 데이터가 오류가 생긴 경우 발생하는 이벤트.
- **finish** : `stream.end()`(모든 데이터가 `flush()`)후에 발생하는 이벤트.
- **pipe** : 읽기 스트림이 쓰기 스트림을 목적지로 감쌀 경우 발생하는 이벤트. ex) `reader.pipe(writer)`
- **unpipe** : 읽기 스트림이 쓰기 스트림을 `unpipe`하는 경우 발생하는 이벤트. ex) `reader.unpipe(wirter)`

### Method

- `writable.cork()` : 데이터를 버퍼에 강제로 저장한다. `uncork()`이나 `.end()`의 경우 flush 된다.
- `writable.destroy([error])` : 스트림을 제거하고 error와 close 이벤트를 발생시킨다.
- `writable.end([chunk][, encoding][, callback])` : writable의 종료를 알린다.
- `writable.setDefaultEncoding` : Default 인코딩을 설정해준다.
- `writable.uncork()` : 버퍼에 담긴 데이터를 flush시킨다.
- `writable.writable` : `boolean` 타입으로 `true`나 `false`가 나온다.
- `writable.writableLength` : 길이가 나온다.
- `writable.write(chunk[, encoding][,callback])`

## Readable Stream

### Event
- **close** : 모든 readable 스트림이 colse 이벤트를 가지고 있는것은 아니며 스트림이나 스트림 내부의 리소스가 종료되었을 때 발생하는 이벤트.
- **data** : 스트림에서 데이터를 소비자로 전달해줄 때 마다, 발생하는 이벤트.
- **end** : 스트림에 더이상 소모할 데이터가 남아있지 않은 경우 발생하는 이벤트.
- **error** : Readable이 실행되는 시간에 내부적으로 스트림을 생성할 수 없거나 유효하지 않은 청크(chunk)를 읽어들일 때 발생하는 이벤트. callback은 Error 객체를 반환한다.
- **readable** : readable 스트림으로 읽어들일 수 있는 데이터가 있을 때 발생하는 이벤트. readable 이벤트에 대한 리스너를 연결하면 일부 데이터를 내부 버퍼로도 읽어들일 수 있다. 데이터의 끝에서 readable 이벤트가 발생한 후에 end 이벤트도 발생한다.

### Method

- `readable.destroy([error])`
- `readable.pause()` :redable 객체를 pause 상태로 만든다.
- `readable.pipe(destination[, options])` : writable과 바로 연결시킨다.
- `readable.read([size])` : Returns: `<string> | <buffer> | <null> | <any>`
- `readable.readable` : boolean 타입으로 `true` 나 `false`이 나온다.
- `readable.readableHighWaterMark` : readable에 등록된 `highWaterMark`를 반환한다. `return Number`
- `redable.redableLength` : 프로퍼티가 가지고 있는 바이트의 수를 반환한다.
- `readable.resume()` : pause 모드에서 flowing 모드로 변환 시켜준다.
- `readable.setEncoding(encoding)` : 초기 인코딩을 설정해준다.
- `readable.unpipe([destination])`
- `redable.unshift(chunk)` : 받아온 데이터를 다시 내부 버퍼로 이동하는 작업을 실행한다. 데이터의 일부를 다른 곳으로 넘겨주기 위해서 사용한다.


> 다음 내용에서 추가적으로 Duplex와 Transform에 대해서 알아보겠습니다.

## 큰 데이터로 해보는 예제

1. 먼저 100,000 라인이 되는 데이터를 만든다.

```js
// Node Create Big File
// createBigFile.js 
const fs = require('fs');
const file = fs.createWriteStream('./big.file');

for(let i=0; i<= 1e6; i++) {
  file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n');
}

file.end();
```

```bash
node createBigFile.js
```

![image](https://user-images.githubusercontent.com/24274424/63166141-7430d580-c068-11e9-9938-cccb74d61e89.png)

> 생각보다 VSCode가 좋다. 10만 라인을 죽지 않고 보여주는 것을 보면

2. 먼저 `fs.readFile()` 를 사용해서 데이터를 읽어보자

```js
// readBigFile.js
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  fs.readFile('./big.file', (err, data) => {
    if (err) throw err;

    res.end(data);
  });
});

server.listen(8000);
```

```bash
node readBigFile.js
```

서버를 올려서 테스트를 해보자.

![readBigFile](https://user-images.githubusercontent.com/24274424/63166774-52385280-c06a-11e9-9504-f977ac4f8eeb.gif)


초기 서버를 올렸을 때는 7.8MB 였으나 435MB로 치솟는 것을 볼 수 있다.

3. Stream `fs.createReadStream()` 를 사용해서 데이터를 읽어보자

```js
// readBigFileStream.js
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  const src = fs.createReadStream('./big.file');
  src.pipe(res);
});

server.listen(8000);
```

```bash
node readBigFileStream.js
```

서버를 올려서 테스트를 해보자.

![readBigFileStream](https://user-images.githubusercontent.com/24274424/63167220-9415c880-c06b-11e9-9912-f6a701ce53b2.gif)

초기 서버를 올렸을 때는 8.2MB 였으나 15MB로 낮게 오르는 것을 볼 수 있다.

---

#### Reference

- [Node.js Stream 당신이 알아야할 모든 것](https://github.com/FEDevelopers/tech.description/wiki/Node.js-Stream-%EB%8B%B9%EC%8B%A0%EC%9D%B4-%EC%95%8C%EC%95%84%EC%95%BC%ED%95%A0-%EB%AA%A8%EB%93%A0-%EA%B2%83)