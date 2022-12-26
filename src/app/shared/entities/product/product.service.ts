import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Product } from "./product.model";
import { EntityService } from "../entity";
import { UtilsService } from "src/app/shared/utils/utils.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class ProductService extends EntityService<Product> {
  constructor(
    protected http: HttpClient,
    protected utilsService: UtilsService
  ) {
    super(
      http,
      utilsService,
      `${environment.registrationBackend}/product`
    );
  }
  
  public createBatch(data: any) {
    return this.http.post(`${environment.registrationBackend}/product/batch`, data);
  }

  public split(data: any) {
    return this.http.post(`${environment.registrationBackend}/product/split`, data);
  }
}
