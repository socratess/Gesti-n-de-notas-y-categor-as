#!/bin/bash

# Variables
DB_NAME="TFNDB"
DB_USER="root"
DB_PASSWORD="" 
DB_HOST="localhost"
MYSQL_CMD="mysql -u $DB_USER -h $DB_HOST"

# Paso 1: Verificar si la base de datos existe y crearla si no
echo "Verificando si la base de datos $DB_NAME existe..."
if ! $MYSQL_CMD -e "USE $DB_NAME"; then
    echo "Base de datos no encontrada. Creando la base de datos $DB_NAME..."
    $MYSQL_CMD -e "CREATE DATABASE $DB_NAME"
else
    echo "Base de datos $DB_NAME ya existe."
fi

# Paso 2: Configuración de archivo `application.properties` (si es necesario)
echo "Configurando el archivo application.properties..."
APP_PROPERTIES="BackEnd/tagfilternotes/src/main/resources/application.properties"
if ! grep -q "spring.datasource.url" "$APP_PROPERTIES"; then
    echo "spring.datasource.url=jdbc:mysql://localhost:3306/$DB_NAME?useSSL=false&serverTimezone=America/Bogota" >> "$APP_PROPERTIES"
    echo "spring.datasource.username=root" >> "$APP_PROPERTIES"
    echo "spring.datasource.password=" >> "$APP_PROPERTIES"
    echo "Base de datos configurada correctamente en application.properties."
else
    echo "Configuración de base de datos ya está presente en application.properties."
fi

# Paso 3: Ejecutar el Backend (Spring Boot)
echo "Iniciando el Backend (Spring Boot)..."
cd BackEnd/tagfilternotes
./mvnw spring-boot:run &
BACKEND_PID=$!

# Paso 4: Ejecutar el Frontend (React)
echo "Iniciando el Frontend (React)..."
cd ../../FrontEnd/clienttagfilternotes
npm install
npm start &
FRONTEND_PID=$!

# Mostrar los procesos en ejecución
echo "Backend (PID: $BACKEND_PID) y Frontend (PID: $FRONTEND_PID) están en ejecución..."

# Finalización
wait $BACKEND_PID $FRONTEND_PID
echo "Aplicación ejecutándose. Para detenerla, usa Ctrl+C."
