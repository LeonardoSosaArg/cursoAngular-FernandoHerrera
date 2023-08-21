import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormTemplateComponent } from './pages/form-template/form-template.component';
import { FormReactiveComponent } from './pages/form-reactive/form-reactive.component';
import { FormModificableComponent } from './pages/form-modificable/form-modificable.component';

const routes: Routes = [
  {path: 'form-template', component: FormTemplateComponent},
  {path: 'form-reactive', component: FormReactiveComponent},
  {path: 'form-modificable', component: FormModificableComponent},
  {path:'**' , pathMatch: 'full', redirectTo: 'form-reactive'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
