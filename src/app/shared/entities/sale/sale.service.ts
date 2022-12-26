import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Sale } from "./sale.model";
import { EntityService } from "../entity";
import { UtilsService } from "src/app/shared/utils/utils.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class SaleService extends EntityService<Sale> {
  constructor(
    protected http: HttpClient,
    protected utilsService: UtilsService
  ) {
    super(
      http,
      utilsService,
      `${environment.financeBackend}/sale`
    );
  }

}
