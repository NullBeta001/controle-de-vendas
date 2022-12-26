import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';

import { OPTIONS_STOCK_TYPE } from 'src/app/shared/consts/stock-type';
import { DropDownType } from 'src/app/shared/interface/drop-down.interface';
import { ResellerService } from '../entities/reseller/reseller.service';
import { LocalstorageService } from '../services/localstorage/localstorage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() showFilters: boolean = true;
  
  @Input() showTitle: boolean = false;
  @Input() title: string = '';

  @Input() filterValue: string = '';
  @Input() filterSelectedType: [] = [];
  @Input() selectedReseller: string = '';
  @Input() filterShowAll: boolean = false;
  @Input() showfilterShowAll: boolean = true;
  @Input() showfilterType: boolean = true;
  @Input() showfilterReseller: boolean = true;
  
  @Output() filterValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() filterSelectedTypeChange: EventEmitter<[]> = new EventEmitter<[]>();
  @Output() selectedResellerChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() filterShowAllChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  @Output() onTypeFilterEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSelectTypeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSelectResellerEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  private ngUnsubscribe = new Subject();
  typies: DropDownType[] = OPTIONS_STOCK_TYPE;
  resellers: DropDownType[] = [];
  showMenu: boolean = false;

  constructor(private router: Router,
              public resellerService: ResellerService,
              public localStorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.listReseller();
  }

  listReseller() {
    this.resellers = [];
    this.resellerService.list()
    .pipe(
      takeUntil(this.ngUnsubscribe),
      catchError((err: any) => throwError(err))
    )
    .subscribe(resellerData => {
      this.resellers.push({label: 'Tudo', value: ''})
      for (let i = 0; i < resellerData.contents.length; i++) {
        const reseller = resellerData.contents[i];        
        this.resellers.push({label: reseller.name!, value: reseller.id!})
      }
    });
  }

  onTypeFilter(target: any) {
    this.filterValueChange.emit(this.filterValue);
    this.onTypeFilterEvent.emit();
  }

  selectType() {
    this.filterSelectedTypeChange.emit(this.filterSelectedType);
    this.onSelectTypeEvent.emit();
  }

  selectReseller() {
    this.selectedResellerChange.emit(this.selectedReseller);
    this.onSelectResellerEvent.emit();
  }
  
  onLoggedout() {
    this.localStorageService.remove();
    this.router.navigateByUrl('/auth');
  }
}
