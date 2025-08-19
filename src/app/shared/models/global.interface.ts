import { Subject } from 'rxjs';

export type UnsubscribeSubject = Subject<void>;

export interface ResponseI {
  title: string;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ListParamsI {
  page: number;
  size: number;
  orderBy: string;
  direction: 'asc' | 'desc';
}

export interface PaginacionI {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface RespDialogI {
  action: string;
  id: string | undefined;
}

export interface EliminarArchivoI {
  action: string;
  message: string;
  data: string;
  id: string;
}

export interface LocalStorageI {
  status: boolean;
  accessToken: string;
  user: UserLocalStorageI;
  roles: string[];
}

export interface UserLocalStorageI {
  cuitCuilt: string;
  nombre: string;
  apellido: string;
  email: string;
  roles: string[];
  id: string;
}
