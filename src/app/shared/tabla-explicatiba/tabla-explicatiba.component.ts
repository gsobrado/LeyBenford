import { Component, OnInit, Input } from '@angular/core';
import { ResultadoLaw } from 'src/app/Model/ResultadoLaw';

@Component({
  selector: 'app-tabla-explicatiba',
  templateUrl: './tabla-explicatiba.component.html',
  styleUrls: ['./tabla-explicatiba.component.css']
})
export class TablaExplicatibaComponent implements OnInit {

  @Input() dataset : ResultadoLaw;

  constructor() { }

  ngOnInit(): void {
  }

}
