import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private static KEY = 'br.com.dg.aluguel.garantido';

  public static KEY_STORAGE = {
    token: `${LocalstorageService.KEY}.token`,
    tenant: `${LocalstorageService.KEY}.tenant`,
    user: `${LocalstorageService.KEY}.user`,
    fields: `${LocalstorageService.KEY}.fields`,
  }

  constructor() { }

  public set(key: any, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: any) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  }

  public remove() {
    localStorage.removeItem(LocalstorageService.KEY_STORAGE.token);
    localStorage.removeItem(LocalstorageService.KEY_STORAGE.tenant);
    localStorage.removeItem(LocalstorageService.KEY_STORAGE.user);
    localStorage.removeItem(LocalstorageService.KEY_STORAGE.fields);
  }
}
