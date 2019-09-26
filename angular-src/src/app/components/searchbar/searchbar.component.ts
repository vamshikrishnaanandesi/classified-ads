import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  cat: any = '';
  active: boolean = false;
  first: boolean = true;
  constructor(private router: Router, private _location: Location) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'false');
    this.active = (this.router.url !== '/') ? true : false;
  }

  get_list(val) {
    this.router.navigate(['list', { 'val': val }]);
    this.cat = val;
  }

  backToPage() {
    this._location.back();
  }
}
