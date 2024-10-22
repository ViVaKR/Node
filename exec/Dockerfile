# 빌드 스테이지
FROM node:14-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 설치를 위해 package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# 프로덕션 스테이지
FROM node:14-alpine

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 빌드된 파일 복사
COPY --from=builder /usr/src/app .

# 일반 사용자 생성 및 권한 설정
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /usr/src/app

# 일반 사용자로 전환
USER appuser

# 애플리케이션 포트 설정
EXPOSE 8293

# 애플리케이션 실행 명령
CMD ["node", "server.mjs"]
