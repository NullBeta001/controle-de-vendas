import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/entities/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {

  @ViewChild('username', { static: false }) username: any;

  form: FormGroup<{
    email: FormControl<string>,
    password: FormControl<string>,
  }>
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { 
    this.form = this.createForm();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.username.nativeElement.focus();
  }

  createForm(){
    return this.fb.nonNullable.group({
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      password: this.fb.nonNullable.control('', [Validators.required]),
    })
  }

  async onLogin() {
    console.log(this.form.valid);
    this.isLoading = true;
    await this.authService.loginRoutine(this.form.getRawValue())
    this.isLoading = false;
  }

  onForgetPassword() {
    alert('Fazer esqueci a senha')
  }

}
