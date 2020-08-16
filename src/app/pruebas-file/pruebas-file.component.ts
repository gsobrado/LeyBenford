import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ResultadoLaw } from '../Model/ResultadoLaw';
import { GraficoBarraComponent } from '../shared/grafico-barra/grafico-barra.component';
import { CalcularBenfortLaw } from '../Utils/CalcularBenfordLaw';

@Component({
  selector: 'app-pruebas-file',
  templateUrl: './pruebas-file.component.html',
  styleUrls: ['./pruebas-file.component.css']
})
export class PruebasFileComponent implements OnInit {

  mensaje : String = "Esta prueba convierte los Archivos subidos en un Array de Bytes y le aplica la ley Benfard.";
  resultadoDeLaw : ResultadoLaw;
  @ViewChild(GraficoBarraComponent) grafico:GraficoBarraComponent;
  @ViewChild('myInput') myInputVariable: ElementRef;

  fileSeleccionado = null;
  arrayOfBytes = [];

  constructor() { }

  ngOnInit(): void {
  }

  cargaFile($event){
    this.arrayOfBytes = [];
    this.fileSeleccionado = $event.target.files[0];
    this.fileToByteArray(this.fileSeleccionado).then(promesa => {
      if(promesa){
        this.arrayOfBytes = promesa;
      }
    })
  }
  
  calcular(){
    if(this.arrayOfBytes.length > 0){
      CalcularBenfortLaw.calcularBenfond(this.arrayOfBytes).then(resultado => {
        this.resultadoDeLaw = resultado;
        this.grafico.dibujar(this.resultadoDeLaw);
      });
    }
  }

  limpiar(){
    this.myInputVariable.nativeElement.value = "";
    this.arrayOfBytes = [];
    this.resultadoDeLaw = new ResultadoLaw();
    this.grafico.dibujar(null);
  }

  fileToByteArray = (file) : Promise<number[]> => {
    return new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            let fileByteArray = [];
            reader.readAsArrayBuffer(file);
            reader.onloadend = (evt) => {
                if (evt.target.readyState == FileReader.DONE) {
                    let arrayBuffer = evt.target.result;
                    if(arrayBuffer instanceof ArrayBuffer){
                      let array = new Uint8Array(arrayBuffer);
                      array.forEach(bite => fileByteArray.push(bite));
                    }
                }
                resolve(fileByteArray);
            }
        }
        catch (e) {
            reject(e);
        } 
    })
  }

}
