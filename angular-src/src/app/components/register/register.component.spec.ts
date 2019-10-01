import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule, By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { RegisterComponent } from './register.component';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { GridviewComponent } from '../gridview/gridview.component';
import { ListviewComponent } from '../listview/listview.component';
import { PostviewComponent } from '../postview/postview.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { HttpClientModule } from '@angular/common/http';
import { OwlModule } from 'ngx-owl-carousel';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
      ],
      providers: [
        FormBuilder
      ],
      imports: [OwlModule, FormsModule, HttpClientModule, AppRoutingModule, BrowserModule, ReactiveFormsModule, ToastrModule.forRoot()]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      })
  }));


  // it(`should have a text as 'Register'`, async(() => {
  //   expect(component.text).toEqual('Register')
  // }));

  it(`should set submitted to true`, async(() => {
    component.register();
    expect(component.submitted).toBeTruthy()
  }));

  it(`should call the register method`, async(() => {
    fixture.detectChanges();
    spyOn(component, 'register');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.register).toHaveBeenCalledTimes(1)
  }))

  it(`form should be invalid`, async(() => {
    component.registerForm.controls['username'].setValue('')
    component.registerForm.controls['email'].setValue('')
    component.registerForm.controls['age'].setValue('')
    component.registerForm.controls['gender'].setValue('')
    component.registerForm.controls['password'].setValue('')
    component.registerForm.controls['cpassword'].setValue('')
    expect(component.registerForm.valid).toBeFalsy()
  }));

  it(`form should be valid`, async(() => {
    component.registerForm.controls['username'].setValue('hemanth')
    component.registerForm.controls['email'].setValue('hemantham02@gmail.com')
    component.registerForm.controls['age'].setValue(23)
    component.registerForm.controls['gender'].setValue('male')
    component.registerForm.controls['password'].setValue('hemanth@002')
    component.registerForm.controls['cpassword'].setValue('hemanth@002')
    expect(component.registerForm.valid).toBeTruthy()
  }));

});