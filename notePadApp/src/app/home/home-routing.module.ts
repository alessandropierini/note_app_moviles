import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'view-note/notes',
    loadChildren: () => import('../pages/view-note/view-note.module').then(e => e.ViewNotePageModule)
  },
  {
    path: 'view-collection/collections',
    loadChildren: () => import('../pages/view-collection/view-collection.module').then(e => e.ViewCollectionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
