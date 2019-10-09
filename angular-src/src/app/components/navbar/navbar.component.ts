import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  postView: boolean = false;
  isLoggedIn: boolean = false;
  breadcrumlist: any = ['Home'];
  postForm: FormGroup;
  reportForm: FormGroup;
  submitted: boolean = false;
  submitted1: boolean = false;
  tempImages: any = [];
  numPattern = '[0-9]*';
  urls: any = [];
  idName: any = null;
  id: any = null;
  title: string;
  postAdForm: boolean;
  isUser: boolean;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private toaster: ToastrService, private formBuilder: FormBuilder, private commonservice: CommonService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(data => {
      this.id = data.id;
    })
    this.postView = (sessionStorage.getItem('post') == 'true') ? true : false;
    this.isLoggedIn = (sessionStorage.getItem('login') == 'true') ? true : false;
    this.isUser = (sessionStorage.getItem('role') == 'user') ? true : false;

    this.postForm = this.formBuilder.group({
      'ad_type': ['', Validators.required],
      'title': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      'category': ['', Validators.required],
      'price': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(6), Validators.pattern(this.numPattern)])],
      "contact_details": ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      // "status": ['', Validators.required],
    });

    this.reportForm = this.formBuilder.group({
      "description": ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
    })
  }

  get f() { return this.postForm.controls }

  get f1() { return this.reportForm.controls }

  login() {
    this.router.navigate(['register']);
  }

  logout() {
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('userID')
    this.toaster.success('Logout Successful', 'Success!');
    this.ngOnInit();
    this.router.navigate(['register']);
  }

  postAd() {
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    } else {
      this.postForm.addControl('images', new FormControl(this.tempImages));
      this.postForm.controls['price'].setValue(parseInt(this.postForm.controls['price'].value));
      this.postForm.addControl('posted_by', new FormControl(sessionStorage.getItem('userID')));
      this.postForm.addControl('user_type', new FormControl(sessionStorage.getItem('role')));
      this.commonservice.postAd(this.postForm.value).subscribe(value => {
        if (value.status == 200) {
          this.toaster.success('Ad Posted Successfully', 'Success!');
          this.postForm.reset();
          this.submitted = false;
          this.tempImages = [];
          $.noConflict();
          $("#myModal").modal("hide");
          this.router.navigate(['gridview']);
        } else {
          this.toaster.error('Internal Server Error, Please try again later', 'Error!')
        }
      })
    }
  }


  onSelectFile(evt) {
    for (let i = 0; i < evt.target.files.length; i++) {
      var files = evt.target.files[i];
      var file = files
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
    }

  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    var base64textString = btoa(binaryString);
    this.tempImages.push({ 'image_data': base64textString })
  }

  reportAd() {
    this.submitted1 = true;
    if (this.reportForm.invalid) {
      return;
    } else {
      this.reportForm.addControl('ad_id', new FormControl(this.id));
      this.reportForm.addControl('reported_by', new FormControl(sessionStorage.getItem('userID')));
      this.commonservice.reportAd(this.reportForm.value).subscribe(value => {
        if (value.status == 200) {
          this.toaster.success('Ad Reported Successfully', 'Success!');
          this.reportForm.reset();
          this.submitted1 = false;
          $.noConflict();
          $("#myModal").modal("hide");
          this.router.navigate(['gridview']);
        } else {
          this.toaster.error('Internal Server Error, Please try again later', 'Error!')
        }
      })
    }
  }


  adFun() {
    this.title = 'Post an Ad';
    this.postAdForm = true;
  }

  reportFun() {
    this.title = 'Help us better understand why you want to report this ad';
    this.postAdForm = false;
  }

  myAds() {
    this.router.navigate(['myads']);
  }
}
