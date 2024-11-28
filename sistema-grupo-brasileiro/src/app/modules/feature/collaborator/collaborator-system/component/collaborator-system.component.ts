import { Component, HostListener } from '@angular/core';
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
		private router: Router
	) {}

	isFormVisible: boolean = true;
	isMobile: boolean = false;

	ngOnInit() {
		if (this.storageService.getUserRole() !== 'ROLE_SUPERVISOR') {
			this.router.navigate(['/acompanhamento']);
		}
		this.checkIfMobile(); // Verificar se é mobile ao iniciar
	}

	@HostListener('window:resize', [])
	onResize() {
		this.checkIfMobile();
	}

	private checkIfMobile() {
		this.isMobile = window.innerWidth <= 768; // Define 768px como ponto de corte para mobile
	}

	showForm() {
		this.isFormVisible = true;
	}

	showList() {
		this.isFormVisible = false;
	}
}
