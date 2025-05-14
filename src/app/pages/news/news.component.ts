import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Article, NewsService } from '../../services/news.service';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ArticleCardComponent]
})
export class NewsComponent implements OnInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  currentCategory: string = 'all';
  searchTerm: string = '';
  loading: boolean = false;
  page: number = 1;
  pageSize: number = 6;
  hasMore: boolean = true;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.loading = true;
    this.newsService.getArticles(this.page, this.pageSize).subscribe({
      next: (newArticles: Article[]) => {
        this.articles = [...this.articles, ...newArticles];
        this.filterArticles();
        this.hasMore = newArticles.length === this.pageSize;
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Error loading articles:', error);
        this.loading = false;
      }
    });
  }

  filterArticles(): void {
    this.filteredArticles = this.articles.filter(article => {
      const matchesCategory = this.currentCategory === 'all' || article.category === this.currentCategory;
      const matchesSearch = !this.searchTerm || 
        article.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  filterByCategory(category: string): void {
    this.currentCategory = category;
    this.filterArticles();
  }

  onSearch(): void {
    this.filterArticles();
  }

  loadMore(): void {
    this.page++;
    this.loadArticles();
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/placeholder.jpg';
  }
}
