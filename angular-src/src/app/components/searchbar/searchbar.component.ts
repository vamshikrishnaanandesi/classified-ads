import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { config } from '../../../../constant';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @Output() messageToEmit = new EventEmitter<string>();
  cat: any = null;
  subcat: any = null;
  active: boolean = false;
  first: boolean = true;
  listItem: any = config.menuList;
  ad_type: any = null;
  constructor(private router: Router, private _location: Location, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'false');
    this.active = (this.router.url !== '/' && this.router.url !== '/gridview') ? true : false;
    this.activatedRoute.params.subscribe(data => {
      this.cat = data.ad_type;
      this.subcat = data.ad_category
      if (this.router.url == '/myads') {
        this.cat = 'My Ads';
      } else if (this.router.url == '/reportedads') {
        this.cat = 'Reported Ads';
      }
    })
  }

  get_list(menu, submenu) {
    this.ad_type = menu;
    if (submenu == null) {
      this.router.navigate(['list', { 'ad_type': menu }]);
    } else {
      this.router.navigate(['list', { 'ad_type': menu, 'ad_category': submenu }]);
    }
  }

  backToHome() {
    this.router.navigate(['gridview']);
  }


  filterData() {
    this.messageToEmit.emit(document.getElementById('search')['value'].toString())
  }
}
