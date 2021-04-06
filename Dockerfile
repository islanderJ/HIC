FROM node:14.15.4-alpine

WORKDIR /app/

COPY package.json package-lock.json ./
RUN npm install
RUN npm ci --only=production

COPY app.js ./
COPY keys ./keys/

ENV NODE_ENV=production

EXPOSE 9000
CMD npm run start