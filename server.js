const express = require('express');
const mysql = require("mysql2");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Alonso.12vz',
    database: 'Av_image'
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

app.post('/register', (req, res) => {
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

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});