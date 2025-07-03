FROM node:20

WORKDIR /app

# Zkopíruj všechny potřebné soubory
COPY . .

# Nainstaluj závislosti (včetně workspaces)
RUN npm install

# Exponuj oba porty (např. front 3000, admin 3001)
EXPOSE 3000 3001

# Spusť Turborepo dev script
CMD ["npm", "run", "dev"]
