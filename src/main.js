// @ts-check
import fs from "node:fs";
import path from "node:path";
import Mustache from "mustache";

/** Node.js 실행될 때 경로 */
const dirname = path.resolve();

/** 파일 시스템 절대 경로 반환 **/
const getPath = (...args) => path.join(dirname, ...args);

const settings = [
  { lang: "en-us", data: "data.en.json", result: "/en-us/index.html" },
  { lang: "ko-kr", data: "data.ko.json", result: "/ko-kr/index.html" },
  // ...다른 언어 계속 추가 예정이라고 가정
];

const DIST = "dist";
const SRC = "src";
const PUBLIC = "public";

// dist 폴더가 있다면 삭제
if (fs.existsSync(getPath(DIST))) {
  fs.rmSync(getPath(DIST), { recursive: true, force: true });
}

try {
  for (const item of settings) {
    // dist 언어별로 폴더를 만들어놔야, 나중에 파일을 경로별로 저장할 때 에러가 안남
    fs.mkdirSync(getPath(DIST, item.lang), { recursive: true });
  }
} catch {} // 에러나면 무시

// Mustache 템플릿 파일을 읽어 스트링으로 변환
const templateFile = "index.template.html";
const template = fs.readFileSync(getPath(PUBLIC, templateFile)).toString();

// 언어별로 반복
for (const item of settings) {
  // JSON 파일을 읽어 binary => string으로 변환
  const rawData = fs.readFileSync(getPath(SRC, item.data)).toString();

  // string을 JS object 로 변환
  const context = JSON.parse(rawData);

  // SEE: https://github.com/janl/mustache.js/
  // Mustache 템플릿 함수를 이용하여 템플릿 스트링에서 context를 치환하여 html 스트링 생성
  const rendered = Mustache.render(template, context);

  // 결과물을 파일로 저장
  fs.writeFileSync(getPath(DIST, item.result), rendered);

  // public 폴더의 언어별 폴더를 dist 폴더에 복사
  fs.cpSync(getPath(PUBLIC, item.lang), getPath(DIST, item.lang), {
    recursive: true,
  });
}

console.log("Completed! Check out `dist` folder");
