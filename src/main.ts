import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { HTTP_PROVIDERS} from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { ROUTER_PROVIDERS  } from '@angular/router-deprecated';
import { AppComponent, environment } from './app/';
import {AppRouterProviders} from './app/app.routes';


if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(), AppRouterProviders,
 ])
 .catch((err: any) => console.error(err));






