# Comunidades Compartidas

Curso - Proyecto de Ingeniería de Software I - Cenfotec

## Sistema de Autenticación y Roles

### Características Implementadas

✅ **Express-session** configurado para manejo de sesiones
✅ **Autenticación** con bcrypt para encriptación de contraseñas
✅ **Sistema de roles** (administrador/cliente)
✅ **Middleware de autorización** para proteger rutas
✅ **Rutas de login/register** funcionales
✅ **Navegación dinámica** basada en roles de usuario

### Instalación y Configuración

1. Instalar dependencias:

```bash
npm install
```

2. Crear usuarios de prueba:

```bash
node test-auth.js
```

3. Iniciar el servidor:

```bash
npm run dev
```

### Usuarios de Prueba

- **Administrador**: admin@test.com / admin123
- **Cliente**: cliente@test.com / cliente123

### Rutas Protegidas

#### Solo Usuarios Autenticados

- `/calendario` - Calendario de eventos
- `/formulario-ofertas` - Crear ofertas
- `/formulario-ruta` - Crear rutas
- `POST /anuncios` - Crear anuncios

#### Solo Administradores

- `/dashboard` - Panel de administración
- `/reportes` - Ver reportes
- `/ver-reportes` - Gestión de reportes
- `PUT /anuncios/:id` - Actualizar anuncios
- `DELETE /anuncios/:id` - Eliminar anuncios

### Funcionalidades por Rol

#### Administrador

- Acceso completo al dashboard
- Gestión de usuarios y contenido
- Aprobación de formularios
- Visualización de reportes
- CRUD completo de anuncios

#### Cliente

- Crear ofertas y rutas
- Participar en eventos
- Ver contenido público
- Crear anuncios (requiere aprobación)

### Navegación

La navegación se adapta automáticamente según el estado de autenticación y rol del usuario:

- **No autenticado**: Muestra enlaces de login/register
- **Autenticado**: Muestra opciones según el rol y botón de logout
- **Administrador**: Acceso a funciones administrativas
- **Cliente**: Acceso a funciones de usuario regular

# Tecnologías

- HTML
- CSS
- JAVASCRIPT
- NODEJS
- Express-session
- Bcrypt
- MongoDB/Mongoose

# Integrantes

- Kendall Bastos Zamora
- Sebastian Ortiz Vargas
- Daniel Fonseca Salas
- Joseph Murillo Rodríguez

# Comandos para levantar el proyecto

npm i
npm run dev

# Dev Notes

const mongoose = require("./db.js"); // Usar mongose para la conexión a la base de datos en los modelos

res.render('formulario-exito', { headline: "msg", message: "msg", message_secundario: "msg" }); // Codigo para
redireccionar a la página de éxito con mensajes customizados para cada caso
