import { Component } from '@angular/core';
import { LoginRegisterService } from '../../../../services/login-register/login-register.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../../services/storage/storage.service';

@Component({
	selector: 'app-collaborator-system',
	templateUrl: './collaborator-system.component.html',
	styleUrl: './collaborator-system.component.css'
})
export class CollaboratorSystemComponent {

	constructor(
    private storageService: StorageService,
    private router: Router){}

	ngOnInit() {
		if (this.storageService.getUserRole() !== 'ROLE_SUPERVISOR') {
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
