import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SanitizerUtil {
  constructor() {}

  public sanitizeData(data: unknown): unknown {
    const sanitizeObject = (
      obj: Record<string, unknown>,
    ): Record<string, unknown> => {
      for (const key in obj) {
        if (obj[key] === null || obj[key] === undefined) {
          obj[key] = '';
        } else if (typeof obj[key] === 'object') {
          obj[key] = sanitizeObject(obj[key] as Record<string, unknown>);
        }
      }
      return obj;
    };

    if (Array.isArray(data)) {
      return data.map((item) =>
        sanitizeObject(item as Record<string, unknown>),
      );
    }
    return sanitizeObject(data as Record<string, unknown>);
  }
}
