import { Component, OnInit, Input } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tooltip-explicacion',
  templateUrl: './tooltip-explicacion.component.html',
  styleUrls: ['./tooltip-explicacion.component.css']
})
export class TooltipExplicacionComponent implements OnInit {

  faQuestionCircle = faQuestionCircle;
  @Input() informacion: String;

  constructor() { }

  ngOnInit(): void {
  }

}
