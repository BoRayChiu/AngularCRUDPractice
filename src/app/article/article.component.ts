import { PostComponent } from './post/post.component';
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleHeaderComponent } from './article-header/article-header.component';
import { ArticleBodyComponent } from './article-body/article-body.component';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, PostComponent, ArticleHeaderComponent, ArticleBodyComponent],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit{

  private articleService: ArticleService = inject(ArticleService);
  public articles: WritableSignal<Article[]> = signal([]);

  public async ngOnInit(){

    this.articles.set(await this.articleService.getArticles());
  }


  public async onAddArticle(article: Article) {

    try {
      await this.articleService.addArticle(article);
      this.articles.mutate(x=>x.push(article));
      //this.articles.update(x => [ ...x, article ]);
    }
    catch(e) {
      console.log(e);
    }
  }

  public async onChangeTitle(article: Article) {


    try {
      //await this.articleService.modifyArticle(article);
      /*this.articles.mutate(x =>
        x[x.findIndex(x => x.id === article.id)].title = article.title;
        );*/
      /*this.articles.mutate(x => {
        const a = x.find(x => x.id === article.id);
        a && (a.title = article.title);
      });*/
      this.articles.update(x =>
        x.map(x => (x.id === article.id ? { ...x, title: article.title } : x)));
    }
    catch(e) {
      console.log(e);
    }
  }

  public async onDeleteArticle(article: Article) {

    try {
      await this.articleService.deleteArticle(article);
      this.articles.mutate(x => {
        x.splice(x.findIndex(x => x.id === article.id), 1);
      });
      //this.articles.update(x => x.filter(x => x.id !== article.id));
    }
    catch(e) {
      console.log(e);
    }
  }
}

export interface Article {

  id: number;
  title: string;
}
