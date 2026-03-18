import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tematica } from '../models/entities';
import { URL_API } from '../environments/globals';
import { TematicaDTO } from '../models/dtos';

@Injectable({
  providedIn: 'root',
})
export class TematicaService {

    private _http:HttpClient = inject(HttpClient);


  getTematicas():Observable<Array<TematicaDTO>>{

      return this._http.get<Array<TematicaDTO>>(`${URL_API}tematicas`);

  }


  getTematicasActivas():Observable<Array<TematicaDTO>>{

      return this._http.get<Array<TematicaDTO>>(`${URL_API}tematicas-activas`);

  }



  getTematica(id:number):Observable<TematicaDTO>{

      return this._http.get<TematicaDTO>(`${URL_API}tematica/${id}`);

  }
   getTematicaActual():Observable<TematicaDTO>{

      return this._http.get<TematicaDTO>(`${URL_API}tematica-actual`);

  }


  addTematica(tematica:Tematica):Observable<TematicaDTO>{

    return this._http.post<TematicaDTO>(`${URL_API}tematica`,tematica);
  }


  updateTematica(tematica:Tematica):Observable<TematicaDTO>{

    return this._http.put<TematicaDTO>(`${URL_API}tematica`,tematica);
  }


  updateActualizarTematica(id:number):Observable<TematicaDTO>{

    return this._http.put<TematicaDTO>(`${URL_API}actualizar-tematica/${id}`,null);
  }


  //FALTA TEMATICA ACTUAL
  
}
