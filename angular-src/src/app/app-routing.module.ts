import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GridviewComponent } from './components/gridview/gridview.component';
import { ListviewComponent } from './components/listview/listview.component';
import { PostviewComponent } from './components/postview/postview.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: GridviewComponent },
  { path: 'list', component: ListviewComponent },
  { path: 'post', component: PostviewComponent },
  { path: 'list/post', component: PostviewComponent },
  { path: 'list/register', component: RegisterComponent },
  { path: 'list/post/register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
