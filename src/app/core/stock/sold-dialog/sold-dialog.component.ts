import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropDownType } from 'src/app/shared/interface/drop-down.interface';
import { Stock } from 'src/app/shared/entities/stock/stock.model';
import { CustomerService } from 'src/app/shared/entities/customer/customer.service';
import { catchError, finalize, Subject, takeUntil, throwError } from 'rxjs';
import { Customer } from 'src/app/shared/entities/customer/customer.model';
import { SaleService } from 'src/app/shared/entities/sale/sale.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Sale } from 'src/app/shared/entities/sale/sale.model';

@Component({
  selector: 'app-sold-dialog',
  templateUrl: './sold-dialog.component.html',
  styleUrls: ['./sold-dialog.component.scss']
})
export class SoldDialogComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  isLoading: boolean = false;
  public form: FormGroup = new FormGroup({});

  @Input() displayModal: boolean = false;
  @Output() displayModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() header: string = 'Título Tela';
  @Input() saleType: string = '';
  @Input() stockList: Stock[] = [];

  sellPrice: number = 0;
  wholeSalePrice: number = 0;
  wholeSalePrice1500: number = 0;
  consignedPrice: number = 0;
  sellerPrice: number = 0;

  public customerSuggestion: Customer[] = [];

  buyers: DropDownType[] = [];
  stepDialog: number = 1;

  constructor(@Inject(LOCALE_ID) locale: string,
    private customerService: CustomerService,
    public utilsService: UtilsService,
    private saleService: SaleService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      discount: [0, Validators.compose([Validators.required])],
      saleDate: [new Date(), Validators.compose([Validators.required])],
      selectedCustomer: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.displayModal && changes.displayModal.currentValue) {
      this.stepDialog = 1;
      for (let i = 0; i < this.stockList.length; i++) {
        let stockItem = this.stockList[i];
        (stockItem as any).soldAmount = 1;
      }

      this.calcTotal();
    }
  }

  public onSearchCustomer(event: any) {
    this.customerService
      .list({
        filterQuery: `substringof('${event.query}',name)`
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(customer => {
        this.customerSuggestion = customer.contents;
      });
  }

  calcTotal() {
    this.sellPrice = 0;
    this.consignedPrice = 0;
    this.wholeSalePrice = 0;
    this.wholeSalePrice1500 = 0;
    this.sellerPrice = 0;

    for (let i = 0; i < this.stockList.length; i++) {
      let stockItem = this.stockList[i];
      if (!(stockItem as any).forGift) {
        this.sellPrice += stockItem.product!.sellPrice!;
        this.consignedPrice += (stockItem.product!.sellPrice!) * 0.75;
        this.wholeSalePrice += stockItem.product!.paidPrice! * 1.5;
        this.wholeSalePrice1500 += stockItem.product!.paidPrice! * 1.4;
        this.sellerPrice += (stockItem.product!.sellPrice!) * 0.70;
      }
    }
  }

  onClose() {
    this.displayModal = false;
    this.displayModalChange.emit(this.displayModal);
  }

  inputDiscount() {
    const form = this.form!.getRawValue() as any;
    this.sellPrice = this.sellPrice * (1 - (form.discount / 100));
    this.consignedPrice = this.consignedPrice * (1 - (form.discount / 100));
    this.wholeSalePrice = this.wholeSalePrice * (1 - (form.discount / 100));
    this.wholeSalePrice1500 = this.wholeSalePrice1500 * (1 - (form.discount / 100));
    this.sellerPrice = this.sellerPrice * (1 - (form.discount / 100));
  }

  onSave() {
    if (this.form!.valid) {
      const form = this.form!.getRawValue() as any;

      let data: Sale = {
        "customerId": form.selectedCustomer.id,
        "discount": form.discount,
        "paymentMethod": "teste",
        "totalInstallment": 1,
        "date": form.saleDate,
        "items": this.stockList
      };

      this.saleService.insert(data)
        .pipe(
          catchError((err: any) => throwError(err))
        )
        .subscribe((entity: any) => {
          this.utilsService.addMessage(
            "success",
            "Sucesso!",
            `Lançamento ${entity.id} salvo com sucesso`
          );
          this.form.reset({
            discount: 0,
            saleDate: new Date(),
            selectedCustomer: null
          });

          for (let i = 0; i < this.stockList.length; i++) {
            let stockItem = this.stockList[i];
            (stockItem as any).forGift = false
          }

          this.onClose();
          this.closeEvent.emit(this.displayModal);
        });
    } else {
      this.utilsService.addMessage(
        "error",
        "Atenação!",
        `Preencha todos os campos!`
      );

    }
  }
}
