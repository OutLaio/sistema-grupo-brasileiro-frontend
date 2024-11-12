import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { I_Employee_View_Data } from '../../../../shared/interfaces/user/view/employee-view';
import { ProfileService } from '../../services/profile/profile.service';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../../../services/login-register/login-register.service';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrl: './edit-user-data.component.css',
})
export class EditUserDataComponent {
  editForm!: FormGroup;
  userProfile!: I_Employee_View_Data | null;

  constructor(
    private profileService: ProfileService,
    private toastrService: ToastrService,
    private router: Router,
    private loginRegisterService: LoginRegisterService,
  ) { }

  ngOnInit(): void {
    this.userProfile = this.profileService.getUserProfile();

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

  submit() {
    if (this.editForm.invalid) {
      this.toastrService.error("Preencha todos os campos!")
      return;
    }
    this.userProfile!.name = this.name.value;
    this.userProfile!.lastname = this.lastname.value;
    this.userProfile!.phoneNumber = this.phone.value;
    this.userProfile!.sector = this.sector.value;
    this.userProfile!.occupation = this.occupation.value;
    this.userProfile!.agency = this.nop.value;
    this.profileService.updateProfileUser(this.userProfile!).subscribe((response) => {
      console.log(response);
      this.toastrService.success("Dados atualizados com sucesso!");
      this.router.navigate(['/perfil']);
    });
  }

  cancel() {
    this.router.navigate(['/perfil']);
  }
}
