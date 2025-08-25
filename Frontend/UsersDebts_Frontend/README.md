# Gestión de Deudas Personales - Frontend Angular

## Despliegue local

1. Clona el repositorio en tu máquina.
2. Instala las dependencias con:
   ```
   npm install
   ```
3. Inicia el servidor de desarrollo con:
   ```
   npm start
   ```
4. Accede a la aplicación en tu navegador en `http://localhost:4200`.

## Explicación técnica

- El proyecto está desarrollado en Angular, usando componentes standalone y Angular Material para una interfaz moderna y responsiva.
- Se implementó lazy loading en los módulos principales para mejorar el rendimiento y la carga inicial.
- La autenticación incluye login y registro, protegiendo rutas y mostrando el menú solo si el usuario está logueado.
- La gestión de deudas permite listado, creación, edición y detalle en modal, con validaciones y feedback visual.
- El diseño prioriza la experiencia de usuario: colores suaves, gradientes, formularios claros y navegación sencilla.
- El código está organizado en módulos y componentes para facilitar el mantenimiento y la escalabilidad.
