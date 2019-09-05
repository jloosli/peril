import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

const materialModules = [
  MatToolbarModule,
];

@NgModule({
  declarations: [],
  imports: materialModules,
  exports: materialModules,
})
export class MaterialDesignModule {
}
