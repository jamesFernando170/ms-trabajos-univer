/*
Variables que se usamos en cualquier comento y no cambian, siendonos muy utiles por ejemplo a la hora de necesitar la url de otros microservicios o incluso los tipos de
archivos
*/

export namespace Keys {
  export const url_validar_token = "http://localhost:5001/validar-token"
  export const id_proponente = "6181b97be9a1aa2ce021b95a";
  export const arg_token = "token";
  export const arg_id_validar = "id";
  export const asuntoSolicitud = "Su solicitud fue registrada exitosamente"
  export const urlCorreo = "http://localhost:5000/correo"
  export const hashNotificacion = "ABC123"
  export const asuntoInvitacionEvaluar = "Invitacion a evaluar una solicitud";


  //Export para la carga de archivos
  export const carpetaImagenPersonas = '../../archivos/fotos';
  export const nombreCampoImagenPersona = 'file';
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenPersona = 1024 * 1024;
  export const carpetaDocumentoPersona = '../../archivos/solicitudes';
  export const nombreCampoDocumentoPersona = 'file';
  export const extensionesPermitidasDOC: string[] = ['.PDF', '.DOC', '.DOCX', '.XLS', '.XLSX'];

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
  export const rol_administrador = "61820402b9b93c16981e4f54"; //* Cambiar al "_id" de admisitrador que tenga en MongoDB
  export const rol_jurado = "61820417b9b93c16981e4f55";
  export const rol_director = "61820430b9b93c16981e4f56";
  export const rol_auxiliar = "6181c1fbbabc9439087ed18b";
  export const arg_rol_validar = "rol";

}
