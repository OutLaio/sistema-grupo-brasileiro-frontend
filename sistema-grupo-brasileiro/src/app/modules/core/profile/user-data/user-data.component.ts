import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css',
})
export class UserDataComponent {

  constructor(private router: Router) { }
  editProfile(){
    this.router.navigate(['/perfil/editar'])
  }
}
