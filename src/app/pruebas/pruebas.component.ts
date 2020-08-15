import { Component, OnInit, ViewChild } from '@angular/core';
import { CalcularBenfortLaw } from '../Utils/CalcularBenfordLaw'
import { ResultadoLaw } from '../Model/ResultadoLaw';
import { GraficoBarraComponent } from '../shared/grafico-barra/grafico-barra.component';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {

  listaNumeros : number[];
  listaString : String;
  resultadoDeLaw : ResultadoLaw;
  @ViewChild(GraficoBarraComponent) grafico:GraficoBarraComponent;

  mensaje : String = "- El Boton 'Numero Random' genera 1000000 de numeros al azar con Math.random(). <br> - El boton 'Calcular Valores Ingresados' espera un lista de numero separados por ',' o '\n' (salto de linea), los enlista y les hace la prueba.";

  constructor() { 
    this.listaNumeros = new Array<number>();
  }

  ngOnInit(): void {
    this.caclularRandoms();
  }

  caclularRandoms() {
    this.listaNumeros = new Array<number>();
    for (let index = 0; index < 1000000; index++) {
      this.listaNumeros.push(this.getRndInteger(1, 25555555));
    }
  }

  calcular() {
    this.caclularRandoms();
    this.limpiar();
    CalcularBenfortLaw.calcularBenfond(this.listaNumeros).then(resultado => {
      this.resultadoDeLaw = resultado;
      this.grafico.dibujar(this.resultadoDeLaw);
    });
  }

  calcularTextArea(){
    this.limpiar();
    CalcularBenfortLaw.calcularBenfond(this.getlistaNumero()).then(resultado => {
      this.resultadoDeLaw = resultado;
      this.grafico.dibujar(this.resultadoDeLaw);
    });
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }


  getlistaNumero() {
    if(this.listaString != null) {
      let primerpaso = null;
      if(this.listaString.includes(",") && this.listaString.includes("\n")){
        console.log("Error Separa, y new linea");
      }else if(this.listaString.includes(",")){
        primerpaso = this.listaString.split(",");
      } else if(this.listaString.includes("\n")) {
        primerpaso = this.listaString.split("\n");
      }
      let respuesta = new Array<number>();
      primerpaso.forEach(texto => {
        respuesta.push(parseInt(texto, 10));
      });
      return respuesta;
    }
  }

  limpiar(){
    this.resultadoDeLaw = new ResultadoLaw();
    this.grafico.dibujar(this.resultadoDeLaw);
  }

}
