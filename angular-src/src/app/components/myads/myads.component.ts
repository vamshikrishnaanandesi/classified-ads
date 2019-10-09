import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-myads',
  templateUrl: './myads.component.html',
  styleUrls: ['./myads.component.scss']
})
export class MyadsComponent implements OnInit {
  listView: any;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    let data = { 'user_type': sessionStorage.getItem('role') }
    this.commonService.myAds(data).subscribe(value => {
      console.log(value);
      this.listView = value.data;
    })
  }

}
