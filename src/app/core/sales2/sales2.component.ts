import { Component, OnInit } from '@angular/core';
import { catchError, finalize, Subject, takeUntil, throwError } from 'rxjs';
import { SaleService } from 'src/app/shared/entities/sale/sale.service';

@Component({
  selector: 'app-sales2',
  templateUrl: './sales2.component.html',
  styleUrls: ['./sales2.component.scss'],
})
export class Sales2Component implements OnInit {
  private ngUnsubscribe = new Subject();
  filterSelectedType: [] = [];
  filterValue: string = '';
  filterShowAll: boolean = false;

  selectedReseller: string = '';

  sales: any[] = [];
  salesFiltered: any[] = [];
  isLoading: boolean = false;

  constructor(public saleService: SaleService) {}

  ngOnInit(): void {
    this.listSale();
  }

  listSale() {
    this.isLoading = true;
    this.saleService
      .list()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        finalize(() => (this.isLoading = false)),
        catchError((err: any) => throwError(err))
      )
      .subscribe((saleData) => {
        this.sales = saleData.contents;
        this.salesFiltered = this.sales;

        for (let i = 0; i < saleData.contents.length; i++) {
          const sale = saleData.contents[i];

          for (let j = 0; j < sale.items!.length; j++) {
            const item = sale.items![j];

            this.sales.push({
              customerName: sale.customer!.name,
              date: sale.date,

              reference: item.product!.reference,
              description: item.product!.description,
              amount: item.amount,
              sellPrice: item.product!.sellPrice,
            });
          }
        }
        this.salesFiltered = this.sales;
      });
  }
  applyFilter() {}
}
