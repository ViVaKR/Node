# 베이스 이미지로 Node.js 사용
FROM node:latest AS builder

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 설치를 위해 package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# 애플리케이션 포트 설정
EXPOSE 5028

# nodemon을 사용하여 애플리케이션 실행
CMD ["node", "server.mjs"]
