FROM node:20

WORKDIR /app
COPY package.json package-lock.json* ./
COPY src/apps/front/package*.json ./src/apps/front/
RUN npm install
#COPY src/apps/front ./src/apps/front
WORKDIR /app/src/apps/front
EXPOSE 3000
CMD ["npm", "run", "dev"]
