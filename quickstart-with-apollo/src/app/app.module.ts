import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApolloModule } from 'apollo-angular';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed.component';
import { NewPostComponent } from './new-post.component';
import { routes } from './routes';
import { provideClient } from './client';
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    NewPostComponent,
  ],
  entryComponents: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ApolloModule.forRoot(provideClient),
    MaterialModule
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
