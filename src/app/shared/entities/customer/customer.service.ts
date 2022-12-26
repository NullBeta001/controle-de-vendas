import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Customer } from "./customer.model";
import { EntityService } from "../entity";
import { UtilsService } from "src/app/shared/utils/utils.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class CustomerService extends EntityService<Customer> {
  constructor(
    protected http: HttpClient,
    protected utilsService: UtilsService
  ) {
    super(
      http,
      utilsService,
      `${environment.registrationBackend}/customer`
    );
  }
}
