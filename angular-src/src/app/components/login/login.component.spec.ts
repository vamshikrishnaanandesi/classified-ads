import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import {BrowserModule, By } from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule,FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {DebugElement} from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { GridviewComponent } from '../gridview/gridview.component';
import { ListviewComponent } from '../listview/listview.component';
import { PostviewComponent } from '../postview/postview.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { HttpClientModule } from '@angular/common/http';
import { OwlCarousel } from 'ngx-owl-carousel';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el:HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent,LoginComponent,
        NavbarComponent,
    GridviewComponent,
    ListviewComponent,
    PostviewComponent,
    SearchbarComponent,
      ],
      providers: [
        FormBuilder
      ],
      imports:[FormsModule,HttpClientModule,AppRoutingModule,BrowserModule,ReactiveFormsModule,ToastrModule.forRoot()]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      de= fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    })
  }));


  // it(`should have a text as 'Login'`, async(() => {
  //   expect(component.text).toEqual('Login')
  // }));

  it(`should set submitted to true`,async(()=>{
    component.loginAuth();
    expect(component.submitted).toBeTruthy()
  }));

  it(`should call the loginAuth method`,async(()=>{
      fixture.detectChanges();
      spyOn(component,'loginAuth');
      el = fixture.debugElement.query(By.css('button')).nativeElement;
      el.click();
      expect(component.loginAuth).toHaveBeenCalledTimes(1)
  }))

  it(`form should be invalid`,async(()=>{
    component.loginForm.controls['email'].setValue('')
    component.loginForm.controls['password'].setValue('')
    expect(component.loginForm.valid).toBeFalsy()
  }));

  it(`form should be valid`,async(()=>{
    component.loginForm.controls['email'].setValue('hemantham02@gmail.com')
    component.loginForm.controls['password'].setValue('hemanth@002')
    expect(component.loginForm.valid).toBeTruthy()
  }));

});
