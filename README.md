# NodeJS

## (macOS) brew install LTS

```bash
  brew install node@18
  brew unlink node
  brew link --overwrite node@18
  echo 'export PATH="/opt/homebrew/opt/node@18/bin:$PATH"' >> ~/.zshrc

```

- How NodeJS differs from Vanilla JS
  1. Node runs on a server - not in a brwser (backend not frontend)
  2. The console is the terminal window (node, CTRL + D)
  3. Global object instead of window object. `console.log(global)`
     1. console.log(global)
  4. Has Common Core Modules
  5. CommonJS modules instead of ES6 modules
  6. Missing some JS APIs like fetch

```bash
  const os = require('os');
  console.log(os.type());
  console.log(os.version());
  console.log(os.homedir());
  const path = require('path');
  console.log(__dirname);
  console.log(__filename);
```

## npm

```bash
  npm install -g npm
  npm init -y

  npm install `<module>` # 설치
  npm uninstall `<module>` # 삭제
```

## npm : node package manager

package.json : 패키지에 대한 개요
package-lock : 패키지에 대한 상세 내용
node_modules : 모듈 저장소

## - Cross-Origin (교차 출처) : 프로토콜, 도메인, 포트번호 가 다른 경우

## - Origin (출처) : &emsp; `Protocol + Host + Port`

- URL e.g. `https://www.exdomain.com:5000/getUser?id=24#top`
  - `Protocol` : 스키마 (Scheme) -> `https`
  - `Host` : 도메인 (Domain) -> `www.exdomain.com`
  - `Port` : 포트번호 (Port Number) -> `5000`
  - Path : 라우팅 경로 (Rounting) -> `getUser`
  - Query string : 요청 key, value pair string -> `id=24`
  - Fragment : 해시 태그 (Hash tab) -> `#top`

## 동일 출처 정책 (`SOP`, Same-Orgin Policy)

- 동일한 출처에서만 리소스를 공유할 수 있다는 정책.
- 동일한 서버에 있는 리소스는 자유롭게 가져올 수 있지만 다른 출처(Cross-Orgin) 서버의 리소스는 접근할 수 없는 정책
- 출처 비교는 브라우저에서 함, 즉 서버에서는 정상적으로 응답을 하고 브라우저에서 차단함
- 브라우저에서 SOP 정책을 비활성화 하는 방법이 있으나 권장하지 않음

## 교차 출저 리소스 공유 (`CORS`, Cross-Origin Resource Sharing)

- 다른 출처의 리소스 공유에 대한 허용 또는 비허용 하는 정책
- SOP 정책을 위반해도 CORS 정책을 준수 하면 다른 출처의 리소스라도 허용하는 정책

 1. 클라이언트 : 브라우저의 HTTP 요청 헤더에 Origin 을 담아 전달
 2. 서버 : 응답 헤더에 Access-Control-Allow-Origin 필드 추가 후 `허용된 출처 URL` 을 응답함
 3. 클라이언트 확인 : `Origin` 과 `Access-Contorl-Allow-Origin` 을 동일 여부 비교

- 서버에서 `Access-Control-Allow-Origin` 헤더에 허용할 출처를 기재하여 클라이언트에 응답하면 됨
- 서버 개발자 (API, Backend)가 처리 해주면됨
