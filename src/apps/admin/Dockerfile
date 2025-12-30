FROM node:20-bullseye

WORKDIR /app
COPY package.json package-lock.json* ./
COPY src/apps/admin/package*.json ./src/apps/admin/
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate --schema=/app/prisma/schema.prisma
#COPY src/apps/admin ./src/apps/admin
WORKDIR /app/src/apps/admin
EXPOSE 3001
CMD ["npm", "run", "dev"]