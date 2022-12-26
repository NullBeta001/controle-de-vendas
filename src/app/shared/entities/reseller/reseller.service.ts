import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Reseller } from "./reseller.model";
import { EntityService } from "../entity";
import { UtilsService } from "src/app/shared/utils/utils.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class ResellerService extends EntityService<Reseller> {
  constructor(
    protected http: HttpClient,
    protected utilsService: UtilsService
  ) {
    super(
      http,
      utilsService,
      `${environment.registrationBackend}/reseller`
    );
  }
}