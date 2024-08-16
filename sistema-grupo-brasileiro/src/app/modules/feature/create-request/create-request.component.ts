import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {
  registerForm!: FormGroup;
  availableCompanies = ['Rota Transportes', 'Brasileiro', 'Cidade Sol', 'Outra'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      signLocation: ['', Validators.required],
      dimensions: this.fb.array([this.fb.control('')]),
      signType: ['', Validators.required],
      materials: ['', Validators.required],
      sharedWithCompany: ['', Validators.required],
      sharedCompanies: this.fb.array([]),
      nonSharedCompany: [''],
      otherCompany: [''],
      RotaTransportes: [false],
      Brasileiro: [false],
      CidadeSol: [false],
      outros: [false], // <-- Verificar a nomenclatura para consistência
    });

    this.onChanges();
  }

  get dimensions(): FormArray {
    return this.registerForm.get('dimensions') as FormArray;
  }

  addDimension() {
    this.dimensions.push(this.fb.control(''));
  }

  removeDimension(index: number) {
    this.dimensions.removeAt(index);
  }

  get sharedCompanies(): FormArray {
    return this.registerForm.get('sharedCompanies') as FormArray;
  }

  addCompany() {
    this.sharedCompanies.push(this.fb.control(''));
  }

  removeCompany(index: number) {
    this.sharedCompanies.removeAt(index);
  }

  onChanges(): void {
    this.registerForm.get('sharedWithCompany')?.valueChanges.subscribe(value => {
      if (value === 'yes') {
        this.registerForm.get('RotaTransportes')?.setValidators(Validators.required);
        this.registerForm.get('Brasileiro')?.setValidators(Validators.required);
        this.registerForm.get('CidadeSol')?.setValidators(Validators.required);
        this.registerForm.get('outros')?.setValidators(Validators.required);
        this.registerForm.get('nonSharedCompany')?.clearValidators();
        this.registerForm.get('otherCompany')?.clearValidators();
      } else if (value === 'no') {
        this.registerForm.get('RotaTransportes')?.clearValidators();
        this.registerForm.get('Brasileiro')?.clearValidators();
        this.registerForm.get('CidadeSol')?.clearValidators();
        this.registerForm.get('outros')?.clearValidators();
        this.registerForm.get('nonSharedCompany')?.setValidators(Validators.required);
      }
      this.registerForm.get('RotaTransportes')?.updateValueAndValidity();
      this.registerForm.get('Brasileiro')?.updateValueAndValidity();
      this.registerForm.get('CidadeSol')?.updateValueAndValidity();
      this.registerForm.get('outros')?.updateValueAndValidity();
      this.registerForm.get('nonSharedCompany')?.updateValueAndValidity();
    });

    this.registerForm.get('nonSharedCompany')?.valueChanges.subscribe(value => {
      if (value === 'Outra') {
        this.registerForm.get('otherCompany')?.setValidators(Validators.required);
      } else {
        this.registerForm.get('otherCompany')?.clearValidators();
      }
      this.registerForm.get('otherCompany')?.updateValueAndValidity();
    });
  }

  submit() {
    console.log(this.registerForm.value);
  }
}
