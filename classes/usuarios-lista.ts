import { Usuario } from './usuario';
export class UsuariosLista {
    private lista: Usuario[] = [];
     constructor(){

     }


    //  agregar un usuario
     public agregar(usuario: Usuario){
         this.lista.push(usuario);
         console.log(this.lista);
         return usuario;
     }


    //  actualiza el nombre de los usuario que no tiene nombre
     public actualizarNombre(id: string, nombre: string) {
        for (const usuario of this.lista) {

            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
            
        }

        console.log('Actualizando usuario');
        console.log(this.lista);
     }


    //  obtener lista de usuarios
    public getLista() {
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre');
    }


    // obteniendo un usaurio
    public getUsuario(id: string){
        return this.lista.find( usuario => usuario.id === id);
    }

    // obtener usuarios en una sala
    public getUsuarioSala(sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala );
    }

    // borrar un usuario de la sala
    public borrarUsuario(id: string) {
        const tempUser = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id );
        console.log(this.lista);

        return tempUser;
    }
}