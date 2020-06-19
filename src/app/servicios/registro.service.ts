import { Registro } from './../domain/registro';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ConfigService } from './config.service';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }

  private url = this.configService.baseURL + 'registro';


  public get(): Observable<Registro[]> {
    return this.getServer();
  }

  private getServer(): Observable<Registro[]> {
    return this.httpClient.get<Registro[]>(this.url);
  }

  public getById(id: number): Observable<Registro> {
    return this.httpClient.get<Registro>(this.url + '/' + id);
  }

  public save(registro: Registro): Observable<Registro> {
    return this.httpClient.post<Registro>(this.url, registro);
  }


  private idsBusiqueda: number[] = [];

  public setUltimoFiltro(id: number[]) {
    console.log(id);
    this.idsBusiqueda = id;
  }


  public getUltimofiltro() {
    return this.idsBusiqueda;
  }
}
