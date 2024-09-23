import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TProfile } from '../../../../types/profile-response.type';
import { ProfileService } from '../../services/profile/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrl: './edit-user-data.component.css',
})
export class EditUserDataComponent {
  editForm!: FormGroup;
  profileUser!: TProfile;

  constructor(
    private editProfileService: ProfileService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editProfileService.getProfileUser().subscribe((value) => {
      this.profileUser = value;
    });

    this.editForm = new FormGroup({
      name: new FormControl(this.profileUser.name, [Validators.required]),
      lastname: new FormControl(this.profileUser.lastname, [Validators.required]),
      phone: new FormControl(this.profileUser.phone, [
        Validators.required,
        Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/),
      ]),
      email: new FormControl(this.profileUser.email, [Validators.required]),
      sector: new FormControl(this.profileUser.sector, [Validators.required]),
      occupation: new FormControl(this.profileUser.occupation, [Validators.required]),
      nop: new FormControl(this.profileUser.nop, [Validators.required]),
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

  submit(){
    if(this.editForm.invalid){
      this.toastrService.error("Preencha todos os campos!")
      return;
    }
    this.profileUser.name = this.name.value;
    this.profileUser.lastname = this.lastname.value;
    this.profileUser.phone = this.phone.value;
    this.profileUser.sector = this.sector.value;
    this.profileUser.occupation = this.occupation.value;
    this.profileUser.nop = this.nop.value;
    this.editProfileService.updateProfileUser(this.profileUser).subscribe((response) => {
      console.log(response);
      this.toastrService.success("Dados atualizados com sucesso!");
      this.router.navigate(['/perfil']);
    });
  }

  cancel(){
    this.toastrService.warning('Retornando...');
    this.router.navigate(['/perfil']);
  }
}
