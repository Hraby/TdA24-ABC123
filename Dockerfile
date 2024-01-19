FROM node:18 AS dependencies

WORKDIR /app
COPY package.json ./
RUN npm i

FROM node:latest AS build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build
COPY start.sh .
RUN chmod +x start.sh

FROM node:latest AS deploy

WORKDIR /app

ENV NODE_ENV production

COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/start.sh .

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

EXPOSE 3000

ENV PORT 3000

CMD ["./start.sh"]