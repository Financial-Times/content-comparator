import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import ConfigService from './services/config.service';

const CONFIG = new ConfigService().get();

@Component({
  selector: 'app',
  styleUrls: [
      CONFIG.PATH.TARGET + 'assets/css/bootstrap.min.css',
      CONFIG.PATH.TARGET + 'assets/css/animate.css',
      CONFIG.PATH.TARGET + 'assets/css/style.css'
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: CONFIG.PATH.ROOT + 'app.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: []
})

export class AppComponent { }
