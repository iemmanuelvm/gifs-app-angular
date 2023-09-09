import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
    // Para inyectar un servicio es en el contructor
  constructor(private gifsService: GifsService) {}

  // public SearchTag(newTag: string) {
  public searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    // console.log({newTag});
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value='';
  }

}
