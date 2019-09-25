import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css'],
  providers:[NavbarComponent]
})
export class GridviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    sessionStorage.setItem('post','false');
  }

}
