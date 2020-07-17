import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  private verison = '';

  constructor() { }


  public get(): string {
    return this.verison;
  }


  public set(version: string) {
    console.warn(`Esta es la verison: ${version}`);
    this.verison = version;
  }

}
