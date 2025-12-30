FROM node:20-bullseye

WORKDIR /app
COPY package.json package-lock.json* ./
COPY src/apps/cdn/package*.json ./src/apps/cdn/
RUN npm install
#COPY src/apps/cdn ./src/apps/cdn
WORKDIR /app/src/apps/cdn
EXPOSE 3002
CMD ["npm", "run", "dev"]
