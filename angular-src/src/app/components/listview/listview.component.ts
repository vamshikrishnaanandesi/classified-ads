import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonService } from 'src/app/common.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss'],
  providers: [NavbarComponent]
})
export class ListviewComponent implements OnInit {
  listView: any;
  constructor(private location: Location,private router: Router, private activatedRoute: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.commonService.getAdType(data).subscribe(value => {
        console.log(value);
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
}
