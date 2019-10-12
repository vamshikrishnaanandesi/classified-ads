import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportedads',
  templateUrl: './reportedads.component.html',
  styleUrls: ['./reportedads.component.scss']
})
export class ReportedadsComponent implements OnInit {
  listView: any;

  constructor(private router: Router, private location: Location, private toaster: ToastrService, private commonservice: CommonService) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'false');
    this.commonservice.getReportedAds().subscribe(Value => {
      console.log(Value.data);
      this.listView = Value.data;
    })
  }


  deletePost(id: any) {
    let data = { 'ad_id': id }
    this.commonservice.deletePost(data).subscribe(value => {
      if (value.status == 200) {
        this.toaster.success('Reported Ad Delete Successfully', 'Success!');
        this.ngOnInit();
      } else {
        this.toaster.error('Internal Server Error, Please try again later', 'Error!')
      }
    })
  }

  back() {
    this.location.back();
  }

  redirectToPost(id: any) {
    this.router.navigate(['post', { id: id }])
  }
}
