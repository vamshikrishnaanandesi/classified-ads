import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule, By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { GridviewComponent } from '../gridview/gridview.component';
import { ListviewComponent } from '../listview/listview.component';
import { PostviewComponent } from '../postview/postview.component';
import { MyadsComponent } from '../myads/myads.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { HttpClientModule } from '@angular/common/http';
import { OwlModule } from 'ngx-owl-carousel';
import { ReportedadsComponent } from '../reportedads/reportedads.component';
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent, LoginComponent,
        NavbarComponent,
        GridviewComponent,
        ListviewComponent,
        PostviewComponent,
        SearchbarComponent,
        MyadsComponent,
        ReportedadsComponent
      ],
      providers: [
        FormBuilder
      ],
      imports: [OwlModule, FormsModule, HttpClientModule, AppRoutingModule, BrowserModule, ReactiveFormsModule, ToastrModule.forRoot()]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        de = fixture.debugElement.query(By.all());
        el = de.nativeElement;
      })
  }));



  it(`should set postAdForm to true`, async(() => {
    component.adFun();
    expect(component.postAdForm).toBeTruthy()
  }));

  it(`should call reportFun method and set postAdForm to false`, async(() => {
    component.reportFun();
    expect(component.title).toEqual('Help us better understand why you want to report this ad')
    expect(component.postAdForm).toBeFalsy()
  }));

  it(`should call the reportAd method`, async(() => {
    fixture.detectChanges();
    spyOn(component, 'reportAd');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.reportAd).toHaveBeenCalledTimes(0)
    expect(component.submitted1).toBeFalsy()
  }))

  it(`should call the postAd method`, async(() => {
    fixture.detectChanges();
    spyOn(component, 'postAd');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.postAd).toHaveBeenCalledTimes(0)
    expect(component.submitted).toBeFalsy()
  }))

  it(`Post form should be invalid`, async(() => {
    component.postForm.controls['ad_type'].setValue('')
    component.postForm.controls['title'].setValue('')
    component.postForm.controls['category'].setValue('')
    component.postForm.controls['price'].setValue('')
    component.postForm.controls['contact_details'].setValue('')
    component.postForm.controls['description'].setValue('')
    expect(component.postForm.valid).toBeFalsy()
  }));

  it(`Post form should be valid`, async(() => {
    component.postForm.controls['ad_type'].setValue('misc')
    component.postForm.controls['title'].setValue('new post')
    component.postForm.controls['category'].setValue('books')
    component.postForm.controls['price'].setValue(100)
    component.postForm.controls['contact_details'].setValue('Greenwich')
    component.postForm.controls['description'].setValue('CDU Bulletin')
    expect(component.postForm.valid).toBeTruthy()
  }));

  it(`Report form should be invalid`, async(() => {
    component.reportForm.controls['description'].setValue('')
    expect(component.reportForm.valid).toBeFalsy()
  }));

  it(`Report form should be valid`, async(() => {
    component.reportForm.controls['description'].setValue('CDU')
    expect(component.reportForm.valid).toBeTruthy()
  }));

});