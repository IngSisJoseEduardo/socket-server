import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        // obteniendo el server de node desde el de express para pasarlo al socket
        this.httpServer = new http.Server( this.app );

        // inicializando el socketIo
        this.io = socketIO(this.httpServer);

        // ejecuando la escicha de conexiones 
        this.listenSocket();
    }

    /**
     * @function instance
     * @description Regresa la unica instancia del server, mediante el Patron de diseño SINGLETON
     * @readonly
     * @static
     * @memberof Server
     */
    public static get instance(){
        return this._instance || ( this._instance = new this());
    }

    /**
     * @function listenSocket
     * @description escucha las conexiones de socket
     * @private
     * @memberof Server
     */
    private listenSocket () {
        console.log('Escuchando conexiones . sockets');

        this.io.on('connection', cliente => {
            console.log('Cliente conectado');

            // Mensajes
            socket.mensaje(cliente,this.io);

            // Desconectar
            socket.desconectar(cliente);
        });
    }

    /**
     * @function start
     * @description Inicia el servidor 
     * @param {*} callback funcion a ejecutar
     * @memberof Server
     */
    start(callback:any){
        this.httpServer.listen( this.port, callback);
    }

}