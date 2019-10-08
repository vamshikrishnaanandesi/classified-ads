import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

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
  mySlideOptions: { items: 1, dots: true, nav: false };
  mySlideImages: any = [];
  myCarouselImages: any = [];
  constructor(private _location: Location, private router: Router, private activedRoute: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit() {
    var tempImg: any = [];
    sessionStorage.setItem('post', 'true');
    this.activedRoute.params.subscribe(data => {
      this.commonService.getOnead(data.id).subscribe(async data => {
        this.ad = data.data;
        tempImg = await this.ad.images.map((element: any) =>  (element.url) );
        this.mySlideImages = await tempImg.map((element: any) =>  (element) );
      });
      // this.mySlideImages = [1,2,3].map((i)=> `https://picsum.photos/640/480?image=${i}`);
      this.mySlideOptions = { items: 1, dots: true, nav: false };
    });
  }

  backToPage() {
    this._location.back();
  }

}
