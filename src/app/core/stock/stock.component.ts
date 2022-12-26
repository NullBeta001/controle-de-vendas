import { Component, OnInit } from '@angular/core';

import { catchError, finalize, Subject, takeUntil, throwError } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { SELL_TYPE } from 'src/app/shared/consts/sell-type';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Stock } from 'src/app/shared/entities/stock/stock.model';
import { StockService } from 'src/app/shared/entities/stock/stock.service';
import { ResellerService } from 'src/app/shared/entities/reseller/reseller.service';
import { ListParams } from 'src/app/shared/entities/entity';
import { Reseller } from 'src/app/shared/entities/reseller/reseller.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  filterSelectedType: [] = [];
  filterValue: string = '';
  filterShowAll: boolean = false;

  selectedStock: Stock[] = [];
  stockList: Stock[] = [];
  stockListFiltered: Stock[] = [];
  selectedContextStock: Stock = {};

  selectedReseller: any;
  selectedResellerName: string = '';
  resellerList: Reseller[] = [];

  displayMoveModal: boolean = false;
  displaySoldModal: boolean = false;
  displaySplitProductModal: boolean = false;
  saleType: string = '';
  sellerMenuItemSelected?: MenuItem;

  isLoading: boolean = false;

  items: MenuItem[] = [
    {
      label: 'Consignado', icon: 'pi pi-fw pi-plus', items: [
        {
          label: 'Transferir', icon: 'pi pi-arrow-right-arrow-left', items: [
            {
              label: 'Meu Estoque', command: (event) => {
                this.sellerMenuItemSelected = event.item;
                this.moveToSeller();
              }
            }
          ]
        }
      ]
    },
    {
      label: 'Vendido', icon: 'pi pi-wallet', items: [
        {
          label: 'Venda Normal', command: (event) => {
            this.sale(SELL_TYPE.NORMAL);
          }
        },
        {
          label: 'Consignado', command: (event) => {
            this.sale(SELL_TYPE.CONSIGNED);
          }
        },
        {
          label: 'Vendedoras', command: (event) => {
            this.sale(SELL_TYPE.SELLER);
          }
        },
        {
          label: 'Atacado', command: (event) => {
            this.sale(SELL_TYPE.WHOLESALE);
          }
        },
        {
          label: 'Atacado > 1500', command: (event) => {
            this.sale(SELL_TYPE.WHOLESALE);
          }
        }

      ]
    }
  ];


  actionMenuitems: MenuItem[] = [
    {
      label: 'Separar', icon: 'fa-solid fa-object-ungroup', command: (event) => {
        if (this.selectedContextStock!.product!.reference!.indexOf('-') > -1) {
          this.utilsService.addMessage('error', 'Atenção', 'O produto selecionado já foi dividido.');
        } else {
          this.displaySplitProductModal = true;
        }
      }
    }
  ];

  constructor(public stockService: StockService,
    public utilsService: UtilsService,
    public resellerService: ResellerService) { }

  ngOnInit(): void {
    this.listStock();
    this.listReseller();
  }

  listReseller() {
    this.resellerService.list()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        catchError((err: any) => throwError(err))
      )
      .subscribe(resellerData => {
        this.resellerList = resellerData.contents; 
        for (let i = 0; i < resellerData.contents.length; i++) {
          const reseller = resellerData.contents[i];

          this.items![0].items![0].items!.push({
            label: reseller.name, id: reseller.id, command: (event) => {
              this.sellerMenuItemSelected = event.item;
              this.moveToSeller();
            }
          });
        }
      });
  }

  listStock() {
    let filter: ListParams = {
      size: 1000
    };
    if (this.selectedReseller) {
      filter.filterQuery = `reseller_id eq '${this.selectedReseller}'`;
    } else {
      filter.filterQuery = `reseller_id eq null`;
    }

    this.isLoading = true;
    this.stockService.list(filter)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        finalize(() => (this.isLoading = false)),
        catchError((err: any) => throwError(err))
      )
      .subscribe(stockData => {
        this.stockList = stockData.contents;
        this.stockListFiltered = this.stockList;

        this.applyFilter();
      });
  }

  onTypeFilter(target: any) {
    this.applyFilter();
  }

  selectType() {
    this.applyFilter();
  }

  selectReseller() {
    this.selectedResellerName = this.resellerList.filter((item) => item.id == this.selectedReseller)[0].name!;
    this.listStock();
  }

  applyFilter() {
    this.stockListFiltered = this.stockList;

    if (this.filterValue) {
      this.stockListFiltered = this.stockListFiltered.filter((item) => item.product!.description!.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1 ||
        item.product!.reference!.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1);
    }

    let tempFilter: Stock[] = [];
    for (let i = 0; i < this.filterSelectedType.length; i++) {

      const typeFilter = this.filterSelectedType[i];

      tempFilter = [...tempFilter, ...this.stockListFiltered.filter((item) => item.product!.reference!.indexOf(typeFilter) == 0)];
    }
    if (this.filterSelectedType.length > 0) {
      this.stockListFiltered = tempFilter;
    }
  }

  moveToSeller() {
    this.displayMoveModal = true;
  }

  sale(type: string) {
    if (this.selectedStock.length == 0) {
      this.utilsService.addMessage('warn', 'Atenção', 'Selecione ao menos um item para venda.');
      return
    }
    this.saleType = type;
    this.displaySoldModal = true;
  }

  onMoveDialogClose() {
    this.selectedStock = [];
    this.listStock();
  }

  onDialogClose() {
    this.selectedStock = [];
    this.listStock();
  }

  onSplitDialogClose() {
    this.listStock();
  }
}
