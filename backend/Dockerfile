# Usa un'immagine base di Node.js
FROM node:18-alpine

# Imposta la working directory
WORKDIR /app

# Copia package.json e package-lock.json per installare le dipendenze
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dell'applicazione
COPY . .

# Esponi la porta su cui gira il server
EXPOSE 3001

# Comando per avviare il server
CMD ["npm", "start"]
