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
  constructor(private _location: Location, private router: Router, private activedRoute: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'true');
    this.list = (this.router.url.split('/')[1] == 'list') ? true : false;
    this.activedRoute.params.subscribe(data => {
      this.commonService.getOnead(data.id).subscribe(data => {
        this.ad = data.data;
        this.ad.images.forEach(element => {
          this.imageObject.push({
            image: 'http://via.placeholder.com/300x180',
            thumbImage: 'http://via.placeholder.com/300x180',
            alt: '',
            title: ''
          })
        });
        this.imageObject = [{
          image: 'http://via.placeholder.com/300x180',
          thumbImage: 'http://via.placeholder.com/300x180',
          alt: '',
          title: ''
        }, {
          image: 'http://via.placeholder.com/300x180',
          thumbImage: 'http://via.placeholder.com/300x180',
          alt: '',
          title: ''
        }]
      })
    })
  }

  backToPage() {
    this._location.back();
  }

}
