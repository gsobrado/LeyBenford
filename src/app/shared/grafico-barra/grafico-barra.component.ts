import { Component, OnInit, Input } from '@angular/core';
import { ResultadoLaw } from 'src/app/Model/ResultadoLaw';

@Component({
  selector: 'app-grafico-barra',
  templateUrl: './grafico-barra.component.html',
  styleUrls: ['./grafico-barra.component.css']
})
export class GraficoBarraComponent implements OnInit {

  @Input() dataset : ResultadoLaw;

  constructor() { }

  ngOnInit(): void {
    if(this.dataset != null){
      this.dibujar(this.dataset);
    }
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [{data :[] , label: "Calculado"}];

  public funcionLogaritimica = {data :[30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1, 4.6] , label: "Funcion Logaritmica", type : "line"}

  dibujar(dataset : ResultadoLaw){
    if(dataset !=  null){
      this.barChartData = [{data :[] , label: "Calculado"}];
      this.dataset = dataset;
      if(this.dataset.resultadosNumbers != null){
        this.dataset.resultadosNumbers.forEach((resultado, idenx) => {
          this.barChartData[0].data[idenx] = resultado.porcentaje;
          this.barChartData[1] = this.funcionLogaritimica;
        });
      }else{
        this.barChartData = [{data :[] , label: "Calculado"}];
      }
    }else{
      this.barChartData = [{data :[] , label: "Calculado"}];
    }
  }


}
