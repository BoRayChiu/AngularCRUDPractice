import { Component, Input, Output, EventEmitter, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Article } from '../article.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() public articles!: WritableSignal<Article[]>;
  @Output() public addArticle = new EventEmitter<Article>();

  public isPosting = false;
  public title = '';

  public cancelPostArticle() {

    this.isPosting = false;
    this.title = '';
  }
  public postArticle() {

    const newArticle: Article = {
      id: this.articles().length,
      title: this.title,
    };
    this.addArticle.emit(newArticle);
    this.title = '';
    this.isPosting = false;
  }
}
