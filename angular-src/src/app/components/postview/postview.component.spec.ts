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
import { FilterPipe } from 'ngx-filter-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
describe('PostviewComponent', () => {
  let component: PostviewComponent;
  let fixture: ComponentFixture<PostviewComponent>;
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
      imports: [FilterPipeModule,OwlModule, FormsModule, HttpClientModule, AppRoutingModule, BrowserModule, ReactiveFormsModule, ToastrModule.forRoot()]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(PostviewComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
      })
  }));

  it(`should call ngOnInit to get images`, async(() => {
    component.ngOnInit();
    expect(component.triggerFuc).toBeTruthy()
  }));
});
