export interface Config {
  appConfig: AppConfig;
}

export interface AppConfig {
  apiUrl: string;
  administracion: string;
  seguridad: string;
  transferencias: string;
  interdictos: string;
  clientes: string;
  PUBLIC_KEY: string;
}
