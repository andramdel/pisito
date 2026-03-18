import { Component, inject, signal } from '@angular/core';
import { TematicaService } from '../../../core/services/tematica-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tematica } from '../../../core/models/entities';
import { map, Subscription, switchMap } from 'rxjs';
import { ModalData } from '../../../core/models/auxiliars';
import { Preloader } from '../../../shared/components/preloader/preloader';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { TematicaDTO } from '../../../core/models/dtos';

@Component({
  selector: 'app-edit-tematica',
  imports: [Preloader,FormsModule],
  templateUrl: './edit-tematica.html',
  styleUrl: './edit-tematica.css',
})
export class EditTematica {
  private _tematicaService:TematicaService=inject(TematicaService);
  private _router:Router=inject(Router);
  private _route:ActivatedRoute = inject(ActivatedRoute);
  cargaCompleta=signal<Boolean>(false);
  tematica:TematicaDTO;
  id:number;
  suscripcion:Subscription;

  datosModal:ModalData={

    titulo:"",
    //status:"",
    mensaje:"",
    //origen:""

  };



  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getDatos():void{

    //conseguimos el id de la ruta (Observable hot)
    this.suscripcion = this._route.paramMap.pipe(
      map(params=> this.id=Number(params.get("id")))
      ,switchMap(id=> this._tematicaService.getTematica(id))
    ).subscribe({

      next: (datos:TematicaDTO) => {this.tematica = datos}
      ,
      error: (error) => {}
      ,
      complete: () => {  }

    });



  }


  edit():void{

    this.tematica.activo = Number(this.tematica.activo);
    this.tematica.nombre = this.tematica.nombre.toUpperCase();

    this._tematicaService.updateTematica(this.tematica).subscribe({

      next: (datos:TematicaDTO) => {

        this.datosModal.titulo = "Modificar temática";
        //this.datosModal.status = "200";
        this.datosModal.mensaje = "Temática modificada con éxito";
       // this.datosModal.origen = "tematica";
       // this.modalAdmin.showModal();

      }
      ,
      error: (error) => {

        this.datosModal.titulo = "Modificar tematica";
       // this.datosModal.status = error.status; //400,403...
        this.datosModal.mensaje = error.error.mensaje;
      //  this.datosModal.origen = "tematica";
      //  this.modalAdmin.showModal();

      }
      ,
      complete: () => {}

    });




  }


}
