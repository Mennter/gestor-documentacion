import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroService } from 'src/app/servicios/registro.service';
import { Registro } from 'src/app/domain/registro';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit, OnDestroy{

  displayedColumns: string[] = ['titulo', 'pregunta', 'palabrasClaves', 'star'];
  public dataSource;

  public cargando = false;

  public filtro = '';

  preguntaFilter = new FormControl();
  palabraFilter = new FormControl();
  textoFilter = new FormControl();
  tituloFilter = new FormControl();
  globalFilter = '';

  private static filteredValues = {
    pregunta: '',
    palabrasClaves: '',
    texto: '',
    titulo: '',
    symbol: ''
  };

  private registroSubscription: Subscription;

  constructor(
    private registroService: RegistroService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnDestroy(): void {
    if (this.registroSubscription) {
      this.registroSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.cargando = true;

    this.getRegistros();

  }

  private getRegistros() {
    this.registroSubscription = this.registroService.get().subscribe({
      next: (registros: Registro[]) => {
        this.cargando = false;
        this.dataSource =  new MatTableDataSource(registros);
        this.prueba();
        this.setearMemoria();
      },
      error: () => {
        this.cargando = false;
        this.snackBar.open('Ocurrio un error', 'Ok', {
          duration: 2000,
        });
      }
    });
  }

  setearMemoria() {
    this.preguntaFilter.setValue(ListaComponent.filteredValues.pregunta);
    this.palabraFilter.setValue(ListaComponent.filteredValues.palabrasClaves);
    this.textoFilter.setValue(ListaComponent.filteredValues.texto);
    this.tituloFilter.setValue(ListaComponent.filteredValues.titulo);
  }

  prueba() {
    this.preguntaFilter.valueChanges.subscribe((positionFilterValue) => {
      ListaComponent.filteredValues.pregunta = positionFilterValue;
      this.dataSource.filter = JSON.stringify(ListaComponent.filteredValues);
    });

    this.palabraFilter.valueChanges.subscribe((nameFilterValue) => {
      ListaComponent.filteredValues.palabrasClaves = nameFilterValue;
      this.dataSource.filter = JSON.stringify(ListaComponent.filteredValues);
    });

    this.textoFilter.valueChanges.subscribe((nameFilterValue) => {
      ListaComponent.filteredValues.texto = nameFilterValue;
      this.dataSource.filter = JSON.stringify(ListaComponent.filteredValues);
    });

    this.tituloFilter.valueChanges.subscribe((nameFilterValue) => {
      ListaComponent.filteredValues.titulo = nameFilterValue;
      this.dataSource.filter = JSON.stringify(ListaComponent.filteredValues);
    });


    this.dataSource.filterPredicate = this.customFilterPredicate();
  }


  borrar() {
    this.preguntaFilter.setValue('');
    this.palabraFilter.setValue('');
    this.textoFilter.setValue('');
    this.tituloFilter.setValue('');
  }


  applyFilter(filter) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(ListaComponent.filteredValues);
  }

  setupFilter(column: string ) {
    this.dataSource.filterPredicate = (d, filter: string) => {
      const textToSearch = d[column] && d[column].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: Registro, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.texto.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      let palabrasClaves = data.palabrasClaves &&  searchString.palabrasClaves.toLowerCase() !== '' &&
      data.palabrasClaves.toString().trim().toLowerCase().indexOf(searchString.palabrasClaves.toLowerCase()) !== -1 ;


      let texto = data.texto &&  searchString.texto.toLowerCase() !== '' &&
      data.texto.toString().trim().toLowerCase().indexOf(searchString.texto.toLowerCase()) !== -1 ;

      let pregunta = data.pregunta &&  searchString.pregunta.toLowerCase() !== '' &&
      data.pregunta.toString().trim().toLowerCase().indexOf(searchString.pregunta.toLowerCase()) !== -1 ;


      let titulo = data.titulo &&  searchString.titulo.toLowerCase() !== '' &&
      data.titulo.toString().trim().toLowerCase().indexOf(searchString.titulo.toLowerCase()) !== -1 ;


      if (searchString.texto.toLowerCase() === '') {
        texto = true;
      }

      if (searchString.palabrasClaves.toLowerCase() === '') {
        palabrasClaves = true;
      }

      if (searchString.pregunta.toLowerCase() === '') {
        pregunta = true;
      }

      if (searchString.titulo.toLowerCase() === '') {
        titulo = true;
      }

      return texto &&
        palabrasClaves &&
        titulo &&
        pregunta ;
    };
    return myFilterPredicate;
  }


  public editar(data) {
    this.registroService.setUltimoFiltro(this.dataSource.filteredData.map(x => x.id));
    this.router.navigate(['editar/' + data.id]);
  }


  public ver(data) {
    this.registroService.setUltimoFiltro(this.dataSource.filteredData.map(x => x.id));
    this.router.navigate(['ver/' + data.id]);
  }

  public nuevoRegistro() {
    this.router.navigate(['nuevo']);
  }
}
