import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { PaginaBannerService } from '../../../core/services/pagina-banner-service';
import { PaginaService } from '../../../core/services/pagina-service';
import { Pagina } from '../../../core/models/entities';
import { BannerImagenDTO, InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { Banner } from '../banner/banner';
import { Inmobiliaria } from '../../../pages/content/inmobiliaria/inmobiliaria';

@Component({
  selector: 'app-contenedor-banners',
  imports: [Banner],
  providers:[ControlCargaService],
  templateUrl: './contenedor-banner.html',
  styleUrl: './contenedor-banner.css',
})
export class ContenedorBanners implements OnInit {

  //dondeEstoy tiene que coincidir con uno de los nombres de la entidad Pagina de la API:
  //home
  //consultor-hipotecas
  //servicios


  @Input() dondeEstoy:string;

  idPagina?:number;
  idInmobiliaria:number;
  banners=signal<BannerImagenDTO[]>([]);
  inmobiliarias:InmobiliariaImagenDTO;

  public _controlCargaService:ControlCargaService=inject(ControlCargaService);
  private _paginaBannerService:PaginaBannerService= inject(PaginaBannerService);
  private _paginaService:PaginaService=inject(PaginaService);   
    private _inmobiliariaService:InmobiliariaService=inject(InmobiliariaService);       
  private _route:ActivatedRoute=inject(ActivatedRoute);

  ngOnInit(): void {

    this._controlCargaService.nFases.set(2);
    this.getDatos();
  }

  getDatos():void{
    this._paginaService.getPaginaPorNombre(this.dondeEstoy).pipe(
      switchMap((datos:Pagina)=>
      {this.idPagina=datos.id;
      return this._paginaBannerService.getBannersPagina(Number(this.idPagina));
    }
    )).subscribe({
        next: (datos:BannerImagenDTO[]) => {this.banners.set(datos)},
      });
 
    
    this._route.paramMap.pipe(
      map(params=> this.idInmobiliaria=Number(params.get("id"))),
      switchMap(id=> this._inmobiliariaService.getInmobiliaria(this.idInmobiliaria))
    ).subscribe({
      next: (datos:InmobiliariaImagenDTO)=> {this.inmobiliarias=datos},
    });
    /*this._paginaService.getPaginaPorNombre(this.dondeEstoy).subscribe({

      next: (datos:Pagina) => { this.idPagina = datos.id!  }
      ,
      complete: () =>{


          this._paginaBannerService.getBannersPagina(this.idPagina).subscribe({

            next: (datos:Array<BannerImagenDTO>) => {this.banners = datos}
          });

      }
/* AÑADIR Preloader... 
    });*/

    

  }

}
