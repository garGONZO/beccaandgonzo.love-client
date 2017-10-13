import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DataTableModule } from 'angular2-datatable';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistTableComponent } from './playlist/table/playlist-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    PlaylistTableComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    DataTableModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
