import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Stock } from 'src/app/shared/entities/stock/stock.model';
import { StockService } from 'src/app/shared/entities/stock/stock.service';

@Component({
  selector: 'app-move-dialog',
  templateUrl: './move-dialog.component.html',
  styleUrls: ['./move-dialog.component.scss']
})
export class MoveDialogComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  @Input() displayModal: boolean = false;
  @Output() displayModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() header: string = 'Título Tela';
  @Input() stockList: Stock[] = [];
  @Input() sellerData?: any;

  isLoading: boolean = false;

  constructor(public stockService: StockService,
              public utilsService: UtilsService) { }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.displayModal && changes.displayModal.currentValue) {
      for (let i = 0; i < this.stockList.length; i++) {
        const stockItem = this.stockList[i];
        (stockItem as any).moveAmount = 1;      
      }
    }
  }

  onClose() {
    this.displayModal = false;
    this.displayModalChange.emit(this.displayModal);
    this.closeEvent.emit(this.displayModal);
  }

  onSave() {
    for (let i = 0; i < this.stockList.length; i++) {
      const item = this.stockList[i];
      if ((item as any).moveAmount > item.amount!) {
        this.utilsService.addMessage('error', 'Atenção!', 'Não possui a quantidade informada no estoque para mover.');
      }
    }

    this.isLoading = true;
    this.stockService.moveStock({
      stockList: this.stockList,
      sellerData: this.sellerData
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
