FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

COPY package.json package-lock.json tsconfig.json ./

COPY src ./src
COPY prisma ./prisma

RUN npm install

RUN npm run db:generate

RUN npm run build

CMD ["npm", "start"]