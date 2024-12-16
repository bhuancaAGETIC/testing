# Usar una imagen base con Node.js
FROM mcr.microsoft.com/playwright:v1.49.0-noble

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Ejecutar la prueba
CMD ["npx", "playwright", "test"]