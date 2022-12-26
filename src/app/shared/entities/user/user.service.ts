import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environments/environment';
import { EntityService, FilterType } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityService<User> {

  constructor(
    protected http: HttpClient,
    protected messageService: MessageService,
    protected utils: UtilsService
  ) {
    super(http, utils, `${environment.authenticationBackend}/user`);
  }

  public getActiveUser() {
    return this.http.get<User>(`${this.entityUrl}/active`);
  }

  public resetPassword(email: string) {
    return this.http.post<User>(`${this.entityUrl}/reset-password`, {
      email: email
    });
  }
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  enable: boolean;
}

