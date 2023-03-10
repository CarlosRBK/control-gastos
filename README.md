## Sistema de Control de gastos para empresa de encomiendas

Un sistema  basado en React. Utilizando MongoDB para almacenar los datos.

## 1. Funciones
  - Sistema CRUD
  - Login con JWToken (La agencia esta establecido al registrar la cuenta, sin posibilidad de cambio.)
  - Exportar en PDF y CSV.
  - Opción de filtrar e imprimir la tabla de datos.
  - Ver el total del monto en caja.

## Imágenes

![1](https://user-images.githubusercontent.com/115422555/224438376-1b55d525-6e20-4493-819b-d7520c9719a5.png)
![2](https://user-images.githubusercontent.com/115422555/224438379-8b72f800-19ac-498e-8112-0f4bf6e22ad9.png)


## 2. Instalación de dependencias
  - Abrir dos consolas, en uno abrir la carpeta *server* y en el otro al carpeta *client*.
  - En ambas carpetas ejecutar el comando `npm install`
  - Iniciar en la carpeta server con `nodemon server.js`
  - Iniciar en la carpeta client con `npm install`
  
## 3. Instalación dotenv
  -Modificar el archivo .env existente en ambas carpetas con nuestros datos. (server, client)

## Technologies Used
- [React](https://pages.github.com/)
- [ReactRouter](https://reactjs.org/docs/getting-started.html)
- [Axios](https://axios-http.com/docs/intro)
- [Express](https://expressjs.com/en/starter/installing.html)
- [SweetAlert2](https://sweetalert2.github.io/)
- [MongoDB](https://www.mongodb.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [mongoose](https://mongoosejs.com/)
- [Formik](https://formik.org/docs/api/field)
- [JWToken](https://jwt.io/)
- [jspdf](https://www.npmjs.com/package/jspdf)
- [mui-datatable](https://github.com/gregnb/mui-datatables)
