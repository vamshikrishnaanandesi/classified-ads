import { Component, OnInit, PipeTransform } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-reportedads',
  templateUrl: './reportedads.component.html',
  styleUrls: ['./reportedads.component.scss']
})
export class ReportedadsComponent implements OnInit {
  listView: any = [];
  searched = false;
  constructor(private filterPipe: FilterPipe, private router: Router, private location: Location, private toaster: ToastrService, private commonservice: CommonService) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'false');
    this.commonservice.getReportedAds().subscribe(Value => {
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

  searchAds(val: any) {
    if (val !== null && val !== undefined && val !== '') {
      this.commonservice.getReportedAds().subscribe(data => {
        this.listView = data.data;
        this.listView.forEach(element => {
          if (element.ads[0].length !== 0) {
            element['title'] = element.ads[0].title;
          }
        });
        this.listView = this.filterPipe.transform(this.listView, { title: val })
      });
    } else {
      this.ngOnInit();
    }
      this.searched = true
  }
}
