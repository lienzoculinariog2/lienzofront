# Lienzo Culinario — Frontend

Aplicación web de Lienzo Culinario para consultar el catálogo, gestionar el carrito, aplicar descuentos, pagar con Stripe y administrar productos, usuarios, órdenes y códigos promocionales.

## Stack

- Next.js 15 con App Router
- React 19 y TypeScript
- Tailwind CSS 3
- Auth0 para autenticación y roles
- Stripe Elements para pagos
- Axios para consumir la API REST
- Vercel para previews y producción

## Requisitos

- Node.js 24
- npm
- Backend disponible localmente en `http://localhost:3001` o mediante una URL pública
- Aplicaciones configuradas en Auth0 y Stripe

## Configuración local

```bash
git clone https://github.com/lienzoculinariog2/lienzofront.git
cd lienzofront/front
cp .env.example .env.local
npm ci
npm run dev
```

Abre `http://localhost:3000`.

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | URL pública del backend, sin `/` final |
| `NEXT_PUBLIC_AUTH0_DOMAIN` | Dominio del tenant de Auth0 |
| `NEXT_PUBLIC_AUTH0_CLIENT_ID` | Client ID de la aplicación SPA |
| `NEXT_PUBLIC_AUTH0_AUDIENCE` | Audience de la API protegida |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clave publicable de Stripe |

Todas llevan el prefijo `NEXT_PUBLIC_`, por lo que se incorporan al bundle del navegador. Nunca coloques secretos de Stripe, contraseñas o claves privadas en estas variables.

En Auth0 configura como URLs permitidas tanto `http://localhost:3000` como los dominios correspondientes de Vercel.

## Comandos

```bash
npm run dev    # servidor de desarrollo
npm run build  # build de producción y comprobación de tipos
npm run start  # sirve el build
npx eslint .   # lint con la configuración actual
```

## Estructura

```text
src/
├── app/          # rutas, layouts y páginas
├── components/   # componentes compartidos y protección de rutas
├── context/      # estado global del carrito
├── hooks/        # carrito, descuentos, roles y Stripe
├── services/     # clientes HTTP del backend
├── types/        # contratos TypeScript
├── helpers/      # validadores y transformaciones
└── utils/        # formatos reutilizables
```

Las vistas principales están dentro de `src/app/(views)`:

- catálogo y detalle de productos;
- carrito y checkout;
- perfil y órdenes del usuario;
- reseñas;
- panel administrativo de catálogo, usuarios, órdenes y descuentos.

## Autenticación y autorización

Auth0 entrega el access token desde el frontend. Los servicios protegidos lo envían como `Authorization: Bearer <token>`. El backend vuelve a validar identidad, audiencia y permisos; ocultar una opción en la interfaz no sustituye la autorización del servidor.

Los UUID completos se conservan para llamadas a la API. En pantalla las órdenes muestran una referencia abreviada de ocho caracteres para mejorar legibilidad.

## Flujo de compra

1. El usuario inicia sesión y agrega productos al carrito.
2. El frontend solicita al backend el checkout autenticado y puede incluir un cupón.
3. El backend calcula el total y devuelve el `clientSecret` de Stripe.
4. Stripe Elements confirma el pago.
5. El webhook del backend marca la orden como pagada y actualiza el inventario.

El frontend no debe calcular el importe definitivo ni descontar stock.

## Despliegue en Vercel

La rama de producción es `main`. Cada PR crea un preview de Vercel y los cambios fusionados despliegan producción según la configuración del proyecto.

Configura todas las variables `NEXT_PUBLIC_*` en **Project Settings → Environment Variables** para Production, Preview y Development según corresponda. Después de cambiarlas, genera un nuevo deployment.

## Verificación antes de fusionar

- `npm run build` termina correctamente;
- el preview de Vercel está aprobado;
- inicio de sesión y roles funcionan;
- carrito, cupón y pago completan el flujo;
- órdenes muestran una referencia legible;
- las tarjetas administrativas navegan a rutas existentes.

## Repositorio relacionado

Backend: [lienzoculinariog2/nuevolienzoback-](https://github.com/lienzoculinariog2/nuevolienzoback-)
