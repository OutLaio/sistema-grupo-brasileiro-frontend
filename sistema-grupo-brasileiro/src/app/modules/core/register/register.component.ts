import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

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
      function: new FormControl('', [Validators.required]),
      nop: new FormControl('', [Validators.required]),
    });
  }

  get name() {return this.registerForm.get('name')!;}
  get lastname() {return this.registerForm.get('lastname')!;}
  get email() {return this.registerForm.get('email')!;}
  get password() {return this.registerForm.get('password')!;}
  get phone() {return this.registerForm.get('phone')!;}
  get department() {return this.registerForm.get('department')!;}
  get function() {return this.registerForm.get('function')!;}
  get nop() {return this.registerForm.get('nop')!;}

  submit() {
    if(this.registerForm.invalid) return;

  }
}
