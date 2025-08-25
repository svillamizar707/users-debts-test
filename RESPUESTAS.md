# Fase 2: Preguntas de Arquitectura y Experiencia

**Microservicios:**
Si el sistema creciera y necesitara pasar de monolito a microservicios, dividiría los servicios en:
- Servicio de usuarios (registro, login, gestión de perfiles)
- Servicio de deudas (gestión de deudas, pagos)
- Servicio de notificaciones (emails, alertas)
- Servicio de autenticación/autorización
Para la comunicación, usaría APIs REST y un bus de eventos (como RabbitMQ o AWS SNS/SQS) para integración entre servicios. Implementaría autenticación centralizada (OAuth/JWT) y manejo de errores y timeouts.

**Optimización en la nube (AWS):**
- Autenticación segura: Usaría AWS Cognito para gestión de usuarios y autenticación.
- Base de datos: Amazon RDS (PostgreSQL) para datos relacionales y Amazon DynamoDB para NoSQL si se requiere escalabilidad extrema.
- Cache y escalabilidad: Amazon ElastiCache (Redis) para cache y escalabilidad de consultas frecuentes.
- Balanceo de carga: Elastic Load Balancer (ELB) para distribuir tráfico entre instancias.

**Buenas prácticas de seguridad:**
1. Backend: Validar y sanitizar entradas, usar HTTPS, proteger endpoints con autenticación y roles.
2. Frontend: No exponer secretos, proteger rutas, usar HTTPS y Content Security Policy.
3. Despliegue en la nube: Usar IAM con permisos mínimos, cifrar datos en reposo y tránsito, escanear imágenes y dependencias.

**PostgreSQL vs NoSQL:**
- PostgreSQL: Lo usaría cuando se requiere integridad relacional, transacciones y consultas complejas, por ejemplo, gestión de usuarios y deudas con relaciones y reportes.
- NoSQL (ej. DynamoDB): Lo usaría para datos con estructura flexible, alta escalabilidad y acceso rápido, por ejemplo, logs de actividad, sesiones de usuario, o almacenamiento de notificaciones.

**Despliegue (CI/CD):**
Diseñaría un pipeline con:
- Integración continua: Ejecutar tests unitarios y de integración en cada push (GitHub Actions).
- Análisis de calidad: Escaneo de código y dependencias.
- Despliegue continuo: Deploy automático en entorno de staging, pruebas end-to-end, y luego despliegue en producción con aprobación manual.
- Rollback automático en caso de fallos.
