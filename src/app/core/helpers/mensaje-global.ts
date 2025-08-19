import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class MensajeGlobal {
  constructor(private readonly _router: Router) {}

  showMessage(
    icon: any,
    title: string,
    text: string,
    allowOutsideClick: boolean = false,
    footer?: string,
  ): void {
    Swal.fire({
      icon,
      title,
      text,
      footer,
      allowOutsideClick,
      confirmButtonColor: '#yourDesiredColor',
      confirmButtonText: 'Cerrar',
      allowEscapeKey: false,
      allowEnterKey: false,
    });
  }

  error(err: any): any {
    const status = err.status;
    let icon = 'error';
    let footer = `${err.statusText}`;

    const statusMessages: { [key: number]: { title: string; body: string } } = {
      0: {
        title: 'Error',
        body: 'Error inesperado: No se pudo conectar con el servidor',
      },
      400: {
        title: 'Bad Request (400)',
        body: 'La solicitud es incorrecta o está mal formada',
      },
      // 401: { title: 'No Autorizado (401)', body: 'Al parecer no tiene los permisos suficientes para realizar esta acción' },
      403: {
        title: 'Prohibido (403)',
        body: 'Este Usuario no se le han otorgado los permisos para realizar esta acción',
      },
      404: {
        title: 'No Encontrado (404)',
        body: 'La ruta consultada no existe',
      },
      500: {
        title: 'Error del Servidor (500)',
        body: 'Se ha presentado un error en el servidor',
      },
      501: {
        title: 'No Implementado (501)',
        body: 'El servidor no reconoce el método o carece de la capacidad para completarlo',
      },
      502: {
        title: 'Bad Gateway (502)',
        body: 'El servidor actuando como puerta de enlace o proxy ha recibido una respuesta no válida del servidor ascendente',
      },
      503: {
        title: 'Servicio no disponible (503)',
        body: 'El servidor no está listo para manejar la solicitud',
      },
      504: {
        title: 'Gateway Timeout (504)',
        body: 'El servidor actuando como puerta de enlace o proxy no recibió una respuesta oportuna del servidor ascendente',
      },
      505: {
        title: 'HTTP Version Not Supported (505)',
        body: 'La versión HTTP utilizada en la solicitud no es compatible con el servidor',
      },
    };

    if (status >= 400 && status < 500) {
      icon = 'warning';
    }

    if (status === 401) {
      window.localStorage.clear();
      this._router.navigate(['/login']);

      return this.showMessage(
        'warning',
        `No Autorizado (401)`,
        'Al parecer no tiene los permisos suficientes para realizar esta acción',
        false,
        'Por favor, intente de nuevo o contacte al administrador',
      );
    }

    if (statusMessages[status]) {
      const { title, body } = statusMessages[status];
      return this.showMessage(icon, title, body, false, footer);
    }

    if (err.error && err.error.mensaje) {
      return this.showMessage(
        icon,
        `Estatus: ${err.status}`,
        err.error.mensaje,
        false,
        footer,
      );
    }

    this.showMessage(
      icon,
      `Estatus: ${err.status}`,
      'Se ha presentado un error en la petición realizada',
      false,
      'Por favor, intentelo más tarde o contacte al administrador.',
    );
  }

  respuestaDb(respDb: any): void {
    if (respDb.error !== null) {
      return this.modificacionError();
    }

    if (respDb.descError !== null) {
      return this.modificacionOk(`${respDb.descError}`);
    }

    if (respDb.mensaje) {
      return this.noTienePermiso(`${respDb.mensaje}`);
    }
  }

  errorDb(err: any): void {
    this.showMessage(
      'error',
      `Estatus: ${err.status}`,
      `${err.error.descError}`,
      false,
      `${err.error.error}`,
    );
  }

  errorProcesoAlta(): void {
    this.showMessage(
      'error',
      'Proceso de Alta',
      'Hay Datos Erroneos, Verifique!',
      false,
      '',
    );
  }

  errorAlcifrarData(): void {
    this.showMessage(
      'error',
      '',
      'Se ha presentado un error al cifrar los datos',
      false,
      'Por favor, intentelo más tarde o contacte al administrador.',
    );
  }

  usuarioNoExiste(): void {
    this.showMessage('warning', '', 'El usuario no existe');
  }

  clienteYaExisteDb(detail: any, user: any, documento: any): void {
    this.showMessage(
      'warning',
      '',
      detail,
      false,
      `El Cliente: ${user}, con Nro documento: ${documento}  ya existe en la base de datos`,
    );
  }

  usuarioInactivo(): void {
    this.showMessage('warning', '', 'El usuario se encuentra inactivo');
  }

  noHayAplicativos(): void {
    this.showMessage(
      'warning',
      'No existen aplicativos',
      'Por favor intente más tarde, o contacte al administrador',
    );
  }

  rutaNoDispobible(): void {
    this.showMessage(
      'warning',
      '',
      'No cuenta con permisos para acceder a esta ruta',
    );
  }

  rutaNoExiste(): void {
    this.showMessage('warning', '', 'La ruta consultada no existe');
  }

  noMenu(): void {
    this._router.navigate(['/aplicativos']);
    this.showMessage(
      'info',
      'No existe menú para mostrar',
      ``,
      false,
      'Por favor, intente más tarde o contacte al administrador.',
    );
  }

  camposRequeridos(): void {
    this.showMessage(
      'warning',
      'Campos requeridos',
      'Todos los campos son requeridos',
      false,
      'Por favor, verifique los campos y vuelva a intentarlo',
    );
  }

  campoRequerido(name: string, valor: number): void {
    this.showMessage(
      'warning',
      'Campo requerido',
      `El campo: ${name} es requerido`,
      false,
      `Este campo debe tener al menos ${valor} carácteres`,
    );
  }

  noValido(name: string): void {
    this.showMessage('warning', 'No válido', `${name} es inválido`, false, '');
  }
  noExistepersona(): void {
    this.showMessage(
      'warning',
      'No existe una persona con este dni',
      ``,
      false,
      '',
    );
  }

  existePersona(): void {
    this.showMessage(
      'success',
      'Existe una persona con este dni',
      ``,
      false,
      '',
    );
  }

  realizarBusqueda(): void {
    this.showMessage(
      'warning',
      'Realizar búsqueda',
      'Debe realizar una búsqueda para continuar',
      false,
      'Por favor, verifique los campos y vuelva a intentarlo',
    );
  }

  noData(name: string): void {
    this.showMessage(
      'warning',
      `No existe: ${name}`,
      `No se encuentran datos para mostrar en: ${name}`,
      false,
      'Por favor intente más tarde, o contacte al administrador',
    );
  }

  noDocumento(): void {
    this.showMessage('info', 'El Número de Documento no existe.', '');
  }

  existeData(name: string): void {
    this.showMessage(
      'success',
      `${name} existente.`,
      ``,
      false,
      `La información de: ${name}  fue cargada en pantalla.`,
    );
  }

  noApikey(): void {
    this.showMessage(
      'warning',
      'No existe APIKEY',
      'Por favor intente más tarde, o contacte al administrador',
      false,
      'No existe APIKEY',
    );
  }

  busquedaVacia(name: string): void {
    this.showMessage(
      'warning',
      'Búsqueda vacía',
      `No se encontraron resultados para la búsqueda realizada en: ${name}`,
      false,
      'Por favor intente más tarde, o contacte al administrador',
    );
  }

  modificacionOk(name: string, footer?: string): void {
    this.showMessage(
      'success',
      'Modificación',
      `${name}`,
      false,
      `La actualización de la información fue realizada exitosamente.`,
    );
  }

  funcionalidadOk(): void {
    this.showMessage(
      'success',
      'Funcionalidad',
      `La Funcionalidad ha sido Modificada`,
    );
  }

  altaOk(): void {
    this.showMessage(
      'success',
      'Alta!',
      'La Funcionalidad ha sido dado de ALTA',
    );
  }

  borradoOk(): void {
    this.showMessage('success', 'Borrado!', `La Funcionalidad ha sido Borrado`);
  }

  altaError(err: string): void {
    this.showMessage(
      'error',
      'Alta!',
      'La Funcionalidad no pudo ser dado de ALTA',
      false,
      `${err}`,
    );
  }

  actualizadoOk(): void {
    this.showMessage('success', 'Actualzado!', `Se actualizo correctamente`);
  }

  noActualizado(): void {
    this.showMessage('warning', 'No actualizado!', `Intente de nuevo`);
  }

  grupoModificado(): void {
    this.showMessage('success', 'Modificación', `El grupo ha sido modificado`);
  }

  aplicativoModifiado(): void {
    this.showMessage(
      'success',
      'Modificación',
      `El aplicativo ha sido modificado`,
    );
  }

  eliminarOk(name: string): void {
    this.showMessage('success', 'Eliminación', `${name}`);
  }

  borradoGrupoOk(): void {
    this.showMessage('success', 'Borrado!', `El grupo ha sido Borrado`);
  }

  noTienePermiso(message: string): void {
    this.showMessage(
      'warning',
      'Sin permiso',
      'No tiene permiso para realizar esta acción',
      false,
      `${message}`,
    );
  }

  modificacionError(footer?: string): any {
    this.showMessage(
      'error',
      'Error en base de datos',
      `Se ha presentado un error en la base de datos del sistema`,
      false,
      `${footer}`,
    );
  }

  sinCambios(): void {
    this.showMessage(
      'info',
      'Sin cambios',
      'No se han realizado cambios',
      false,
    );
  }

  noArchivo(): void {
    this.showMessage(
      'warning',
      'Archivo no seleccionado',
      'Debe seleccionar un archivo',
      false,
    );
  }

  cargando(): void {
    this.showMessage('info', 'Cargando', 'Por favor espere un momento');
  }

  altaGrupoOk(name: string): void {
    this.showMessage('success', 'Alta!', `El grupo ha sido dado de ${name}`);
  }

  credemcialesIncorrectas(mesg: any): void {
    this.showMessage(
      'warning',
      'Credenciales Incorrectas',
      `${mesg.error.mensaje}`,
      false,
      'Por favor, verifique los campos y vuelva a intentarlo',
    );
  }

  asociadoOk(): void {
    this.showMessage(
      'success',
      'Asociado',
      `Se asoció correctamente el cliente`,
    );
  }

  noAsociado(): void {
    this.showMessage('warning', 'No asociado', `No se pudo asociar el cliente`);
  }

  desasociadoOk(): void {
    this.showMessage(
      'success',
      'Eliminación',
      `Se desasoció correctamente el cliente`,
    );
  }
}
