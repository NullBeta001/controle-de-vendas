import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Customer } from 'src/app/shared/entities/customer/customer.model';
import { CustomerService } from 'src/app/shared/entities/customer/customer.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  @Input() displayModal: boolean = false;
  @Output() displayModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() customer: Customer = {};

  public form: FormGroup = new FormGroup({});
  isLoading = false;
  binding = 'aa';

  constructor(public customerService: CustomerService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required, Validators.maxLength(250)])],
      email: [null, Validators.compose([Validators.required, Validators.maxLength(250)])],
      person_type: ['PF', Validators.compose([Validators.required, Validators.maxLength(2)])],
      document: [null, Validators.compose([Validators.maxLength(50)])],
      documentId: [null, Validators.compose([Validators.maxLength(50)])],
      phone: [null, Validators.compose([Validators.required, Validators.maxLength(50)])]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.displayModal && changes.displayModal.currentValue) {
      this.form.patchValue(this.customer)
    } else {
      this.form.reset({
        person_type: ['PF', Validators.compose([Validators.required, Validators.maxLength(2)])]
      });
    }
  }

  onSave() {
    if (this.form!.valid) {
      this.form!.disable();
      const form = this.form!.getRawValue() as any;

      this.isLoading = true;
      if (this.customer) {         
        this.customerService.update(this.customer.id!, form)
        .pipe(
          takeUntil(this.ngUnsubscribe),
          finalize(() => {
            this.isLoading = false;
            this.form!.enable();
          }),
        )
        .subscribe(() => {
          this.displayModal = false;
          this.displayModalChange.emit(this.displayModal);
          this.closeEvent.emit();
        });
      } else {
        this.customerService.insert(form)
          .pipe(
            takeUntil(this.ngUnsubscribe),
            finalize(() => {
              this.isLoading = false;
              this.form!.enable();
            }),
          )
          .subscribe(() => {
            this.displayModal = false;
            this.displayModalChange.emit(this.displayModal);
            this.closeEvent.emit();
          });
      }
        
    }
  }

  onClose() {
    this.displayModal = false;
    this.displayModalChange.emit(this.displayModal);
    this.closeEvent.emit(this.displayModal);
  }
}
