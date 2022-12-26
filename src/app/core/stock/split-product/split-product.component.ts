import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { finalize, Subject, takeUntil, tap } from 'rxjs';
import { ProductService } from 'src/app/shared/entities/product/product.service';
import { Stock } from 'src/app/shared/entities/stock/stock.model';

@Component({
  selector: 'app-split-product',
  templateUrl: './split-product.component.html',
  styleUrls: ['./split-product.component.scss']
})
export class SplitProductComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  @Input() displayModal: boolean = false;
  @Output() displayModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() produckStock?: Stock;

  listNewStocKProduct: Stock[] = [];
  splitTimes: number = 2;
  newPrice: number = 0;
  originalPrice: number = 0;
  counter = Array;
  
  isLoading: boolean = false;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.displayModal && changes.displayModal.currentValue) {
      this.newPrice = this.produckStock?.product?.sellPrice! / this.splitTimes;
      this.originalPrice = this.produckStock?.product?.sellPrice!;

      this.inputSplitTimes();
    }
  }

  onClose() {
    this.displayModal = false;
    this.displayModalChange.emit(this.displayModal);
  }

  inputSplitTimes() {
    this.listNewStocKProduct = [];

    let referenceSplit = this.produckStock!.product!.reference!.split('.');
    for (let i = 0; i < this.splitTimes; i++) {
      let stockProduct = JSON.parse(JSON.stringify(this.produckStock));
      stockProduct!.product!.sellPrice = Math.ceil(this.produckStock?.product?.sellPrice! / this.splitTimes);
      stockProduct!.product!.paidPrice = this.produckStock?.product?.paidPrice! / this.splitTimes;

      stockProduct!.product!.reference = referenceSplit[0] + `-${i+1}.` + referenceSplit[1];      
      this.listNewStocKProduct.push(stockProduct);      
    }
  }

  onSave() {
    this.isLoading = true;
    this.productService.split({
      originalProdcutStock: this.produckStock!,
      splittedProducts: this.listNewStocKProduct
    })
    .pipe(
      takeUntil(this.ngUnsubscribe),
      finalize(() => (this.isLoading = false)),
    )
    .subscribe(() => {
      this.displayModal = false;
      this.displayModalChange.emit(this.displayModal);
      this.closeEvent.emit();
    })
  }

}
