# 🚗 RentACar — Prueba Técnica

Aplicación web para gestionar el alquiler de carros.  
Permite ver los autos disponibles, hacer reservas, calcular el total y mostrar qué usuario reservó cada auto.

---

## 🌐 Enlaces

- **Demo en Vercel:** [https://car-rental-wheat-two.vercel.app/](https://car-rental-wheat-two.vercel.app/)
- **Repositorio GitHub:** [https://github.com/jorgeandd1/car-rental](https://github.com/jorgeandd1/car-rental)

---

## 💻 Tecnologías utilizadas

- **Next.js 15**  
- **TypeScript**  
- **Tailwind CSS**  
- **Supabase (Base de datos PostgreSQL)**  
- **React Hook Form** y **Zod** (validaciones)  
- **SWR** (actualización de datos en tiempo real)

---

## ⚙️ Funcionalidades principales

- Listado de autos con imagen, precio y estado (disponible / no disponible).  
- Reservar autos seleccionando fecha de inicio y fin.  
- Cálculo automático del total (precio × días).  
- Mostrar quién reservó el auto y las fechas.  
- Validaciones si faltan fechas al reservar.  
- CRUD de autos en módulo administrador.  
- Despliegue automático con Vercel.

---

## 🧠 Cómo correr el proyecto en local

1️⃣ Clona el repositorio:
```bash
git clone https://github.com/jorgeandd1/car-rental.git
```

2️⃣ Entra a la carpeta del proyecto:
```bash
cd car-rental
```

3️⃣ Instala las dependencias:
```bash
npm install
```

4️⃣ Ejecuta el servidor local:
```bash
npm run dev
```

5️⃣ Abre en el navegador:
http://localhost:3000


## Decisiones tomadas

Durante el desarrollo del proyecto se tomaron las siguientes decisiones técnicas y de diseño:

1. Framework: Se eligió Next.js 15 con TypeScript por su facilidad de manejo del enrutamiento, soporte para API Routes y despliegue directo en Vercel.

2. Base de datos: Se usó Supabase como backend (PostgreSQL administrado) para simplificar la conexión, autenticación y persistencia de datos.

3. Estructura: Se organizó el código bajo app/ (App Router) siguiendo las buenas prácticas de modularidad y separación de responsabilidades.

4. Diseño: Se utilizó Tailwind CSS para lograr un estilo limpio, moderno y responsive sin sobrecargar el proyecto.

5. Validaciones: Se integró React Hook Form con Zod para manejar formularios y asegurar que no se creen reservas sin fechas.

7. Reactividad: Se incorporó SWR para actualizar dinámicamente el estado de los autos al reservar o liberar un vehículo.

8. UX: Se agregaron mensajes tipo toast para informar al usuario cuando falta información o cuando la reserva fue creada correctamente.

9. Despliegue: Se optó por Vercel debido a su integración nativa con Next.js y soporte continuo de CI/CD desde GitHub.

10. Imágenes: Las imágenes se almacenaron localmente en public/images/cars para facilitar la carga sin depender de URLs externas.


👨‍💻 Autor

Jorge Durán
Frontend Developer Jr.
📍 Medellín, Colombia
✉️ jorgeandd1@gmail.com

🌐 LinkedIn: https://www.linkedin.com/in/jorge-andres-duran-cotamo-b761b61a1/?originalSubdomain=co



