import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService, Article } from '../../../services/news.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ArticleDetailComponent implements OnInit {
  article: Article | null = null;
  loading: boolean = false;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.loadArticle();
  }

  loadArticle(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (isNaN(id)) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.newsService.getArticleById(id).subscribe({
      next: (article: Article) => {
        this.article = article;
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Error loading article:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/placeholder.jpg';
  }

  goBack(): void {
    this.router.navigate(['/news']);
  }
} 