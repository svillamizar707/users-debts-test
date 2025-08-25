# Instrucciones de despliegue local y explicación técnica

## Backend (.NET 8)

### Requisitos previos
- .NET 8 SDK instalado
- PostgreSQL instalado y configurado
- Visual Studio 2022 o superior (o Visual Studio Code)

### Pasos
1. Clona el repositorio en tu máquina.
2. Ejecuta los scripts SQL incluidos en el repositorio para crear la base de datos y las tablas necesarias en PostgreSQL.
3. Actualiza la cadena de conexión en `appsettings.json` bajo `DefaultConnection`.
4. Instala las dependencias con:
   ```
   dotnet restore
   ```
5. Inicia el servidor de desarrollo con:
   ```
   dotnet run
   ```
   O ejecuta el proyecto desde Visual Studio usando F5.
6. Accede a la API en tu navegador o desde el frontend en `http://localhost:49842` (o el puerto configurado).

## Frontend (Angular)

### Requisitos previos
- Node.js y npm instalados
- Angular CLI instalado

### Pasos
1. Clona el repositorio en tu máquina.
2. Instala las dependencias con:
   ```
   npm install
   ```
3. Inicia el servidor de desarrollo con:
   ```
   ng serve
   ```
4. Accede a la aplicación en tu navegador en `http://localhost:4200`.

---

## Explicación técnica

### Backend
- Proyecto desarrollado en .NET 8 y C# 12, con arquitectura por capas (rutas, servicios, modelos, DTOs).
- Entity Framework Core para acceso y gestión de datos en PostgreSQL.
- Capa de caché simulada con diccionario en memoria para acelerar consultas y simular Redis.
- Validaciones de negocio: unicidad de email, edición de deudas solo si no están pagadas.
- CORS habilitado para permitir acceso desde el frontend Angular.
- Scripts SQL incluidos para facilitar la creación de la base de datos.

### Frontend
- Proyecto desarrollado en Angular, usando componentes standalone y Angular Material para una interfaz moderna y responsiva.
- Lazy loading en los módulos principales para mejorar el rendimiento y la carga inicial.
- Autenticación con login y registro, protegiendo rutas y mostrando el menú solo si el usuario está logueado.
- Gestión de deudas: listado, creación, edición y detalle en modal, con validaciones y feedback visual.
- Diseño orientado a la experiencia de usuario: colores suaves, gradientes, formularios claros y navegación sencilla.
- Código organizado en módulos y componentes para facilitar el mantenimiento y la escalabilidad.
