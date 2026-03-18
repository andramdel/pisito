import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { BotonAdmin } from '../../../shared/components/boton-admin/boton-admin';
import { CarouselFicha } from '../../../shared/components/carousel-ficha/carousel-ficha';
import { ParentesisPipe } from "../../../shared/pipes/parentesis-pipe";
import { EurosPipe } from "../../../shared/pipes/euros-pipe";
import { AmuebladoPipe } from "../../../shared/pipes/amueblado-pipe";
import { map, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InmuebleService } from '../../../core/services/inmueble-service';
import { BannerImagenDTO, InmuebleImagenDTO } from '../../../core/models/dtos';
import { Inmueble } from '../../../core/models/entities';

@Component({
  selector: 'app-detail-inmueble',
  imports: [BotonAdmin, CarouselFicha, ParentesisPipe, EurosPipe, AmuebladoPipe],
  templateUrl: './detail-inmueble.html',
  styleUrl: './detail-inmueble.css',
})
export class DetailInmueble implements OnInit,OnDestroy{
  

  public _authService:AuthService=inject(AuthService);
  public _route:ActivatedRoute=inject(ActivatedRoute);
  public _inmuebleService:InmuebleService=inject(InmuebleService);
  cargaCompletada=signal<Boolean>(false);
  idInmueble:number;
  suscripcion:Subscription;
  datos=signal<InmuebleImagenDTO|null>(null);
    ngOnInit(): void {
      this.getDatos();
  }
   getDatos():void{

     this.suscripcion=this._route.paramMap.pipe(
        map(params=>this.idInmueble=Number(params.get("id"))),

        switchMap( (id) => {
          this._inmuebleService.getInmueble(id);
          //Antes de hacer la llamada, swithMap nos garantiza que el idPagina ha llegado
          return this._inmuebleService.getInmueble(this.idInmueble);//devolvemos un Observable


    })).subscribe({ //nos suscribimos a él

          next: (datos:InmuebleImagenDTO) => {
            this.datos.set(datos);
            //this._controlCargaService.faseCarga();
          
          }
            
    });
     
  

  }//end getDatos
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }
}
