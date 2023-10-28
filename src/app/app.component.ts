import { Component, OnInit } from '@angular/core';
import { LocalStorageServiceService } from './service/local-storage-service.service';
import * as Sentry from "@sentry/angular-ivy";

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
    this.obtenerDatosParaError()
    try {
      const tareasGuardadas = localStorage.getItem('tareas');
      if (tareasGuardadas) {
        this.tareas = JSON.parse(tareasGuardadas);
      }
    } catch (error) {
      // Enviar el error a Sentry
      Sentry.captureException(error);
    }
    
  }

  obtenerDatosParaError():void{
    try {
      localStorage.getItem('hola');      
    } catch (error) {
      // Enviar el error a Sentry
      Sentry.captureException(error);
    }

  }


  agregarTarea() {  
    try {
      if (this.nuevaTarea.trim() !== '') {
        this.tareas.push(this.nuevaTarea);
        this.nuevaTarea = '';      
        localStorage.setItem('tareas', JSON.stringify(this.tareas));      
      }
    } catch (error) {
      // Enviar el error a Sentry
      Sentry.captureException(error);
    }
    
  }


  eliminarTarea(tarea: string) {        

    try {
      const index = this.tareas.indexOf(tarea);
      if (index !== -1) {
        this.tareas.splice(index, 1);
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
      }
    } catch (error) {
      // Enviar el error a Sentry
      Sentry.captureException(error);
    }
  }
  
  

}
