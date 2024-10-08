import { Component } from '@angular/core';
import { LoginRegisterService } from '../../../../services/login-register/login-register.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-collaborator-system',
	templateUrl: './collaborator-system.component.html',
	styleUrl: './collaborator-system.component.css'
})
export class CollaboratorSystemComponent {

	constructor(private loginRegisterService: LoginRegisterService, private router: Router){}

	ngOnInit() {
		if (this.loginRegisterService.getUserRole() !== 'ROLE_SUPERVISOR') {
			this.router.navigate(['/acompanhamento']);
		}
	}

	isFormVisible: boolean = true;

	showForm() {
		this.isFormVisible = true;
	}

	showList() {
		this.isFormVisible = false;
	}
}
