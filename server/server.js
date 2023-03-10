require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors')
const puerto = process.env.PUERTO; 
// const jwt = require("jsonwebtoken");
// const secretKey = process.env.SECRET_KEY
// const payload = {
//   _id: '12344343'
// };
// const myJWT = jwt.sign(payload, secretKey);
// console.log(myJWT)

require('./config/mongoose.config');
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000', exposedHeaders: ['kd_token']}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes/data.routes')(app);
require('./routes/usuarios.routes')(app);

app.listen(puerto, () => {
    console.log("Listening at Port " +puerto)
});