import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentComponent } from './components/comment/comment.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BlogListItemComponent } from './components/blog-list-item/blog-list-item.component';
import { BlogComponent } from './components/blog/blog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TextLimitPipe } from './pipes/text-limit.pipe';
import { CommentContainerComponent } from './components/comment-container/comment-container.component';
import { AuthorCardComponent } from './components/author-card/author-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    BlogListComponent,
    BlogListItemComponent,
    BlogComponent,
    LoadingComponent,
    TextLimitPipe,
    CommentContainerComponent,
    AuthorCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
