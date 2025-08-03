FROM node:20

WORKDIR /app/src/apps/admin

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 3001
