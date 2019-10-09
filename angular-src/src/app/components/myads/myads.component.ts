import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myads',
  templateUrl: './myads.component.html',
  styleUrls: ['./myads.component.scss']
})
export class MyadsComponent implements OnInit {
  listView: any;
  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    let data = { 'user_type': sessionStorage.getItem('role') }
    this.commonService.myAds(data).subscribe(value => {
      this.listView = value.data;
    })
  }

  redirectToPost(id: any) {
    this.router.navigate(['post', { id: id }])
  }

}
