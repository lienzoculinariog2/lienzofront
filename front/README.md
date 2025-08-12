## Lienzo Culinario

Lienzo Culinario es una aplicación de comidas donde la estética y la funcionalidad se integran para ofrecer una experiencia visualmente rica y útil al usuario.  
La interfaz comunica información mediante sutilezas gráficas, como el uso de colores en los bordes de las cards de productos para transmitir propiedades nutricionales o categorías.

Este frontend está construído con Next.js y consume una API REST desarrollada en NestJS.

## Requisitos

Antes de iniciar el proyecto, asegurate de tener instalado:

- [Node.js](https://nodejs.org/) versión 18 o superior
- npm (viene con Node) o yarn
- Acceso al backend corriendo en `http://localhost:3001`

## Instalación

El repositorio debe ser clonado y deben ejecutarse los siguientes comandos:

```bash
npm install
npm run dev

La aplicación estará disponible en http://localhost:3000

```

## Tecnologías clave

Este proyecto utiliza las siguientes herramientas y librerías:

- **Next.js 15.4.5**: Framework principal para el frontend, con soporte para rutas en `app/` y server components.
- **React 19.1.0**: Librería base para la construcción de interfaces.
- **Axios 1.11.0**: Cliente HTTP para consumir la API REST del backend.
- **Tailwind CSS 3.4.17**: Utilizado para estilos utilitarios. Aún no se migró a Tailwind 4, por lo que se mantienen convenciones de la versión 3.
- **ESLint 9**: Configurado con `eslint-config-next` para mantener consistencia en el código. Se puede ejecutar con `npm run lint`.

> También se utilizan herramientas como Formik y Yup para formularios y validación, y Lucide para íconos SVG.

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_AUTH0_DOMAIN=dev-jvzx6wuzztoi4x6n.us.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=SRwBwzmrS5piIGyK70KHk6EMjNtFbw96
```

## Estructura del proyecto

La estructura sigue el patrón de rutas de Next.js 13+ con el directorio `app/`. A continuación se detallan las carpetas principales:

src/
├── app/ # Rutas y vistas principales
│ ├── (static)/test # Vistas estáticas y testing
│ ├── (views)/ # Vistas dinámicas organizadas por feature
│ ├── layout.tsx # Layout global de la aplicación
│ └── not-found.tsx # Página 404 personalizada
├── components/ # Componentes reutilizables
├── services/ # Servicios Axios para consumo de API
├── types/ # Interfaces tipadas del proyecto
├── constants/ # Constantes globales
├── helpers/ # Funciones auxiliares y validadores

Cada carpeta está pensada para mantener la modularidad y escalabilidad del proyecto. Los servicios y validadores están alineados con las entidades del backend para asegurar coherencia en los datos.

## Integración con el backend

La carpeta `services/` contiene los servicios Axios que consumen los endpoints REST del backend. Cada archivo representa una entidad o feature del sistema:

src/services/
├── CategoryService.ts # Servicio de obtencion de categorias de productos
├── ProductPoster.ts # Servicio de posteo de productos
├── ProductService.ts # Servicio de obtencion de productos individuales y completo
├── ProductServiceLocal.ts # Servicio de obtencion de productos mock para testing
└── draft/ # Servicios en desarrollo
│ ├── AuthService.ts # Servicio de logueo y obtencion de usuarios
│ ├── discountCodeService.ts # Servicio de aplicacion de codigos de descuento
│ ├── orderDetailService.ts # Servicio de obtencion de detalles de ordenes
│ ├── OrderService.ts # Servicio de creacion y obtencion de ordenes
│ ├── reviewService.ts # Servicio de creacion y obtencion de reviews asociadas a usuarios y productos
│ └── userService.ts # Servicio de creacion y obtencion de usuarios

Los servicios están tipados con interfaces definidas en `types/` y validados con esquemas manuales en `helpers/`. Esto asegura coherencia entre frontend y backend.

### Ejemplo de consumo

```ts
import { getUserById } from "@/services/userService";

const user = await getUserById("123");
```

Todos los servicios utilizan NEXT_PUBLIC_API_URL como base, definida en .env.local.

## Validaciones de datos

La carpeta `helpers/` contiene los validadores manuales que aseguran la coherencia entre los datos del frontend y las entidades del backend. Se ejecutan antes de enviar información a los servicios.

src/helpers/
├── products.ts # Validación de productos (listado completo)
├── categories.ts # Validación de categorías
├── validateProduct.ts # Validación de producto individual
├── draft/ # Validadores en etapa prototípica
│ ├── validateAuth.ts # Validación de credenciales y sesión
│ ├── validateDiscountCode.ts # Validación de códigos de descuento
│ ├── validateOrder.ts # Validación de órdenes
│ ├── validateOrderDetail.ts # Validación de detalles de órdenes
│ ├── validateReview.ts # Validación de reviews (usuario y producto)
│ └── validateUser.ts # Validación de usuarios

> Todos los validadores están alineados con los modelos del backend y permiten un control granular de los datos.

## Estado actual

La aplicación aún no está desplegada en producción. El entorno de desarrollo se ejecuta localmente mediante el comando npm run dev. La API base se define en el archivo .env.local con la variable NEXT_PUBLIC_API_URL=http://localhost:3001.

El despliegue será gestionado en etapas posteriores, una vez estabilizados los servicios y validadores.

Este archivo será actualizado conforme se incorporen nuevas funcionalidades, endpoints y procesos de despliegue.
