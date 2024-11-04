import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-main-create-request',
	templateUrl: './main-create-request.component.html',
	styleUrls: ['./main-create-request.component.css']
})
export class MainCreateRequestComponent {
	mainOptions = [
		{
			name: 'Placa de Itinerários',
			subOptions: [
				{ name: 'Luminoso completo', route: '/luminoso-completo' },
				{ name: 'Troca de Lona', route: '/troca-de-lona' },
				{ name: 'Placa de Polietileno', route: '/placa-polietileno' }
			]
		},
		{
			name: 'Adesivos',
			subOptions: [
				{ name: 'Plotagem de Veículos', route: '/plotagem-veiculos' },
				{ name: 'Adesivos Informativos', route: '/adesivos-informativos' }
			]
		},
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
			]
		},
		{ name: 'Campanhas Internas', route: '/campanhas-internas' },
		{ name: 'Comunicados', route: '/comunicados' },
		{ name: 'Placa de Sinalização', route: '/placa-sinalizacao' },
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
			]
		}
	];

	selectedOption: any;

	selectOption(option: any): void {
		if (this.selectedOption === option) {
			this.selectedOption = null;
		} else {
			this.selectedOption = option;
		}
	}
}
