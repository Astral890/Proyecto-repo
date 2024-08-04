import express from 'express'
import mysql2 from 'mysql2'
import bodyParser from 'body-parser';

import path from 'path';
import {fileURLToPath} from 'url';
const _dirname = path.dirname(fileURLToPath(import.meta.url));

const server=express();
server.set("port",3500);
server.listen(server.get("port"));

server.use(bodyParser.json());
server.use(express.static(_dirname+"/publico"))
server.use(express.static(_dirname+"/images"))

// Configuración de la base de datos
//const db = mysql2.createConnection({
//    host: '127.0.0.1',
//    user: 'root',
//    password: 'Astral',
//    database: 'Av_image'
//});

//db.connect(err => {
//    if (err) {
//        console.error('Error conectando a la base de datos:', err);
//        return;
//    }
//    console.log('Conectado a la base de datos');
//});

server.get("/",(req,res)=>{res.sendFile(_dirname+"/Hompage/index.html")})
server.get("/pant2",(req,res)=>{res.sendFile(_dirname+"/Layout/Pantalla1.html")})
server.get("/Favoritos",(req,res)=>{res.sendFile(_dirname+"/Favoritos/Fav.html")})

server.post('/register', (req, res) => {
    const { email, password, name, phone } = req.body;
    
    if (!email || !password || !name || !phone) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO Registro_users (correo, contraseña, nombre, teléfono) VALUES (?, ?, ?, ?)';
    db.query(query, [email, password, name, phone], (err, result) => {
        if (err) {
            console.error('Error insertando en la base de datos:', err);
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
        res.json({ success: true, message: 'Registro exitoso' });
    });
});
