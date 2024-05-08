FROM node:22

USER root

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install -f

COPY . .

ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]
