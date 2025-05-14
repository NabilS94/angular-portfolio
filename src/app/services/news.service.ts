import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Article } from '../models';


interface PostResponse {
  id: number;
  userId: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getArticles(page: number, pageSize: number): Observable<Article[]> {
    return this.http.get<PostResponse[]>(`${this.apiUrl}/posts`).pipe(
      map(posts => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        
        return posts.slice(startIndex, endIndex).map((post, index) => ({
          id: post.id.toString(),
          title: post.title,
          summary: post.body.substring(0, 150) + '...',
          content: post.body,
          image: `https://picsum.photos/800/400?random=${post.id}`, 
          date: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)), 
          category: this.getRandomCategory(),
          readTime: Math.floor(Math.random() * 10) + 5, 
          author: {
            name: `Author ${post.userId}`,
            avatar: `https://i.pravatar.cc/150?img=${post.userId}` 
          }
        }));
      })
    );
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<PostResponse>(`${this.apiUrl}/posts/${id}`).pipe(
      map(post => ({
        id: post.id.toString(),
        title: post.title,
        summary: post.body.substring(0, 150) + '...',
        content: post.body,
        image: `https://picsum.photos/800/400?random=${post.id}`,
        date: new Date(),
        category: this.getRandomCategory(),
        readTime: Math.floor(Math.random() * 10) + 5,
        author: {
          name: `Author ${post.userId}`,
          avatar: `https://i.pravatar.cc/150?img=${post.userId}`
        }
      }))
    );
  }

  private getRandomCategory(): string {
    const categories = ['tech', 'web', 'mobile'];
    return categories[Math.floor(Math.random() * categories.length)];
  }
} 