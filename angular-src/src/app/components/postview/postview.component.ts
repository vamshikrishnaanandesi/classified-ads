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
  showCar = false
  constructor(private _location: Location, private router: Router, private activedRoute: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit() {
    this.showCar = false
    sessionStorage.setItem('post', 'true');
    this.activedRoute.params.subscribe(data => {
      this.commonService.getOnead(data.id).subscribe(data => {
        this.ad = data.data;
        this.mySlideImages =  this.ad.images.map((i:any)=>i.url)
          this.showCar = true
      })
    });
    this.mySlideOptions = { items: 1, dots: true, nav: false };
  }

  backToPage() {
    this._location.back();
  }

}
