import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer.counter';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({count:reducer}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
