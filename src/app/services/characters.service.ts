import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = 'https://rickandmortyapi.com/api';
   }

  onInit(): void{

  }

  getCharacters(pPage = 1): Promise<any[]>{
    return this.http.get<any[]>(`${this.url}/character?page=${pPage}`).toPromise();
  }
}
