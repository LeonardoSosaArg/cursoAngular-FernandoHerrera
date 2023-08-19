import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormReactiveComponent } from './components/form-reactive/form-reactive.component';
import { FormTemplateComponent } from './components/form-template/form-template.component';
import { FormularioParcialComponent } from './components/formulario-parcial/formulario-parcial.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { FormPadreComponent } from './comunicacion/form-padre/form-padre.component';

const routes: Routes = [
  {path:'reactive', component: FormReactiveComponent},
  {path:'template', component: FormTemplateComponent},
  {path:'formpadre', component: FormPadreComponent},
  {path:'formularioParcial', component: FormularioParcialComponent},
  {path:'listaUsuarios', component: ListaUsuariosComponent},
  {path:'pipes', component: PipesComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'formularioParcial'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
