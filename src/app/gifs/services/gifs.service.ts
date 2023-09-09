import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

// const GIPHY_API_KEY = 'NaGKkI0DdmA9ff1w7JCIx7VrOeIJl6P2';

// con esto hago que este servicio este disponible en toda la APP
@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = 'NaGKkI0DdmA9ff1w7JCIx7VrOeIJl6P2';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  public get tagHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string):void {
    tag = tag.toLowerCase();
    // verifica si se incluye el tag
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    // añade el nuevo tag al inicio
    this._tagsHistory.unshift(tag);
    // limita el history
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this.tagHistory));
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag:string): void {
    if(tag.length===0) return;
    this.organizeHistory(tag);
    // this._tagsHistory.unshift(tag);
    // console.log(this._tagsHistory);
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=NaGKkI0DdmA9ff1w7JCIx7VrOeIJl6P2&q=valorant&limit=10')
    // .then(resp => resp.json())
    // .then(data => console.log(data))
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=NaGKkI0DdmA9ff1w7JCIx7VrOeIJl6P2&q=valorant&limit=10');
    // const data = await resp.json();
    // console.log(data);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag);
    // se pueden añadir los header
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params: params})
    .subscribe(resp => {
      // console.log(resp.data);
      this.gifList = resp.data;
      console.log({gifs: this.gifList})
    });
  }

}
