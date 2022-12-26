import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { User } from '../../interface/users.interface';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private localstorageService: LocalstorageService,
    private router: Router,
    private messageService: MessageService
  ) { }

  getActiveUser() {
    let token = this.localstorageService.get<string>(LocalstorageService.KEY_STORAGE.token);
    return this.httpClient.get<User>(`${environment.authenticationBackend}/user/active`, { headers: { 'x-api-key': token || '' } });
  }

  resetPassword(email: string) {
    return this.httpClient.post<string>(`${environment.authenticationBackend}/user/reset-password`, {
      email: email
    });;
  }

  login(data: { email: string, password: string }) {
    return this.httpClient.post(`${environment.authenticationBackend}/login`, data);
  }

  async loginRoutine(data: {email: string, password: string}) {
    try {
      const token = await this.login(data).toPromise() as any;
      this.localstorageService.set(LocalstorageService.KEY_STORAGE.token, token.authorization);
      this.localstorageService.set(LocalstorageService.KEY_STORAGE.tenant, token.schema);
      const user = await this.getActiveUser()?.toPromise();
      this.localstorageService.set(LocalstorageService.KEY_STORAGE.user, user);
      this.router.navigate(['/stock']);
    } catch (err: any) {
      if (err && err.error?.message) this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error?.message });
      console.log('ERRO - onLogin', err);
    }
  }
}

export interface Login {
  email: string;
  password: string;
}
