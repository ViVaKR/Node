# WebSoket

```bash

# Create Client (Scaffolding)
npm create vite@latest client -- --template react
cd client
npm i
npm i react-use-websocket lodash.throttle perfect-cursors

npm i react-use-websocket
```

#### eslint.config.js

turn off prop-types

```json
      {
        'react/prop-types': 'off',
      }
```

#### Self SSL Settings

```bash
openssl req -nodes -new -x509 -keyout server.key -out server.cert

```

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.cert')),
    },
  },
});
```

#### NginX 설정

```
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

````

#### 인증서와 키 생성 옵션

`openssl req -nodes -new -x509 -keyout server.key -out server.cert`

-  openssl : OpenSSL 명령어를 실행합니다.
- req : 인증서 요청을 생성합니다.
- -nodes : 개인 키를 암호화하지 않습니다.
- -new : 새로운 인증서 요청을 생성합니다.
-  -x509 : CSR 대신 자체 서명된 X.509 인증서를 생성합니다. 이것은 인증서 요청을 생성하는 것이 아니라 인증서를 생성합니다. 일반적으로 테스트 목적으로 사용됩니다. 실제로 사용하려면 인증 기관에서 인증서를 구입해야 합니다. 즉, CSR 을 생성한 후 CA 에 제출하여 서명된 인증서를 받지만, 이 옵션을 사용하면 자체 서명된 인증서를 생성합니다션
- -keyout server.key : 개인 키를 server.key 파일에 저장합니다.
- -out server.cert : 인증서를 server.cert 파일에 저장합니다.

#### 프로토콜 계층

- --> HTTPS (HTTP + SSL/TLS) : HTTP 프로토콜을 이용하여 통신하는데, 이때 SSL/TLS 프로토콜을 사용하여 통신을 암호화하는 방식, 요청 - 응답 모델을 사용하여 통신

- --> SSL/TLS : 웹 서버와 브라우저 사이의 통신을 암호화하는 프로토콜

- --> WSS: WebSocket + SSL/TLS, 웹 소켓을 사용하여 통신하는데, 이때 SSL/TLS 프로토콜을 사용하여 통신을 암호화하는 방식, 지속적인 연결을 유지 하며, 양방향 통신을 지원하는 프로토양

#### HTTPS vs WSS

[ HTTPS ]
1. 클라이언트가 서버에 연결을 요청합니다.
2. 서버는 서버 인증서를 클라이언트에게 전달합니다.
3. 클라이언트는 서버 인증서를 확인합니다.
4. 클라이언트는 서버 인증서를 사용하여 세션 키를 생성합니다.
5. 클라이언트는 세션 키를 서버의 공개키로 암호화하여 서버에게 전달합니다.
6. 서버는 세션 키를 자신의 개인키로 복호화합니다.
7. 서버와 클라이언트는 세션 키를 사용하여 통신을 암호화합니다.
- 각 요청마다 새로운 연결을 설정하거나, 기존 연결을 재사용할 수 있습니다.

[ WSS ]
1. 클라이언트가 서버에 연결을 요청합니다.
2. 서버는 서버 인증서를 클라이언트에게 전달합니다.
3. 클라이언트는 서버 인증서를 확인합니다.
4. 클라이언트는 서버 인증서를 사용하여 세션 키를 생성합니다.
5. 클라이언트는 세션 키를 서버의 공개키로 암호화하여 서버에게 전달합니다.
6. 서버는 세션 키를 자신의 개인키로 복호화합니다.
7. 서버와 클라이언트는 세션 키를 사용하여 통신을 암호화합니다.
- 지속적인 연결을 유지하며, 양방향 통신을 지원합니다.

요약:
HTTPS 는 웹페이지와 API 요청을 보호하는데 사용되는 보안 프로토콜입니다.
WSS 는 실시간 양방향 통신을 보호하는데 사용되는 프로토콜이며
     웹 소켓을 사용하여 통신하는데, 이때 SSL/TLS 프로토콜을 사용하여 통신을 암호화하는 방식입니다.
