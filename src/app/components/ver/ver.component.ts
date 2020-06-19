import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroService } from 'src/app/servicios/registro.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Registro } from 'src/app/domain/registro';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;

  private registroSub: Subscription;

  public cargando = false;

  public registro: Registro;

  public indiceRegistro = 0;

  public listaRegistros: number[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registroService: RegistroService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

    if (this.registroSub) {
      this.registroSub.unsubscribe();
    }

  }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      if (params.id) {
        this.getRegistro(params.id);
        this.listaRegistros = this.registroService.getUltimofiltro();
        this.indiceRegistro = this.listaRegistros.indexOf( + params.id);
      } else {
        this.registro = new Registro();
      }
    });
  }

  private getRegistro(id: number) {
    this.cargando = true;
    this.registroSub = this.registroService.getById(id).subscribe({
      next: (regisro: Registro) => {
        this.registro = regisro;
        this.cargando = false;
      },
      error: (error) => {
        this.matSnackBar.open('Ocurrio un error al obtener el registro', 'Ok', {});
        this.cargando = false;
      }
    });

  }

  anterior() {
    this.router.navigate([`../ver/${this.listaRegistros[this.indiceRegistro - 1]}`]);
  }

  siguiente() {
    this.router.navigate([`../ver/${this.listaRegistros[this.indiceRegistro + 1]}`]);
  }

  volver() {
    this.router.navigate(['../']);
  }
}
