import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { NavbarComponent } from './components/navbar/navbar.component';
import { ListviewComponent } from './components/listview/listview.component';
import { PostviewComponent } from './components/postview/postview.component';
import { GridviewComponent } from './components/gridview/gridview.component';
import { MyadsComponent } from './components/myads/myads.component';
import { ReportedadsComponent } from './components/reportedads/reportedads.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: RegisterComponent },
  { path: 'list', component: ListviewComponent },
  { path: 'post', component: PostviewComponent },
  { path: 'list/post', component: PostviewComponent },
  { path: 'list/register', component: RegisterComponent },
  { path: 'list/post/register', component: RegisterComponent },
  { path: 'gridview', component: GridviewComponent },
  { path: 'myads', component: MyadsComponent },
  { path: 'reportedads', component: ReportedadsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
