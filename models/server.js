const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';
        this.cursosPath = '/api/cursos';

        this.conectarDB();

        this.middlewares();

        this.routes();

    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuario'));
        this.app.use(this.cursosPath, require('../routes/curso'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }
}

module.exports = Server;