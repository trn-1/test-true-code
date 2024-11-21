FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./prisma ./prisma

RUN npm install @prisma/client prisma

RUN npx prisma generate

RUN npx prisma migrate dev --name init

RUN npm install

COPY . .

RUN npm run build

RUN node prisma/init.js

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]