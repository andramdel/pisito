import { Component, inject } from '@angular/core';
import { FinderData } from '../../../core/models/auxiliars';
import { Finder } from '../finder/finder';
import { ListInmueble } from "../list-inmueble/list-inmueble";
import { find } from 'rxjs';

@Component({
  selector: 'app-inmueble-finder',
  imports: [ListInmueble],
  templateUrl: './inmueble-finder.html',
  styleUrl: './inmueble-finder.css',
})
export class InmuebleFinder {
finder:string;
datosFinder:FinderData;

}
