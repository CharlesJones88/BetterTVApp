import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdCardModule, MdToolbarModule, MdButtonModule, MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { MovieDetailComponent } from './movie-detail.component';
import { ShowDetailComponent } from './show-detail.component';
import { MovieDetailDialog } from './movie-detail.dialog';
import { ShowDetailDialog } from './show-detail.dialog';

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailComponent,
    ShowDetailComponent,
    MovieDetailDialog,
    ShowDetailDialog
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    MdCardModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdButtonModule,
    MdDialogModule
  ],
  entryComponents: [
    MovieDetailDialog,
    ShowDetailDialog
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    MdCardModule,
    MdToolbarModule,
    MdButtonModule,
    MdDialogModule,
    MovieDetailDialog,
    ShowDetailDialog
  ],
})
export class AppModule { }
