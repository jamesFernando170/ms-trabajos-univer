export namespace Keys {
  export const url_validar_token = "http://localhost:5001/validar-token"
  export const id_proponente = "61758aa953095c46f8e1daee";
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
}
