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
        this.registerForm.get('nonSharedCompany')?.clearValidators();
        this.registerForm.get('sharedCompanies')?.setValidators(Validators.required);
        this.registerForm.get('sharedCompanies')?.updateValueAndValidity();
      } else if (value === 'no') {
        this.registerForm.get('nonSharedCompany')?.setValidators(Validators.required);
        this.registerForm.get('sharedCompanies')?.clearValidators();
        this.registerForm.get('sharedCompanies')?.updateValueAndValidity();
      }
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
