import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private registerService: RegisterService,
    private toastrService: ToastrService
  ){}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
        ),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/),
      ]),
      department: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      nop: new FormControl('', [Validators.required]),
    });
  }

  get name() {return this.registerForm.get('name')!;}
  get lastname() {return this.registerForm.get('lastname')!;}
  get email() {return this.registerForm.get('email')!;}
  get password() {return this.registerForm.get('password')!;}
  get phone() {return this.registerForm.get('phone')!;}
  get department() {return this.registerForm.get('department')!;}
  get occupation() {return this.registerForm.get('occupation')!;}
  get nop() {return this.registerForm.get('nop')!;}

  submit() {
    if(this.registerForm.invalid) return;

    this.registerService.registerUser(
      this.name.value,
      this.lastname.value,
      this.email.value,
      this.password.value,
      this.phone.value,
      this.department.value,
      this.occupation.value,
      this.nop.value
    ).subscribe({
      next: () => this.toastrService.success("Cadastro realizado com sucesso!"),
      error: () => this.toastrService.error("Erro inesperado! Tente novamente mais tarde!")
    })
  }
}
