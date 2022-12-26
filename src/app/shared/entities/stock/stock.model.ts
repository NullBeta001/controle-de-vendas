import { Product } from "../product/product.model";
import { Reseller } from "../reseller/reseller.model";

export class Stock {
  public id?: string;
  public product_id?: string;
  public amount?: number;
  public totalAmount?: number;
  public reseller_id?: string;

  public reseller?: Reseller;
  public product?: Product;
}
