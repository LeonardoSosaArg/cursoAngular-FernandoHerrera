import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormTemplateComponent } from './components/form-template/form-template.component';
import { FormReactiveComponent } from './components/form-reactive/form-reactive.component';

//IMPORTAR
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FormPadreComponent } from './comunicacion/form-padre/form-padre.component';
import { FormHijoComponent } from './comunicacion/form-hijo/form-hijo.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FormularioParcialComponent } from './components/formulario-parcial/formulario-parcial.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { CapitalizadoPipe } from './components/pipes/capitalizado.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormTemplateComponent,
    FormReactiveComponent,
    FormPadreComponent,
    FormHijoComponent,
    NavbarComponent,
    FormularioParcialComponent,
    ListaUsuariosComponent,
    PipesComponent,
    CapitalizadoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
