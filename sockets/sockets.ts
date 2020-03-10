import { Socket } from 'socket.io';
import socketIO from 'socket.io';



/**
 * @function desconectar
 * @description detecta cuando se a deconectado un cliente
 * @param cliente cliente de tipo socket
 */
export const desconectar = (cliente:Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado desde archivo socket');
    });
}


/**
 * @function mensaje
 * @description escucha mensajes
 * @param cliente cliente de tipo socket
 */
export const mensaje = (cliente:Socket, io:socketIO.Server) => {
    
    cliente.on('mensaje',(payload:{de:string,cuerpo:string})=> {
        console.log('Mensaje recibido: ', payload);


        io.emit('mensaje-nuevo', payload);
    });
}