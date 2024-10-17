import { Component } from '@angular/core';
import { IDialogBox } from '../../interfaces/dialog-box';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css'
})
export class DialogBoxComponent {
  data!: IDialogBox;

  constructor() {
    this.data = {
      employee: {
        id: "1",
        name: 'John',
        lastname: 'Doe',
        email: 'john@doe.com',
        avatar: 1
      },
      time: Date.now(),
      dialog: 'How are you feeling today?'
    };
  }
}
