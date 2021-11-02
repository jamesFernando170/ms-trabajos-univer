export namespace Keys {
  export const url_validar_token = "http://localhost:5001/validar-token"
  export const id_proponente = "61758aa953095c46f8e1daee";
  export const arg_token = "token";
  export const arg_id_validar = "id";
  export const asuntoSolicitud = "Su solicitud fue registrada exitosamente"
  export const urlCorreo = "http://localhost:5000/correo"
  export const hashNotificacion = "ABC123"
  export const asuntoInvitacionEvaluar = "Invitacion a evaluar una solicitud";
<<<<<<< HEAD

  //Export para la carga de archivos
  export const carpetaImagenPersonas = '../../archivos/fotos';
  export const nombreCampoImagenPersona = 'file';
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenPersona = 1024 * 1024;
  export const carpetaDocumentoPersona = '../../archivos/solicitudes';
  export const nombreCampoDocumentoPersona = 'file';
  export const extensionesPermitidasDOC: string[] = ['.PDF', '.DOC', '.DOCX', '.XLS', '.XLSX'];
=======
  export const urlValidarUsuarios = "http://localhost:3003/usuarios-correo";
  export const urlCrearUsuarioJurado = "http://localhost:3003/usuarioJurado";
  export const arg_nombreUsuario = "nombre";
  export const arg_correo = "correo";
  export const arg_celular = "celular";
  export const arg_documento = "documento";
  export const arg_apellidos = "apellidos";
  export const arg_fecha_nacimiento = "fecha_nacimiento";
  export const mensajeUsuarioJuradoYaInscrito = "Usted ya posee un usuario. Si no recuerda su contraseña, la puede recuperar con su correo electronico en el sistema de informacion"
  export const idDeRolJurado = "617b1772c157e7583469f464"; // *Cambiar al "_id" que tenga el Rol de Jurado en la base de datos
  export const arg_id_usuario = "id_usuario";
  export const arg_id_rol = "id_rol";
  export const rol_administrador = "616dad9c8858b727d83b3390"; //* Cambiar al "_id" de admisitrador que tenga en MongoDB
  export const rol_jurado = " ";
  export const rol_director = " ";
  export const rol_auxiliar = " ";
  export const rol_proponente = " ";
  export const arg_rol_validar = "rol";
>>>>>>> b2fb0bb66ddd5fff17c327573d8f1e55f96095ca
}
