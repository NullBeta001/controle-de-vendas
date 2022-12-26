import { Product } from "../product/product.model";
import { Reseller } from "../reseller/reseller.model";

export class SaleItem {
  public id?: string;
  public saleId?: string;
  public productId?: string;
  public product?: Product;
  public amount?: number;
  public forGift?: boolean;
}
