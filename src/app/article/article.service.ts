import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Article } from './article.component';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = 'http://localhost:3000/articles';
  private http: HttpClient = inject(HttpClient);

  public async getArticles() {

    const result$ = this.http.get<Article[]>(this.url);
    return await lastValueFrom(result$);
  }

  public async addArticle(article: Article) {

    const result$ = this.http.post<Article[]>(`${this.url}`, article);
    return await lastValueFrom(result$);
  }

  public async modifyArticle(article: Article) {

    const result$ = this.http.patch<Article>(`${this.url}/${article.id}`, article);
    return await lastValueFrom(result$);
  }

  public async deleteArticle(article: Article) {

    const result$ = this.http.delete<Article>(`${this.url}/${article.id}`);
    return await lastValueFrom(result$);
  }
}

