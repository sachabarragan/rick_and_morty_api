import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  arrCharacters: any[];
  currentPage: number;
  cantPages: number;
  minPage: number;
  maxPage: number;
  arrPagination: number[];
  constructor(private charService: CharactersService) { 
    this.currentPage = 1;
    this.minPage = 1;
    this.maxPage = 5;
    this.arrPagination = [1,2,3,4,5];
  }

  ngOnInit() {
    this.charService.getCharacters()
      .then(response => {
        this.arrCharacters = response['results'];
        this.cantPages = response['info']['pages'];
        console.log(this.arrCharacters);
      })
  }

  async onChangePage(paginacion){
    if(paginacion === 'siguiente'){
      this.currentPage++;
      console.log("currentpage: " + this.currentPage);

    } else if(paginacion === 'anterior'){
      this.currentPage--;
      if(this.currentPage < 0){
        this.currentPage = 0;
      }
      console.log("currentpage: " + this.currentPage);
    } else {
      this.currentPage = paginacion;
      console.log("currentpage: " + this.currentPage);
    }
    const response = await this.charService.getCharacters(this.currentPage);
    this.arrCharacters = response['results'];
    this.calcPagination(paginacion);
  }

  calcPagination(pagination){
    pagination = this.currentPage;
    // console.log(`Minimo antes: ${this.minPage}. Max antes: ${this.maxPage}`);
    
    if(pagination < 5){
      this.minPage = 1;
      this.maxPage = 5;
      //console.log("La paginacion es menor a 5", typeof pagination, typeof this.maxPage)
    } else if(pagination === this.cantPages){
      this.maxPage = this.cantPages;
      this.minPage = this.cantPages -5;
      // console.log("Es mayor que la cantidad de paginas");
    } else if(pagination === this.maxPage) {
      this.minPage = this.minPage + 2;
      this.maxPage = this.maxPage +2;
      // console.log("Es igual al limite maximo de la paginacion");
      // console.log(`Minimo: ${this.minPage}. Max: ${this.maxPage}`);
    } else if(pagination === this.minPage) {
      this.minPage--;
      this.maxPage--;
      // console.log("Es igual al limite minimo de la paginacion");
      // console.log(`Minimo: ${this.minPage}. Max: ${this.maxPage}`);
    } else {
      // console.log("No es mayor que la cantidad de paginas");
      // console.log(`Minimo: ${this.minPage}. Max: ${this.maxPage}`);
    }
    
    this.arrPagination[0] = this.minPage;
    this.arrPagination[1] = this.minPage + 1;
    this.arrPagination[2] = this.minPage + 2;
    this.arrPagination[3] = this.minPage + 3;
    this.arrPagination[4] = this.maxPage;

    // console.log(`Minimo ahora: ${this.minPage}. Max ahora: ${this.maxPage}. Arreglo: ${this.arrPagination}`);
  }

}
