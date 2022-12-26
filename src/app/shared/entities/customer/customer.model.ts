import { CustomerProviderTypeEnum } from "../../enums/customer-provider-type.enum";

export class Customer {
  public id?: string;
  public person_type?: CustomerProviderTypeEnum;
  public document?: string;
  public document_id?: string;
  public name?: string;
  public phone?: string;
  public email?: string;

  public zipCode?: string;
  public state?: string;
  public city?: string;
  public neighborhood?: string;
  public address?: string;
  public number?: number;
  public complement?: string;  
}
