import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { catchError, finalize, Subject, takeUntil, throwError } from 'rxjs';
import { Customer } from 'src/app/shared/entities/customer/customer.model';
import { CustomerService } from 'src/app/shared/entities/customer/customer.service';
import { ListParams } from 'src/app/shared/entities/entity';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  filterValue: string = '';
  isLoading: boolean = false;
  customerList: Customer[] = [];
  customerListFiltered: Customer[] = [];

  displayNewModal: boolean = false;
  editData?: Customer;

  constructor(public customerService: CustomerService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.listCustomer();
  }

  listCustomer() {
    let filter: ListParams = {
      size: 1000,
      orderBy: 'name'
    };
    /*
    if (this.selectedReseller) {
      filter.filterQuery = `reseller_id eq '${this.selectedReseller}'`;
    } else {
      filter.filterQuery = `reseller_id eq null`;
    }
    */

    this.isLoading = true;
    this.customerService.list(filter)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        finalize(() => (this.isLoading = false)),
        catchError((err: any) => throwError(err))
      )
      .subscribe(customerData => {
        this.customerList = customerData.contents;
        this.customerListFiltered = this.customerList;

        this.applyFilter();
      });
  }


  onDialogClose() {
    this.listCustomer();
    this.editData = undefined;
  }

  edit(data: Customer) {
    this.editData = data;
    this.displayNewModal = true;
  }

  delete(data: Customer) {


    this.confirmationService.confirm({
      message: "Deseja excluir o registro selecionado?",
      header: "Excluir",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.customerService.delete(data.id!)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.listCustomer();
          });
      }
    });
  }

  applyFilter() { }
}
