import { Component } from '@angular/core';

@Component({
  selector: 'app-collaborator-system',
  templateUrl: './collaborator-system.component.html',
  styleUrl: './collaborator-system.component.css'
})
export class CollaboratorSystemComponent {
  isFormVisible: boolean = true;

  showForm() {
    this.isFormVisible = true;
  }

  showList() {
    this.isFormVisible = false;
  }
}
