import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ResultadoLaw } from '../Model/ResultadoLaw';
import { CalcularBenfortLaw } from '../Utils/CalcularBenfordLaw';
import { GraficoBarraComponent } from '../shared/grafico-barra/grafico-barra.component';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-pruebas-imagen',
  templateUrl: './pruebas-imagen.component.html',
  styleUrls: ['./pruebas-imagen.component.css']
})
export class PruebasImagenComponent implements OnInit {

  mensaje : String = "Esta prueba busca los pixeles de las imagens subidas y guarda los colores (RGB), a esta lista le aplica la ley de Benford <br> 'Calcular' es la suman de los 3 colores, los demas son cada color por separado";
  fileSeleccionado : File = null;
  previewUrl:any = null;

  arrayOfPixelRed = [];
  arrayOfPixelGreen = [];
  arrayOfPixelBlue = [];

  arrayOfPixelTotal = [];
  resultadoDeLawTotal : ResultadoLaw;
  
  percentDone: number;
  uploadSuccess: boolean;
  size:any;
  width:number;
  height:number;
  img : any;
  
  isLoading : boolean;
  
  @ViewChild(GraficoBarraComponent) grafico:GraficoBarraComponent;
  @ViewChild('coverFilesInput') imgType:ElementRef;
  
  constructor(private loadingService : LoadingService) { }

  ngOnInit(): void {
  }

  calcular(cual : String){
    switch (cual) {
      case "todos":
        CalcularBenfortLaw.calcularBenfond(this.arrayOfPixelTotal).then(resultado => {
          this.resultadoDeLawTotal = resultado;
          this.grafico.dibujar(this.resultadoDeLawTotal);
        });
        break;
      case "red":
        CalcularBenfortLaw.calcularBenfond(this.arrayOfPixelRed).then(resultado => {
          this.resultadoDeLawTotal = resultado;
          this.grafico.dibujar(this.resultadoDeLawTotal);
        });
        break;
      case "green":
        CalcularBenfortLaw.calcularBenfond(this.arrayOfPixelGreen).then(resultado => {
          this.resultadoDeLawTotal = resultado;
          this.grafico.dibujar(this.resultadoDeLawTotal);
        });
        break;
      case "blue":
        CalcularBenfortLaw.calcularBenfond(this.arrayOfPixelBlue).then(resultado => {
          this.resultadoDeLawTotal = resultado;
          this.grafico.dibujar(this.resultadoDeLawTotal);
        });
        break;
      default:
        break;
    }
  }

  llenarArrays() : Promise<Boolean>{
    return new Promise((resolve, reject) => {
      var canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      let contexto =  canvas.getContext('2d');
      contexto.drawImage(this.img, 0, 0);
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          let data = contexto.getImageData(x, y, 1, 1).data;
          this.arrayOfPixelRed.push(data[0]);
          this.arrayOfPixelGreen.push(data[1]);
          this.arrayOfPixelBlue.push(data[2]);
          this.arrayOfPixelTotal.push(data[0] + data[1] + data[2]);
        }
      }
      resolve(true);
    });
  }

  limpiar(){
    this.arrayOfPixelRed = [];
    this.arrayOfPixelGreen = [];
    this.arrayOfPixelBlue = [];
    this.arrayOfPixelTotal = [];
    this.resultadoDeLawTotal = new ResultadoLaw();
    this.grafico.dibujar(null);
    this.imgType.nativeElement.value = "";
    this.previewUrl = null;
    this.width = null;
    this.height = null;
    this.size = null;
    this.uploadSuccess = false;
  }


  onChange(evt:any){
    this.loadingService.show();
    this.arrayOfPixelRed = [];
    this.arrayOfPixelGreen = [];
    this.arrayOfPixelBlue = [];
    this.arrayOfPixelTotal = [];
    this.percentDone = 100;
    this.uploadSuccess = true;
    let image:any = evt.target.files[0];
    this.size = image.size;
    let fr = new FileReader();
    fr.onload = () => {
      this.img = new Image();
      this.img.src = URL.createObjectURL(image);
      this.img.onload = () => {
          this.width = this.img.width;
          this.height = this.img.height;
          this.llenarArrays().then(resp => {
            this.loadingService.hide();
          });
      };
      this.previewUrl = fr.result;
    };
    fr.readAsDataURL(image);
    this.imgType.nativeElement.value = "";
  }

}
