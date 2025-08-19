import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constructor(private _snackBar: MatSnackBar) {}

  objetoAQueryString(obj: any, emptyValue?: boolean): string {
    if (!emptyValue) {
      let queryString = '';
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && key !== 'id') {
          const value = obj[key];
          if (value !== undefined && value !== null && value !== '') {
            if (typeof value === 'object') {
              queryString += `${key}=${value.id}&`;
            } else {
              queryString += `${key}=${value}&`;
            }
          }
        }
      }
      queryString = queryString.slice(0, -1);
      return queryString;
    } else {
      let queryString = '';
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && key !== 'id') {
          const value = obj[key];
          if (value !== undefined && value !== null && value !== '') {
            if (typeof value === 'object') {
              queryString += `${key}=&`;
            } else {
              queryString += `${key}=&`;
            }
          }
        }
      }
      queryString = queryString.slice(0, -1);
      return queryString;
    }
  }

  // Función para verificar si el valor es un objeto
  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  // Obtenemos las keys
  getKeysDataObject(datas: any) {
    return Object.keys(datas);
  }

  getKeysDataArray(datas: any[]): string[] {
    if (datas && datas.length > 0) {
      return Object.keys(datas[0]);
    } else {
      return [];
    }
  }

  // Obtener nombres unicos
  getUniqueName(content: any[]): string[] {
    const nombres = content?.map((company) => company.nombre);
    const nombresUnicos = [...new Set(nombres)].sort();
    return nombresUnicos;
  }

  isObjectDropdown(value: any): boolean {
    if (typeof value === 'object' && value !== null) {
      return value.nombre;
    } else {
      return value;
    }
  }

  // toma un array de strings que representa las columnas de un archivo CSV y devuelve una cadena
  // que representa la fila de encabezados CSV, donde cada elemento del array se separa por comas y
  // se agrega un salto de línea al final.
  convertirArrayACSVHeader(columnas: string[]): string {
    return columnas.join(',') + '\n';
  }

  // Mensaje de popover
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
    });
  }

  // exportar CSV
  exportarCSV(data: any[], tableName: string): void {
    const dataToExport = data;
    const csvContent = this.convertToFormatCSV(dataToExport);
    // Lógica para descargar el archivo CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${tableName}.csv'`;
    link.click();
  }

  // convierte a formate CSV
  convertToFormatCSV(data: any[]): string {
    const keys = Object.keys(data[0]);
    const header = keys.join('|');
    const rows = data.map((item) => {
      return keys
        .map((key) => {
          if (this.isObject(item[key])) {
            return item[key].nombre;
          } else {
            return item[key];
          }
        })
        .join('|');
    });
    return `${header}\n${rows.join('\n')}`;
  }

  // getKeysData(datas: any[]) {
  //   return Object.keys(datas[0]);
  // }

  // convierte la primer letra en mayuscula
  firtsUppercase(string: string): string {
    if (string) {
      const res1 = string[0].toLocaleUpperCase();
      const res2 = string.slice(1 - string.length);
      return `${res1}${res2}`;
    }
    return '';
  }

  // Junto todos los valores en un array con la key que corresponda y luego elimina los valores repetidos
  convertDataTable(dataTable: any[]): { [key: string]: (string | number)[] } {
    const resultado: { [key: string]: (string | number)[] } = {};
    for (const obj of dataTable) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (!resultado[key]) {
            resultado[key] = [];
          }
          const valor = obj[key];
          if (typeof valor === 'boolean') {
            resultado[key].push(valor.toString());
          } else {
            resultado[key].push(valor);
          }
        }
      }
    }
    for (const key in resultado) {
      if (Object.prototype.hasOwnProperty.call(resultado, key)) {
        resultado[key] = Array.from(new Set(resultado[key])).sort();
      }
    }
    const res = {
      ...resultado,
      partido: this.getUniqueName(resultado['partido']),
    };
    return res;
  }

  //Devuelve los datos vacios de las tablas
  emptyValues(data: any[]): any {
    const keys = Object?.keys(data[0]);
    const emptyValues: any = {};
    keys?.forEach((key) => {
      if (key !== 'id') {
        emptyValues[key] = '';
      }
    });
    return emptyValues;
  }

  concatStrings(str1: string, str2: string): string {
    return str1 + str2;
  }

  deleteKeysFromContent(content: any[], keysToDelete: string[]): any[] {
    // Crear un nuevo array de objetos sin las llaves especificadas
    const updatedContent = content?.map((obj) => {
      // Crear un nuevo objeto copiando todas las propiedades del objeto original
      const newObj: any = { ...obj };
      // Eliminar las llaves especificadas del nuevo objeto
      keysToDelete.forEach((key) => {
        delete newObj[key];
      });
      // Retornar el nuevo objeto
      return newObj;
    });

    // Retornar el nuevo array de objetos
    return updatedContent;
  }

  eliminarElementosFromArray<T>(arr: T[], elementosAEliminar: T[]): T[] {
    return arr.filter((elemento) => !elementosAEliminar.includes(elemento));
  }

  reemplazarValor(obj: any, claveAntigua: string, claveNueva: string) {
    if (obj.hasOwnProperty(claveAntigua)) {
      obj[claveNueva] = obj[claveAntigua];
      delete obj[claveAntigua];
    }
    return obj;
  }

  isArray(key: string, additionalData: any): boolean {
    return Array.isArray(additionalData[key]);
  }

  eliminarStringFromArray(arr: string[], str: string): string[] {
    const index = arr.indexOf(str);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  eliminarClave(array: any[], clave: string): any[] {
    return array.map((objeto) => {
      const { [clave]: omitido, ...resto } = objeto;
      return resto;
    });
  }

  verificarKey(objeto: any, key: string) {
    return objeto.hasOwnProperty(key);
  }

  //elimina el termino _id
  eliminarId(string: string): string {
    return string.replace(/_id$/, '');
  }

  isUUID(dato: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(dato);
  }

  quitarTildes(cadena: string): string {
    const tildes: any = {
      á: 'a',
      é: 'e',
      í: 'i',
      ó: 'o',
      ú: 'u',
      Á: 'A',
      É: 'E',
      Í: 'I',
      Ó: 'O',
      Ú: 'U',
    };

    return cadena
      .replace(/[áéíóúÁÉÍÓÚ]/g, (letra) => tildes[letra] || letra)
      .toLowerCase();
  }

  // traduce las keys un array de objeto de ingles a español
  translateKeys(data: any[], keys: { [key: string]: string }): any[] {
    return data?.map((item) => {
      const translatedItem: any = {};
      for (const key in item) {
        if (Object.hasOwnProperty.call(keys, key)) {
          translatedItem[keys[key]] = item[key as keyof any];
        } else {
          translatedItem[key] = item[key as keyof any];
        }
      }
      return translatedItem;
    });
  }

  translateValueToSpanish(data: any[], keys: string[]) {
    return data.map((item) => {
      keys.forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          if (item[key] === true) {
            item[key] = 'SI';
          } else if (item[key] === false) {
            item[key] = 'NO';
          }
        }
      });
      return item;
    });
  }

  translateValueToEnglish(data: any[], keys: string[]) {
    return data.map((item) => {
      keys.forEach((key) => {
        if (item.hasOwnProperty(key)) {
          if (item[key] === 'SI') {
            item[key] = true;
          } else if (item[key] === 'NO') {
            item[key] = false;
          }
        }
      });
      return item;
    });
  }

  // traduce de español a ingles elementos de un array
  translateArrayOfStringToEnglish(
    array: string[],
    nameHeaderTable: any,
  ): string[] {
    return array.reduce((acc, item) => {
      for (let key in nameHeaderTable) {
        if (nameHeaderTable[key] === item) {
          acc.push(key);
          break;
        }
      }
      return acc;
    }, [] as string[]);
  }

  // traduce las keys un array de objeto de español a ingles
  investTranslateKeys(data: any[], keysMap: any): any[] {
    const reversedKeysMap: any = Object?.fromEntries(
      Object?.entries(keysMap)?.map(([key, value]) => [value, key]),
    );

    return data?.map((item) => {
      const newItem: any = {};

      Object.entries(item)?.forEach(([key, value]) => {
        const newKey = reversedKeysMap[key] || key;
        newItem[newKey] = value;
      });

      return newItem;
    });
  }

  nameHeaderTabletring(
    keysMap: { [key: string]: string },
    value: string,
  ): string | undefined {
    const originalKey = Object?.keys(keysMap)?.find(
      (key) => keysMap[key] === value,
    );
    return originalKey;
  }

  // removeKeyAndCombine(objects: any[], keyToRemove: string): any {
  //   let combinedObject: any = {};
  //   objects.forEach(obj => {
  //     Object.keys(obj).forEach(key => {
  //       if (key !== keyToRemove) {
  //         combinedObject[key] = obj[key];
  //       }
  //     });
  //   });
  //   return combinedObject;
  // }

  // Ordena la columna de las tablas segundo el orden como se encuentra en el diccionario
  orderObject(data: any, diccionario: any) {
    var indices: any = {};
    var objectoOrdenado: any = {};
    var arrayOrdenadoObjetos: any = [];
    var result: any = [];
    const keys: any = Object.keys(diccionario);
    keys.map((key: any, index: any) => {
      indices[key] = index;
    });

    for (let i = 0; i < data.length; i++) {
      const keysData: any = Object.keys(data[i]);
      const valuesData: any = Object.values(data[i]);
      for (let j = 0; j < keysData.length; j++) {
        const element = keysData[j];
        objectoOrdenado[element] = indices[element];
      }
      arrayOrdenadoObjetos.push(this.sortObjectByValues(objectoOrdenado));
    }
    for (let i = 0; i < arrayOrdenadoObjetos.length; i++) {
      var objectoOrdenadoValues: any = {};
      const element = arrayOrdenadoObjetos[i];
      for (var key in arrayOrdenadoObjetos[i]) {
        objectoOrdenadoValues[key] = data[i][key];
      }
      result.push(objectoOrdenadoValues);
    }
    return result;
  }

  // ordena un objeto numericamente de menor a mayor por el campo value
  sortObjectByValues(obj: any) {
    var entries: any = Object.entries(obj);
    entries.sort((a: any, b: any) => a[1] - b[1]);
    var sortedObj: any = {};
    entries.forEach((entry: any) => {
      sortedObj[entry[0]] = entry[1];
    });
    return sortedObj;
  }

  public removeBase64Prefix(base64String: string): string {
    const res = base64String.split(',')[1];
    return res;
  }

  isObjectEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }

  // busca un objeto dentro del array pasandole la key y el value
  findObjectofArray(key: string, value: string, obj: any[]) {
    return obj.find((item: any) => item[key] === value);
  }

  // Cookies
  deleteCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    document.cookie =
      name +
      '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=' +
      location.hostname;
  }
}
