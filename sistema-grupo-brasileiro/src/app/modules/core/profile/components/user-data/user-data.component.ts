import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../../../services/login-register/login-register.service';
import { TProfile } from '../../../../types/profile-response.type';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
  userProfile!: TProfile | null;

  constructor(
    private loginRegisterService: LoginRegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userProfile = this.loginRegisterService.getUserProfile();
  }

  editProfile() {
    this.router.navigate(['/perfil/editar']);
  }
}
