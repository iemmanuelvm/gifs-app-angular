import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: []
})
export class LazyImageComponent implements OnInit{

  // Necesito el URL y este tiene que venir desde el componente padre
  @Input()
  public url!:string;

  @Input()
  public alt:string = '';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if(!this.url) throw new Error('URL property is required')
  }

  onLoad(){
    // console.log('Image Loaded');

    setTimeout(()=>{
      this.hasLoaded = true;
    }, 1000);

    this.hasLoaded = true;

  }

}
