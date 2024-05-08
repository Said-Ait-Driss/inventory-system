FROM node:current-alpine3.19

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

ENV NODE_ENV=production
ENV PORT=5000
ENV MONGO_URI=mongodb://localhost:27017
ENV JWT_SECRET=641613fffdec5122fc6dfa57

EXPOSE 5000

CMD [ "npm", "start" ]
