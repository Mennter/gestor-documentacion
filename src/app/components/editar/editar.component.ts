import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroService } from 'src/app/servicios/registro.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Registro } from 'src/app/domain/registro';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CartelNoborrarComponent } from '../cartel-noborrar/cartel-noborrar.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;

  private registroSub: Subscription;

  private changesSub: Subscription;

  private registroPostSub: Subscription;

  public editar = false;

  public cargando = false;

  public registro: Registro;

  public formulario: FormGroup;

  public hasChanges = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registroService: RegistroService,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  public indiceRegistro = 0;

  public listaRegistros: number[] = [];

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

    if (this.registroSub) {
      this.registroSub.unsubscribe();
    }

    if (this.registroPostSub) {
      this.registroPostSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      if (params.id) {
        this.editar = true;
        this.getRegistro(params.id);
        this.listaRegistros = this.registroService.getUltimofiltro();
        this.indiceRegistro = this.listaRegistros.indexOf(+params.id);
      } else {
        this.editar = false;
        this.registro = new Registro();
        this.createForm();
      }
    });
  }

  private getRegistro(id: number) {
    this.cargando = true;
    this.registroSub = this.registroService.getById(id).subscribe({
      next: (regisro: Registro) => {
        this.cargando = false;
        this.registro = regisro;
        this.createForm();
      },
      error: (error) => {
        this.cargando = false;
        this.matSnackBar.open(
          'Ocurrio un error al obtener el registro',
          'Ok',
          {}
        );
      },
    });
  }

  private createForm() {
    this.formulario = new FormGroup({
      fecha: new FormControl(this.registro.fecha),
      nroLicitacion: new FormControl(this.registro.nroLicitacion),
      organizacion: new FormControl(this.registro.organizacion),
      nombreLicitacion: new FormControl(this.registro.nombreLicitacion),
      capitulo: new FormControl(this.registro.capitulo),
      titulo: new FormControl(this.registro.titulo),
      titulo2: new FormControl(this.registro.titulo2),
      titulo3: new FormControl(this.registro.titulo3),
      observaciones: new FormControl(this.registro.observaciones),
      observaciones2: new FormControl(this.registro.observaciones2),
      observaciones3: new FormControl(this.registro.observaciones3),
      palabrasClaves: new FormControl(this.registro.palabrasClaves),
      pregunta: new FormControl(this.registro.pregunta),
      texto: new FormControl(this.registro.texto),
      borrado: new FormControl(false),
    });

    this.subscriveChanges();
  }

  public saveRegistro() {
    console.warn(this.formulario.value);
    const registro: Registro = this.formulario.value;

    if (this.editar) {
      registro.id = this.registro.id;
    }
    this.cargando = true;
    this.registroPostSub = this.registroService.save(registro).subscribe({
      next: () => {
        this.cargando = false;
        this.hasChanges = false;
        this.matSnackBar.open(
          this.editar ? 'Modificado correctamente' : 'Guardado correctamente',
          'Ok',
          { duration: 5000 }
        );
        if (!this.editar) {
          this.volver();
        }
      },
      error: () => {
        this.cargando = false;
        this.matSnackBar.open('Ocurrio un error', 'Ok', {});
      },
    });
  }

  private subscriveChanges() {
    this.changesSub = this.formulario.valueChanges.subscribe(() => {
      this.hasChanges = true;
    });
  }


  public showMensajeIrse(): Observable<boolean> {
    const dialogRef = this.dialog.open(CartelNoborrarComponent, {
      width: '350px',
      data: {}
    });
    return dialogRef.afterClosed();
  }

  anterior() {
    this.router.navigate([
      `../editar/${this.listaRegistros[this.indiceRegistro - 1]}`,
    ]);
  }

  siguiente() {
    this.router.navigate([
      `../editar/${this.listaRegistros[this.indiceRegistro + 1]}`,
    ]);
  }

  volver() {
    this.router.navigate(['../']);
  }
}


