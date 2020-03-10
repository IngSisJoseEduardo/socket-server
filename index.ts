
import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

// llamando a la unoca instancia del server
const server = Server.instance;

// Body parser
server.app.use(bodyParser.urlencoded({ extended: true}));
server.app.use(bodyParser.json());

// CORS
server.app.use( cors({ origin: true, credentials: true }) );


// Rutas de api Rest
server.app.use('/', router)

server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});