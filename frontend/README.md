# Cocktail App - Frontend

Este módulo contiene la aplicación web desarrollada con Next.js (v14.x) y React con TypeScript. Su objetivo es consumir la API RESTful del Backend para mostrar, gestionar y editar el catálogo de cócteles.

## 📋 Requisitos Previos

- **Backend Operativo:** El servidor Node.js/PostgreSQL debe estar corriendo en `http://localhost:3000` antes de iniciar el Frontend.
- **Node.js:** Versión 18 (o superior).

---

## 🚀 Instalación y Configuración

### 1. Instalación de Dependencias

Para instalar todas las librerías necesarias, ejecutar el siguiente comando en la raíz de este directorio (`frontend/`):

```bash
npm install
```

### 2. Variables de Entorno

Crear el archivo `.env.local` en la raíz de la carpeta `frontend/` para definir la URL del Backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/cocktails
```

---

## 🛠️ Comandos Disponibles

### 1. Iniciar en Desarrollo (Recomendado)

Levanta el servidor con recarga automática.

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3001` (o el puerto que asigne Next.js).

### 2. Generar Build de Producción (Compilación)

Compila y optimiza el código para producción.

```bash
npm run build
```

### 3. Iniciar en Producción

Corre el código compilado (solo después de ejecutar `npm run build`).

```bash
npm run start
```

---

## 📂 Estructura del Código

Se optó por el **App Router** de Next.js y una estructura modular por capas, separando la UI de la lógica de datos:

```
frontend/
├── src/
│   ├── api/                    # Capa de Conexión: Funciones Axios (cocktailApi.ts)
│   ├── app/                    # Rutas y Layouts (layout.tsx, globals.css, loading.tsx)
│   │   ├── (cocktails)/        # Rutas CRUD de cócteles
│   │   └── favorites/          # Ruta de Favoritos
│   ├── components/             # Componentes de UI (Navbar, Card, Modal, Formulario)
│   ├── hooks/                  # Lógica de Estado (useCocktails, useFavorites)
│   ├── types/                  # Definiciones de Interfaces (DTOs, Pagination)
│   └── utils/                  # Utilidades auxiliares
```

---

## 🧠 Decisiones Técnicas y Fundamentación

Se aplicó un diseño **client-centric** para las siguientes decisiones:

### 1. Combinación del Stack (React, Next.js, TypeScript, Tailwind)

Esta combinación es el **estándar de la industria** para aplicaciones escalables y se justifica por la complementariedad de sus funciones:

- **React:** Es el motor base. Gestiona el estado de la UI y los componentes de forma declarativa. Permite crear código reutilizable (como `CocktailCard` y `FormularioCoctel`).

- **TypeScript:** Es la capa de seguridad. Establece un contrato estricto entre el Frontend y el Backend (DTOs), eliminando errores comunes de tipo en tiempo de ejecución.

- **Next.js (Framework):** Es la capa de rendimiento y arquitectura. Proporciona enrutamiento (App Router) y optimizaciones de compilación fuera de la caja, evitando la configuración manual.

- **Tailwind CSS:** Es la capa de agilidad y UX/UI. Permite construir diseños complejos y responsive a gran velocidad sin necesidad de escribir CSS tradicional, y produce un CSS final ligero.

### 2. Diseño Web Responsive (Clave de UX)

- **Estrategia Mobile-First:** La aplicación está diseñada con las utilidades de Tailwind (`sm:`, `md:`, `lg:`), asegurando que el diseño del listado (grillas) y los formularios se adapten fluidamente al tamaño de la pantalla, desde móviles hasta escritorio.

- **Persistencia de Favoritos:** El requisito se cumple utilizando un Hook personalizado (`useFavorites.ts`) que gestiona la lectura y escritura de IDs de cócteles directamente en `localStorage`. Esto aísla la lógica de persistencia y no requiere una base de datos.

### 3. Arquitectura de Datos (Hooks y Capas)

- **Separación de Responsabilidades:** Se separa la lógica de estado y la conexión de la UI. Los componentes (`CocktailCard.tsx`) solo se preocupan por el diseño, mientras que los Hooks (`useCocktails.ts`, `useFavorites.ts`) se encargan de manejar la data y el estado de la aplicación.

- **UX en la Interacción:** Se implementó el patrón de Modal/Toast para todas las interacciones críticas (Guardar, Eliminar, Restaurar), eliminando las alertas nativas del navegador y mejorando la experiencia del usuario.