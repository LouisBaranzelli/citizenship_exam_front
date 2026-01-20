import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader();
}
