import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.css']
})
export class PostviewComponent implements OnInit {
  list: boolean = false;
  constructor(private _location: Location, private router: Router) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'true');
    this.list = (this.router.url == '/post') ? false : true;
  }

  backToPage() {
    this._location.back();
  }

}
