import { Customer } from "../customer/customer.model";
import { Reseller } from "../reseller/reseller.model";
import { SaleItem } from "../sale-item/sale-item.model";

export class Sale {
  public id?: string;
  public resellerId?: string;
  public customerId?: string;
  public discount?: number;
  public paymentMethod?: string;
  public totalInstallment?: number;
  public totalValue?: number;
  public date?: Date;

  public reseller?: Reseller;
  public customer?: Customer;
  public items?: SaleItem[];
}
