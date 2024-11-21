import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { I_Employee_Form_Data } from '../../../../shared/interfaces/user/form/employee-form';
import { ProfileService } from '../../services/profile/profile.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrl: './edit-user-data.component.css',
})
export class EditUserDataComponent {
  editForm!: FormGroup;
  userProfile!: I_Employee_View_Data | null;
  userProfileEdit!: I_Employee_Form_Data | null;

  constructor(
    private profileService: ProfileService,
    private toastrService: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<EditUserDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.userProfile) {
      this.userProfile = data.userProfile;
    }
  }

  ngOnInit(): void {
    this.userProfile = this.profileService.getUserProfile();
    if (this.userProfile) {
      this.userProfileEdit = {
        name: this.userProfile.name || '',
        lastname: this.userProfile.lastname || '',
        phoneNumber: this.userProfile.phoneNumber || '',
        sector: this.userProfile.sector || '',
        occupation: this.userProfile.occupation || '',
        agency: this.userProfile.agency || '',
        avatar: this.userProfile.avatar,
      };
    }

    this.editForm = new FormGroup({
      name: new FormControl(this.userProfile?.name, [Validators.required]),
      lastname: new FormControl(this.userProfile?.lastname, [Validators.required]),
      phone: new FormControl(this.userProfile?.phoneNumber, [
        Validators.required,
        Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/),
      ]),
      email: new FormControl(this.userProfile?.user.email, [Validators.required, Validators.email]),
      sector: new FormControl(this.userProfile?.sector, [Validators.required]),
      occupation: new FormControl(this.userProfile?.occupation, [Validators.required]),
      nop: new FormControl(this.userProfile?.agency, [Validators.required]),
    });
  }

  get name() { return this.editForm.get('name')!; }
  get lastname() { return this.editForm.get('lastname')!; }
  get phone() { return this.editForm.get('phone')!; }
  get sector() { return this.editForm.get('sector')!; }
  get occupation() { return this.editForm.get('occupation')!; }
  get nop() { return this.editForm.get('nop')!; }

  submit() {
    if (this.editForm.invalid) {
      this.toastrService.error("Preencha todos os campos!");
      return;
    }

    this.userProfileEdit!.name = this.name.value;
    this.userProfileEdit!.lastname = this.lastname.value;
    this.userProfileEdit!.phoneNumber = this.phone.value;
    this.userProfileEdit!.sector = this.sector.value;
    this.userProfileEdit!.occupation = this.occupation.value;
    this.userProfileEdit!.agency = this.nop.value;

    this.profileService.updateProfileUser(this.userProfileEdit!, this.userProfile?.id).subscribe(
      (response) => {
        this.toastrService.success("Dados atualizados com sucesso!");

        this.profileService.getUserProfileFromServer(this.userProfile?.id).subscribe(
          (updatedProfile) => {
            sessionStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            setTimeout(() => {
              location.reload();
            }, 1000);
          },
          (error) => {
            this.toastrService.error("Erro ao atualizar o perfil, por favor tente novamente.");
          }
        );

        this.dialogRef.close(this.userProfile);
      },
      (error) => {
        this.toastrService.error("Erro ao atualizar os dados, por favor tente novamente.");
      }
    );
  }


  cancel() {
    this.dialogRef.close(this.userProfile);
  }
}
