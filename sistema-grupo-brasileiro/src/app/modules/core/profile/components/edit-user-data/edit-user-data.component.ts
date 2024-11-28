import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { I_Employee_Form_Data } from '../../../../shared/interfaces/user/form/employee-form';
import { ProfileService } from '../../services/profile/profile.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StorageService } from '../../../../services/storage/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrl: './edit-user-data.component.css',
})
export class EditUserDataComponent {
  editForm!: FormGroup;
  activeUser!: I_Employee_View_Data | null;
  activeUserEdit!: I_Employee_Form_Data | null;

  isAvatarModalOpen = false;
  selectedAvatar!: number | undefined; 
  avatars = Array(20).fill(null);

  constructor(
    private profileService: ProfileService,
    private toastrService: ToastrService,
    private router: Router,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<EditUserDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.activeUser) {
      this.activeUser = data.activeUser;
    }
  }

  ngOnInit(): void {
    this.selectedAvatar = this.activeUser?.avatar; 
    this.activeUser = this.storageService.getSessionProfile();
    if (this.activeUser) {
      this.activeUserEdit = {
        name: this.activeUser.name || '',
        lastname: this.activeUser.lastname || '',
        phoneNumber: this.activeUser.phoneNumber || '',
        sector: this.activeUser.sector || '',
        occupation: this.activeUser.occupation || '',
        agency: this.activeUser.agency || '',
        avatar: this.activeUser.avatar,
      };
    }

    this.editForm = new FormGroup({
      name: new FormControl(this.activeUser?.name, [Validators.required]),
      lastname: new FormControl(this.activeUser?.lastname, [Validators.required]),
      phone: new FormControl(this.activeUser?.phoneNumber, [
        Validators.required,
        Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/),
      ]),
      email: new FormControl(this.activeUser?.user.email, [Validators.required, Validators.email]),
      sector: new FormControl(this.activeUser?.sector, [Validators.required]),
      occupation: new FormControl(this.activeUser?.occupation, [Validators.required]),
      nop: new FormControl(this.activeUser?.agency, [Validators.required]),
    });
  }

  get name() { return this.editForm.get('name')!; }
  get lastname() { return this.editForm.get('lastname')!; }
  get phone() { return this.editForm.get('phone')!; }
  get sector() { return this.editForm.get('sector')!; }
  get occupation() { return this.editForm.get('occupation')!; }
  get nop() { return this.editForm.get('nop')!; }

  openAvatarModal() {
    this.isAvatarModalOpen = true;
  }

  closeAvatarModal() {
    this.isAvatarModalOpen = false;
  }

  selectAvatar(index: number) {
    this.selectedAvatar = index + 1;
  }

  saveAvatar() {
    if (this.selectedAvatar !== null) {
      this.activeUserEdit!.avatar = this.selectedAvatar!;
      this.closeAvatarModal();
    } else {
      this.toastrService.error('Por favor, selecione um avatar!');
    }
  }

  submit() {
    if (this.editForm.invalid) {
      this.toastrService.error("Preencha todos os campos!");
      return;
    }

    this.activeUserEdit!.name = this.name.value;
    this.activeUserEdit!.lastname = this.lastname.value;
    this.activeUserEdit!.phoneNumber = this.phone.value;
    this.activeUserEdit!.sector = this.sector.value;
    this.activeUserEdit!.occupation = this.occupation.value;
    this.activeUserEdit!.agency = this.nop.value;

    this.profileService.updateProfileUser(this.activeUserEdit!, this.activeUser?.id).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.storageService.setSessionProfile(response.data!);
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.dialogRef.close(this.activeUser);
      },
      (err: HttpErrorResponse) => {
        this.toastrService.error(err.error.message);
      }
    );
  }


  cancel() {
    this.dialogRef.close(this.activeUser);
  }
}
