const express = require ('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port =process.env.PORT;
        this.usersRoutePath = '/api/users';

        //conectar a base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();

         //rutas de mi aplicacion
        this.routes();

    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //parseo y lectura del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

   
    routes(){
        this.app.use(this.usersRoutePath,require('../routes/users'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto',this.port);
        })
    }

}

module.exports = Server;