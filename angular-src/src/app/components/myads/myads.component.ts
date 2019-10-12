import { Component, OnInit, PipeTransform } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-myads',
  templateUrl: './myads.component.html',
  styleUrls: ['./myads.component.scss']
})
export class MyadsComponent implements OnInit {
  listView: any;
  constructor(private filterPipe: FilterPipe, private location: Location, private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'false');
    let data = { 'user_type': sessionStorage.getItem('role') }
    this.commonService.myAds(data).subscribe(value => {
      this.listView = value.data;
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
      this.commonService.getTopPicks().subscribe(data => {
        this.listView = data.data;
        this.listView = this.filterPipe.transform(this.listView, { title: val })
      });
    } else {
      this.ngOnInit();
    }
  }

}
