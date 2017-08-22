import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Api } from './api/api';
import { environment } from './environments/environment';

if ( environment.production ) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule( AppModule );
