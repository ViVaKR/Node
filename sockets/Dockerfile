FROM node:latest
# 또는 FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# local path to container path
VOLUME [ "/usr/src/app" ]

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# 로컬 package.json 파일을 컨테이너 워킹 디렉토리에 복사
COPY package*.json ./

# package.json에 명시된 npm 패키지 설치
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source, 로컬 소스코드를 컨테이너 워킹 디렉토리에 복사
COPY . .

# 앱이 사용하는 포트를 노출
EXPOSE 3210
CMD [ "npm", "run", "start"]

#* docker build -t viv-chat .
#* docker run --name viv-chat-a -d -p 9387:3210 --restart unless-stopped -v $PWD:/usr/src/app viv-chat
#* docker run --name viv-chat-b -d -p 9387:3210 --restart unless-stopped -v $PWD:/usr/src/app viv-chat
#* docker run --name viv-chat-c -d -p 9387:3210 --restart unless-stopped -v $PWD:/usr/src/app viv-chat
#* docker run --name viv-chat-d -d -p 9387:3210 --restart unless-stopped -v $PWD:/usr/src/app viv-chat
#* docker run --name viv-chat-e -d -p 9387:3210 --restart unless-stopped -v $PWD:/usr/src/app viv-chat
