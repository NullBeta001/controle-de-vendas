import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, Subject, takeUntil, throwError } from 'rxjs';
import { ImportProduct } from 'src/app/shared/interface/import-product.interface';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import * as XLSX from 'xlsx';
import { ProductService } from 'src/app/shared/entities/product/product.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})

export class ImportComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  uploadedFiles: any[] = [];
  step: number = 1;
  products: ImportProduct[] = [];
  discount: number = 0;
  profit: number = 0;
  totalValue: number = 0;
  totalValueDiscount: number = 0;
  totalValueProfit: number = 0;
  loading: boolean = false;

  data: any[][] = [
    ['default']
  ];

  constructor(public productService: ProductService,
              public utilsService: UtilsService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.complete();
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    const reader = new FileReader();

    reader.onload = () => {
      this.products = [];

      const wb = XLSX.read(reader.result, { type: 'binary' });
      
      //for (let i = 0; i < wb.SheetNames.length; i++) {
        const tableName = wb.SheetNames[0];
        const sheetWBook = wb.Sheets[tableName];
        
        this.data = <any[][]>(XLSX.utils.sheet_to_json(sheetWBook, { header: 1 }));

        for (let j = 1; j < this.data.length; j++) {
          const line = this.data[j];

          let findIndex = this.products.findIndex((item) =>  item.reference == line[0] );
          if (findIndex > -1) {
            this.products[findIndex].amount += line[2];
          } else {            
            this.products.push({
              reference: line[0],
              description: line[1],
              amount: line[2],
              originalPrice: line[3],
              paidPrice: line[3],
              sellPrice: line[3],
              paidDiscount: this.discount,
              profitPerc: this.profit
            });
          }

          this.totalValue += line[3];
          this.totalValueDiscount += line[3];
        }
      //}

      this.inputProfit();
      this.step++;
    };

    reader.readAsBinaryString(event.files[0]);
  }

  inputDiscount() {
    this.totalValueDiscount = 0;
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      product.paidPrice = product.originalPrice * (1-(this.discount / 100));
      product.paidDiscount = this.discount;
      this.totalValueDiscount += product.paidPrice * product.amount;
    }

    this.inputProfit();
  }

  inputProfit() {
    this.totalValueProfit = 0;
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      product.sellPrice = Math.ceil(product.paidPrice! * (1+(this.profit / 100)));
      product.profitPerc = this.profit;
      this.totalValueProfit += product.sellPrice * product.amount;
    }
  }


  saveProduct() {
    let payload = {
      products: this.products
    }
    
    this.loading = true;
    this.productService.createBatch(payload)
    .pipe(
      takeUntil(this.ngUnsubscribe),
      finalize(() => (this.loading = false)),
      catchError((err: any) => throwError(err))
    )
    .subscribe(customer => {
      this.utilsService.addMessage(
        "success",
        "Sucesso!",
        "Produtos importados com sucesso."
      );
      this.router.navigate(['/', 'stock']);
    });

  }
}
