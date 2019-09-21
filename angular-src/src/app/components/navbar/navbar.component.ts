import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  postView: boolean = false;
  isLoggedIn: boolean = false;
  constructor(private router: Router, private toaster: ToastrService) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'false');
    if (sessionStorage.getItem('post') == 'true') {
      this.postView = true;
    } else {
      this.postView = false;
    }
    if (sessionStorage.getItem('login') == 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  login() {
    this.router.navigate(['register']);
  }

  logout() {
    sessionStorage.removeItem('login');
    this.toaster.success('Logout Successful', 'Success!');
    this.ngOnInit();
  }
}
