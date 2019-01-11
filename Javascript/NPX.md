# NPX

`npm 5.2.0` 이후 버전을 설치하면 `npx` 라는 새로운 바이너리가 같이 설치가 된다.
<br/>

`npx` 는 `npm` 의 패키지 사용에 약간의 편안함?을 준다.
<br/>

## `npm` 실행스크립트 없이 로컬로 설치된 도구 사용

```terminal
// 일반적인 개발 의존성 주입
npm i -D cowsay

// npx를 이용한 임시 사용
npx cowsay hello!
```

최근에 사용자들이 `global` 로 패키지를 설치하는 대신 `devDepenency` 에 도구를 설치하는 방향으로 이동하였고 요즘 대개 이렇게 사용한다.
<br/>

`global`로 설치되었던 `mocha, grunt, gulp` 및 `bower` 와 같은 도구 역시 프로젝트 별로 관리가 가능하다.
<br/>

## 일회성 명령실행

```terminal
which create-react-app
create-react-app not found.

npx create-react-app my-cool-new-app
```

`npx <command>` 를 실행하면 `$PATH` 에없는 경우 `npm` 레지스트리에서 해당 이름의 패키지를 자동으로 설치하고 호출을 한다.
<br/>

설치가 완료되면 설치 패키지가 전역에 있지 않으므로 장기적으로 오염에 대해 걱정할 필요가 없게되는 것이다.
<br/>

## 다른 Node.js 버전으로 명령 실행

```terminal
npx node@6 -v //v6.11.1

npx -p node@7 -- node -v //v7.10.1

node -v // 현재 버전
```

`npm` 레지스트리에 `node` 라는 패키지가 있다.
<br/>

즉, `nvm, nave` 또는 `n`과 같은 버전 관리자를 사용하지 않고도 다른 `node.js`버전을 사용하여 `node` 명령을 내릴 수 있게 되는 것이다.
<br/>

`npx`의 `-p` 옵션을 사용하면 설치하고 실행중인 `$ PATH` 에 추가 할 패키지를 지정할 수 있으므로 다음과 같은 재미있는 일을 할 수 있습니다.
<br/>

`node@6`를 전역으로 실행하는 것처럼 `npx -p node@6 npm it` 를 실행하여 현재 `npm` 패키지를 설치하고 테스트할수 있습니다.

---

#### Referece

- [npx](https://steemit.com/kr/@shimdh/npx)
- [introducing-npx-an-npm-package-runner](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)