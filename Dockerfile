# Usa una imagen oficial de Node.js como imagen base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el proyecto al contenedor
COPY . .

# Compila la aplicación Angular
RUN ng build --prod

# Exponer el puerto en el que se ejecutará la aplicación (puerto 80 en este caso)
EXPOSE 230

# Comando para iniciar la aplicación Angular
CMD ["nginx", "-g", "daemon off;"]