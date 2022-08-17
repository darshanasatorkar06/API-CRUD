import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './home/first-page/first-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {component:HomeComponent,
    path:'Home',
    children:[
      {path:'FirstPage', component:FirstPageComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
