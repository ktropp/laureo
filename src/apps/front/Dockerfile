FROM node:20-bullseye

WORKDIR /app
COPY package.json package-lock.json* ./
COPY src/apps/front/package*.json ./src/apps/front/
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate --schema=/app/prisma/schema.prisma
#COPY src/apps/front ./src/apps/front
WORKDIR /app/src/apps/front
EXPOSE 3000
CMD ["npm", "run", "dev"]
