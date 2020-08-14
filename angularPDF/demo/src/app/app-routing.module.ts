import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexeddbComponent } from  './indexeddb/indexeddb.component'


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
