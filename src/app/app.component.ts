import { Component, OnInit } from '@angular/core';
import { LocalStorageServiceService } from './service/local-storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appWebGestionDes';

  inputValue: string = '';

  nuevaTarea = '';
  tareas: string[] = [];

  constructor(    
    private LocalStorageServiceService: LocalStorageServiceService
  ) { }


  ngOnInit(): void {   
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas);
    }
  }


  agregarTarea() {
    if (this.nuevaTarea.trim() !== '') {
      this.tareas.push(this.nuevaTarea);
      this.nuevaTarea = '';

      // Guardar las tareas en el localStorage
      localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }
  }


  eliminarTarea(tarea: string) {
    const index = this.tareas.indexOf(tarea);
    if (index !== -1) {
      this.tareas.splice(index, 1);
      localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }
  }
  

}
