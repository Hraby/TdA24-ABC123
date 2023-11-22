FROM node:18-alpine

WORKDIR /app

RUN npm install -g sqlite3

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

ENV DATABASE_URL=sqlite:./prisma/dev.db

CMD ["npm", "run", "dev"]
