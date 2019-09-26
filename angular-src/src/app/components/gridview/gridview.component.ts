import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonService } from 'src/app/common.service';
import { Subscriber } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css'],
  providers: [NavbarComponent]
})
export class GridviewComponent implements OnInit {
  topPicks: any = [];
  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'false');
    this.commonService.getTopPicks().subscribe(data => {
      this.topPicks = data.data;
    })
  }

  get_one_ad(id: any) {
    this.router.navigate(['post', { id: id }])
  }

}
