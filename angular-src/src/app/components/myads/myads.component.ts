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
  searched = false
  constructor(private filterPipe: FilterPipe, private location: Location, private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'false');
    let data = {
      'user_id': sessionStorage.getItem('userID')
    }
    let sendObj:any;
    if(data.user_id !==null && data.user_id !==undefined){
      sendObj = data
    }else{
      sendObj = {'user_id':'5da2b386cc0fc620c99c0101'}
    }
    this.commonService.myAds(sendObj).subscribe(value => {
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
      let data = {
        'user_id': sessionStorage.getItem('userID')
      }
      let sendObj:any;
      if(data.user_id !==null && data.user_id !==undefined){
        sendObj = data
      }else{
        sendObj = {'user_id':'5da2b386cc0fc620c99c0101'}
      }
      this.commonService.myAds(sendObj).subscribe(data => {
        this.listView = data.data;
        this.listView = this.filterPipe.transform(this.listView, { title: val })
      });
    } else {
      this.ngOnInit();
    }
    this.searched = true
  }

}
