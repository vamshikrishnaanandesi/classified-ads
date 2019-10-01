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
  mySlideImages: any = [];
  myCarouselImages: any = [];
  constructor(private _location: Location, private router: Router, private activedRoute: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'true');
    this.activedRoute.params.subscribe(data => {
      this.commonService.getOnead(data.id).subscribe(data => {
        this.ad = data.data;
        console.log(this.ad.images)
        this.ad.images.forEach((element: any) => {
          // this.mySlideImages.push('https://picsum.photos/id/1/640/480');
          // this.myCarouselImages.push('https://picsum.photos/id/1/640/480');
        });
      })
      this.mySlideImages.push('https://picsum.photos/id/1/640/480','https://picsum.photos/id/1/640/480');
      this.myCarouselImages.push('https://picsum.photos/id/1/640/480','https://picsum.photos/id/1/640/480')
    });
    this.mySlideOptions = { items: 1, dots: true, nav: false };
  }

  backToPage() {
    this._location.back();
  }

}
