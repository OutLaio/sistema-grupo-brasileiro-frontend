import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../../services/login-register/login-register.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { I_User_Request } from '../../../shared/interfaces/user/form/user-details-form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isButtonDisabled: boolean = false;
  token!: string;

  constructor(
    private route: ActivatedRoute,
    private registerService: LoginRegisterService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
    this.registerService.verifyToken(this.token).subscribe({
      next: (res) => { this.toastrService.success(res.message)},
      error: (error: HttpErrorResponse) => {
        this.toastrService.error(error.error.message);
        this.router.navigate(['/']);
       }
    })
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-zÀ-ÿ]{3,}( [A-Za-zÀ-ÿ]+)*$'),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?:[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*){3,}$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
        ),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/),
      ]),
      sector: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      nop: new FormControl('', [Validators.required]),
    });
  }

  get name() {
    return this.registerForm.get('name')!;
  }
  get lastname() {
    return this.registerForm.get('lastname')!;
  }
  get email() {
    return this.registerForm.get('email')!;
  }
  get password() {
    return this.registerForm.get('password')!;
  }
  get phone() {
    return this.registerForm.get('phone')!;
  }
  get sector() {
    return this.registerForm.get('sector')!;
  }
  get occupation() {
    return this.registerForm.get('occupation')!;
  }
  get nop() {
    return this.registerForm.get('nop')!;
  }

  submit() {
    if (this.registerForm.invalid) {
      this.toastrService.error(
        'Erro ao realizar o cadastro. Verifique se os campos estão preenchidos corretamente.'
      );
      this.isButtonDisabled = true;
      setTimeout(() => {
        this.isButtonDisabled = false;
      }, 3000);
      return;
    }

    const data: I_User_Request = {
      employee: {
        name: this.name.value,
        lastname: this.lastname.value,
        phoneNumber: this.phone.value,
        sector: this.sector.value,
        occupation: this.occupation.value,
        agency: this.nop.value,
        avatar: 1,
      },
      user: {
        email: this.email.value,
        password: this.password.value,
        profile: 3, // 3 = Client, 2 = Collaborator, 1 = Supervisor
      },
    };

    this.registerService.registerUser(data).subscribe({
      next: () => {
        this.toastrService.success('Cadastro realizado com sucesso!');
        this.isButtonDisabled = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (value: HttpErrorResponse) => {
        this.toastrService.error(value.error.message);
      },
    });
  }
}
