import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente principal para a criação de solicitações, exibindo um menu de opções com rotas associadas.
 * Cada opção pode ter sub-opções, que são exibidas dinamicamente com base na seleção do usuário.
 * O componente permite que o usuário selecione opções e sub-opções, navegando para as rotas correspondentes.
 */
@Component({
  selector: 'app-main-create-request',
  templateUrl: './main-create-request.component.html',
  styleUrls: ['./main-create-request.component.css']
})
export class MainCreateRequestComponent implements OnInit {

  /**
   * Lista de opções principais exibidas no menu.
   * Cada opção possui um nome, uma rota e um estado ativo.
   * Algumas opções podem ter sub-opções.
   */
  mainOptions = [
    { name: 'Placa de Itinerários', route: '/placa-de-itinerarios', active: true },
    { name: 'Placa de Sinalização', route: '/placa-de-sinalizacao', active: true },
    { name: 'Adesivos', route: '/adesivos', active: true },
    {
      name: 'Impressos',
      subOptions: [
        { name: 'Panfleto', route: '/panfleto' },
        { name: 'Cartaz', route: '/cartaz' },
        { name: 'Folder', route: '/folder' },
        { name: 'Cartilha', route: '/cartilha' },
        { name: 'Outdoor', route: '/outdoor' },
        { name: 'Busdoor', route: '/busdoor' },
        { name: 'Faixa', route: '/faixa' },
        { name: 'Mural', route: '/mural' },
        { name: 'Banner', route: '/banner' },
        { name: 'Windbanner', route: '/windbanner' },
        { name: 'Tag', route: '/tag' },
        { name: 'Etiqueta', route: '/etiqueta' },
        { name: 'Cartão', route: '/cartao' },
        { name: 'Cartão de Visita', route: '/cartao-de-visita' },
        { name: 'Crachá', route: '/cracha' },
        { name: 'Cordão de Crachá', route: '/cordao-cracha' }
      ],
      active: false
    },
    { name: 'Campanhas Internas', route: '/campanhas-internas', active: false },
    { name: 'Comunicados', route: '/comunicados', active: false },
    {
      name: 'Layouts p/Brindes',
      subOptions: [
        { name: 'Viseira', route: '/viseira' },
        { name: 'Boné', route: '/bone' },
        { name: 'Copo', route: '/copo' },
        { name: 'Squeeze', route: '/squeeze' },
        { name: 'Caneta', route: '/caneta' },
        { name: 'Agenda', route: '/agenda' },
        { name: 'Camisa', route: '/camisa' },
        { name: 'Almofada', route: '/almofada' },
        { name: 'Almofada de Pescoço', route: '/almofada-pescoço' },
        { name: 'Tapa Olho', route: '/tapa-olho' },
        { name: 'Mochila', route: '/mochila' },
        { name: 'Necessaire', route: '/necessaire' },
        { name: 'Calendário', route: '/calendario' },
        { name: 'Outros', route: '/outros-brindes' }
      ],
      active: false
    }
  ];

  /**
   * Opção principal atualmente selecionada.
   */
  selectedOption: any;

  /**
   * Opção ativa atualmente no menu (pode ser uma opção principal ou uma sub-opção).
   */
  activeOption: any;

  /**
   * Sub-opção atualmente ativa (se houver).
   */
  activeSubOption: any;

  /**
   * Construtor do componente, inicializando a injeção de dependências.
   * @param router - Serviço de roteamento para navegação entre páginas.
   */
  constructor(private router: Router) { }

  /**
   * Método do ciclo de vida do Angular que é chamado quando o componente é inicializado.
   * Define a opção padrão a ser selecionada e navega para a rota correspondente.
   */
  ngOnInit(): void {
    const defaultOption = this.mainOptions[0];
    this.activeOption = defaultOption;
    this.router.navigate([defaultOption.route]);
  }

  /**
   * Método para selecionar uma opção principal no menu.
   * Se a opção tiver sub-opções, elas serão exibidas; caso contrário, navega diretamente para a rota da opção.
   * @param option - A opção principal selecionada.
   */
  selectOption(option: any): void {
    this.activeOption = option;
    this.activeSubOption = null;

    if (option.subOptions && option.subOptions.length > 0) {
      this.selectedOption = this.selectedOption === option ? null : option;
    } else {
      this.selectedOption = null;
      this.router.navigate([option.route]);
    }
  }

  /**
   * Método para selecionar uma sub-opção no menu.
   * Navega para a rota correspondente à sub-opção selecionada.
   * @param subOption - A sub-opção selecionada.
   */
  selectSubOption(subOption: any): void {
    this.activeSubOption = subOption;
    this.router.navigate([subOption.route]);
  }
}
