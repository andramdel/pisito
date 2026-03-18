import { Component, inject, NgModule, OnInit, signal } from '@angular/core';
import { TematicaBannerCarouselService } from '../../../core/services/tematica-banner-carousel-service';
import { TematicaService } from '../../../core/services/tematica-service';
import { switchMap } from 'rxjs';
import { Tematica } from '../../../core/models/entities';
import { BannerCarouselImagenDTO } from '../../../core/models/dtos';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { NgClass } from '@angular/common';
import { URL_MEDIA } from '../../../core/environments/globals';

@Component({
  selector: 'app-carousel-home',
  imports: [NgClass],
  providers:[ControlCargaService],
  templateUrl: './carousel-home.html',
  styleUrl: './carousel-home.css',
})
export class CarouselHome implements OnInit{

  private _tematicaBannerCarouselService:TematicaBannerCarouselService = inject (TematicaBannerCarouselService);
  private _tematicaService:TematicaService = inject (TematicaService);
  private _controlCargaService = inject (ControlCargaService);
  private estaCargado=signal<Boolean>(false);
  idTematica:number;
  banners=signal<BannerCarouselImagenDTO[]>([]);
  urlMedia=URL_MEDIA;
  ngOnInit(): void {
    this._controlCargaService.nFases.set(2);
    this.getDatos();
  }


   getDatos():void{

     this._tematicaService.getTematicaActual().pipe(

          switchMap( (datos:Tematica) => {

            this.idTematica = datos.id!;
            //Antes de hacer la llamada, swithMap nos garantiza que el idPagina ha llegado
            return this._tematicaBannerCarouselService.getBannersCarouselTematica(this.idTematica);//devolvemos un Observable


    })).subscribe({ //nos suscribimos a él

          next: (datos:Array<BannerCarouselImagenDTO>) => {
            this.banners.set(datos);
            //this._controlCargaService.faseCarga();
            this.estaCargado.set(true)
            console.log("aaaa");
          
          }
            
    });
     
  

  }//end getDatos

}
