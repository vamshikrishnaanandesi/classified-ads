import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validator, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
  submitted: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private commonService: CommonService) { }

  ngOnInit() {
    sessionStorage.setItem('post','false');
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      'password': ['', Validators.required]
    })
  }

  get f() { return this.loginForm.controls; }

  register() {
    this.router.navigate(['register'])
  }

  loginAuth() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.commonService.login(this.loginForm.value).subscribe(value => {
        console.log(value);
      })
    }
  }
}
