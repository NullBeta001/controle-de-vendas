import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Stock } from "./stock.model";
import { EntityService } from "../entity";
import { UtilsService } from "src/app/shared/utils/utils.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class StockService extends EntityService<Stock> {
  constructor(
    protected http: HttpClient,
    protected utilsService: UtilsService
  ) {
    super(
      http,
      utilsService,
      `${environment.registrationBackend}/stock`
    );
  }

  public moveStock(data: any) {
    return this.http.post(`${environment.registrationBackend}/stock/move`, data);
  }
}
