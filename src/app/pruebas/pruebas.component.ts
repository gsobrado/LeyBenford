import { Component, OnInit, ViewChild } from '@angular/core';
import { CalcularBenfordLaw } from '../Utils/CalcularBenfordLaw';
import { ResultadoLaw } from '../Model/ResultadoLaw';
import { GraficoBarraComponent } from '../shared/grafico-barra/grafico-barra.component';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {

  numberList: number[];
  inputString: String;
  benfordLawResult: ResultadoLaw;
  @ViewChild(GraficoBarraComponent) chart: GraficoBarraComponent;

  infoMessage: String = "- El Boton 'Numero Random' genera 1000000 de numeros al azar con Math.random(). <br> - El boton 'Calcular Valores Ingresados' espera un lista de numero separados por ',' o '\\n' (salto de linea), los enlista y les hace la prueba.";

  constructor() { 
    this.numberList = new Array<number>();
  }

  ngOnInit(): void {
    this.calculateRandomNumbers();
  }

  calculateRandomNumbers() {
    this.numberList = new Array<number>();
    for (let index = 0; index < 1000000; index++) {
      this.numberList.push(this.getRndInteger(1, 25555555));
    }
  }

  calculateFromRandom() { 
    this.calculateRandomNumbers(); 
    this.clearChart(); 
    this.benfordLawResult = CalcularBenfordLaw.calcularBenford(this.numberList); 
    this.chart.dibujar(this.benfordLawResult); 
  }

  calculateFromTextArea() { 
    this.clearChart(); 
    const numbers = this.getNumbersFromString(); 
    if (numbers && numbers.length > 0) {
        this.benfordLawResult = CalcularBenfordLaw.calcularBenford(numbers); 
        this.chart.dibujar(this.benfordLawResult); 
    } else {
        this.clearChart(); 
    }
  }

  getRndInteger(min: number, max: number): number { 
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getNumbersFromString(): number[] { 
    if (this.inputString && this.inputString.trim() !== "") { 
      let stringItems: string[]; 
      const hasComma = this.inputString.includes(","); 
      const hasNewline = this.inputString.includes("\n"); 

      if (hasComma && hasNewline) {
        stringItems = this.inputString.split('\n').flatMap(part => part.split(',')); 
      } else if (hasComma) {
        stringItems = this.inputString.split(","); 
      } else if (hasNewline) {
        stringItems = this.inputString.split('\n'); 
      } else {
        const num = parseInt(this.inputString.trim(), 10); 
        return !isNaN(num) ? [num] : [];
      }

      const parsedNumbers: number[] = []; 
      if (stringItems && stringItems.length > 0) { 
        stringItems.forEach(textItem => { 
          if (textItem && textItem.trim() !== "") {
            const num = parseInt(textItem.trim(), 10);
            if (!isNaN(num)) {
              parsedNumbers.push(num); 
            }
          }
        });
      }
      return parsedNumbers; 
    }
    return [];
  }

  clearChart() { 
    this.benfordLawResult = new ResultadoLaw(); 
    this.chart.dibujar(null); 
  }
}
