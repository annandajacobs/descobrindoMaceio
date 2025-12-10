# Usa imagem oficial Node
FROM node:18

# Cria diretório no container
WORKDIR /app

# Copia os arquivos
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código
COPY . .

# Informa que a API roda na porta 5000
EXPOSE 5000

# Comando para rodar
CMD ["node", "server.js"]