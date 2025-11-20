# Prueba Técnica - Aplicación de Cócteles (Fullstack)

🍹 **Cocktail App**

Este repositorio contiene la solución a la prueba técnica para el puesto de Desarrollador Fullstack. El proyecto es una aplicación web para gestionar un catálogo de cócteles, permitiendo operaciones de lectura, creación, edición y eliminado lógico.

---

## 🏗️ Estructura del Repositorio

El proyecto está estructurado como un **Monorepo** dividido en dos directorios principales:

### 🟢 **Backend** (`/backend`)

API RESTful construida con **Node.js**, **Express** y **TypeScript**. Utiliza **PostgreSQL** como base de datos y **TypeORM** para el mapeo objeto-relacional.

📄 [Ver instrucciones del Backend](./backend/README.MD)

### 🔵 **Frontend** (`/frontend`)

Aplicación web construida con **React**, **Next.js** y **Tailwind CSS**. Interfaz moderna y responsive para consumir la API del Backend.

📄 [Ver instrucciones del Frontend](./frontend/README.MD)

---

## ⚙️ Tecnologías Utilizadas

### Backend
- **Lenguaje:** TypeScript
- **Framework:** Node.js + Express 5
- **ORM:** TypeORM
- **Base de Datos:** PostgreSQL
- **Testing:** Jest + Supertest
- **Arquitectura:** Capas (Controller-Service-Repository)

### Frontend
- **Lenguaje:** TypeScript
- **Framework:** React + Next.js 14 (App Router)
- **Estilos:** Tailwind CSS
- **State Management:** Custom Hooks (useCocktails, useFavorites)
- **HTTP Client:** Axios

---

## 📦 Instrucciones Generales

Para ejecutar el proyecto localmente, es necesario levantar ambos servicios (Backend y Frontend) de manera independiente siguiendo las instrucciones detalladas en el `README.md` de cada carpeta correspondiente.

### Orden de Ejecución Recomendado:

1. **Iniciar el Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   El servidor estará disponible en `http://localhost:3000`

2. **Iniciar el Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3001`

---

## 📸 Capturas del Sistema

### Vista Principal - Listado de Cócteles

![Catálogo de Cócteles](./fotos_app/coctel%20no%20encontrado.png)

### Crear/Editar Cóctel

<!-- ![Formulario de Cóctel](./fotos_app/formulario.png) -->
_Captura próximamente_

### Gestión de Favoritos

<!-- ![Vista de Favoritos](./fotos_app/favoritos.png) -->
_Captura próximamente_

### Demostración Completa (GIF)

<!-- ![Demo del Sistema](./fotos_app/demo.gif) -->
_GIF demostrativo próximamente_

---

## 🚀 Características Implementadas

### Backend
- ✅ CRUD completo de cócteles
- ✅ Soft Delete (eliminado lógico)
- ✅ Paginación y filtros
- ✅ Validaciones de negocio
- ✅ Arquitectura por capas
- ✅ Tests automatizados
- ✅ UUIDs para seguridad

### Frontend
- ✅ Interfaz responsive (Mobile-First)
- ✅ CRUD visual con modales
- ✅ Sistema de favoritos (localStorage)
- ✅ Búsqueda y filtros
- ✅ Gestión de estados con hooks
- ✅ Integración completa con API

---

## 👨‍💻 Autor

**Willan Alexander Díaz Cordova** 🦖

---

## 📄 Licencia

Este proyecto fue desarrollado como parte de una prueba técnica.