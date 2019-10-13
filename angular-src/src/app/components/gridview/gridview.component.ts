import { Component, OnInit, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonService } from 'src/app/common.service';
import { Subscriber } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.scss'],
  providers: [NavbarComponent]
})
export class GridviewComponent implements OnInit {
  topPicks: any = [];
  searched = false
  constructor(private filterPipe: FilterPipe, private location: Location, private commonService: CommonService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'false');
    this.commonService.getTopPicks().subscribe(data => {
      this.topPicks = data.data;
    });
  }

  get_one_ad(id: any) {
    this.router.navigate(['post', { id: id }])
  }

  back() {
    this.location.back();
  }


  searchAds(val: any) {
    if (val !== null && val !== undefined && val !== '') {
      this.commonService.getTopPicks().subscribe(data => {
        this.topPicks = data.data;
        this.topPicks = this.filterPipe.transform(this.topPicks, { title: val })
      });
    } else {
      this.ngOnInit();
    }
    this.searched = true
  }
}
