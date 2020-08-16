import { Component } from '@angular/core';
import { LoadingService } from './services/loading/loading.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BenfordLaw';

  faSpinner = faSpinner;

  constructor(public loadingService : LoadingService){

  }
}
