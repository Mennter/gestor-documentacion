import { Observable, of } from 'rxjs';
import { EditarComponent } from './../components/editar/editar.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class EditarGuard implements CanDeactivate<EditarComponent> {
  canDeactivate(
    component: EditarComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> {

      if (component.hasChanges) {
        return component.showMensajeIrse();
      } else {
        return of(true);
      }
  }

}
