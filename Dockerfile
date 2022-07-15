FROM node:14 AS development

WORKDIR /olympics/src/app

RUN npm install -g @nestjs/cli 

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]