import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.scss']
})
export class PostviewComponent implements OnInit {
  list: boolean = false;
  imageUrls: any = [];
  ad: any = {};
  imageObject: any = [];
  myCarouselOptions: { items: number; dots: boolean; nav: boolean; };
  mySlideOptions: { items: number; dots: boolean; nav: boolean; };
  mySlideImages: string[];
  myCarouselImages: string[];
  constructor(private _location: Location, private router: Router, private activedRoute: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'true');
    this.activedRoute.params.subscribe(data => {
      this.commonService.getOnead(data.id).subscribe(data => {
        this.ad = data.data;
        this.ad.images.forEach(element => {
          this.mySlideImages.push(element.url);
          this.myCarouselImages.push(element.url);
        });
      })
    })

    // this.mySlideImages = ['https://picsum.photos/id/1/640/480', 'https://picsum.photos/id/2/640/480', 'https://picsum.photos/id/3/640/480'];
    // this.myCarouselImages = ['https://picsum.photos/id/1/640/480', 'https://picsum.photos/id/2/640/480', 'https://picsum.photos/id/3/640/480'];
    this.mySlideOptions = { items: 1, dots: true, nav: false };
  }

  backToPage() {
    this._location.back();
  }

}
