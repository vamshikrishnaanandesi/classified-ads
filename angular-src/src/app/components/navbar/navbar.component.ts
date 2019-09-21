import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  postView: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'false');
    if (sessionStorage.getItem('post') == 'true') {
      this.postView = true;
    } else {
      this.postView = false;
    }
  }

  login() {
    this.router.navigate(['register']);
  }
}
