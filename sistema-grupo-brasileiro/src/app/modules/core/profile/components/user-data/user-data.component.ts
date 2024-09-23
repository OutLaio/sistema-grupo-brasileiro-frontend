import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { TProfile } from '../../../../types/profile-response.type';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css',
})
export class UserDataComponent implements OnInit {
  profileUser!: TProfile;

  constructor(
    private userService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getProfileUser().subscribe((value) => {
      this.profileUser = value;
    })
  }

  editProfile(){
    this.router.navigate(['/perfil/editar'])
  }
}
