

# 🎬 Cinerex Front

Frontend del sistema de gestión para Cinerex. Este sistema permite administrar películas, horarios, clientes, empleados, ventas y más. Construido con **Next.js 14**, **Tailwind CSS**, **TypeScript** y **Server Actions**.

## 🚀 Tecnologías

- [Next.js 14 (App Router)](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [HeroUI](https://heroui.dev/) (Componentes UI)
- [Next Auth / Cookies](https://nextjs.org/docs/app/building-your-application/authentication)
- Server Actions (para interacción directa con la DB vía el backend NestJS)

## 📁 Estructura del Proyecto

```

/app
/login
/dashboard
/clients
/employees
/movies
/showtimes
...
/components
FormAddUser.tsx
Sidebar.tsx
Topbar.tsx
/actions
/auth
/users
/movies
/showtimes
/entities
Customer.ts
Movie.ts
Employee.ts

````

## ⚙️ Configuración del Entorno

1. Clona el repositorio:

```bash
git clone https://github.com/alanuwu/cinerex-front.git
cd cinerex-front
````

2. Instala dependencias:

```bash
npm install
# o
yarn install
```

3. Crea un archivo `.env.local` con las siguientes variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

*(Modifica según la URL de tu backend en NestJS)*

4. Corre el servidor de desarrollo:

```bash
npm run dev
```

---

## 🔐 Autenticación

* El login establece una cookie llamada `auth_for_cinerex`.
* El logout elimina la cookie manualmente y redirige al login.
* Se verifica la cookie para proteger rutas privadas (dashboard y demás).

```ts
document.cookie = "auth_for_cinerex=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

---

## ✅ Funcionalidades

### 🎟️ Clientes

* Crear, listar y eliminar clientes
* Validación integrada (`customerName`, `customerEmail`, etc.)

### 🎬 Películas

* Crear, listar y eliminar películas
* Protección contra eliminación si hay horarios activos

### ⏰ Horarios

* Crear funciones asignando películas y horarios
* Validación y carga dinámica

---

## 🧪 Validaciones

Ejemplo de error controlado:

```json
{
  "message": [
    "customerName must be shorter than or equal to 40 characters",
    "customerEmail must be an email"
  ],
  "statusCode": 400,
  "error": "Bad Request"
}
```

---

## 🧠 Backend (NestJS)

Este frontend se conecta con el backend ubicado en: [cinerex-back](https://github.com/AlejandroBR10/cinerex-back)

* NestJS + PostgreSQL + Docker
* Las Server Actions del frontend hacen peticiones directas a endpoints REST protegidos por cookie.

---

## 📦 Despliegue

Este proyecto puede ser desplegado en:

* **Vercel** (recomendado)
* **Render** (junto con el backend)
* **Docker (próximamente)**

---

## 👨‍💻 Autores

* [Alejandro Balderas](https://github.com/AlejandroBR10)
* [Alan Barrera](https://github.com/alanuwu)
* [Ian Buzzo](https://github.com/IanB28)
* Equipo Cinerex

---

## 📜 Licencia

CINEREX License



¿Quieres que también incluya capturas de pantalla, rutas protegidas por middleware o ejemplos de payloads para las acciones? Puedo extenderlo según lo necesites.
```
