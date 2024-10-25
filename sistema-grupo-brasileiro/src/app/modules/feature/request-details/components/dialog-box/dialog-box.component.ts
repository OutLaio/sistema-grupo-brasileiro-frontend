import { Component } from '@angular/core';
import { I_Dialog_Box_Response } from '../../../../shared/interfaces/dialog-box/view/dialog-box-view';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css'
})
export class DialogBoxComponent {
  data!: I_Dialog_Box_Response;

  constructor() {
    this.data = {
      id: "1",
      employee: {
        id: "1",
        fullName: "John Doe",
        avatar: 2
      },
      time: Date.now(),
      dialog: 'How are you feeling today?'
    };
  }
}
