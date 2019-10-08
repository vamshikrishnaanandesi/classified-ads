import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { config } from '../../../../constant';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  cat: any = null;
  subcat: any = null;
  active: boolean = false;
  first: boolean = true;
  listItem: any = config.menuList;
  constructor(private router: Router, private _location: Location, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'false');
    this.active = (this.router.url !== '/' && this.router.url !== '/gridview') ? true : false;
    this.activatedRoute.params.subscribe(data => {
      this.cat = data.ad_type;
      this.subcat = data.ad_category
    })
  }

  get_list(menu, submenu) {
    this.router.navigate(['list', { 'ad_type': menu, 'ad_category': submenu }]);
  }

  backToHome() {
    this.router.navigate(['gridview']);
  }
}
