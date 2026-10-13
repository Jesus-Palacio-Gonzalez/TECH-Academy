# Tech Academy

Landing page, registro e inicio de sesión de Tech Academy. React + Vite + TypeScript + Tailwind + Supabase.

## Puesta en marcha

1. Instala dependencias: `npm install`
2. Crea un proyecto en [Supabase](https://supabase.com) y ejecuta `supabase/schema.sql` en **SQL Editor**.
3. Copia `.env.example` a `.env` y completa `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (Project Settings → API).
4. En Supabase → **Authentication → URL Configuration**, agrega estas URLs de redirección:
   - `http://localhost:5173/panel`
   - `http://localhost:5173/nueva-clave`
   - la misma pareja con tu dominio de producción
5. Para Google y GitHub: Authentication → Providers → activa cada uno y pega el Client ID y Secret de su consola de desarrolladores.
6. `npm run dev`

## Rutas

| Ruta | Acceso | Qué hace |
| --- | --- | --- |
| `/` | público | Landing |
| `/ingresar`, `/registro`, `/recuperar` | solo sin sesión | Acceso |
| `/nueva-clave` | enlace del correo | Cambiar contraseña |
| `/bienvenida` | con sesión | Completa el perfil (para quien entra con Google o GitHub) |
| `/panel` | con sesión | Panel del estudiante |

## Roles

Todo usuario nuevo es `student`. Para crear un admin, ejecuta el `update` comentado al final de `supabase/schema.sql`. El rol no se puede modificar desde la app.

## Pendiente antes de publicar

- Reemplazar los testimonios de ejemplo en `src/data/content.ts`.
- Crear las páginas de términos, privacidad, cookies y contacto (los enlaces del footer apuntan a `#`).
