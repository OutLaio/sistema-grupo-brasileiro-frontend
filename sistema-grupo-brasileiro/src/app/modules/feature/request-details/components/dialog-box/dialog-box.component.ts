import { Component, OnInit } from '@angular/core';
import { I_Dialog_Box_Response } from '../../../../shared/interfaces/dialog-box/view/dialog-box-view';
import { RequestDetailsService } from '../../services/request-details.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css'
})
export class DialogBoxComponent implements OnInit {
  response!: I_Dialog_Box_Response[];

  constructor(private service: RequestDetailsService) {}

  ngOnInit(): void {
    this.service.getDialoguesByRequestId('16').subscribe((res) => {
      this.response = res;
      console.log(this.response);
    });
  }

  getSessionId() {
    return sessionStorage.getItem('idUser');
  }
}
