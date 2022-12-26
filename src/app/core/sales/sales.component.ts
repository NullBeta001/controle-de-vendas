import { Component, OnInit } from '@angular/core';
import { catchError, finalize, Subject, takeUntil, throwError } from 'rxjs';
import { Sale } from 'src/app/shared/entities/sale/sale.model';
import { SaleService } from 'src/app/shared/entities/sale/sale.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  filterSelectedType: [] = [];
  filterValue: string = '';
  filterShowAll: boolean = false;
  
  selectedReseller: string = '';

  sales: Sale[] = [];
  salesFiltered: Sale[] = [];
  isLoading: boolean = false;

  constructor(public saleService: SaleService) { }

  ngOnInit(): void {
    this.listSale();
  }

  listSale() {
    this.isLoading = true;
    this.saleService.list()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        finalize(() => (this.isLoading = false)),
        catchError((err: any) => throwError(err))
      )
      .subscribe(saleData => {
        this.sales = saleData.contents;
        this.salesFiltered = this.sales;
        /*
        for (let i = 0; i < saleData.contents.length; i++) {
          const sale = saleData.contents[i];
        }
        */
      });
  }

  applyFilter() {
  }
}
