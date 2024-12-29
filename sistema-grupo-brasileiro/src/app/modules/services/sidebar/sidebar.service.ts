import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Serviço `SidebarService`
 * 
 * Gerencia a visibilidade da barra lateral (sidebar) no sistema. 
 * Permite alternar o estado de visibilidade e disponibiliza um Observable para monitorar mudanças.
 */
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  /**
   * BehaviorSubject que armazena o estado atual da visibilidade da sidebar.
   * O valor inicial é `true` (sidebar visível).
   */
  private sidebarVisibilitySubject = new BehaviorSubject<boolean>(true);
  /**
  * Observable que permite que outros componentes acompanhem as mudanças
  * na visibilidade da sidebar.
  */
  sidebarVisibility$ = this.sidebarVisibilitySubject.asObservable();

  /**
   * Alterna o estado de visibilidade da sidebar.
   * Se estiver visível, será ocultada; se estiver oculta, será exibida.
   */
  toggleSidebar() {
    this.sidebarVisibilitySubject.next(!this.sidebarVisibilitySubject.value);
  }
}
