import { Component, Input } from '@angular/core';
import { I_Version_Data } from '../../../../shared/interfaces/project/view/version-view';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrl: './version.component.css'
})
export class VersionComponent {
  @Input() version!: I_Version_Data | undefined;
  isDisaproved: boolean = false;

  constructor() { }

  onApprove() {
    this.isDisaproved = false;
  }

  onDisapprove() {
    this.isDisaproved = true;
  }
}
