FROM node:20


WORKDIR /

EXPOSE 3000

COPY package*.json ./
RUN npm ci

COPY . ./

CMD ['npm', 'build']

CMD npm start