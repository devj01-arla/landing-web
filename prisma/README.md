# Configuración de Prisma con MySQL para Vercel

Este proyecto está configurado para usar Prisma como ORM con MySQL, manteniendo compatibilidad con conexiones directas usando `mysql2` para queries SQL personalizadas y creación de tablas.

## Configuración de Variables de Entorno

### Opción 1: DATABASE_URL (Recomendado para Vercel)

Si usas un servicio MySQL compatible con Vercel (como PlanetScale, Railway, o similar), configura:

```env
DATABASE_URL="mysql://user:password@host:port/database_name"
```

**Para Vercel:**
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega `DATABASE_URL` con el formato completo de conexión MySQL

### Opción 2: Variables Individuales

Si prefieres usar variables individuales (compatible con MySQL tradicional):

```env
DB_HOST=tu_host
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos
```

**Nota:** El código automáticamente construye `DATABASE_URL` desde estas variables si no está definida.

## Servicios MySQL Recomendados para Vercel

### PlanetScale (Recomendado)
- MySQL compatible
- Sin problemas de IPs cambiantes
- Plan gratuito disponible
- Integración fácil con Vercel

### Railway
- Soporta MySQL
- Fácil configuración
- Plan gratuito disponible

### Otros
- AWS RDS MySQL
- Google Cloud SQL
- Azure Database for MySQL

## Crear las Tablas

### Opción 1: Usando Prisma Migrate (Recomendado)

```bash
# Crear una nueva migración
npm run prisma:migrate

# O aplicar cambios sin crear migración (útil para desarrollo)
npm run prisma:push
```

### Opción 2: SQL Directo (Para creación manual)

Ejecuta el archivo `prisma/init.sql` directamente en tu base de datos MySQL:

```bash
mysql -u usuario -p nombre_base_datos < prisma/init.sql
```

O copia y pega el contenido del archivo en tu cliente MySQL (phpMyAdmin, MySQL Workbench, etc.)

## Uso en el Código

### Usando Prisma (ORM)

```typescript
import { prisma } from '../lib/prisma';

// Ejemplo: Buscar un cliente
const cliente = await prisma.cliente.findUnique({
  where: { correo: 'ejemplo@email.com' }
});

// Ejemplo: Crear un cliente
const nuevoCliente = await prisma.cliente.create({
  data: {
    empresa: 'Mi Empresa',
    correo: 'nuevo@email.com',
    password: 'hash_password',
    activo: 0
  }
});
```

### Usando mysql2 Directo (SQL Raw)

```typescript
import { query } from '../lib/db';

// Ejemplo: Query SQL directa
const result = await query(
  'SELECT * FROM tbl_clientes WHERE correo = ?',
  ['ejemplo@email.com']
);

// Ejemplo: Crear tabla manualmente
await query(`
  CREATE TABLE IF NOT EXISTS mi_tabla (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
  )
`);
```

## Scripts Disponibles

- `npm run prisma:generate` - Genera el cliente de Prisma
- `npm run prisma:push` - Aplica cambios del schema sin crear migración
- `npm run prisma:migrate` - Crea y aplica una migración
- `npm run prisma:studio` - Abre Prisma Studio (GUI para la BD)
- `npm run prisma:format` - Formatea el schema.prisma

## Despliegue en Vercel

1. **Configura las variables de entorno** en Vercel Dashboard:
   - `DATABASE_URL` (o las variables individuales DB_*)

2. **Asegúrate de que el cliente de Prisma se genere** en el build:
   - El script `postinstall` ya está configurado para ejecutar `prisma generate`

3. **Si necesitas ejecutar migraciones** en producción:
   - Puedes usar Vercel's Build Command o crear un endpoint API temporal
   - O ejecutar las migraciones manualmente antes del despliegue

## Notas Importantes

- El código mantiene compatibilidad con ambos métodos (Prisma y mysql2 directo)
- Las queries existentes usando `query()` de `db.ts` seguirán funcionando
- Puedes migrar gradualmente a Prisma según tus necesidades
- El cliente de Prisma se genera automáticamente en `npm install` gracias al script `postinstall`

