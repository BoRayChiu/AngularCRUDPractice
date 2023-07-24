import { Component, EventEmitter, Input, OnChanges, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../article.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss']
})
export class ArticleHeaderComponent implements OnInit{

  @Input() public article!: Article;
  @Output() public deleteArticle = new EventEmitter<Article>();
  @Output() public changeArticle = new EventEmitter<Article>();

  public isEdited = false;
  //public $article: WritableSignal<Article> = signal({'id': 0, 'title': ''});
  public $article: WritableSignal<Article> = signal({'id': 0, 'title': ''});
  public originalArticle!: Article;

  /*public ngOnChanges(changes: any): void {

    if(changes.article) {
      this.originalArticle = changes.article.currentValue;
      this.article = Object.assign({}, changes.article.currentValue);
    }
  }*/

  public ngOnInit(): void {

    this.$article.set({ ...this.article });
    this.originalArticle = { ...this.article};
  }

  public doDeleteArticle() {

    this.deleteArticle.emit(this.$article());
  }

  public doChangeTitle() {

    this.changeArticle.emit(this.$article());
    this.isEdited = false;
  }

  public doCancelEdited() {

    this.$article().title = this.originalArticle.title;
    this.isEdited = false;
  }
}
