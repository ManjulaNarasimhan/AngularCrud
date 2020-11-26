import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd} from '@angular/router';
import { CompileTemplateMetadata } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Management';
  showLoadingIndicator = true;
  constructor(private _router: Router){
    this._router.events.subscribe((routerEvent) => {
      if(routerEvent instanceof NavigationStart){
        this.showLoadingIndicator = true;
      }
      if(routerEvent instanceof NavigationEnd){
        this.showLoadingIndicator = false;
      }
    });
  }
}
