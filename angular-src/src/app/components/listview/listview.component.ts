import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css'],
  providers: [NavbarComponent]
})
export class ListviewComponent implements OnInit {
  cat: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      // alert(data.val)
    })
  }

  postView() {
    this.router.navigate(['post'])
  }
}
