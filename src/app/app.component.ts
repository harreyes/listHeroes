import { Component, OnInit, EventEmitter } from '@angular/core';
import { AppService } from './app.service';
import { Hero } from './hero';

import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  faThumbsUp = faThumbsUp; //iconLike
  faThumbsDown = faThumbsDown; //iconDon'tLike


  title = 'card-heroes';
  listheroes: Array<Hero> = [];
  listheroesFinal: Array<Hero> = [];
  cantP: Array<any> = [];

  page: number = 1; //Número de página en la que estamos. Será 1 la primera vez que se carga el componente

  totalPages: number; //Número total de páginas

  numShops: number; //Total de tiendas existentes

  numResults: number = 10;

  indexI: number = 0;

  cantMax: number = 10;

  paginaEmitter: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    this.GetHeroes()
  }

  constructor(
    public appService: AppService, public router: Router
  ) { }

  GetHeroes() {
    this.appService.GetHeroes().subscribe(res => {
      console.log(res)
      this.listheroesFinal = [];
      this.cantP = [];
      this.listheroes = Object.values(res);
      this.numShops = this.listheroes.length;
      this.totalPages = Math.round(this.numShops / this.numResults);
      for (let index = 1; index < this.totalPages + 1; index++) {

        this.cantP.push({ index });

      }
      console.log(this.cantP);
      this.cantMax = (this.cantMax > this.numShops) ? this.numShops : this.cantMax;
      for (let index = this.indexI; index < this.cantMax; index++) {
        this.listheroesFinal.push(this.listheroes[index]);

      }

      console.log(this.listheroesFinal)
    });
  }



  siguiente() {

    this.page++;
    this.indexI = this.indexI + this.numResults;
    this.cantMax = this.cantMax + this.numResults;
    this.GetHeroes();

  }

  anterior() {

    this.page--;
    this.indexI = this.indexI - this.numResults;
    this.cantMax = this.cantMax - this.numResults;
    this.GetHeroes();

  }

  pageGo(num: number) {
    this.page = num;
    this.indexI = (num * this.numResults) - this.numResults;
    this.cantMax = num * this.numResults;
    this.GetHeroes();
  }

  like(index, i) {
    console.log('index', index);
    console.log('i', i);
    localStorage.setItem('keyLike', '1');
  }

  dontLike(index, i) {
    localStorage.setItem('keyDontLike', '0');
  }

  
goDescription(){
  this.router.navigate(['/DescriptionHero']);

}

}
