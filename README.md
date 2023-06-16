# Static Site Generation 샘플

Static Website를 만들어보자.

하나의 템플릿에서 언어별 데이터를 읽어 여러개의 사이트를 생성한다.

1. 템플릿 파일을 읽는다.
1. JSON 파일을 읽는다.
1. JSON 데이터를 템플릿 파일과 결합하여 HTML 파일로 저장한다.
1. 웹서버에 배포하면 끝

## URL

- https://oliverne.github.io/simple-ssg-example/en-us/index.html
- https://oliverne.github.io/simple-ssg-example/ko-kr/index.html

## 준비물

- Node.js v18 이상

## 개발

1. 소스 체크아웃
1. `npm install`
1. `npm run build`
1. `dist` 폴더를 웹서버에 배포

`src/main.js`를 읽어보자.

---

## JS 모듈

이 소스는 ES Module을 사용한다. `package.json`에 `"type": "module"`로 설정되어 있음.

- [ESM, CommonJS 차이](https://velog.io/@kakasoo/ESM%EA%B3%BC-CommonJS%EC%9D%98-%EC%B0%A8%EC%9D%B4)

### Template

[JS 템플릿의 간단한 원리](https://medium.com/wdstack/understanding-javascript-micro-templating-f37a37b3b40e)를 봐봤자 이해가 잘안되면 그냥 수많은 라이브러리가 있으니 [Mustache](https://github.com/janl/mustache.js/)를 사용해보자.
`npm install mustache`로 설치하자.
