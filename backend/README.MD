# Cocktail App - Backend

Este módulo corresponde al Backend de la aplicación de gestión de cócteles. Consiste en una API RESTful desarrollada en **Node.js** (v18) con **TypeScript**, utilizando **Express** como servidor y **PostgreSQL** como base de datos.

📋 **Requisitos Previos**

Para garantizar el correcto funcionamiento, se recomienda contar con las siguientes versiones (o superiores) en el entorno de ejecución:

- **Node.js:** Versión 18 (Recomendada: v18.17.1 o superior).

- **PostgreSQL:** Versión 18.

> **Nota:** El proyecto implementa características modernas de ES Modules y Express 5, por lo que versiones antiguas de Node.js podrían presentar incompatibilidades.

## 🚀 Instalación y Configuración

1. **Instalación de Dependencias**

Para instalar todas las librerías necesarias, ejecutar el siguiente comando en la raíz de este directorio (` backend/ `):

``` bash npm install ``` 

2. **Configuración de Variables de Entorno**

Es necesario crear un archivo ` .env ` en la raíz de la carpeta ` backend ` con las credenciales de la base de datos local. Se puede tomar como referencia la siguiente configuración:

``` 
PORT=3000 
DB_HOST=localhost 
DB_PORT=5432 
DB_USER=postgres 
DB_PASSWORD=tu_password_aqui 
DB_NAME=cocktails_db
```

3. **Base de Datos y Datos de Prueba (Importante)**

El sistema se encuentra configurado con ` synchronize: true ` (modo desarrollo), lo cual permite la creación automática de tablas al iniciar el servidor.

**Para la carga de datos iniciales (Semillas):** Dado que la sincronización crea las tablas vacías, se deben seguir estos pasos para poblar la base de datos con ejemplos (Mojito, Margarita, etc.):

1. Asegurar la existencia de la base de datos (` cocktails_db `) en PostgreSQL.

2. Localizar el archivo ` init.sql ` dentro de la carpeta ` database/ `.

3. Copiar los scripts de inserción (`INSERT INTO...`) y ejecutarlos manualmente en el gestor de base de datos preferido (pgAdmin, DBeaver o terminal).

## 🛠️ Comandos Disponibles

**Iniciar en Desarrollo (Recomendado)**

Levanta el servidor con recarga automática (watch mode).

``` npm run dev```

La API estará disponible en: ` http://localhost:3000/api/cocktails `

**Ejecutar Pruebas (Testing)**

Ejecuta los tests de integración automatizados (Jest + Supertest) para validar el funcionamiento correcto del sistema (CRUD, Validaciones, Errores).

``` npm test``` 

**Compilar para Producción**

Genera el código JavaScript transpilado en la carpeta ` build/ `.

``` npm run build ``` 

## 📂 Estructura del Proyecto

La organización de carpetas sigue una arquitectura modular para separar responsabilidades:

```
backend/
├── build/                 # Código compilado para producción
├── database/              # Scripts SQL y datos de ejemplo (Seeds)
├── node_modules/          # Dependencias del proyecto
├── src/                   # Código fuente TypeScript
│   ├── controllers/       # Controladores: Manejan la entrada/salida HTTP
│   ├── dtos/              # DTOs: Estructuras de datos (Input/Output)
│   ├── entities/          # Entidades: Modelos de BD (TypeORM)
│   ├── mappers/           # Mappers: Transformación DTO <-> Entidad
│   ├── repositories/      # Repositorios: Acceso a datos
│   ├── routes/            # Rutas: Definición de endpoints
│   ├── services/          # Servicios: Lógica de negocio y validaciones
│   ├── utils/             # Utilidades: Herramientas globales (AppError)
│   ├── app.ts             # Configuración de la app Express
│   ├── data-source.ts     # Conexión a PostgreSQL
│   └── index.ts           # Punto de entrada: Inicia el servidor
├── tests/                 # Pruebas de integración
├── .env                   # Variables de entorno (Credenciales)
├── jest.config.js         # Configuración de Jest
├── package.json           # Dependencias y scripts
└── tsconfig.json          # Configuración de TypeScript
```

## 🧠 Decisiones Técnicas y Arquitectura

A continuación, se detalla el razonamiento detrás del diseño del software:

1. **Arquitectura por Capas**

Se optó por separar el código en tres capas principales (Controller, Service, Repository) para cumplir con el principio de Separación de Responsabilidades:

- **Controller:** Su única función es gestionar la comunicación HTTP (recibir `req`, enviar `res`). No contiene lógica de negocio ni consultas SQL.

- **Service:** Contiene la lógica de negocio pura (ej: validación de duplicados, limpieza de datos). Actúa como intermediario y desconoce si la petición viene de web o consola.

- **Repository:** Se encarga exclusivamente de la interacción con la base de datos.

**Ventaja:** Esta estructura facilita el mantenimiento y permite cambiar componentes (como el framework web o la base de datos) con mínimo impacto en el resto del sistema.

2. **Flujo de Datos**

El dato viaja de manera controlada y transformada para proteger la integridad del sistema:

1. **Cliente:** Envía la petición JSON.

2. **Controller:** Recibe la petición y delega al Service.

3. **Service:** Valida las reglas de negocio y utiliza el Mapper para convertir el DTO de entrada en una Entidad de dominio.

4. **Repository:** Persiste la Entidad en la Base de Datos.

5. **Respuesta:** El camino inverso utiliza nuevamente el Mapper para convertir la Entidad guardada en un DTO de respuesta, ocultando datos sensibles si fuera necesario.

3. Inversión de Control y Principios SOLID

Se aplicó el principio de **Inversión de Dependencias** de manera manual:

- Los Controladores no instancian la lógica de base de datos directamente, sino que dependen de una abstracción (el Servicio) para realizar las operaciones.

- Esto desacopla las capas, haciendo el código más modular y facilitando la creación de pruebas unitarias y de integración.

4. **Robustez y Seguridad**

- **Identificadores UUID:** Se utilizaron UUIDs en lugar de IDs autoincrementales para mejorar la seguridad y evitar la enumeración de recursos.

- **Soft Delete:** Se implementó un borrado lógico para preservar la integridad histórica de los datos, permitiendo su restauración y auditoría.

- **Validaciones:** Se estableció una doble capa de validación: restricciones UNIQUE a nivel de base de datos y validaciones lógicas descriptivas en la capa de Servicio.