import { EditarComponent } from './components/editar/editar.component';
import { VerComponent } from './components/ver/ver.component';
import { ListaComponent } from './components/lista/lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarGuard } from './servicios/editar.guard';


const routes: Routes = [
  {
    path: '',
    component: ListaComponent
  },
  {
    path: 'ver/:id',
    component: VerComponent
  },
  {
    path: 'editar/:id',
    component: EditarComponent,
    canDeactivate: [ EditarGuard ]
  },
  {
    path: 'nuevo',
    component: EditarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
