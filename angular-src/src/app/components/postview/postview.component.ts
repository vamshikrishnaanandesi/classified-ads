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
  showCar = false;
  triggerFuc = false;
  constructor(private _location: Location, private router: Router, private activedRoute: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit() {
    // '5da304a7c50f7f0fcc0978f0'
    this.showCar = false
    sessionStorage.setItem('post', 'true');
    this.activedRoute.params.subscribe(data => {
      let sendId:any;
      if(data.id !==undefined && data.id !==null){
        sendId = data.id
      }else{
        sendId = '5da304a7c50f7f0fcc0978f0'
      }
      this.commonService.getOnead(sendId).subscribe(data => {
        this.ad = data.data;
        this.mySlideImages =  this.ad.images.map((i:any)=>i.url)
          this.showCar = true
      })
    });
    this.mySlideOptions = { items: 1, dots: true, nav: false };
    this.triggerFuc = true;
  }

  backToPage() {
    this._location.back();
  }

}
