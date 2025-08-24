import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

import { App } from './app';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    // Si tienes componentes NO standalone, agrégalos aquí
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    App,
    NavbarComponent
  ],
  bootstrap: [App]
})
export class AppModule {}
