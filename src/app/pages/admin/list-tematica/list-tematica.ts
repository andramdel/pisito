import { Component, inject, OnInit, signal } from '@angular/core';
import { TematicaService } from '../../../core/services/tematica-service';
import { TematicaBannerCarouselService } from '../../../core/services/tematica-banner-carousel-service';
import { Tematica } from '../../../core/models/entities';
import { NgForm } from '@angular/forms';
import { NgClass } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Preloader } from '../../../shared/components/preloader/preloader';
import { BannerCarouselImagenDTO, TematicaDTO } from '../../../core/models/dtos';

@Component({
  selector: 'app-list-tematica',
  imports: [NgClass, RouterLink,Preloader],
  templateUrl: './list-tematica.html',
  styleUrl: './list-tematica.css',
})
export class ListTematica implements OnInit {





  private _tematicaService:TematicaService = inject(TematicaService);
  private _bannerCarouselService:TematicaBannerCarouselService = inject(TematicaBannerCarouselService);
  datos=signal<TematicaDTO[]>([]);
  cargaCompleta=signal<Boolean>(false);



  ngOnInit(): void {

    this.getDatos();
  }



  getDatos():void{



    this._tematicaService.getTematicas().subscribe({

      next: (datos:TematicaDTO[]) => {
        this.datos.set(datos);

        for(let laTematica of this.datos()){

            this._bannerCarouselService.getBannersCarouselTematica(laTematica.id!).subscribe({

              next:(datos:BannerCarouselImagenDTO[])=>{
                laTematica.numeroBanners = datos.length;//dejamos en cada objeto tematica el número de banners que tiene
              }

            })

        }


      }
      ,
      error: (error) => { }
      ,
      complete: () => {this.cargaCompleta.set(true) }
    });







  }




}
