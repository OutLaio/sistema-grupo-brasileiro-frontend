import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-create-request',
  templateUrl: './main-create-request.component.html',
  styleUrls: ['./main-create-request.component.css']
})
export class MainCreateRequestComponent implements OnInit {
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

  selectedOption: any;
  activeOption: any;
  activeSubOption: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const defaultOption = this.mainOptions[0];
    this.activeOption = defaultOption;
    this.router.navigate([defaultOption.route]);
  }

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

  selectSubOption(subOption: any): void {
    this.activeSubOption = subOption;
    this.router.navigate([subOption.route]);
  }
}
