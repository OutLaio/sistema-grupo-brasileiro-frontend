import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../../services/login-register/login-register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { I_Api_Response } from '../../../shared/interfaces/api-response';
import { I_Login_Request } from '../../../shared/interfaces/auth/form/login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private loginService: LoginRegisterService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  get email(){return this.loginForm.get('email')!;}
  get password(){return this.loginForm.get('password')!;}

  submit(){
    if(this.loginForm.invalid){return}
    const data: I_Login_Request = {
      email: this.email.value,
      password: this.password.value
    }
    this.loginService.loginUser(data).subscribe({
      next: (res) =>{
        this.toastrService.success(res.message),
        this.router.navigate(['/acompanhamento']);
      },
      error: (value: HttpErrorResponse) =>{
        this.toastrService.error(value.error.message);
      }
    })
  }
}
