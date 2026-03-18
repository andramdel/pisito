import { Component, inject, NgModule, ViewChild } from '@angular/core';
import { TematicaService } from '../../../core/services/tematica-service';
import { Router } from '@angular/router';
import { ModalData } from '../../../core/models/auxiliars';
import { Tematica } from '../../../core/models/entities';
import { FormsModule, NgForm } from '@angular/forms';
import { TematicaDTO } from '../../../core/models/dtos';

@Component({
  selector: 'app-add-tematica',
  imports: [FormsModule],
  templateUrl: './add-tematica.html',
  styleUrl: './add-tematica.css',
})
export class AddTematica {

  

  private _tematicaService:TematicaService = inject(TematicaService);
  private _router:Router = inject(Router);

  datosModal:ModalData={

    titulo:"",
   // status:"",
    mensaje:"",
    //origen:""

  };

  tematica:TematicaDTO={

    nombre:"",
    numeroBanners:0,

  }


  add():void{

    this.tematica.nombre = this.tematica.nombre.toUpperCase();

    this._tematicaService.addTematica(this.tematica).subscribe({

      next: (datos:TematicaDTO) => {

        this.datosModal.titulo = "+Temática";
        //this.datosModal.status = "201";
        this.datosModal.mensaje = "Temática añadida con éxito";
        //this.datosModal.origen = "tematica";   
      


      } //Devuelve el objeto creado
      ,
      error: (error) => {
    

        this.datosModal.titulo = "+Temática";
        //this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje;
        //this.datosModal.origen = "tematica";         



      }
      ,
      complete: () => {
        this._router.navigate(["/admin/list-tematica"])
      }
    });

    
  }


}
