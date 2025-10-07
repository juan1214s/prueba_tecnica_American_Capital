# 🐳 1. Usa una imagen base oficial de Node.js
FROM node:20

# 📁 2. Establece un directorio dentro del contenedor
WORKDIR /app

# 📦 3. Copia los archivos de dependencias (package.json) primero
COPY package*.json ./

# 📥 4. Instala las dependencias
RUN npm install

# 📁 5. Copia todo el código de tu proyecto al contenedor
COPY . .

# 🌐 6. Expón el puerto donde correrá tu app (el mismo que usas en Express)
EXPOSE 3200

# 🚀 7. Comando para iniciar tu aplicación
CMD ["node", "src/index.js"]
