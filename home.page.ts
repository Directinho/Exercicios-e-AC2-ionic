import { Component } from '@angular/core';
import { RangeCustomEvent } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  constructor() {}
  modalAbertoGorjeta: boolean = false;
  modalAbertoMedida: boolean = false;
  modalAbertoIMC: boolean = false;
  modalAbertoTransporte: boolean = false;
  modalAbertoCombustivel: boolean = false;
  valorRange = 0; // Valor inicial do ion-range
  segmentoSelecionado: string = 'exercicios';

  openModal(tipo: string) {
    console.log(`Abrindo modal: ${tipo}`);
    this.modalAbertoGorjeta = tipo === 'gorjeta';
    this.modalAbertoMedida = tipo === 'medida';
    this.modalAbertoIMC = tipo === 'imc';
    this.modalAbertoTransporte = tipo === 'transporte';
    this.modalAbertoCombustivel = tipo === 'combustivel';
  }

  closeModal(tipo: string) {
    console.log(`Fechando modal: ${tipo}`);
    if (tipo === 'gorjeta') this.modalAbertoGorjeta = false;
    else if (tipo === 'medida') this.modalAbertoMedida = false;
    else if (tipo === 'imc') this.modalAbertoIMC = false;
    else if (tipo === 'transporte') this.modalAbertoTransporte = false;
    else if (tipo === 'combustivel') this.modalAbertoCombustivel = false;
  }

  // Range de snaps e sem snaps:
  usarSnaps: boolean = true;

  trocarSnaps(valorSelecionado: string) {
    if (valorSelecionado === 'comSnaps') {
      this.usarSnaps = true;
    } else if (valorSelecionado === 'semSnaps') {
      this.usarSnaps = false;
    }
  }

  pinFormatter(value: number) {
    return `${value}%`;
  }

  onIonChange(ev: RangeCustomEvent) {
    this.valorRange = parseInt(ev.detail.value.toString());
  }

  // Gorjeta
  valorCompra = 0;
  porcentagem = 0;
  total = 0;

  calc() {
    this.porcentagem = this.valorRange;
    this.total = this.valorCompra + (this.valorCompra * (this.porcentagem / 100));
    console.log(this.porcentagem);
    console.log(this.valorRange);
  }

  // Conversão
  unidade = this.valorRange;
  entrada = '';
  saida = '';
  convertido = 0;

  conver() {
    if (this.entrada === 'quilômetros' && this.saida === 'milhas') {
      this.convertido = this.unidade * 0.621371;
    } else if (this.entrada === 'quilômetros' && this.saida === 'pés') {
      this.convertido = this.unidade * 3280.84;
    } else if (this.entrada === 'quilômetros' && this.saida === 'polegadas') {
      this.convertido = this.unidade * 39370.1;
    } else if (this.entrada === 'metros' && this.saida === 'milhas') {
      this.convertido = this.unidade * 0.000621371;
    } else if (this.entrada === 'metros' && this.saida === 'pés') {
      this.convertido = this.unidade * 3.28084;
    } else if (this.entrada === 'metros' && this.saida === 'polegadas') {
      this.convertido = this.unidade * 39.3701;
    } else if (this.entrada === 'centímetros' && this.saida === 'milhas') {
      this.convertido = this.unidade * 0.00000621371;
    } else if (this.entrada === 'centímetros' && this.saida === 'pés') {
      this.convertido = this.unidade * 0.0328084;
    } else if (this.entrada === 'centímetros' && this.saida === 'polegadas') {
      this.convertido = this.unidade * 0.393701;
    }
  }

  // IMC
  massa = ''; // Unidade de peso
  tamanho = ''; // Unidade de altura
  peso = 0; // Valor do peso
  altura = 0; // Valor da altura
  imc = 0; // Resultado do IMC
  rangemax = 0;

  ngOnInit() {
    this.tamanho = 'centimetros';
    this.massa = 'quilos';
  }

  IMC() {
    if (this.tamanho === 'metros' && this.massa === 'quilos') {
      this.imc = this.peso / (this.altura * this.altura) / 10000;
      console.log('imc:', this.imc);
      console.log('altura:', this.altura);
      console.log('peso:', this.peso);
    } else if (this.tamanho === 'metros' && this.massa === 'libras') {
      this.rangemax = 2.2;
      this.imc = (this.peso * 0.453592) / (this.altura * this.altura) / 10000;
      console.log('imc:', this.imc);
      console.log('altura:', this.altura);
      console.log('peso:', this.peso);
    } else if (this.tamanho === 'centimetros' && this.massa === 'quilos') {
      this.rangemax = 220;
      this.imc = this.peso / (this.altura / 100) * (this.altura / 100);
      console.log('imc:', this.imc);
      console.log('altura:', this.altura);
      console.log('peso:', this.peso);
    } else if (this.tamanho === 'centimetros' && this.massa === 'libras') {
      this.rangemax = 220;
      this.imc = (this.peso * 0.453592) / (this.altura / 100) * (this.altura / 100);
      console.log('imc:', this.imc);
      console.log('altura:', this.altura);
      console.log('peso:', this.peso);
    }
  }

  // Uber
  fixo = 0;
  variavel = 0;
  taxa = 0;
  app = 0;
  motor = 0;
  valor = 0;
  tipo = '';
  km = 0;

  preco() {
    if (this.tipo === 'normal') {
      this.fixo = 5;
      this.variavel = 2.5;
    } else if (this.tipo === 'superior') {
      this.fixo = 7.5;
      this.variavel = 3.5;
    } else if (this.tipo === 'VIP') {
      this.fixo = 10;
      this.variavel = 5.5;
    }

    if (this.valor >= 150) {
      this.taxa = 20 / 100;
    } else {
      this.taxa = 25 / 100;
    }

    this.valor = this.fixo + this.variavel * this.km;
    this.app = this.valor * this.taxa;
    this.motor = this.valor - this.taxa;
  }

  // Combustível
  combustivel = 'gasolina';
  kmRodado = 0;
  precoCombustivel = 0;
  gasto = 0;

  showButtons: boolean = true;
  showConfirm: boolean = true;
  showInput: boolean = false;

  onFuelChange(event: any) {
    this.combustivel = event.detail.value;
    console.log('Combustível selecionado:', this.combustivel);
    this.showButtons = true;
    this.showConfirm = true;
    this.showInput = false;
  }

  confirmSelection() {
    this.showConfirm = true;
    this.showInput = true;
  }

  cancelSelection() {
    this.resetFuelSelection(); // Reseta tudo ao cancelar
  }

  resetFuelSelection() {
    this.combustivel = 'gasolina'; // Valor padrão do radio
    this.showButtons = true;
    this.showConfirm = true;
    this.showInput = false;
    this.kmRodado = 0;
    this.precoCombustivel = 0;
    this.gasto = 0;
  }

  calcGasto() {
    if (this.combustivel === 'etanol') {
      this.gasto = (this.kmRodado / 9) * this.precoCombustivel;
    } else if (this.combustivel === 'gasolina') {
      this.gasto = (this.kmRodado / 12) * this.precoCombustivel;
    } else if (this.combustivel === 'diesel') {
      this.gasto = (this.kmRodado / 15) * this.precoCombustivel;
    }
    console.log('Gasto calculado:', this.gasto);
  }

  //RESET
  resetar() {
    this.valorCompra = 0;
    this.porcentagem = 0;
    this.total = 0;
    this.unidade = 0;
    this.entrada = '';
    this.saida = '';
    this.convertido = 0;
    this.massa = '';
    this.tamanho = '';
    this.peso = 0;
    this.altura = 0;
    this.imc = 0;
    this.fixo = 0;
    this.variavel = 0;
    this.taxa = 0;
    this.app = 0;
    this.motor = 0;
    this.valor = 0;
    this.tipo = '';
    this.km = 0;
    this.combustivel = 'gasolina';
    this.kmRodado = 0;
    this.precoCombustivel = 0;
    this.gasto = 0;

  }
}
