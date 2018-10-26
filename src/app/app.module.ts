import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ShoppingListReducer } from './store/shopping-list/shopping-list.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot({ shoppingList: ShoppingListReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
