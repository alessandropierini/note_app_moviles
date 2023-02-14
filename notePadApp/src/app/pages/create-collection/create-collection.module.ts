import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCollectionPageRoutingModule } from './create-collection-routing.module';

import { CreateCollectionPage } from './create-collection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCollectionPageRoutingModule
  ],
  declarations: [CreateCollectionPage]
})
export class CreateCollectionPageModule {}
