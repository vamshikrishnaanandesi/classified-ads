import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonService } from 'src/app/common.service';
import { Location } from '@angular/common';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss'],
  providers: [NavbarComponent]
})
export class ListviewComponent implements OnInit {
  listView: any;
  searched = false;
  _data: any;
  constructor(private filterPipe: FilterPipe, private location: Location, private router: Router, private activatedRoute: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'false');
    this.activatedRoute.params.subscribe(data => {
      this._data = data;
      this.commonService.getAdType(data).subscribe(value => {
        this.listView = value.data;
      })
    })
  }

  redirectToPost(id: any) {
    this.router.navigate(['post', { id: id }])
  }

  back() {
    this.location.back();
  }

  searchAds(val: any) {
    if (val !== null && val !== undefined && val !== '') {
      this.commonService.getAdType(this._data).subscribe(data => {
        this.listView = data.data;
        this.listView = this.filterPipe.transform(this.listView, { title: val })
      });
    } else {
      this.ngOnInit();
    }
  }
}
