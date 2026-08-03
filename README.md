# Lienzo Culinario — Frontend

Aplicación web de Lienzo Culinario desarrollada con Next.js y React. Incluye catálogo, carrito, códigos de descuento, checkout con Stripe, perfil del usuario, reseñas y panel administrativo.

## Estado del proyecto

- Producción y previews desplegados en Vercel desde `main`.
- Autenticación y roles mediante Auth0.
- Checkout autenticado con Stripe Elements.
- Integración con la API NestJS del proyecto.
- Gestión administrativa de catálogo, usuarios, órdenes y descuentos.
- Referencias de orden legibles conservando internamente el UUID completo.

## Inicio rápido

El código de la aplicación vive en [`front/`](./front/).

```bash
cd front
cp .env.example .env.local
npm ci
npm run dev
```

Abre `http://localhost:3000`.

## Documentación

La guía completa incluye requisitos, variables públicas, estructura, Auth0, flujo de compra, integración con el backend, Vercel y comprobaciones antes de fusionar:

**[Abrir documentación del frontend](./front/README.md)**

## Backend

Repositorio relacionado: [lienzoculinariog2/nuevolienzoback-](https://github.com/lienzoculinariog2/nuevolienzoback-)

## Seguridad

Las variables `NEXT_PUBLIC_*` se incorporan al navegador. No coloques en ellas secretos de Stripe, contraseñas, tokens privados ni credenciales del backend.
