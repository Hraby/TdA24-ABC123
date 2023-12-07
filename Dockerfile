FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

ENV DATABASE_URL=""

CMD ["npm", "run", "dev"]