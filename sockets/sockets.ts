import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import express from 'express';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente:Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}



/**
 * @function desconectar
 * @description detecta cuando se a deconectado un cliente
 * @param cliente cliente de tipo socket
 */
export const desconectar = (cliente:Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado desde archivo socket');
        usuariosConectados.borrarUsuario(cliente.id);
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

export const configUser = (cliente:Socket) => {
   cliente.on('configurar-usuario',(payload:{nombre: string}, callbak: Function) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        callbak({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado!!`
        });
   });
}