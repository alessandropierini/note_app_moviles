import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCollectionPage } from './create-collection.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCollectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCollectionPageRoutingModule {}
