FROM node:20

WORKDIR /app
COPY package.json package-lock.json* ./
COPY src/apps/admin/package*.json ./src/apps/admin/
RUN npm install
#COPY src/apps/admin ./src/apps/admin
WORKDIR /app/src/apps/admin
EXPOSE 3001
CMD ["npm", "run", "dev"]