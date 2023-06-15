FROM node:latest

RUN npm install -g nodemon
WORKDIR /app
COPY package.json .
RUN npm install
COPY ./src .
EXPOSE 4000
CMD ["npm", "start"]