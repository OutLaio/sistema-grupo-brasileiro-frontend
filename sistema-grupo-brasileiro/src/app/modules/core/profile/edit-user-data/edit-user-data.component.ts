import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileResponse } from '../../../types/profile-response.type';
import { EditProfileService } from '../../../services/profile/edit-profile.service';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrl: './edit-user-data.component.css',
})
export class EditUserDataComponent {
  editForm!: FormGroup;
  profileUser!: ProfileResponse;

  constructor(
    private editProfileService: EditProfileService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/),
      ]),
      sector: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      nop: new FormControl('', [Validators.required]),
    });

    this.editProfileService.getProfileUser().subscribe((value)=>{
      this.profileUser = value;
    })
  }

  get name() {
    return this.editForm.get('name')!;
  }
  get lastname() {
    return this.editForm.get('lastname')!;
  }
  get phone() {
    return this.editForm.get('phone')!;
  }
  get sector() {
    return this.editForm.get('sector')!;
  }
  get occupation() {
    return this.editForm.get('occupation')!;
  }
  get nop() {
    return this.editForm.get('nop')!;
  }

  submit(){
    if(this.editForm.invalid) return;
  }

  cancel(){
    this.toastrService.success('Retornando...');
    this.editForm.reset();
  }
}