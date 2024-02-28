import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { D1Component } from './d1/d1.component';
import { D2Component } from './d2/d2.component';

const routes: Routes = [
  {
    path: 'd1',
    component: D1Component
  },
  {
    path: 'd2',
    component: D2Component
  },
  {
    path: '',
    redirectTo: 'd1',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
