import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  match: boolean = true;
  emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
  numberPattern = '[0-9]*';
  constructor(private toaster: ToastrService, private router: Router, private formBuilder: FormBuilder, private commonService: CommonService) { }

  ngOnInit() {
    sessionStorage.setItem('post', 'false');
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      age: ['', Validators.compose([Validators.required, Validators.maxLength(2), Validators.pattern(this.numberPattern)])],
      gender: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12)])],
      cpassword: ['', Validators.required],
    });
  }
  get f() { return this.registerForm.controls; }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid || !this.match) {
      return;
    } else {
      this.commonService.register(this.registerForm.value).subscribe(value => {
        console.log(value)
        if (value.success) {
          this.toaster.success('Registration Successful.', 'Success!');
          this.login();
        } else {
          this.toaster.error('Internal Server Error, Please try later.', 'Error!')
        }
      })
    }
  }

  confirmPassword() {
    if (this.registerForm.controls['password'].value === this.registerForm.controls['cpassword'].value) {
      this.match = true;
    } else {
      this.match = false;
    }
  }

}
